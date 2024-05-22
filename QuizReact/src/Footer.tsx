import { useQuestionStore } from "./store/questions";
import { Box, Button, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export const Footer = () => {
  const questions = useQuestionStore(state => state.questions);
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  questions.forEach(question => {
    const { userSelectedAnswer, correctAnswer } = question;
    if (userSelectedAnswer == null) unanswered++;
    else if (userSelectedAnswer === correctAnswer) correct++;
    else incorrect++;
  });

  const reset = useQuestionStore(state => state.reset)

  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        p: 2,
        mt: 4,
        backgroundColor: '#222',
        color: '#fff',
        borderRadius: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CheckCircleIcon sx={{ color: 'green', mr: 1 }} />
        <Typography variant="body1">{`Correct: ${correct}`}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CancelIcon sx={{ color: 'red', mr: 1 }} />
        <Typography variant="body1">{`Incorrect: ${incorrect}`}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <HelpOutlineIcon sx={{ color: 'orange', mr: 1 }} />
        <Typography variant="body1">{`Unanswered: ${unanswered}`}</Typography>
      </Box>
      <Button color="warning" onClick={() => reset()}>
        ResetGame
      </Button>
    </Box>
  );
};
