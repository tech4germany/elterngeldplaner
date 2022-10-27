# Elterngeldplaner Prototyp

The Elterngeldplaner is a prototype for the BMFSFJ, developed during the Tech4Germany fellowship 2022.
It is currently designed for mobile devices only.

You can test the prototype via these links:

https://elterngeldplaner.de/

https://elterngeldplaner-cce40.web.app/

## About

The Elterngeldplaner is a web application that helps parents understand, calculate and plan their parental allowance. Parental allowance is a benefit funded by the German social security system that substitutes the loss of earnings after the birth of a child. The parental allowance system is very flexible but highly complex and difficult to understand for parents.

Our goal was therefore to create a self-explanatory tool that invites users to play and interact with it, so parents can understand the parental allowance system through learning-by-doing and find out how to ideally split parental allowance among each other.

## Development

This prototype is a (frontend-only) React single-page-application. All calculations are performed locally.
It was developed with the purpose of demonstrating and testing the UX/UI design and is not meant to be used for productive use in its current form.

Features:

- Form to retrieve basic required information of the users (names, birthdate, income)
- Simplified calculation of the expected parental allowance
- Interactive planner to allocate the different types of parental allowance (basic parental allowance, parental allowance plus, partnership bonus) between both parents
- A selected number of checks and warnings for invalid selections according to legal regulations of the parental allowance
- Sharing of a generated visual depiction (with Emojis) of the created plan

## Setup

In the project directory, you can run

### `npm install`

Installs all dependencies for this project

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Deployment

This application is currently hosted on Firebase. To setup Firebase, follow the quick start instructions on their [Website](https://firebase.google.com/docs/hosting/quickstart).

To deploy the application, first run `npm run build` to build the app, then run `firebase deploy`.
