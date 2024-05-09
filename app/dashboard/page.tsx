"use client";

import React from "react";
import { Container, Typography } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <Container maxWidth="md">
      <Typography variant="h1" fontSize={32}>
        {`Welcome ${user?.name}, let's create your first Chat Room!`}
      </Typography>
    </Container>
  );
}
