import * as React from "react";
import { ChakraProvider, Box, Button, Text, Flex } from "@chakra-ui/react";

function Square({ value, onClick }) {
  return (
    <Button variant="outline" size="lg" fontSize="4xl" colorScheme="teal" onClick={onClick}>
      {value}
    </Button>
  );
}

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = React.useState(true);

  function handleClick(i) {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, xIsNext);

  return (
    <Box textAlign="center">
      <Text fontSize="4xl" fontWeight="bold" mb={5}>
        Tic Tac Toe
      </Text>
      <Flex w="max-content" mx="auto" mt={10}>
        <Box w="120px">{renderSquare(0)}</Box>
        <Box w="120px">{renderSquare(1)}</Box>
        <Box w="120px">{renderSquare(2)}</Box>
      </Flex>
      <Flex w="max-content" mx="auto" mt={10}>
        <Box w="120px">{renderSquare(3)}</Box>
        <Box w="120px">{renderSquare(4)}</Box>
        <Box w="120px">{renderSquare(5)}</Box>
      </Flex>
      <Flex w="max-content" mx="auto" mt={10}>
        <Box w="120px">{renderSquare(6)}</Box>
        <Box w="120px">{renderSquare(7)}</Box>
        <Box w="120px">{renderSquare(8)}</Box>
      </Flex>
      <Text fontSize="3xl" fontWeight="bold" mt={10}>
        {status}
      </Text>
      <Button onClick={restart} size="md" height="48px" width="200px" border="2px" borderColor="green.500" mt={5}>
        Restart
      </Button>
    </Box>
  );
}

export function Game() {
  return (
    <ChakraProvider>
      <Box textAlign="center" backgroundColor="gray.100" minHeight="100vh">
        <Board />
      </Box>
    </ChakraProvider>
  );
}

function calculateStatus(winner, squares, xIsNext) {
  return winner ? `Winner: ${winner}` : squares.every(Boolean) ? `Scratch: Cat's game` : `Next Player: ${xIsNext ? "X" : "O"}`;
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
