# Draft: Nuri Code Challenge

Hi, I'm applying to join the software engineering chapter. Here is my suggested solution: Let's go.

# Contents

1. [Demo](#demo)
2. [Code Review](#code-review)
3. [Overview](#Overview)
3. [Running Locally](#running-locally)
4. [Limitations And TODOs](#limitations)



# Demo: https://challenge-nuri.herokuapp.com/
> It may take up to 30 secondes as it starting up the front and the backend

# Code Review

I created a MR against main branch. Happy to answer questions directly.

# Overview

The project follows CI/CD approach with test and deployment done after each push to develop or main branch. \
This would change depending on the deployment strategy within NURI. \
I created both a front and backend in separate folders.

P.S: please note, I put the API_KEY directly on the workflows, as I dont have access to secret in the repository.
## Stack:
    
### Backend: 

- I used Node.js with typescript. 
- For the API, I created it using graphql, with Apollo server (uses express.js) 
- I added unit tests and an integration test with jest and ts-jest \
- I connected a Sentry instance for handling Graphql Errors \
- For logging I used winston 

### Frontend:
- Bootstraped with creact react app
- I used React.js with Typescript. 
- For design, I used Material-ui which is popular.
- To connect to the backend, I'm using Apollo Client
- Sentry for error monitoring and performance

### Typescript files:

Types from Graphql Schema were generated through commands available in package.json, while I did checked them to the repo, they should be generated dynamically and not checked to source code.


## Features Implemented:

    - Retrieve of blocks in the last 24 hours, the start time can change using a time picker
    - Pagination of blocks
    - Retrivial of details of a block with link to previous and next block
    - Pagination of the transactions
    - Tests on the backend server
    - CI/CD deployment using Github Actions and Heroku
    - Sentry for logging errors from the backend server
    - API implemented in Graphql

# Running locally

 ##  1. With Docker
You need first to install Docker (https://docs.docker.com/get-docker/)
Open your command line and run the following commands: 

### Backend server
```
cd api
docker build -t nuri-challenge-backend .
docker run -d -p 5002:8000 -e PORT=8000 nuri-challenge-backend
// you can check the backend in you browser in localhost:5002
```
### Frontend server
```
cd front
docker build -t nuri-challenge-frontend .
docker run -d -p 5001:80 nuri-challenge-frontend
// you can check the frontend in you browser in localhost:5001
```

 ##  2. With NPM / Node
The code was tested with:
- npm version: 6.14.14
- node version: v14.17.5

### Backend server

```
# backend
cd api
npm install
npm run dev 
```

Check your server in [http://localhost:4000](http://localhost:4000) to view it in the browser.  \
The page will reload if you make edits. \
You will also see any lint errors in the console.
### Frontend server

```
# frontend 
cd front
npm start
```
Check your server in [http://localhost:3000](http://localhost:3000) to view it in the browser. \
The page will reload if you make edits. \
You will also see any lint errors in the console.

# Limitations

## Deployment: 

We should also have multiple env to deploy to: 
- sandbox: where each user can tests his feature branches
- staging, which refers to main or develop branch. 
- prepoduction: which is like the production env
- production: where users are making trading 

## Caching: 

Apollo server uses an internal caching but it's not scallable if we have more instances. It's best to use a distributed one like Redis \
To reduce calls to blockchain.info API, more availability and faster responses.
With a caching, there should be a strategy to be defined, as blocks can be represented as linked list. \
To use (time in miliseconds) as key is not a * good solution * for retrieval. A better approach is to use height or block_id as key. \
In the value side, we will store a number of blocks that came before this block.

## Logging: 

To analyze and store logs, one alternative is to use the ELK suite. To monitor and investigate logs in a large scale. \
Special attention should be given to sensitive information that should not be logged.


# Thank you for reviewing my work.
