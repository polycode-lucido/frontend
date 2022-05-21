import axios from "axios";
import React from "react";
import { API_URL } from "../env";
import { UserContext } from "./userContext";

export interface CourseContextData {
  course: any;
  setCourse: (course: any) => void;
}

export const CourseContext = React.createContext<CourseContextData>({
  course: undefined,
  setCourse: () => {return},
});

const useCourseContext = () => {
  const [course, setCourse] = React.useState<CourseContextData["course"]>(
    undefined
  );

  const { tokens } = React.useContext(UserContext);

  const setCourseWrapper = async (course: CourseContextData["course"]) => {
    const response = await axios.get(
      `${API_URL}course/id/${course}`,
      { headers: { Authorization: `Bearer ${tokens?.access}` } }
    );
    setCourse(response.data);
  };

  return { course, setCourse: setCourseWrapper } as const;
};

export default function CourseContextProvider(props: {
  children: React.ReactNode;
}) {
  const context = useCourseContext();
  return (
    <CourseContext.Provider value={context}>
      {props.children}
    </CourseContext.Provider>
  );
}
