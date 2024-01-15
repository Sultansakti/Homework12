import React, { useState } from 'react';
import { ChakraProvider, Box, Button, Center } from '@chakra-ui/react';

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextValue, setNextValue] = useState('X');

  function selectSquare(square) {
    if (squares[square] || calculateWinner(squares)) {
      return;
    }
    const newSquares = [...squares];
    newSquares[square] = nextValue;
    setSquares(newSquares);
    setNextValue(calculateNextValue(newSquares));
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setNextValue('X');
  }

  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  return (
    <Box>
      <Center fontSize="2xl" fontWeight="bold" mb={4}>
        {status}
      </Center>
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
        {Array.from({ length: 9 }).map((_, i) => (
          <Button
            key={i}
            className="square"
            onClick={() => selectSquare(i)}
            fontSize="2xl"
            fontWeight="bold"
            h="12"
          >
            {squares[i]}
          </Button>
        ))}
      </Box>
      <Center mt={4}>
        <Button onClick={restart} colorScheme="teal">
          Restart
        </Button>
      </Center>
    </Box>
  );
}

function Game() {
  return (
    <Center>
      <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <Board />
      </Box>
    </Center>
  );
}


function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`;
}


function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <ChakraProvider>
      <Game />
    </ChakraProvider>
  );
}

export default App;