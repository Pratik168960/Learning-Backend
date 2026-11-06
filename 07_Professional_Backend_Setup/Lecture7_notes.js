/* LECTURE 7: HOW TO SETUP A PROFESSIONAL BACKEND PROJECT

THE GOAL:
- Transition from basic backend concepts to a 100% production-grade architecture.
- Learn industry-standard practices for Git tracking, environment variables, development scripts, and code formatting.

CORE CONCEPTS:
1. The `.gitkeep` Trick for Empty Folders:
    * Git does not track empty folders. If you create a `temp` folder for uploads but it's empty, Git ignores it.
    * Industry Practice: Create a `.gitkeep` file inside the empty folder. It's an empty file, but its presence forces Git to track the folder.

2. Secure Environment Variables:
    * `.env`: Contains real secrets (passwords, database URIs). NEVER push this to GitHub. It must be in `.gitignore`.
    * `.env.sample`: Contains the keys but fake values (e.g., `PORT=8000`, `MONGO_URI=your_uri_here`). This IS pushed to GitHub so other developers know what variables they need to configure.

3. Nodemon (Dev Dependency):
    * Installed via `npm i -D nodemon`.
    * It watches for file changes and automatically restarts the server, speeding up development.
    * It's a "dev dependency" because production servers (like PM2 or Docker) handle their own restarts.

4. Prettier (Code Formatting):
    * Installed via `npm i -D prettier`.
    * In a team of developers, everyone writes code differently (tabs vs spaces, single vs double quotes).
    * `.prettierrc`: Enforces rules across the entire team (e.g., 2 spaces, double quotes).
    * `.prettierignore`: Tells Prettier to ignore specific files (like `.env` or `node_modules`) because formatting them can break things.

5. ES Modules Setup:
    * In `package.json`, setting `"type": "module"` allows us to use modern `import/export` syntax instead of the older `require()` syntax.
*/