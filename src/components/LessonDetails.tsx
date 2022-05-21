import { Grid, Typography } from "@mui/material";
import * as React from "react";

export default function LessonDetails(props: { lesson: any }) {
  return (
    <Grid container>
      <Typography variant="h6">{props.lesson.name}</Typography>
      <Typography>{props.lesson.description}</Typography>
    </Grid>
  );

  
}