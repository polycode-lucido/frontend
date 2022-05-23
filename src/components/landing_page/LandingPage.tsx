import {
  Button, Card, CardContent, Container, Grid, Typography
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/signin");
  };

  const navigateToRegister = () => {
    navigate("/signup");
  };

  return (
    <Container maxWidth={false} disableGutters={true}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          margin: 0,
          backgroundImage: `url(https://images.prismic.io/stemvillage/75377003da034473fa8d40d7caacf3f8b471463c_zany-jadraque-571205-unsplash.jpg?auto=compress,format)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.4)", padding: "50px" }}>
              <CardContent>
                <Typography variant="h4">Welcome to Polycode</Typography>
                <Button variant="contained" sx={{ margin: "20px" }} onClick={() => navigateToRegister()}>
                  <Typography variant="h5">Sign up</Typography>
                </Button>
                <Button variant="contained" sx={{ margin: "20px" }} onClick={() => navigateToLogin()}>
                  <Typography variant="h5">Sign in</Typography>
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
