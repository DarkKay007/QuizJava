import React, { useState } from 'react';
import { Card, Typography, Button } from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface QuizCardProps {
  info: {
    question: string;
    code: string;
    answers: string[];
    correctAnswer: number;
  };
  onReload: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ info, onReload }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showReloadButton, setShowReloadButton] = useState(false);

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    if (index === info.correctAnswer) {
      // Si la respuesta es correcta, mostrar el botón de recarga
      setShowReloadButton(true);
    } else {
      // Si la respuesta es incorrecta, cambiar el estilo del botón por un momento
      setTimeout(() => setSelectedAnswer(null), 1000);
    }
  };

  const handleReloadClick = () => {
    setShowReloadButton(false);
    setSelectedAnswer(null);
    onReload();
  };

  return (
    <Card variant="outlined" sx={{ bgcolor: '#222', p: 2, textAlign: 'left' }}>
      <Typography variant="h5">
        {info.question}
      </Typography>
      <SyntaxHighlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
      <Typography variant="h5">
        {info.answers.map((answer, index) => (
          <Button
            key={index}
            onClick={() => handleAnswerClick(index)}
            disabled={selectedAnswer !== null}
            sx={{
              bgcolor: selectedAnswer === index ? (index === info.correctAnswer ? 'green' : 'red') : undefined,
              '&:hover': {
                bgcolor: selectedAnswer === null ? '#333' : undefined,
              }
            }}
          >
            {answer}
          </Button>
        ))}
      </Typography>
      {showReloadButton && (
        <Button onClick={handleReloadClick}>
          Reload Game
        </Button>
      )}
    </Card>
  );
}

export default QuizCard;
