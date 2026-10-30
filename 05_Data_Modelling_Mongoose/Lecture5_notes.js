/* LECTURE 5: DATA MODELING FOR BACKEND WITH MONGOOSE

THE GOAL:
- Understand that the very first step of any backend project is NOT writing login controllers, but defining what data points will be stored (Data Modeling).
- Learn how to structure data conceptually before touching code.
- Write production-grade Mongoose Schemas with advanced validation, custom error messages, and relationships.
- Build a related data model for a Todo application (User, Todo, SubTodo).

CORE CONCEPTS:
1. Conceptualizing Data First:
    * Always start with a pen and paper or tools like Eraser.io/Moon Modeler to draw out your database entities.
    * Example: If you add a "photo" field to a User model later, your entire backend logic, controllers, and file upload systems will change. Think ahead.

2. Mongoose Basics (The 3-Step Process):
    * Step 1: Import mongoose.
    * Step 2: Create a schema using `new mongoose.Schema({ ... })`.
    * Step 3: Export the model using `mongoose.model("Name", schema)`.  mongoose ask two things : 1. what should we name this and 2. what schema should we use to create this model.
    * Note: When Mongoose saves the model "User" in the database, it automatically converts it to lowercase and plural: "users".

3. Advanced Schema Validation:
    * Instead of just `{ username: String }`, use objects for detailed validation:
      `{ username: { type: String, required: true, unique: true, lowercase: true } }`

4. Timestamps:
    * Adding `{ timestamps: true }` as the second argument to `mongoose.Schema` automatically creates and manages `createdAt` and `updatedAt` fields for you.

5. Relationships (Linking Models):
    * In MongoDB, we link models using `mongoose.Schema.Types.ObjectId` and explicitly stating the `ref` (reference) to the exact string name of the target model (e.g., `ref: "User"`).

6. File Naming Conventions:
    * Standard industry practice often involves naming model files with `.models.js` (e.g., `user.models.js`) so developers can easily identify their purpose.
*/