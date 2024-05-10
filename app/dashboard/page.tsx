"use client";
import React from "react";
import { CircularProgress, Container, Typography } from "@mui/material";
import { useUserData } from "../../hooks";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

/**
 * See @https://auth0.github.io/nextjs-auth0/types/client_with_page_auth_required.WithPageAuthRequired.html
 *
 * `withPageAuthRequired` example usage in a client page.
 */
export default withPageAuthRequired(
  function Dashboard() {
    const { user, isLoading } = useUserData();
    return (
      <Container maxWidth="md">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Typography variant="h1" fontSize={32}>
            {`Welcome ${user?.name}, let's create your first Chat Room!`}
          </Typography>
        )}
      </Container>
    );
  },
  { returnTo: "/" }
);
