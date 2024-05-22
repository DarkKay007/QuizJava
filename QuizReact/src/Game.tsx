import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useQuestionStore } from "./store/questions";
import { type Question as QuestionsType } from "./types";

const Question = ({ info }: { info: QuestionsType }) => {
  const selectAnswer = useQuestionStore((state) => state.selectAnswer);
  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };
  const getBackgroundColor = (index:number) => {
    const { userSelectedAnswer, correctAnswer} = info

    if (userSelectedAnswer == null) return 'transparent'

    if (index != correctAnswer && index != userSelectedAnswer) return 'transparent'

    if (index == correctAnswer) return 'green'

    if (index == userSelectedAnswer) return 'red'

    
    return 'yellow'
  }
  return (
    <Card variant="outlined" sx={{ textAlign: "left", p: 5 }}>
      <Typography variant="h5">{info.question}</Typography>
      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: "#333" }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem
            key={index}
            sx={{ bgcolor: "#333", color: "#fff" }}
            disablePadding
          >
            <ListItemButton disabled={info.userSelectedAnswer != null}  sx={{ backgroundColor: getBackgroundColor(index)}}
            onClick={createHandleClick(index)}>
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


  const questionInfo = questions[currentQuestion];
  return (<>
  <Question info={questionInfo}></Question>
  </>);
};
