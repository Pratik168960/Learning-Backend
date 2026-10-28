/* LECTURE 3: CONNECTING FRONTEND AND BACKEND (CORS & PROXY)

THE GOAL:
- Build a basic backend serving an array of "jokes".
- Build a basic React frontend to fetch and display those jokes.
- Understand and resolve the CORS (Cross-Origin Resource Sharing) error.
- Standardize API routes (e.g., /api/v1/...).

CORE CONCEPTS:
1. ES Modules vs CommonJS:
    * Older Node used `require()` (CommonJS).
    * Modern Node supports `import` (ES Modules). To use it, you MUST add `"type": "module"` in your backend's `package.json`.

2. The CORS Error (Cross-Origin Resource Sharing):
    * Browsers block frontend apps (running on localhost:5173) from directly asking for data from backends (running on localhost:3000) for security.
    * This is like someone from a different house asking for your stuff. The browser stops it by default.

3. The Solutions for CORS:
    * Solution A (Backend): Install the `cors` npm package in the backend and whitelist the frontend's origin/IP.
    * Solution B (Frontend Proxy): Configure Vite (or create-react-app) to append the backend URL behind the scenes. This tricks the browser into thinking the request came from the same origin. We use this approach in the lecture.

4. Standardizing API Routes:
    * Bad Practice: `app.get('/jokes', ...)`
    * Good Practice: `app.get('/api/v1/jokes', ...)` - Always version and scope your APIs so they don't clash with frontend routes.

5. The "Bad Practice" of Serving Static Files:
    * Hitesh Sir showed how some companies run `npm run build` on the frontend, drop the `dist` folder into the backend, and serve it using `app.use(express.static('dist'))`. 
    * WHY IT'S BAD: It merges frontend and backend deployments. If you change a typo in React, you have to rebuild and restart the entire backend server. They should be deployed and scaled separately!

6. Terminal Commands Run in Lecture:
    * [Backend] `npm init`, `npm install express dotenv`
    * [Frontend] `npm create vite@latest . -- --template react`, `npm install`, `npm install axios`
*/