import { Button, Container, Rating, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import Carousel from "nuka-carousel";
import React from "react";
import { API_URL } from "../env";

export default function HeroTile() {

  const [items, setItems] = React.useState([
    {
      url: `${process.env.PUBLIC_URL + "/hello_world.png"}`,
      textColor: "teal",
      description: "Learn the basics of programming !",
      difficulty: 4,
    },
    {
      url: `${process.env.PUBLIC_URL + "/web_development.png"}`,
      textColor: "white",
      description: "Some random course !",
      difficulty: 3,
    },
  ])

  React.useEffect(() => {
    (async () => {
      const data = await axios.get<any[]>(`${API_URL + "course/recommended"}`);
      data.data.forEach((item) => {
        item.url = `${process.env.PUBLIC_URL + "/course/"}${item._id}.png`;
        item.textColor = "teal";
      });
      setItems(data.data);
    })();
  }, [])

  return (
    <Container maxWidth={false} disableGutters={true} sx={{ width: "100%" }}>
      <Container maxWidth={false} disableGutters={true}>
        <Carousel
          wrapAround={true}
          withoutControls={false}
          autoplay={false}
          autoplayInterval={5000}
          style={{ marginTop: 0 }}
        >
          {items.map((item) => (
            <Box
              key={item.url}
              sx={{
                width: "100vw",
                height: "50vh",
                margin: 0,
                backgroundImage: `url(${item.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "flex-end",
              }}
            >
              <Container
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h4"
                  color={item.textColor}
                  maxWidth="sm"
                  sx={{ opacity: "0.8" }}
                >
                  {item.description}
                </Typography>
                <Rating name="read-only" value={item.difficulty} readOnly />
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="right"
                >
                  <Button variant="contained" sx={{ marginBottom: "30px" }}>
                    Start the course
                  </Button>
                </Stack>
              </Container>
            </Box>
          ))}
        </Carousel>
      </Container>
    </Container>
  );
}
