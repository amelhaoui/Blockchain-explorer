# Draft: Nuri Code Challenge

Hi, I'm applying to join the software engineering chapter. Here is my suggested solution: Let's go.

# Demo: https://challenge-nuri.herokuapp.com/
> It may take up to 30 secondes as it starting up the front and the backend

# Running locally

 ##  1. With Docker
You need first to install Docker (https://docs.docker.com/get-docker/)
Open your command line and run the following commands: 

### Backend server
```
cd api
docker build -t nuri-challenge-backend .
docker run -it nuri-challenge-backend -p 5000:9000 -e PORT=9000 // you choose which port the server will run on
// you can check the backend in you browser in localhost:5000
```

### Frontend server
```
cd front
docker build -t nuri-challenge-frontend .
docker run -it nuri-challenge-frontend -p 5001:80
// you can check the backend in you browser in localhost:5001
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



### Code
## Code
# code
Sections:
1- Run