import { Container, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { API_URL } from "../../env";
import CoursesList from "../CoursesList";
import HeroTile from "../HeroTile";

export default function LandingPage() {
  const naviguate = useNavigate();
  const { user, tokens } = React.useContext(UserContext);

  const [courses, setCourses] = React.useState<any[]>([]);
  const [userCourses, setUserCourses] = React.useState<any[]>([]);

  React.useEffect(() => {
    (async () => {
      const response = await axios.get<any[]>(`${API_URL}course`);
      setCourses(response.data);
    })();
  }, []);

  React.useEffect(() => {
    if (user === null) {
      naviguate("/");
    } else {
      (async () => {
        const response = await axios.get<any[]>(
          `${API_URL}course-completion/me`,
          { headers: { Authorization: `Bearer ${tokens?.access}` } }
        );
        setUserCourses(response.data);
      })();
    }
  }, [user]);

  return (
    <Container maxWidth={false} disableGutters={true}>
      <HeroTile />
      <Typography sx={{ marginY: "50px" }} variant="h4">
        All courses
      </Typography>
      <CoursesList courses={courses} type="course" />
      <Typography sx={{ marginY: "50px" }} variant="h4">
        Your courses
      </Typography>
      <CoursesList courses={userCourses} type="courseCompletion" />
    </Container>
  );
}
