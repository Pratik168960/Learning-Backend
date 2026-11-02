/* LECTURE 6: DATA MODELING FOR ECOMMERCE & HOSPITAL MANAGEMENT

THE GOAL:
- Practice and solidify Mongoose data modeling by creating schemas for real-world applications (E-commerce and Hospital Management).
- Learn to manage complex relationships between different models (e.g., linking Orders, Products, and Users).
- Understand how to structure nested objects and use `enum` to restrict field values.

CORE CONCEPTS:
1. Complex Relationships (E-commerce):
    * An Order contains multiple Products. Instead of just an array of Product ObjectIds, we often need an array of objects to store the ObjectId *and* the quantity ordered.
    * Example: `orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }, { quantity: Number }]`
    * A cleaner approach is to create a separate `orderItemSchema` and use it within the main `orderSchema`.

2. Using Enums:
    * The `enum` property restricts a String field to a specific set of allowed values.
    * Example: An order status can only be "PENDING", "CANCELLED", or "DELIVERED".
      `status: { type: String, enum: ["PENDING", "CANCELLED", "DELIVERED"], default: "PENDING" }`

3. Nested Sub-Schemas:
    * For complex fields like an address, you can define a small, localized schema (e.g., `addressSchema`) at the top of your file and embed it directly into the main model without needing to export it.

4. Consistent Naming Conventions:
    * Always maintain consistency in file naming (e.g., `model_name.models.js`) and within the schema definitions.
    * Remember that the `ref` string must exactly match the name provided in the `mongoose.model()` export.
*/