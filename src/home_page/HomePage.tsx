import { Button, Container, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from 'react';
import Carousel from "nuka-carousel";

export default function LandingPage() {
    const items = [
    {
        name: "Random Name #1",
        description: "Probably the most random thing you have ever seen!"
    },
    {
        name: "Random Name #2",
        description: "Hello World!"
    }
]

  return (
    <Container maxWidth={false} disableGutters={true}>
        <Container maxWidth={"md"}>
            <h1>
                Welcome to polycode
            </h1>
            <Carousel wrapAround={true} withoutControls={true} autoplay={true} autoplayInterval={5000}>

              <Box>
                <h2>Testing</h2>
                <p>Description</p>
    
                <Button className="CheckButton">
                  Check it out!
                </Button>
              </Box>
              <Box>
                <h2>Testing</h2>
                <p>Description</p>
    
                <Button className="CheckButton">
                  Check it out!
                </Button>
              </Box>
            </Carousel>
        </Container>
    </Container>
  );
}
