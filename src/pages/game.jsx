import { useState, useContext, useEffect } from 'react';
import { getSocket } from '../socket.js';
import { UserContext } from '../context/Auth.jsx';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import { Button } from '@mui/material';

const Game = () => {
  const [gameState, setGameState] = useState();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState();
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const socket = getSocket(token);

  useEffect(() => {
    if (!socket) return;

    socket.connect();

    socket.on('connect', () => {
      setGameState('connected');
    });

    socket.on('game_commence', () => {
      setGameState('game_commence');
    });

    socket.on('question', (data) => {
      setGameState('questions');
      setQuestion(data);
      setAnswer('');
      setAnswerSubmitted(false);
    });

    socket.on('game_finish', (data) => {
      setGameState('game_finish');
      setWinnerMessage(data.message);
    });

    return () => {
      socket && socket.disconnect();
    };
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token]);

  const handleOnAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = () => {
    socket.emit('submit_answer', { question_id: question.id, answer });
    setAnswerSubmitted(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h1">Trivia Today</Typography>
      {gameState === 'connected' && (
        <Typography>Waiting for a player</Typography>
      )}
      {gameState === 'game_commence' && (
        <Typography>2nd Player found. Game is about to start.</Typography>
      )}
      {gameState === 'questions' && (
        <>
          <Typography>Question: {question.question}</Typography>
          <Input
            type="text"
            onChange={handleOnAnswerChange}
            value={answer}
            placeholder="answer"
            disabled={answerSubmitted}
          />
          <Button onClick={handleSubmit} disabled={!answer || answerSubmitted}>
            Submit
          </Button>
        </>
      )}
      {gameState === 'game_finish' && (
        <>
          <Typography>{winnerMessage}</Typography>
        </>
      )}
    </Container>
  );
};

export default Game;
