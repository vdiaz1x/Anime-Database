# Anime-Database
Database to track user's anime favorites and search anime info

# Project Overview

## Project Schedule

|  Day | Deliverable | Complete? |
|---|---|--|
|Day 1: Wed| Project Idea, Wireframes, and Priority Matrix | // |
|Day 2: Thurs| Project Approval and Pseudocode/Rough Template | // |
|Day 3: Fri| MVC and Database| // |
|Day 4: Sat| Fetch/API | // |
|Day 5: Sun| Authentification| // |
|Day 6: Mon| Bugs | // |
|Day 7: Tues| Project Presentations | // |


## Project Description

This project is a database for searching anime and for logging your list of watched shows via a user account.

## Wireframes

### Original Brainstorm

[Part 1]()

[Part 2]()

### Refined Wireframes


## Presentation

[Link to PDF]()

## Priority Matrix

### High Priority
- MVC Template
- Database Queries
- Controller/View Functions
- Server

### Medium Priority
- Views (Basic EJS Styling)
- API Call
- Debugging

## Low Priority
- Views (Advanced EJS Styling)
- Add PostMVP Features

## User Stories

### User Account

- As a user of this site, I expect to be able to sign up for an account
- I expect to be able to save shows to my list on my account
- I expect to be able to add comments to my list and to edit/delete list items

### Search

- As a user, I expect to be able to use a search function to find shows
- I expect the search to be able to find shows based on genre/other criteria (PostMVP)

## Game Components

### Landing Page
A simple intro page

### Search Page
A page to search a show via a fetch call

### User Page
A page for the user information. It displays the list of shows the user has saved, as well as edit/delete options

### Show Page
A page to display relevant information of the show queried

## MVP

<!-- ### Deliverables

- Landing Page with Message (Get Name)
- Select Player Avatar and Allies
- Battle Screen with Boss and Allies as well as HP/MP meters
- Battle Damage Calculation/Display
- Basic Attack Animation/Notification
- Win Con Based on Boss HP <= 0
- Lose Con Based on Allies' HP <= 0
- Return to Ally Select Screen

## POST MVP

### Planned Expansion

- Adding Attacks with Buff/Debuff
- Attack Damage Randomizer
- Detailed Display of Status
- Tooltips
- Different Enemies
- Expand Ally Select
- Mobile View
- Dialogue in Battle
- Change Boss Behavior Based on HP

## Functional Components

| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Game Logic | H | 20hrs| 00hrs | 24hrs |
| (Progress) | H | 3hrs| 00hrs | 4hrs |
| (Turn Order) | H | 3hrs| 00hrs | 10hrs |
| (Classes) | H | 3hrs| 00hrs | 2hrs |
| (On-screen) | H | 4hrs| 00hrs | 4hrs |
| (Damage) | H | 4hrs| 00hrs | 2hrs |
| (Misc) | H | 3hrs| 00hrs | 4hrs |
| Win Condition | H | 4hrs| 00hrs | 4hrs |
| Basic Game Styling | M | 6hrs| 00hrs | 6hrs |
| Landing Page | M | 00hrs| 2hrs | 2hrs |
| Restart | M | 00hrs| 00hrs | 4hrs |
| Total |  | 34hrs| 00hrs | 40hrs |
| Advanced Game Styling | L | 5hrs| 00hrs | 00hrs |
| PostMVP | L | 10hrs| 00hrs | 00hrs |
| Super Total |  | 50hrs| 00hrs | 00hrs |

My time estimates were way off. Also, I underestimated the scope and difficulty of this project.

## Helper Functions

| Function | Description |
| --- | :---: |
| Progress | Tracks progress of a quantity |

## Additional Libraries
 JQuery - for DOM manipulation and other useful functions

## Code Snippet

```javascript
// function to loop attacks (i is entered as zero)
// immediately invoked function expression
(function atkLoop(i) {
  // defining variable to not use the argument itself
  let n = i;

  const allyMove = setTimeout(() => {
    // calling move function for one move
    move(n);

    // incrementing; this number is used to call the moves for the other allies
    n += 1;

    // win condition
    winCon();

    // if win con is true, make counter 4 to prematurely end the loop
    if (winCon()) {
      n = 4;
    }

    // if the counter is less than 4, the loop continues with the next move
    if (n < 4) {
      atkLoop(n);
    }
    // the initial value for i is 0, the set timeout is every 2 seconds to space out the attacks
  }, 2000);
}(0));
```

I found the basic structure of this immediately invoking function expression that executes a setTimeout one after the other, rather than simultaneously. I had to heavily modify it for my use, but it still served as a solid base to make the game loop for the ally attacks. Basically, it has a parameter i, which you immediately pass an argument of zero at the end. Using a counter equal to the initial input, you use it inside a setTimeout where the move function is called with the argument of the counter. inside the setTimeout, increment the counter. The win con function is checked; if the win con is true, then the counter is set to a condition to end the loop. Otherwise, if the counter is less than 4, the function is called again. The way the function is structured, the next function call won't activate until the first function calll is completed, giving the illusion of stacking attacks in order.

## jQuery Discoveries

.each - loops through DOM elements grabbed by JQuery
.off - removes event handlers made through .on

## Change Log

I had to scale back the project a bit. I could not really implement the postMVP, although the main project is more or less done.

## Issues and Resolutions

### Major Issue - Game Loop

Unlike the high-low game, I could not pause the game via user input- the attacks had to be executed one after the other without making it simultaneous. Unlike the tic tac toe, the loop was not a simple player 1/player 2 situation. I found a way to do the loop with a recursive self invoking function.

### Major Issue - Creating Characters

Instead of creating objects for all of my characters, I made classes. I realized that the attacks also warranted their own class as well. However, whenever I had to change my code to make it more extendable, I had to edit the class definition. Using classes did make it easier to do any editing on my characters, though.

#### Error/Resolution

**ERROR**: eslint regenerator-runtime, prefer iteration to loops
**RESOLUTION**: Instead of using for...of loops for arrays, I used forEach

**ERROR**: eslint object deconstructing
**RESOLUTION**: I had to switch the way I got the class name for my objects (minor semantic detail)

**ERROR**: eslint function used before it was declared
**RESOLUTION**: I moved function declarations higher up

## References

Final Fantasy 1 for basic layout
Jason for several functions
https://scottiestech.info/2014/07/01/javascript-fun-looping-with-a-delay/ for IIFE
https://www.w3schools.com/howto/howto_js_progressbar.asp for basic progress meter -->