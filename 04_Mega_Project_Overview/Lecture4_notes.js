/* LECTURE 4: TAKING BACKEND TO NEXT LEVEL (MEGA PROJECT OVERVIEW)

THE GOAL:
- Visualize the final Mega Project (a production-grade YouTube clone).
- Understand the scope, complexity, and the API endpoints we need to build.
- Prepare mentally for advanced MongoDB concepts like Aggregation Pipelines.

CORE CONCEPTS & PROJECT SCOPE:
1. The Scale of the Project:
    * We are building a backend for a video hosting platform with 29 UI screens.
    * NOTE: We will not focus on the UI/Frontend in this series. The UI preview was shown purely to help us visualize what JSON data our APIs need to return.

2. Authentication & Security (25-30% of the course):
    * Registration and Login.
    * JWT (JSON Web Tokens) and Bearer Tokens.
    * Secure Sessions and Cookie management.
    * Password hashing and protection mechanisms.

3. Video Management & Core Features:
    * Video uploading via drag-and-drop, alongside Thumbnail image uploads.
    * Storing Titles, Descriptions, and Video metadata.
    * Publishing flags (Public/Private/Draft), Editing, and Deleting videos.

4. User Engagement & Social Features:
    * Likes and Dislikes on videos.
    * Watch History tracking.
    * Creating and managing Playlists (adding/removing videos).
    * Subscribing to channels.
    * Nested Comments on videos.
    * "Tweets" (Community posts) - Users can post text tweets and comment on them, introducing a secondary social media element.

5. Admin Dashboard & Advanced Databases:
    * An Admin panel to track total views, total subscribers, and total likes across all videos.
    * To achieve this dashboard, we will dive heavily into **MongoDB Aggregation Pipelines**. This is an industry-standard way to write complex queries and join multiple collections (like joining Users, Videos, and Likes together).

*/