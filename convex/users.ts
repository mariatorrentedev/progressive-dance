import { query, mutation } from "./_generated/server";

// List all users
export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

/**
 * Insert or update the user in a Convex table.
 *
 * The `UserIdentity.tokenIdentifier` string is a stable and unique value.
 * Keep in mind that `UserIdentity` has a number of optional fields, the
 * presence of which depends on Auth0.
 */
export const save = mutation({
  handler: async (queryCtx) => {
    const { db, auth } = queryCtx;
    const identity = await auth.getUserIdentity();

    if (!identity) {
      throw new Error("Called saveUser without authentication present");
    }

    const { tokenIdentifier, name, email, pictureUrl } = identity;

    if (!(tokenIdentifier && name && email && pictureUrl))
      throw new Error("Could not save user: Incomplete identity info");

    // Check if we've already stored this identity before.
    const existingUser = await db
      .query("users")
      .filter((q) => q.eq(q.field("tokenIdentifier"), tokenIdentifier))
      .first();

    let savedUser;

    if (existingUser === null) {
      // If it's a new identity, create a new `User`.
      const newUserId = await db.insert("users", {
        tokenIdentifier,
        name,
        email,
        pictureUrl,
      });
      savedUser = await db.get(newUserId);
    } else {
      // If we've seen this identity before but the profile info has changed, patch the value.
      if (
        existingUser.name !== name ||
        existingUser.email !== email ||
        existingUser.pictureUrl !== pictureUrl
      ) {
        // If we've seen this identity before but the profile info has changed, patch the value.
        await db.patch(existingUser._id, { name, email, pictureUrl });
      }
      savedUser = await db.get(existingUser._id);
    }

    if (!savedUser) {
      // Should never happen, but just in case/to appease TS
      throw new Error("Unexpected error saving user");
    } else {
      // Convert a Convex 'users' Doc to a User object
      return {
        id: savedUser._id.toString(),
        name: savedUser.name,
        pictureUrl: savedUser.pictureUrl,
      };
    }
  },
});
