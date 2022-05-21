import Editor from "@monaco-editor/react";
import { Done, DoneAll, Error } from "@mui/icons-material";
import {
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { API_URL } from "../../env";

export enum Languages {
  Javascript = "javascript",
  Rust = "rust",
  Java = "java",
  Python = "python",
}

export enum TestStatus {
  None,
  Failed,
  Success,
}

export default function ExercisePage() {
  const [searchParams] = useSearchParams();
  const [exercise, setExercise] = React.useState<any>({});
  const [code, setCode] = React.useState<string>("");
  const [language, setLanguages] = React.useState<Languages>(
    Languages.Javascript
  );
  const [stdout, setStdout] = React.useState<string>("");
  const [stderr, setStderr] = React.useState<string>("");
  const [test, setTest] = React.useState<TestStatus>(TestStatus.None);
  const { tokens } = React.useContext(UserContext);

  React.useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${API_URL}exercise/${searchParams.get("id")}`
      );
      setExercise(response.data);
    })();
  }, [searchParams]);

  const handleEditorChange = (newValue: string | undefined, e: any) => {
    if (newValue) {
      setCode(newValue);
    } else {
      setCode("");
    }
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguages(event.target.value as Languages);
  };

  const handleSubmit = async () => {
    const response = await axios.post(
      `${API_URL}run`,
      {
        exerciseId: exercise._id,
        sourceCode: code,
        language: language === "javascript" ? "node" : language,
        courseCompletionId: searchParams.get("courseCompletionId"),
      },
      {
        headers: {
          Authorization: `Bearer ${tokens?.access}`,
        },
      }
    );

    setStdout(response.data.stdout);
    setStderr(response.data.stderr);
    setTest(response.data.outputMatching ? TestStatus.Success : TestStatus.Failed);
    console.log(response);

  };

  return (
    <Container maxWidth={false} disableGutters={true}>
      <Grid container>
        <Grid item xs={5} sx={{ marginTop: "10px" }}>
          <Card sx={{ height: "70vh", textAlign: "left" }}>
            <ReactMarkdown>{exercise.markdown}</ReactMarkdown>
          </Card>
        </Grid>
        <Grid item xs={7} sx={{ height: "70vh", marginTop: "10px" }}>
          <Container>
            <Grid container>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Language
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={language}
                    label="Language"
                    onChange={handleLanguageChange}
                  >
                    <MenuItem value={Languages.Javascript}>Javascript</MenuItem>
                    <MenuItem value={Languages.Java}>Java</MenuItem>
                    <MenuItem value={Languages.Python}>Python</MenuItem>
                    <MenuItem value={Languages.Rust}>Rust</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleSubmit()}
                >
                  Executer
                </Button>
              </Grid>
            </Grid>
            <Editor
              height={"60vh"}
              defaultLanguage={language}
              language={language}
              defaultValue="// some comment"
              theme="vs-dark"
              onChange={handleEditorChange}
            />
          </Container>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">{exercise.title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="h5">Sortie standard</Typography>
              <pre style={{ textAlign: "left" }}>{stdout}</pre>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5">{"Sortie d'erreur"}</Typography>
              <pre style={{ textAlign: "left" }}>{stderr}</pre>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5">{"Tests"}</Typography>
              {test == TestStatus.Failed ? <Error color="error" fontSize="large" /> : test == TestStatus.Success ? <DoneAll color="success" fontSize="large"/> : ''}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
