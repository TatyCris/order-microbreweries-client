# Order Microbreweries - Client
This project is the client side of a full stack web-application.

## Table of contents

- [Intro](#Intro)
- [Technologies used](#Technologies-used)
- [Goals for this project](#Goals-for-this-project)
- [Features to be implemented](#Features-to-be-implementes)
- [My git workflow](#My-git-workflow)
- [Setup](#Setup)
- [Create React App](#Create-React-App)

## Intro
This is a React app, which was creadted for a technical assignment at an IT company in Netherlands.

The Backend for the following repo may be found [here](https://github.com/TatyCris/order-microbreweries-server)

**[Check out the deployed app here!](https://findabeer.netlify.com)**

## Technologies used
- React
- React-Router
- React-Map-Gl
- Redux
- Redux-Thunk
- CSS
- Sass
- Superagent

## Goals for this project
- [x] Enter a zip code and and return the closest microbrewery.

## Features to be implemented
- [ ] Add zoom and rotation controls
- [ ] Button to link GoogleMaps routes when selecting a microbrewery
- [ ] Adjust zoom to show all microbreweries centered
- [ ] Adjust zoom when selecting a microbrewery 

## My git workflow

Here is my branching model for this project.

```
master (auto deploys) ______________________
                       \               /
development             \_____________/- pull request
                         \           /
feature/some-feature      \_commits_/- pull request
```

## Setup
In order to run this App please ensure you have the server running as well. 
Instructions on how to do that may be found [here](https://github.com/TatyCris/order-microbreweries-server)

In order to render the map, fetch directions and get locations from zipcode please ensure to set a valid token for the Mapbox API as an environment variable. You can create a *.env.local* file to set the variable like the model found at the *.env* file.

- git clone
```bash
$ git clone https://github.com/TatyCris/order-microbreweries-client.git
```

- npm install
```bash
$ npm install
```

- npm start
```bash
$ npm start
```

## Create React App
This project was scaffolded using the create-react-app cli. 

**[The standard create-react-app docs can be found in here](https://github.com/facebook/create-react-app)**
