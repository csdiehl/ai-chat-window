## Fixie Chat Window Test Project

This UI allows the user to chat with a test Fixie agent. Key features:

- User can set their own name for the sidekick, which will dynamically populate the name in the agent's messages
- User can send messages via the send button or hitting the enter key
- User gets instant feedback while response is fetched
- The window dynamically adapts to the viewport size

## Architecture Choices

I separated the application logic from the UI. The `ChatWindow` component contains the main app logic and passes props to child components. This enables better de-bugging and separation of concerns.

For this project, everything is rendered on the client side. The Fixie agent is called via a function in `api.ts`. This allows for a fast and responsive experience, but has security concerns. In a production app, I would use a framework like `Next.js` running in a Node environment to make this fetch call in a server side component. This would protect the API key from being visible on the client.

## Other Notes

The Fixie API response doesn't seem to be valid JSON, so I couldn't stream it given the amount of time I have. However, I provided instant feedback to the user while the data are fetched. This gives the impression of a fast and responsive UI.

## Tests

A couple of very basic tests can be found in the `App.test.tsx` file.

## Available Scripts

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
