## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm test`

Launches the test runner in the interactive watch mode.\

## Features Included

* This is a chat app that allows users to choose a channel and user from the left side panel, and view the corresponding 10 latest messages on the right side. 

* Users can also view more messages by clicking the "Read more" button.
* While the API is loading more messages, a loader will be visible instead of the arrow in the Button.
* If there are no more messages available, the app displays the message "No more messages available" for 2 seconds.
* If the last message fails to send, the "Read more" button for the latest messages is disabled to prevent failure.(Can be fixed, just leave it disabled as of now).

* If the backend fails to send a message, the app displays a failure icon.
* Successfully sent messages from the current user are displayed with a success icon. 

* If a user leaves the browser after typing a message, the message will be displayed in the text area when they revisit the page.

* The app has been tested with a couple of test cases, but only the UI layer is covered. If you encounter any issues or have any questions, please feel free to reach out to us.