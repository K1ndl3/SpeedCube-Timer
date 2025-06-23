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

# Format of DEVELOPEMENT ROADBLOCKS AND SOLUTIONS
  # #) Feature
   ## Intended Behavior/Implementation
   ## 🛑 Roadblock
   ## 💡 Proposed Solution
   ## Solution and Reflection
   #### ROADBLOCK RESOLUTION (RESOLVED/NOT RESOVLED)

# DEVELOPEMENT ROADBLOCKS AND SOLUTIONS:
  
# 1) **Timer Display and Managing State of Timer**

## **Implementing the Intended Behavior of the Timer Related to Spacebar Interactions:**
- When the user **holds** the spacebar, the timer turns **red** (**primed state**).
- When the user **releases** the spacebar, the timer starts and turns **green**.
- Pressing the spacebar again **stops** the timer and turns it **red** (**stopped**).

## 🛑 **Roadblock**
- Managing multiple states became **confusing**.  
- I was honestly **overwhelmed**.

## 💡 **Proposed Solution**
Introduce a state variable (e.g., `timerState`) with the following possible values:
1. `idle` — default state, nothing is happening (**white**)
2. `ready` — spacebar is held, timer is primed to start (**red**)
3. `running` — timer is active and collecting time (**green**)
4. `stopped` — timer has stopped and is ready for data export (**red**)

## **Solution and Reflection**
I implemented the solution using **two `useEffect` hooks** — one controls the timer color/state, the other manages elapsed time.  
I used **inline styling** to control the timer color based on its state.  
Maybe there's a better way to separate style from JSX, but I don’t know how yet.

#### **ROADBLOCK RESOLUTION (RESOLVED)** 🟣✔️

---

# 2) **Storing and Managing Solve History**

## **Goal**
Implement a reliable system to **store and access past solves** consistently across components.

## 🛑 **Roadblocks**

### 1)
- When the user ends a solve, that time must be added to a **shared data structure**.
- This solve history needs to be **globally accessible** (for stats, inspection, editing).
- It must support:
  - Live updates to averages (Ao3, Ao5, Ao12, Ao100)
  - Metadata (scramble, timestamp, comments, flags like DNF)
- Long-term goal: make this scalable for **user accounts, cloud sync, and database integration**.

### 2)
- I wrapped the **`useContext`** hook around `App.jsx` and passed in the `solveArray` and its setter to my timer component.
- After each solve, the elapsed time is added to `solveArray`.
- The `solveArray` is used by the **database** component to **display history** and **compute averages**.

### 3)
- After solving, I reset `elapsedTime` to 0.
- But `useContext` was one step behind, so the added time became **0**.
- The new item only appeared after starting the next solve.
- **Order of operations** in render logic caused the bug.

## 💡 **Proposed Solution**

### 1)
To ensure accessibility and scalability, I’ll use **React Context** to manage global solve history.

### 2)
- Define a **context provider** for `solveArray` and updater functions.
- Any component (sidebar stats, timer, history) can consume the context.
- This avoids **prop drilling** and centralizes data flow.

**Alternative:** use lifted `useState` in `App.jsx` if Context gets too messy.

### 3)
- Change the logic to update `solveArray`:
  - Only update when the timer is `stopped` **and** the **spacebar is released**.

## **Solution and Reflection**
I started with a basic `useState` and successfully tracked solves.  
Next, I’ll refactor into a `SolvesContext` for cleaner global state.

This helps me:
- **Understand `useContext` deeply**
- Lay the foundation for **auth, cloud sync**, and **filtering**
- Avoid blindly following tutorials — learning through building feels better

Biggest lesson:  
I rewired my thinking by changing *when* I updated `solveArray`.  
Now the list renders immediately, and the logic feels correct.

#### **ROADBLOCK RESOLUTION (RESOLVED)** 🟣✔️

---

# 3) **Generating Scramble**

## **Goal**
Display a **randomly generated, WCA-compliant** 3x3 scramble below the timer.

## 🛑 **Roadblock**
- **Couldn’t get `cubejs` to work**
  - Tried `cubejs().scramble()` — not recognized
  - Tried `new cubejs()` and `new Cube()` — still broken
  - Followed ChatGPT advice, but went in **circles**

## 💡 **Proposed Solution**
- **Switch to another library**

## **Solution and Reflection**
- Found and used **Scrambo**
- In hindsight, I should’ve **pivoted sooner**
- Spent too long chasing **non-working code**
- Learned to recognize dead ends and **backtrack faster**

#### **ROADBLOCK RESOLUTION (RESOLVED)** 🟣✔️

---

# 4) **History of Solves Component (On Hold)**

## **Goal**
- Create a component that shows the **last ~20 solves**
- Include **4 main stats**: time, scramble, average, and metadata

## 🛑 **Roadblocks**
1) Didn’t know how to get **last 3, 5, 12** solves for Ao3/Ao5/Ao12  
2) Didn’t know how to **exclude best and worst solves** for Ao5/Ao12

## 💡 **Proposed Solution**
1) Learned to use **`.slice()` and `.reduce()`** to get and average the last `n` solves  
2) Used **`Math.min()` and `Math.max()`** to remove best/worst and recalculate average

## **Solution and Reflection**
- The logic now works — will finish UI later

#### **ROADBLOCK RESOLUTION (RESOLVED)** 🟣✔️

---

# 5) **Display Cube State After Scramble**

## **Intended Behavior / Implementation**
**Display the cube in 3D** after the scramble has been generated to show what the cube should look like after scrambling.

## 🛑 **Roadblock**
`cubingjs` has **no way to simulate cube state**, but **Scrambo does** — it includes a **3D model** of the cube.

## 💡 **Proposed Solution**
Use **Scrambo** to display the cube, and feed in the **scramble generated by `cubingjs`** to update its state.

## **Solution and Reflection**
The implementation was done with help from **ChatGPT**, but I will try to **redo it myself** to fully understand how it works.

#### **ROADBLOCK RESOLUTION (RESOLVED)** 🟣✔️


# 6) The User Should Be Able to Look at the Meta Data of Their Solves In The Stats Bar
   ## Intended Behavior/Implementation
   ## 🛑 Roadblock
   ## 💡 Proposed Solution
   ## Solution and Reflection
   #### ROADBLOCK RESOLUTION (RESOLVED/NOT RESOVLED)