# Anime-Database
Database to track user's anime favorites and search anime info

# Project Overview

## Project Schedule

|  Day | Deliverable | Complete? |
|---|---|--|
|Day 1: Wed| Project Idea, Wireframes, and Priority Matrix | Yes |
|Day 2: Thurs| Project Approval and Pseudocode/Rough Template | Yes |
|Day 3: Fri| MVC and Database| Yes |
|Day 4: Sat| Fetch/API | Yes |
|Day 5: Sun| Authentification| Yes |
|Day 6: Mon| Bugs | Yes |
|Day 7: Tues| Project Presentations | Yes |


## Project Description

This project is a database for searching anime and for logging your list of favorite shows and adding comments to them via a user account.

## Wireframes

### Original Brainstorm

[Part 1](https://photos.app.goo.gl/8dk5qHYowipdowks1)

[Part 2](https://photos.app.goo.gl/KwO9JmEJU92bNTtI2)

### Refined Wireframes

[Part 1](https://photos.app.goo.gl/4z3fnsbVWEWkr0h72)

[Part 2](https://photos.app.goo.gl/NY2HolQFbUox7N0n1)

[Part 3](https://photos.app.goo.gl/VcpkwWUSrm0oej393)

[Part 4](https://photos.app.goo.gl/EBCC60ksZP90ukqK2)

[Part 5](https://photos.app.goo.gl/sd4zuBaoOlyo3IOf1)

[Part 6](https://photos.app.goo.gl/1wSYAI1Xz5q7M3Ra2)

## Video Presentation

[Link to Video](https://www.youtube.com/watch?v=dkGUS4iJIvE&feature=youtu.be)
Test video-

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

This is a database app, so as expected, its goal is to be able to function as a database. I tried to model the functionality on sites like MAL (My Anime List) and AniList, where you have the ability to search through anime based on criteria and also make a list of shows watched with details. This app allows you to save the shows you like and the ability to add comments to each show, as well as edit and delete the comments. This is all accomplished by having a user account.

### User Account

- As a user of this site, I expect to be able to sign up for an account
- I expect to be able to save shows to my list on my account
- I expect to be able to add comments to my list and to edit/delete list items

### Search

- As a user, I expect to be able to use a search function to find shows
- I expect the search to be able to find shows based on genre/other criteria (PostMVP)

## App Components

### Landing Page
A simple intro page

### Search Page
A page to search a show via a fetch call

### User Page
A page for the user information. It displays the list of shows the user has saved, as well as edit/delete options

### Show Page
A page to display relevant information of the show queried

## MVP

### Deliverables

- Create User and Authenticate User
- User Sessions
- Search Using API Call
- Add to Favorites
- Create, Update, and Delete Comments

## POST MVP

### Planned Expansion

- Adding Rating
- Query Based on More Parameters
- Pagination

## Functional Components

I did not keep an accurate list of how long each step took. However, roughly speaking, I spent 6 hrs planing the basics, about 8 hrs getting the server and MVC template going, 6 hrs on fetching and API, 6 hrs on authentification, 10 hrs on the MVC copletion, and about 8 on EJS.

## Additional Libraries
- starter server modules (express, morgan, body-parser, etc.)
- bcrypt: for password hashing and comparison
- node-fetch: for using fetch in node
- Kitsu API for anime queries (https://kitsu.docs.apiary.io/#introduction/json-api)
- JQuery: for simple DOM manipulation

## Code Snippet

```javascript
// saves a user in the db using the make user model
// hashes password before inserting into model
controller.makeUser = async (req, res, next) => {
  // this hashes the password from the req.body and saves it back in the same place
  req.body.password_hash = await bcrypt.hash(req.body.password_hash, 11);

  // model used to save new user using the new user info stored in req.body
  models.saveUser(req.body)
    .then((data) => {
      // saves data to locals for access in views
      res.locals.data = data;
      req.session.user = data;
      // passes data on to views
      next();
    })
    .catch((err) => {
      res.json(err);
    });
```
This is the code to hash the password as you create a user. The example in class had it done as part of the db populating, and it had a lot of code not applicable to me. I played around with the bcrypt and figured out how to use the async/await notation to get it working. I felt clever after figuring this one out.

```javascript
// makes query of anime by using fetch and anime api to get data
controller.search = (req, res, next) => {
  // grabbing the search parameter for the actual query
  // const parameter = req.body.parameter;
  const parameter = 'genres';

  // grabbing the query parameter from the req.body (from the search form)
  const { query } = req.body;

  // fetch call for API w/ dynamic variable
  fetch(`https://kitsu.io/api/edge/anime?sort=popularityRank&page%5Blimit%5D=20&filter%5B${parameter}%5D=${query}`)
    // parses the promise response to extract data
    .then(res => res.json())
    // gets actual fetched data
    .then((json) => {
      // saves data to locals for access in views
      res.locals.anime = json;
      // passes data on to views
      next();
    })
    .catch((err) => {
      res.json(err);
    });
};
```

I was freaking out at first when I didn't know how to use the API. I wracked my head in getting it to work but after an unproductivev Thursday night, Friday I had a breakthrough and figured it out both how to get the API data and pass it to the views. I used node-fetch for this fetch call.

## node/express Discoveries

Chaining Functions in Router
- i think we did this in class, but experimenting with it on my own gave me a better idea on how to map out all the views

Routing w/ Forms
- i figured out how to make the 4 functions work on the same route, with help from the aforementioned

## Change Log

There were several changes from the beginning of the project. I revlised my schema twice to make it easier to work with and incorporate more information. I could not get to more advanced EJS, but the core functionality is complete.

## Issues and Resolutions

Rendering
- There were issues in rendering the data passed from the views to the EJS. I had to figure out how I was passing it and how to access it correctly in the EJS.

Routing
- After a while, routing became a mess. I decided to segregate the routes based on either if it was a function of the user or of the shows. The auth was folded into the shows. All controllers are in one file, as well as all the view and all the models in their own file. Due to time contraints, I decided not to expand my file structure too much.

Planning
- This happened in the last project too, but I felt it more here. Poor planning held me back from coding too much the first few days, from figuring out conceptually what I wanted to do to figuring out how to integrate the API fetch to the CRUD. I also did things out of order.

#### Error/Resolution Sample

**ERROR**: Cannot read property 'id' of undefined
**RESOLUTION**: Due to missing req.session data, re-login or refresh profile page fixed it

**ERROR**: data.forEach is not a function
**RESOLUTION**: Had to fix how I passed data from the controller to the views

There were a lot of errors, most of them having to do with syntax and/or EJS rendering

## References

The class lesson on auth and node-sessions for the authentification functions
Help from classmates for clues/hints on how to approach specific problems
The API documentation for my API, reading it carefully helped me out on how to use it