/*          LECTURE 1: BACKEND ROADMAP & ARCHITECTURE SETUP

THE GOAL:
*  Understand the absolute fundamentals of backend development.
*  Learn the three pillars of backend operations.
*  Map out the industry-standard folder and file structure for our Node.js/Express project.

CORE CONCEPTS:
1. What is a Server actually?:
    *  A server is simply a piece of software that serves data.
    *  It is a myth that servers are only massive, high-powered AWS computers. A server can run on a standard laptop or even a mobile phone.
2. Core Components of Backend:
    *  You need mastery over two main things: a programming language and a database.
    *  Language: We are using JavaScript (Node.js runtime).
    *  Database: We will use MongoDB (often interacting via Mongoose).
3. The Three Pillars of Backend Operations:
    *  Whenever you write backend code, you will handle one of these three scenarios.
    *  Data Handling: Processing raw data like strings, numbers, or objects (e.g., username, password).
    *  File Handling: Managing files like images, PDFs, or videos.
    *  Third-Party APIs: Communicating with external services (e.g., sending emails, Google Login, AWS uploads).
4. Industry Standard Folder Structure (Inside src/):
    *  db/: Contains the actual code to connect to the database.
    *  models/: Defines the structure/schema of how data will be stored in the database.
    *  controllers/: Contains the functions and business logic (the "methods" that do the actual work).
    *  routes/: Manages URL endpoints (e.g., /login, /signup) and decides which controller to call.
    *  middlewares/: Intermediary functions for checks and validation.
    *  utils/: Reusable utility functions (e.g., a mail sender or file uploader used across multiple places).
5. Key Files inside src/:
    *  index.js: Application's entry point where the database is initialized.
    *  app.js: Handles basic application configurations.
    *  constants.js: Used for defining strict constant values to enforce business logic. */

// DB connection code will go here in upcoming lectures