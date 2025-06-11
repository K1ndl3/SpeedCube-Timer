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

  ** ROADBLOCK **
  - The current issue I am having is to create a certain intended behavior of the timer
  - when the user hold down space bar to start the timer, the timer color will be red to indicate it is ready to start
  - once the space bar is let go, the timer will then start (green)
  - once the timer has start and when the user press spacebar again, the timer will stop. (red)
  
 ** IDEAS FOR SOLUTION **
 -  I will use a state variable to keep track of the timer
    1) ready - when spacebar is down aka timer is primed to start(red)
    2) running - timer is running and is collecting time (green)
    3) stopped - the time is shown and value is ready to be exported to databse (red)
    4) idle - default state (white)
