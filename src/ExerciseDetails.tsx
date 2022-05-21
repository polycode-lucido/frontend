import { Button, Grid, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "./contexts/courseContext";
import { UserContext } from "./contexts/userContext";
import { API_URL } from "./env";

export default function ExerciseDetails(props: { exercise: any }) {
  const currentCourse = React.useContext(CourseContext);
  const { user, tokens } = React.useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = async (exercise: any) => {
      const response = await axios.get(
        `${API_URL}course-completion/courseId/${currentCourse.course._id}`,
        { headers: { Authorization: `Bearer ${tokens?.access}` } }
      );
      
      if (response.data.length === 0) {
          const create = await createCourseCompletion();
          navigate(`/code?courseCompletionId=${create.data._id}&id=${exercise._id}`);
      } else {
        navigate(`/code?courseCompletionId=${response.data[0]._id}&id=${exercise._id}`);
      }
  };

  const createCourseCompletion = async () => {
    return await axios.post(
      `${API_URL}course-completion`,
      {
        courseId: currentCourse.course._id,
      },
      { headers: { Authorization: `Bearer ${tokens?.access}` } }
    );
  };

  return (
    <Grid container>
      <Button onClick={() => handleClick(props.exercise)}>
        <Typography>{props.exercise.name}</Typography>
      </Button>
    </Grid>
  );
}
