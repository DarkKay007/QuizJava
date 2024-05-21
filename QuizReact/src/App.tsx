import React, { useState } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import { JavaScriptLogo } from './assets/JavaScriptLogo';
import { Start } from './Start';
import { useQuestionStore } from './store/questions';
import QuizCard from './Game';
import "./App.css"
const App: React.FC = () => {
  const questions = useQuestionStore(state => state.questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleReload = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  return (
    <main>
      <Container maxWidth="sm">
        <Stack direction="row" gap={3} alignItems="center" justifyContent='center'>
          <JavaScriptLogo />
          <Typography variant="h2" component='h1'>
            JavaScript Quiz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && (
          <QuizCard 
            info={questions[currentQuestionIndex]} 
            onReload={handleReload} 
          />
        )}
      </Container>
    </main>
  );
}

export default App;
