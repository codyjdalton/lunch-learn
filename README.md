##### May 11, 2016
# Full Stack Javascript
### Lunch and learn presentation

The purpose of this application was to demonstrate a semi-RESTful full stack Javascript application in a relatively short amount of time. (about 45 minutes)

There may still be bugs/spaghetti code left over after the initial pass, there are no plans to address these in the future as this was purely for demonstration.

[View the example application](https://gl-js.herokuapp.com/)

## Prerequisites

### Node JS
You'll need to have node JS installed to run this application locally.

[Install the latest version](https://nodejs.org/en/download/)

### Mocha JS (optional)
In order to run automated unit tests, you will need to have Mocha installed globally.

`npm install -g mocha`

## Getting Started

#### 1. Install NPM dependencies

Change directory into the local application and run:

`npm install`

#### 2. Create local.json

Create a local.json file in the root level of the project directory.

`touch local.json`

Add the following information to secrets.json replacing the examples below with your own information.
```json
{
    "mongoConnection": "YOUR_MONGO_CONNECTION"
}
```

#### 3. Launch the application

`node lib/index.js`

Launches the latest build of the application. NOTE: this will not automatically relaunch your local app when changes are made.

You can "watch" for changes to the codebase and automatically relaunch the application by installing nodemon:

`npm install -g nodemon`  
`nodemon lib/index.js`

#### 4. Run unit tests (optional)
`npm test`

Note: this will only work if Mocha JS is installed globally (see prerequisites).
