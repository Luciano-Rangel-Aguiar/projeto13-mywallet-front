import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Wallet from './Components/Wallet'
import Deposit from './Components/Deposit'
import Withdrawal from './Components/Withdrawal'
import UserContext from './contexts/UserContext.js'
import { useState } from 'react'

export default function App() {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Signup />} />
          <Route path="/carteira" element={<Wallet />} />
          <Route path="/deposito" element={<Deposit />} />
          <Route path="/saque" element={<Withdrawal />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}
