/* LECTURE 20: LEARN MONGODB AGGREGATION PIPELINES

THE GOAL:
- Write the `getUserChannelProfile` controller to fetch a channel's profile page data.
- Master MongoDB Aggregation Pipelines to perform complex JOIN-like operations.
- Calculate dynamic fields like subscriber count, channels subscribed to, and a boolean `isSubscribed` flag.

CORE CONCEPTS:
1. Aggregation Pipelines (`$aggregate`):
    * An array of stages. The output of one stage becomes the exact input for the next stage. OUTPUT OF ONE STAGE = INPUT OF THE NEXT STAGE.
    * If Stage 1 filters 100 documents down to 1, Stage 2 only operates on that 1 document.

2. Key Pipeline Stages Used:
    * `$match`: Acts like a WHERE clause. We use it first to filter out the specific user document based on the `username`.
    * `$lookup`: Performs a "Left Join" with another collection.
        - `from`: The collection to join (e.g., "subscriptions").
        - `localField`: The field in the current document (e.g., `_id`).
        - `foreignField`: The field in the target collection (e.g., `channel` or `subscriber`).
        - `as`: The name of the new array field injected into the document.
    * `$addFields`: Injects entirely new fields into the document based on calculations. it can be used for getting object in return instead of array. 
    * `$first`: Returns the first element of an array. We use it to extract a single document from the array returned by `$lookup`.
    * `$arrayElemAt`: Returns the element at a specific index in an array. We use it to extract a single document from the array returned by `$lookup`.
    * `$project`: Determines exactly which fieldnps to return to the frontend. (1 to include, 0 to exclude).

3. Special Operators:
    * `$size`: Returns the number of elements in an array. Used to count subscribers.
    * `$cond`: An if-then-else statement.
    * `$in`: Checks if a specific value exists inside an array. We use this to see if the logged-in user's `req.user._id` exists in the list of subscribers.

4. Return Types:
    * Aggregation pipelines *always* return an array of documents, even if `$match` only found one document. We extract `[0]` before sending the response to the frontend.
*/