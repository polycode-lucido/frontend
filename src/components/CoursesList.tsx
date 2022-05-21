import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export type courseType = 'course' | 'courseCompletion';

export default function CourseList(props: { courses: any[], type?: courseType}) {
  const { courses, type } = props;

  const navigate = useNavigate();

  const onCourseClick = (course: any) => {
    navigate(`/course?courseId=${type == "course" ? course._id : course.course._id}`);
  };

  return (
    <Container sx={{ marginTop: "50px" }}>
      <Grid container>
        {courses.slice(0, 12).map((course) => (
          <Grid key={course._id} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={`${
                  process.env.PUBLIC_URL + "/course/" + (type === 'course' ? course._id + ".png" : course.course._id + ".png")
                }`}
                alt="course image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {`${type === 'course' ? course.name : course.course.name}`}
                </Typography>
                <Rating name="read-only" value={type === 'course' ? course.difficulty : course.course.difficulty} readOnly />
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="right"
                ></Stack>
                <Typography variant="body2" color="text.secondary">
                {`${type === 'course' ? course.description : course.course.description}`}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" sx={{ marginBottom: "30px" }} onClick={() => onCourseClick(course)}>
                  {type === 'course' ? 'Start' : 'Continue'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
