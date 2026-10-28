/* LECTURE 2: DEPLOYING BACKEND CODE TO PRODUCTION

THE GOAL:
- Demystify backend deployment by building a basic server and pushing it to production (DigitalOcean) immediately.
- Understand Request (req) and Response (res).
- Secure the app using environment variables (.env).

CORE CONCEPTS:
1. Express Framework:
    * Express is an unopinionated, fast, minimalist web framework for Node.js.
    * It handles the heavy lifting of listening to network ports and routing URLs.

2. Routing (Listening):
    * `app.get()` listens for a specific URL (like '/' or '/twitter') and executes a callback function.
    * The callback always receives `(req, res)`:
        * req (Request): What the user sent you.
        * res (Response): What you send back to the user.

3. Environment Variables (dotenv):
    * Hardcoding ports (e.g., const port = 3000) is dangerous because production servers (like AWS or DigitalOcean) assign ports dynamically.
    * We use the `dotenv` package to load variables from a `.env` file into `process.env`.
    * In production, the hosting provider injects their own `process.env.PORT`.

4. Deployment (DigitalOcean):
    * Code is pushed to GitHub (ensuring node_modules and .env are ignored).
    * DigitalOcean's App Platform connects to GitHub, detects the Node.js app, and builds it.
    * We manually inject the Environment Variables (like PORT=3000) directly into the DigitalOcean dashboard.

5. Terminal Commands Run in Lecture:
    * Initialize Node.js project (NOTE: Sir specifically used `npm init` without the `-y` flag to show the manual setup of the package name and author): 
      `npm init` 
    * Install required packages: 
      `npm install express dotenv`
    * Run the application (using the script added in package.json): 
      `npm run start`
*/