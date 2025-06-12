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

# Format of DEVELOPEMENT ROADBLOCKS AND SOLUTIONS
  # #) Feature
   ## Intended Behavior/Implementation
   ## 🛑 Roadblock
   ## 💡 Proposed Solution
   ## Solution and Reflection
   #### ROADBLOCK RESOLUTION (RESOLVED/NOT RESOVLED)

# DEVELOPEMENT ROADBLOCKS AND SOLUTIONS:
  
# 1) Timer Display and Managing State of Timer

## Implementing the intended behavior of the timer related to spacebar interactions:

- When the user **holds** the spacebar, the timer turns **red** (primed state).
- When the user **releases** the spacebar, the timer starts and turns **green**.
- Pressing the spacebar again stops the timer and turns it **red** (stopped).

## 🛑 Roadblock

- Having to manage multiple states becomes **confusing**\
- I was honestly overwhelmed
  
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
#### ROADBLOCK RESOLUTION (RESOLVED) 🟣✔️

# 2) Storing and Managing Solve History

Implementing a reliable system to **store and access past solves** consistently across components:

## 🛑 Roadblock
1)
- When the user ends a solve, that time must be added to a shared data structure.
- This solve history needs to be **globally accessible** (e.g., for stats, inspection, editing).
- It must support:
  - Live updates to averages (Ao3, Ao5, Ao12, Ao100)
  - Metadata (scramble, timestamp, comments, flags like DNF)
- Long-term goal: make this scalable for **user accounts, cloud sync, and database integration**.

2)
- I will wrap the **useContext** hook around my app.jsx and pass in the **state** of solveArray and the setter setSolveArray into my timer component
- After each solve, the final elasped time will be added into the solveArray state
- The solveArray state will be used by the **database** component that will **display history of solves** and **compute the averages**

3)
- Now that I have gotten useContext to work, the issue now becomes **rendering**
- When the timer stops, setElapseTime make elapseTime equal to 0 to reset the timer
- useContext is one step behind, causing the added time to be 0
- we can assign the useContext first and then reset elapsedTime but the list will only render new element after we have started the timer again

## 💡 Proposed Solution

1)
To ensure accessibility and scalability, I plan to use **React Context** to manage global solve history:

2)
- Define a context provider that holds the `solveArray` and update functions.
- Components that need solve data (sidebar stats, timer display, history list) will consume the context.
- This enables centralized state management without excessive prop drilling.

**Alternative**: use lifted `useState` in `App.jsx` if Context proves too complex. This fallback would allow progress while still supporting live stats and updates.

3)
- Changing the condition for when the solveArray gets updated
  - when the timer is stopped and the spacebar key is up

## Solution and Reflection

I began with a basic `useState` implementation and successfully tracked solves across components.  
Next, I will refactor this into a custom `SolvesContext` provider to future-proof the app.  
This is a chance to learn more about global state and better structure growing applications.  
Additionally, this lays the foundation for integrating authentication, persistent storage, and advanced filtering later.

- The tutorials are getting pretty annoying
- I think the best course of action right now is to learn while I am building the feature
- think we need to have a pause on this feature for now and do the randomly generated scramble first
- After generating the scramble and learning how to use useContext, I encountered the rendering issue
  - After trying to use states to capture elapsed time right before reset and nothing worked
  - I changed the logic of when I should change the solveArray
  - Made a change everytime there was a keyUp event and the timer state is 'stopped'

The main roadblock in this feature was mainly the render order of operation and how to use useContext. I learned how to approach the problem with a different perspective and that allowed me to understand more about useContext and solve the order of operation issue I had. 
#### ROADBLOCK RESOLUTION (RESOLVED) 🟣✔️

# 3) Generating Scramble

  - Display a randomly generated, **WCA-compliant** 3x3 scramble 
## Intended Behavior/Implementation
  - Scramble is displayed under the time
## 🛑 Roadblock
  - Was not able to make **cubejs** work
    - Tried using method recommended by chatgt
    - Used `cubejs().scramble()` but `scramble()` was not recognized
    - Tried `new cubejs()` and `new Cube()` but did not work
## 💡 Proposed Solution
  - Look for a new alternative
## Solution and Reflection
  - Looked at **scrambo**
  - In hindsight, I should have looked for a better alternative sooner
  - Wasted a lot of time trying to look at error codes and going in circle
    - trying the unsuccessful codes over and over again
  - Know when to backtrack and pick a different path
#### ROADBLOCK RESOLUTION (RESOLVED) 🟣✔️

# 4) History of Solves Component
   ## Intended Behavior/Implementation
   - create a component that will display a certain amount of pass solves(maybe 20?)
   - display the 4 main stats
   - maybe 
   ## 🛑 Roadblock
   ## 💡 Proposed Solution
   ## Solution and Reflection
   #### ROADBLOCK RESOLUTION (RESOLVED/NOT RESOVLED)