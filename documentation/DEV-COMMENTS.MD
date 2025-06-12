## Developer TODOs and Planning (I used chatgpt to format my messages lol)

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


## DEVELOPEMENT ROADBLOCKS AND SOLUTIONS:
  
## Timer Display and Managing State of Timer

## 🛑 Roadblock

## Implementing the intended behavior of the timer related to spacebar interactions:

- When the user **holds** the spacebar, the timer turns **red** (primed state).
- When the user **releases** the spacebar, the timer starts and turns **green**.
- Pressing the spacebar again stops the timer and turns it **red** (stopped).
  
## 💡 Proposed Solution

Introduce a state variable (e.g., `timerState`) with the following possible values:

1. `idle` — default state, nothing is happening (white)
2. `ready` — spacebar is held, timer is primed to start (red)
3. `running` — timer is active and collecting time (green)
4. `stopped` — timer has stopped and is ready for data export (red)

## Solution and Reflection

I implemented the solution using 2 useEffect hooks that control the timer color/state and elapsed time functionality.
Also, by having inline style, I can directly control the color of the timer display based on its state. Maybe there is a way
control the color while separating the style and jsx but I do not know how to so.

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


#### ROADBLOCK RESOLVED ✔️

## Storing and Managing Solve History

### 🛑 Roadblock

Implementing a reliable system to **store and access past solves** consistently across components:

- When the user ends a solve, that time must be added to a shared data structure.
- This solve history needs to be **globally accessible** (e.g., for stats, inspection, editing).
- It must support:
  - Live updates to averages (Ao3, Ao5, Ao12, Ao100)
  - Metadata (scramble, timestamp, comments, flags like DNF)
- Long-term goal: make this scalable for **user accounts, cloud sync, and database integration**.

### 💡 Proposed Solution

To ensure accessibility and scalability, I plan to use **React Context** to manage global solve history:

- Define a context provider that holds the `solves` array and update functions.
- Components that need solve data (sidebar stats, timer display, history list) will consume the context.
- This enables centralized state management without excessive prop drilling.

**Alternative**: use lifted `useState` in `App.jsx` if Context proves too complex. This fallback would allow progress while still supporting live stats and updates.

### ✅ Solution and Reflection

I began with a basic `useState` implementation and successfully tracked solves across components.  
Next, I will refactor this into a custom `SolvesContext` provider to future-proof the app.  
This is a chance to learn more about global state and better structure growing applications.  
Additionally, this lays the foundation for integrating authentication, persistent storage, and advanced filtering later.


