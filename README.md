# weather

## Simple weather app

Built more on a technical point of view rather then design

### Basic usage

`npm start` starts the app on port 8080

`npm run-script build` compiles into `dist` folder

`npm run-script dev-server` starts the webpack dev server. It also requires a manual start of the the `express` server (under folder `server`) which has the necessary API gates, which had to be bypassed during development due to security issues (HTPPS & CORS).

