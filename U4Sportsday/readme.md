# Sports Event Simulation

## Functions Overview

1. **OpeningCeremony()**
   - Initializes the sports event.
   - Displays a welcome message.
   - Sets up variables or data structures to track scores.

2. **Race100M()**
   - Simulates a 100m race.
   - Randomly determines the winner.
   - Updates the winner’s score.

3. **LongJump()**
   - Simulates a long jump event.
   - Randomly selects a participant (color/team).
   - Updates scores based on the event outcome.

4. **HighJump()**
   - Simulates a high jump event.
   - Prompts the user to input the color of the highest jumper.
   - Updates the scores accordingly.

5. **AwardCeremony()**
   - Displays final scores and declares winners based on points.
   
## Task Execution

- **OpeningCeremony()**: Initialize event and score tracking.
- **Race100M()**: Simulate race, determine winner using random values, and update scores.
- **LongJump()**: Simulate long jump, randomly select winner, and update scores.
- **HighJump()**: Prompt user for highest jump, update scores.
- **AwardCeremony()**: Display final scores and announce winner.

## Callback Functions

- Pass callback functions to manage the sequence of events.
- Ensure proper chaining of events (OpeningCeremony → Race100M → LongJump → HighJump → AwardCeremony).

## Event Simulation

- **Race100M**: Simulate with random times and update scores after a 3-second delay.
- **LongJump**: Randomly select a team after a 2-second delay and update scores.
- **HighJump**: Prompt user for input and handle score updates.
- **AwardCeremony**: Log final scores, determine winner, and announce results.

## Console Logging

- Log previous and updated scores after each event.
- Display informative messages throughout the event flow.

## Implementation Notes

- Use callback functions for sequential execution.
- Handle delays using JavaScript timeouts.
- Ensure error handling and correct input processing.
