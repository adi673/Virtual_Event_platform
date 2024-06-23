import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
function App() {
  const [post, SetPost] = useState('')

  useEffect(() => { 
    axios.get('/api/posts')
    .then(response => {
      console.log(response.data)
      SetPost(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  })
  
  return (
    <>
      <h1>{post}</h1>
      <h1>Hello Vite + React!</h1>
    </>
  )
}

export default App
