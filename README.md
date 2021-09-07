# Polling APIs

## Deployed
* [Click Here](https://cn-polling-system.herokuapp.com/)

## Routes
* localhost:8000/questions/create - (To create a question)
* localhost:8000/questions/:id/options/create  - (To add option for a specific question)
* localhost:8000/questions/:id/delete  - (To delete a question)
* localhost:8000/options/:id/delete  - (To delete an option for the specific question)
* localhost:8000/options/:id/add_vote  - (To increment the count of votes for option)
* localhost:8000/questions/:id  - (To view a questin and its options)

## Tech Stack
* Node.js - BackEnd
* mongoDB - Database

## npm install
* express
* mongoose
* nodemon
* dotenv

## Local Setup
 * Clone the repo
 * run npm install
 * run node index.js
 * Go to [http://localhost:8000](http://localhost:8000)

 # Happy Coding!