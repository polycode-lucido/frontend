import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import * as React from "react";
import ExerciseDetails from "../ExerciseDetails";
import LessonDetails from "./LessonDetails";

export default function ModuleDetails(props: { module: any }) {
  return (
    <Card sx={{marginY: "20px"}}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
          <Typography variant="h5">{props.module.name}</Typography>
            </Grid>
        </Grid>
        <Grid item xs={12}>
          {props.module?.lessons.length > 0 && (
            <Card>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  id="panel1a-header"
                >
                  <Typography variant="h6">Lessons</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {props.module?.lessons.map((lesson: any) => (
                    <LessonDetails
                      key={lesson._id}
                      lesson={lesson}
                    ></LessonDetails>
                  ))}
                </AccordionDetails>
              </Accordion>
            </Card>
          )}
          {props.module?.exercises.length > 0 && (
            <Card>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  id="panel1a-header"
                >
                  <Typography variant="h6">Exercises</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {props.module?.exercises.map((exercise: any) => (
                    <ExerciseDetails
                      key={exercise._id}
                      exercise={exercise}
                    ></ExerciseDetails>
                  ))}
                </AccordionDetails>
              </Accordion>
            </Card>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}
