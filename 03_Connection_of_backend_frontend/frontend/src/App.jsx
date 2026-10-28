import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [jokes, setJokes] = useState([])

  // Fetch the data as soon as the component loads
  useEffect(() => {
    // Notice we only fetch '/api/jokes', the Vite proxy appends the 'http://localhost:3000'
    axios.get('/api/jokes')
      .then((response) => {
        // Axios stores the JSON in response.data
        setJokes(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, []) // Empty dependency array means it runs once on mount

  return (
    <>
      <h1>Chai aur Full stack</h1>
      <p>JOKES: {jokes.length}</p>

      {/* Map over the jokes array and render them. Always provide a unique 'key' */}
      {jokes.map((joke) => (
        <div key={joke.id}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
      ))}
    </>
  )
}

export default App