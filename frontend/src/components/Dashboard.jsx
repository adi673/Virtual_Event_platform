import React from 'react'
import { useContext } from 'react'
import AuthContext from '../hooks/AuthContext'
function Dashboard() {
    const {token}=useContext(AuthContext)
  return (
    <div>
      {/* {token} */}
      <h2>Dashboard</h2>
    </div>
  )
}

export default Dashboard
