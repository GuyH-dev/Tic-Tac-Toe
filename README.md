# Tic-Tac-Toe Game

## Description

A real-time Tic-Tac-Toe game built with NestJS. Two players can play against each other, making moves from different
clients and seeing the game state updated in real-time.

## Project Structure

The game is structured as follows:

### Entities

- **Player**: Represents a player in the game with an `id` and a `symbol` ('X' or 'O').
- **Move**: Represents a move made by a player with `playerId` and `position`.
- **GameState**: Represents the current state of the game, including the `board`, `currentPlayer`, `winner`, and a list
  of `moves`.

### Game Logic

- **GameService**: Handles the main game logic, including player registration, making moves, switching players, checking
  for win conditions, and getting the game state.

### Controllers

- **GameController**: Exposes endpoints for registering players, making moves, getting the current game state, and
  getting the current players.

## Endpoints

### Register a Player

**Endpoint**: `POST /game/register`

**Description**: Registers a new player in the game. Only two players can be registered, and each must have a unique
symbol ('X' or 'O').

**Request Body**:

```json
{
  "symbol": "X"
}
```

**Response**:

```json
{
  "id": "1",
  "symbol": "X"
}
```

Error:

```json
{
  "message": "Only two players can play the game at a time."
}
```

or

```json
{
  "message": "Player with symbol X is already registered."
}
```

### Make a Move

**Endpoint**: `POST /game/move`

**Description**: Makes a move in the game for a player. The game state is updated, and a win condition is checked after
each move.

**Request Body**:

```json
{
  "playerId": "1",
  "position": 0
}
```

**Response**:

```json
{
  "gameState": {
    "board": [
      null,
      null,
      null,
      null,
      "X",
      null,
      null,
      null,
      null
    ],
    "currentPlayer": {
      "id": "2",
      "symbol": "O"
    },
    "winner": null,
    "moves": [
      {
        "playerId": "1",
        "position": 4
      }
    ]
  },
  "message": "Move accepted"
}
```

Error:

```json
{
  "gameState": {
    ...
  },
  "message": "Invalid move"
}
```

or

```json
{
  "gameState": {
    ...
  },
  "message": "Not your turn"
}
```

Win condition:

```json
{
  "gameState": {
    "board": ["X", "X", "X", null, null, null, null, null, null],
    "currentPlayer": {
      "id": "1",
      "symbol": "X"
    },
    "winner": {
      "id": "1",
      "symbol": "X"
    },
    "moves": [
      {
        "playerId": "1",
        "position": 0
      },
      {
        "playerId": "1",
        "position": 1
      },
      {
        "playerId": "1",
        "position": 2
      }
    ]
  },
  "message": "Winner player X"
}

```

### Get Game State

**Endpoint**: `GET /game/state`

**Description**: Retrieves the current state of the game.

**Response**:

```json
{
  "board": [null, null, null, null, "X", null, null, null, null],
  "currentPlayer": {
    "id": "2",
    "symbol": "O"
  },
  "winner": null,
  "moves": [
    {
      "playerId": "1",
      "position": 4
    }
  ]
}

```

### Get Players
**Endpoint**: `GET /game/players`

**Description**: Retrieves the current players in the game.

**Response**:

```json
[
  {
    "id": "1",
    "symbol": "X"
  },
  {
    "id": "2",
    "symbol": "O"
  }
]
```
### Basic Flow

**1. Register Players**
* Players register by sending a POST /game/register request with their symbol ('X' or 'O'). 
* The server ensures that only two players can register and that each player has a unique symbol.
**2. Make Moves**
* Players make moves by sending a POST /game/move request with their player ID and the position they want to mark.
* The server updates the game state and checks for a win condition after each move. If a player wins, a message indicating the winner is returned.
**3. Game State**
* The current game state can be retrieved at any time by sending a GET /game/state request.
**4. Get Players**
* The current players can be retrieved by sending a GET /game/players request.

### Win Condition
The win condition is checked after each move by comparing the current board state against predefined winning patterns (rows, columns, diagonals).
If a player has three of their symbols in one of these patterns, they are declared the winner.

### Running the Project

**Prerequisites**:
- Node.js and npm installed
- NestJS CLI installed (npm i -g @nestjs/cli)

**Installation**:
1. Clone the repository

```sh
git clone https://github.com/GuyH-dev/Tic-Tac-Toe.git
cd tic-tac-toe
```
2. Install dependencies

```sh
npm install
```

3. Start the server

```sh
npm run start
```

4. Interact with the game using Postman:
Use the provided endpoints to register players, make moves, and retrieve the game state and players.