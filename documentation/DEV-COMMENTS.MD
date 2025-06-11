## Developer TODOs and Planning

There are technically **4 main components** in this project:

### 1) Top/Header
- Displays the name of the timer (like a name card)
- Style this name card to look **professional**

### 2) Left Side-bar
- Has **2 subcomponents:**

  #### a) The 4 Main Stats
  - Best overall single
  - Current Ao3
  - Current Ao5
  - Current Ao12

  #### b) Detailed Stats
  - List of recent 20 solves
  - Shows Ao100
  - Ability to click on a solve to see details:
    - Time of solve
    - Scramble of the solve
    - Time/date of the solve
    - Any comments

### 3) Main Timer Display
- Shows the timer
- Shows the scramble
- Buttons underneath for:
  - DNF (Did Not Finish)
  - Delete current solve
  - Add notes for the current solve

### 4) 2D Display of Scrambled Cube
- Visual representation of the scrambled cube (2D projection)


## DEVELOPEMENT ROADBLOCKS AND SOLUTIONS
  ### FEATURES
  
  #### Timer Display and Managing State of Timer

## 🛑 Roadblock

I’m currently implementing the intended behavior of the timer related to spacebar interactions:

- When the user **holds** the spacebar, the timer turns **red** (primed state).
- When the user **releases** the spacebar, the timer starts and turns **green**.
- Pressing the spacebar again stops the timer and turns it **red** (stopped).
  
## 💡 Proposed Solution

Introduce a state variable (e.g., `timerState`) with the following possible values:

1. `idle` — default state, nothing is happening (white)
2. `ready` — spacebar is held, timer is primed to start (red)
3. `running` — timer is active and collecting time (green)
4. `stopped` — timer has stopped and is ready for data export (red)

