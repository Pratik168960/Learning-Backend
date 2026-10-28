// Require dotenv as early as possible in your application
require('dotenv').config()
const express = require('express')
const app = express()

// We get the port from the environment variable, OR default to 3000 if it fails
const port = process.env.PORT || 3000

// 1. A basic route listening on the home URL ('/')
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 2. A custom route listening on '/twitter'
app.get('/twitter', (req, res) => {
    res.send('pratik16')
})

// 3. A route sending back HTML tags
app.get('/login', (req, res) => {
    res.send('<h1>Please login at chai aur code</h1>')
})

app.get('/youtube', (req, res) => {
    res.send('<h2>Chai aur code</h2>')
})

// 4. A route simulating a JSON API response (like fetching GitHub data)
const githubData = {
  "login": "Pratik168960",
  "id": 222968914,
  "node_id": "U_kgDODUo8Ug",
  "avatar_url": "https://avatars.githubusercontent.com/u/222968914?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/Pratik168960",
  "html_url": "https://github.com/Pratik168960",
  "followers_url": "https://api.github.com/users/Pratik168960/followers",
  "following_url": "https://api.github.com/users/Pratik168960/following{/other_user}",
  "gists_url": "https://api.github.com/users/Pratik168960/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/Pratik168960/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/Pratik168960/subscriptions",
  "organizations_url": "https://api.github.com/users/Pratik168960/orgs",
  "repos_url": "https://api.github.com/users/Pratik168960/repos",
  "events_url": "https://api.github.com/users/Pratik168960/events{/privacy}",
  "received_events_url": "https://api.github.com/users/Pratik168960/received_events",
  "type": "User",
  "user_view_type": "public",
  "site_admin": false,
  "name": "Pratik Singh",
  "company": null,
  "blog": "",
  "location": null,
  "email": null,
  "hireable": null,
  "bio": null,
  "twitter_username": "PratikSing14626",
  "public_repos": 14,
  "public_gists": 0,
  "followers": 2,
  "following": 2,
  "created_at": "2025-07-26T11:59:52Z",
  "updated_at": "2026-10-28T04:29:41Z"
}


app.get('/github', (req, res) => {
    // res.json() formats the object and sends it properly as an API response
    res.json(githubData)
})

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})