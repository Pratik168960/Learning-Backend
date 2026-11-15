/* LECTURE 19: UNDERSTAND THE SUBSCRIPTION SCHEMA

THE GOAL:
- Understand why the Subscription model is designed as separate documents rather than an array inside the User model.
- Learn how to theoretically query this model to find a channel's total subscribers vs. a user's subscribed channels.

CORE CONCEPTS:
1. The Array Anti-Pattern:
    * Why not just add a `subscribers: []` array in the User model?
    * If a channel gets a million subscribers, that array becomes massive.
    * If the very first subscriber unsubscribes, MongoDB has to find and remove index 0, shifting 999,999 items in the array. This is a highly expensive and inefficient operation.

2. The Document Approach (Our Model):
    * Every single time a user subscribes to a channel, a brand NEW document is created in the `subscriptions` collection.
    * Document Structure: `{ subscriber: "User_A_ID", channel: "Chai_Aur_Code_ID" }`.

3. Querying the Model (The Trick):
    * To find how many subscribers "Chai Aur Code" has: We query the collection and match all documents where `channel === "Chai_Aur_Code_ID"`. Then, we simply count those documents.
    * To find channels that "User A" is subscribed to: We query the collection and match all documents where `subscriber === "User_A_ID"`. Then, we extract the `channel` field from those documents.
    
    * Remember: 
      Match `channel` -> get subscribers. 
      Match `subscriber` -> get channels.
*/