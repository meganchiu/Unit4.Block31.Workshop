# Block 31 Workshop in 2 parts 

By the end of this workshop, we will have built an express server and a postgres database that connects to its vite client. We're going to start with the server. In order to get this up and running, remember to run `npm install` in the root folder **as well as** in the `_block31client` folder. Each has a `package.json` with different dependencies that need to be installed. 

To run the server and client, you will need **two** active terminals - one running the server and one running the client.

- To run the client, you must be in the `_block31client` directory. Once there, run as you would any other Vite/React application.
- To run the server, refer to the `package.json`. There are two scripts:
  - Run `npm start` to start the server with `node`. This is not ideal if you are actively making changes/testing your code since changes will not be applied until the server is killed and restarted.
  - Run `npm run dev` while actively testing/writing your code. This uses `nodemon`, which will incorporate your changes without having to kill/restart the server.

## Server Logic 
- Import the express framework and initiaize our app - you should set the value of the express instance as app.
*Hint: this will solve `ReferenceError: app is not defined`*
- Initialize server using `app.listen`. Use the `PORT` variable that is intialized at the top of `index.js` and include a `console.log` in your callback function that logs something like `Server running on PORT`.
- Add error handling middleware to your app. Remember, this goes **after** all routes since we only want to trigger it when we receive an error.
- Set up a `hello world` route. See [express documentation](https://expressjs.com/en/starter/hello-world.html).