# React-calendar

![GitHub package.json version](https://img.shields.io/github/package-json/v/estebmaister/react-calendar?color=blue&style=plastic&logo=github) ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/estebmaister/react-calendar/@material-ui/core?style=plastic&logo=material-ui) ![GitHub package.json dependency version moment](https://img.shields.io/github/package-json/dependency-version/estebmaister/react-calendar/moment?style=plastic&logo=moment) ![GitHub deployments](https://img.shields.io/github/deployments/estebmaister/react-calendar/github-pages?label=deploy%20gh-pages&logo=github&style=plastic) [![Website](https://img.shields.io/website?style=plastic&logo=google-chrome&&logoColor=white&up_message=online&url=https%3A%2F%2Festebmaister.github.io%2Freact-calendar%2F)](https://estebmaister.github.io/react-calendar/) [ ![License](https://img.shields.io/github/license/estebmaister/react-calendar?style=plastic)](https://choosealicense.com/licenses/mit/) [ ![Twitter Follow](https://img.shields.io/twitter/follow/estebmaister?label=Follow&style=social) ](https://twitter.com/estebmaister)

Web calendar app, intends to be an app for my application to Jobsity as Junior Front-end Developer.

It has the following functionalities:

- Ability to add a new "reminder" (max 30 chars) for a user-entered day and time. Also, include a city.
- Display reminders on the calendar view in the correct time order.
- Allow the user to select color when creating a reminder and display it appropriately.
- Ability to edit reminders – including changing text, city, day, time and color.
- Add a weather service call from a free API such as Open Weather Map, and get the weather forecast (ex. Rain) for the date based on the city.
- (Bonus) Expand the calendar to support more than the current month.
- (Bonus) Properly handle overflow when multiple reminders appear on the same date.
- (Bonus) Functionality to delete one or ALL reminders for a specific day, or the entire calendar.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

After the creation of the template, a Calendar component was created and begun the development process of the real app.

## Available Scripts

In the project directory, you can run:

### `npm install`

Install the needed components for the app.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000/react-calendar](http://localhost:3000/react-calendar) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## License

[MIT](https://choosealicense.com/licenses/mit/)
