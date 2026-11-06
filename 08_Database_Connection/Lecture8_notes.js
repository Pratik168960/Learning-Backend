/* LECTURE 8: CONNECTING DATABASE IN MERN WITH DEBUGGING

THE GOAL:
- Connect to MongoDB Atlas professionally, not just via a basic one-liner.
- Understand the golden rules of database connection (async/await and try/catch).
- Modularize the connection logic.
- Debug common ES Module import errors (missing .js extensions) and environment variable loading issues.

CORE CONCEPTS:
1. Two Golden Rules of Database Connections:
    * Rule 1: The database is always in another continent. It takes time to connect. Therefore, ALWAYS use `async/await` (or promises).
    * Rule 2: Connecting to a database can fail for many reasons (wrong URI, blocked IP, database down). ALWAYS wrap the connection code in a `try/catch` block.

2. MongoDB Atlas Setup:
    * Create a free cluster on MongoDB Atlas.
    * Set up a database user with a password.
    * Add IP Access (0.0.0.0/0 for testing from anywhere, but in true production, only the specific server IP is whitelisted).
    * Get the connection string (URI) and store it in `.env`. NEVER push passwords to GitHub.

3. The IIFE Approach vs The Modular Approach:
    * IIFE (Immediately Invoked Function Expression): Writing the connection directly inside `index.js` wrapped in `;(async () => {})()`. (The starting semicolon is a professional practice to prevent errors if the previous line lacked one).
    * Modular Approach (Better): Write a connection function in `src/db/index.js`, export it, and call it inside the main `src/index.js`. We use this approach.

4. Debugging ES Module Imports & Env Variables:
    * In ES Modules (using `"type": "module"`), you MUST include the `.js` extension when importing local files (e.g., `import { DB_NAME } from "../constants.js"`). If you forget `.js`, Node will throw an error.
    * Loading `dotenv` gracefully with ES Modules can be tricky. Hitesh Sir uses an experimental Node flag in the package.json scripts to load `.env` before the app starts: `--experimental-json-modules`. 
    * If `nodemon` isn't picking up changes in `.env`, remember: nodemon watches code files. You must MANUALLY restart the server if you change `.env`.
*/