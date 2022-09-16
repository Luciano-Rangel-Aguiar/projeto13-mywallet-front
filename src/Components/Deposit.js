import axios from 'axios'
import styled from 'styled-components'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import UserContext from '../contexts/UserContext'

export default function Withdrawal() {
  const nav = useNavigate()
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')
  const { user } = useContext(UserContext)

  return (
    <>
      <Header>
        <h1>Nova Entrada</h1>
      </Header>
      <Content>
        <input
          type="number"
          placeholder="Valor"
          min="0.01"
          step="0.01"
          pattern="\d*"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <Button onClick={() => save()}>Salvar Entrada</Button>
      </Content>
    </>
  )
  function save() {
    axios
      .post(
        'http://localhost:5000/insert',
        {
          type: 'credit',
          value: value,
          description: description
        },
        {
          headers: {
            authorization: 'Bearer ' + user.token
          }
        }
      )
      .then(() => {
        nav('/carteira')
      })
      .catch(error => {
        alert(error.message)
      })
  }
}

const Header = styled.div`
  position: fixed;
  top: 0px;
  left: 15px;
  width: 100%;
  h1 {
    padding-top: 25px;
    padding-top: 25px;
    padding-bottom: 40px;
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;

    color: #ffffff;
  }
`
const Content = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
