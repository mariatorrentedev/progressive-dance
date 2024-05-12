# Progressive Dance

Because every new learning feels like a progressive dance 💃🏽!

## Simple App using [Next.js](https://nextjs.org/), [Auth0](https://auth0.com/) and [Convex](https://convex.dev)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## [App Router](https://nextjs.org/docs/app/building-your-application/routing#the-app-router)

### Nice To Know:

- Introduced in Next 13 version, there is no real need to use `/pages`.
- By default all are Server Components, but you can also create Client Components using the `use client`.

## 🔐 Authentication -[ auth0/nextjs SDK](https://auth0.github.io/nextjs-auth0/index.html) + [convex custom auth](https://docs.convex.dev/auth/advanced/custom-auth)

This application uses the auth0/nextjs SDK which automatically connects with our Auth0 provider with the env variables provided in the `.env.local.example` file, when calling the `handleLogin` method under the `/app/api/auth/[auth0]/route.ts` it creates for us the dynamic routes needed for Authentication flow. It is important to read the difference between the two SDK's security models [read here](https://github.com/auth0/nextjs-auth0/tree/main?tab=readme-ov-file#comparison-with-the-auth0-react-sdk).

On top of that we are saving, and using our users from the [Convex](https://stack.convex.dev/how-convex-works) provider, a lightweight backend solution that allow us to connect clients to the sync worker, which delegates running Js to the runner, that then queries the DB layer. Some customization in the auth integration was needed, since the `auth0/nextjs` does not provided the same out-of-the-box solution as `auth0/react` with the `Auth0Provider` HOC component, so we needed to create a hook to provide the state of our `idToken` to convex.

See [here](https://auth0.com/blog/id-token-access-token-what-is-the-difference/) difference between `idToken` and `accessToken`.

### Steps:

#### auth0/nextjs-auth0

This library requires Node.js 16 LTS and newer LTS versions.

1. Create a new Auth0 application [here](https://manage.auth0.com/#/applications).
2. Follow the steps here using the [App Router](https://github.com/auth0/nextjs-auth0/tree/main?tab=readme-ov-file#app-router). If you want a deeper insight on the implementation, follow the tutorial [here](https://developer.auth0.com/resources/guides/web-app/nextjs/basic-authentication).

Awesome, we have our Basic Authentication done, let's integrate with our backend to save the users...

#### convex [custom auth](https://docs.convex.dev/auth/advanced/custom-auth)

3. Follow the steps [here](https://docs.convex.dev/auth/advanced/custom-auth) for the basic set up.
4. Create a custom hook to provide the status of our auth0entication with Convex. See `/hooks/next-auth0-provider` for an example.
5. Use the newly created hook and pass it to the `ConvexProviderWithAuth` HOC. See `/app/ConvexProvider.tsx`.
6. Create another custom hook to use the new authentication state and user passed to the HOC above. See `/hooks/user`.
7. Test that you can save, and consume a user correctly.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
