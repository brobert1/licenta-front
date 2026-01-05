# Play against computer

## User interface

- chess board and chess moves
- select bot with different skill level
- game over modal
- game history list

## Components

- The main page toggles between `GameSetup` and `GamePlay` and uses `BotContext` and `ChessContext`
- `GameSetup` displays the initial setup data and has a button which can start the chess game
- `GamePlay` displays the `GamePlay` chess board, moves list, players, game actions (draw, resign) and game over modal
- `GameBoard` displays the `ChessBoard` chess board, update bot strenght logic and handle game over logic
- `ChessBoard` displays the `NextChessground` board, handle user move and opponent move logic and set move history into context
- `GameSheet` displays chess moves from context as a comprehensive moves list with move numbers and formatting

## Contexts

- `BotContext` has data about bot settings (skill level, elo, name, custom message)
- `ChessContext` has data about moves history, result and other chess metadata

## Difficulty

Bot difficulty is determined from:

- **Skill Level (0-20)**: Base intelligence level converted from ELO rating (higher = stronger)
- **Max Error (0-5000)**: Maximum evaluation error allowed (lower = stronger, null = full strength)
- **Probability (1-1000)**: Likelihood of making optimal moves (higher = stronger, null = always optimal)
