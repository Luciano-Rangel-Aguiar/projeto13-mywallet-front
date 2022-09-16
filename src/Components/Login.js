import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { useState, useContext } from 'react'

import UserContext from '../contexts/UserContext'

export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setUser } = useContext(UserContext)
  return (
    <Content>
      <h1>MyWallet</h1>

      <input
        type="text"
        placeholder="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <Button onClick={() => login()}>Entrar</Button>

      <p onClick={() => nav('/cadastro')}>Primeira vez? Cadastre-se!</p>
    </Content>
  )
  async function login() {
    try {
      const { data } = await axios.post('http://localhost:5000/login', {
        email: email,
        password: password
      })

      setUser(data)
      nav('/carteira')
    } catch (error) {
      alert(error.message)
    }
  }
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    padding-top: 160px;
    padding-bottom: 25px;
    font-family: 'Saira Stencil One';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;

    color: #ffffff;
  }
  input {
    width: 326px;
    height: 58px;
    border-radius: 5px;
    margin-bottom: 13px;
    outline: none;
    font-weight: 400;
    font-size: 20px;

    background: #ffffff;
    color: #000000;
  }
  p {
    margin-top: 36px;
    padding-bottom: 200px;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;

    color: #ffffff;
  }
`
const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 326px;
  height: 46px;
  border-radius: 5px;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;

  background: #a328d6;
  color: #ffffff;
`
