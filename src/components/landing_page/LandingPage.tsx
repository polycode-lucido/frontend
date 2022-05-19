import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React from 'react';

export default function LandingPage() {
  return (
    <Container maxWidth={false} disableGutters={true}>
        <Box >
            <h1>
                Welcome to polycode
            </h1>
        </Box>
    </Container>
  );
}
