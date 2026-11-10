/* LECTURE 12: HTTP CRASH COURSE | METHODS | HEADERS

THE GOAL:
- Understand the theoretical foundations of the web: HTTP (Hypertext Transfer Protocol).
- Learn the difference between HTTP and HTTPS.
- Understand HTTP Headers, Methods, and Status Codes which are crucial for building robust APIs.

CORE CONCEPTS:
1. HTTP vs HTTPS:
    * The underlying communication rules are the same.
    * The only difference is encryption. In HTTP, data travels in "clear text" (anyone intercepting the network can read it). In HTTPS, the data is encrypted during transit and decrypted at the destination.

2. HTTP Headers (The Metadata):
    * Headers are Key-Value pairs sent along with a request or response.
    * They carry "metadata" (data about the data). E.g., What type of file is this? What is the size? Is the user authenticated?
    * Common Request Headers: from client 
        - `Accept`: What type of data the client can handle (e.g., `application/json`).
        - `User-Agent`: Information about the client (Browser, Postman, OS).
        - `Authorization`: Used to send tokens (e.g., `Bearer eyJhbGci...`).
    * Common Response Headers: from server
        - `Content-Type`: What kind of data the server is returning.
        - `Set-Cookie`: Instructs the browser to store a cookie.
    * Common Representaion Headers: encoding / compression 
        - `Content-Encoding`: How the data is compressed (e.g., `gzip`, `deflate`).
    * Common Payload Headers: data 
        - `Content-Length`: The size of the request or response body in bytes.
        - `Content-Location`: The location of the resource.

3. HTTP Methods (The Actions):
    * `GET`: Retrieve a resource (e.g., fetch a user profile).
    * `POST`: Submit new data to the server (e.g., register a new user).
    * `PUT`: Replace an existing resource entirely.
    * `PATCH`: Partially update an existing resource (e.g., just changing an email).
    * `DELETE`: Remove a resource.
    * `OPTIONS`: Used by browsers in CORS preflight requests to check what methods are allowed.

4. HTTP Status Codes:
    * Standardized numbers to let the client know the outcome of their request.
    * 1xx (Informational): Request received, continuing process.
    * 2xx (Success): 
        - 200: OK (Standard success)
        - 201: Created (Resource successfully created)
    * 3xx (Redirection): 
        - 307/308: Resource moved temporarily/permanently.
    * 4xx (Client Error): YOU made a mistake.
        - 400: Bad Request (Missing fields, invalid data)
        - 401: Unauthorized (Not logged in or invalid token)
        - 404: Not Found (URL doesn't exist)
    * 5xx (Server Error): WE made a mistake.
        - 500: Internal Server Error (Our database crashed or code threw an error)
*/