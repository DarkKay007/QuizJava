
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useQuestionStore } from "./store/questions";
import { type Question as QuestionsType } from "./types";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./Footer";

const Question = ({ info }: { info: QuestionsType }) => {
  const selectAnswer = useQuestionStore((state) => state.selectAnswer);
  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };

  const getBackgroundColor = (index: number) => {
    const { userSelectedAnswer, correctAnswer } = info;

    if (userSelectedAnswer == null) return "transparent";
    if (index === correctAnswer) return "green";
    if (index === userSelectedAnswer) return "red";
    return "transparent";
  };

  return (
    <Card variant="outlined" sx={{ textAlign: "left", p: 5, mb: 4, backgroundColor: '#1e1e1e', color: '#fff' }}>
      <Typography variant="h5" gutterBottom>
        {info.question}
      </Typography>
      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
      <List disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              sx={{
                backgroundColor: getBackgroundColor(index),
                "&:hover": {
                  backgroundColor: info.userSelectedAnswer == null ? "#444" : undefined,
                },
                color: "#fff",
                mb: 1,
              }}
              onClick={createHandleClick(index)}
            >
              <ListItemText primary={answer} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
export const Game = () => {
  const questions = useQuestionStore((state) => state.questions);
  const currentQuestion = useQuestionStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionStore(
    (state) => state.goPreviousQuestion
  );

  const questionInfo = questions[currentQuestion];
  return (
    <>
      <Stack direction="row" gap={2} alignItems="center" justifyContent="center" sx={{ mt: 4, mb: 4 }}>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0} sx={{ color: '#fff' }}>
          <ArrowBackIosNew />
        </IconButton>
        <Typography variant="h6" sx={{ color: '#fff' }}>
          {currentQuestion + 1} / {questions.length}
        </Typography>
        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1} sx={{ color: '#fff' }}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
};