import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Container,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LessonDetails from "./components/LessonDetails";
import ModuleDetails from "./components/ModuleDetails";
import { CourseContext } from "./contexts/courseContext";
import { UserContext } from "./contexts/userContext";
import { API_URL } from "./env";
import ExerciseDetails from "./ExerciseDetails";

export default function CoursePage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user, tokens } = React.useContext(UserContext);
  const [course, setCourse] = React.useState<any>();

  const courseContext = React.useContext(CourseContext);

  React.useEffect(() => {
    (async () => {
      if (user === null) {
        navigate("/");
      } else {
        const response = await axios.get(
          `${API_URL}course/id/${params.get("courseId")}`,
          { headers: { Authorization: `Bearer ${tokens?.access}` } }
        );
        setCourse(response.data);
        courseContext.setCourse(response.data._id);
      }
    })();
  }, [user]);

  return (
    <Container>
      <Typography variant="h3">{course?.name}</Typography>
      <Typography>{course?.description}</Typography>
      {course?.lessons.length > 0 && (
        <Card>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />} id="panel1a-header">
              <Typography variant="h4">Lessons</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {course?.lessons.map((lesson: any) => (
                <LessonDetails key={lesson._id} lesson={lesson}></LessonDetails>
              ))}
            </AccordionDetails>
          </Accordion>
        </Card>
      )}
      {course?.exercises.length > 0 && (
        <Card>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />} id="panel1a-header">
              <Typography variant="h4">Exercises</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {course?.exercises.map((exercise: any) => (
                <ExerciseDetails
                  key={exercise._id}
                  exercise={exercise}
                ></ExerciseDetails>
              ))}
            </AccordionDetails>
          </Accordion>
        </Card>
      )}
      {course?.modules.length > 0 && (
        <Card>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />} id="panel1a-header">
              <Typography variant="h4">Modules</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {course?.modules.map((modules: any) => (
                <ModuleDetails
                  key={modules._id}
                  module={modules}
                ></ModuleDetails>
              ))}
            </AccordionDetails>
          </Accordion>
        </Card>
      )}
    </Container>
  );
}
