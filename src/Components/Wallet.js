import { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import axios from 'axios'

function Wallet() {
  const { user } = useContext(UserContext)
  const [transactions, setTransactions] = useState([])
  const nav = useNavigate()

  useEffect(() => {
    async function getUserTransaction() {
      try {
        const { data } = await axios.get('http://localhost:5000/wallet', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        console.log(data)
        setTransactions(data)
      } catch (error) {
        alert('Ops! Infelizmente aconteceu um erro! Tente novamente!')
        console.error(error.response)
      }
    }

    getUserTransaction()
  }, [])

  function renderizaTransacoes() {
    return transactions.map((t, index) => (
      <h5
        key={index}
        style={t.type === 'credit' ? { color: 'green' } : { color: 'red' }}
      >
        {t.createAt} | {t.description} | {t.value}
      </h5>
    ))
  }

  function pegaSaldo() {
    if (transactions.length > 0) {
      return transactions.reduce((previous, current) => {
        if (current.type === 'credit') {
          return previous + Number(current.value)
        }

        return previous - Number(current.value)
      }, 0)
    } else {
      return 0
    }
  }

  const saldo = pegaSaldo()

  return (
    <Content>
      <Header>
        <h1>{`Olá, ${user.username}`}</h1>
        <ion-icon name="exit-outline" onClick={() => nav('/')} />
      </Header>
      <StyledWallet>
        {transactions.length > 0 ? (
          <div className="wallet">
            <p style={{ color: 'gray', fontSize: 20 }}>Minhas transacoes</p>
            <div>{renderizaTransacoes()}</div>
            <h4>Saldo: {saldo}</h4>
          </div>
        ) : (
          <span style={{ color: 'gray', fontSize: 20 }}>
            não há registros de entrada e saída
          </span>
        )}
      </StyledWallet>
      <Buttons>
        <Button onClick={() => nav('/deposito')}>
          <ion-icon name="add-circle-outline" />
          <p>Nova entrada</p>
        </Button>
        <Button onClick={() => nav('/saque')}>
          <ion-icon name="remove-circle-outline" />
          <p>Nova saída</p>
        </Button>
      </Buttons>
    </Content>
  )
}

export default Wallet
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  h1 {
    margin-left: 24px;
    font-family: 'Raleway';
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;

    color: #ffffff;
  }
  ion-icon {
    margin-right: 24px;
    width: 25px;
    height: 25px;
    background-color: #8c11be;
    color: #ffffff;
  }
`
const StyledWallet = styled.div`
  margin-bottom: 7px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 326px;
  height: 446px;

  font-family: 'Raleway';

  background: #ffffff;
  border-radius: 5px;

  p {
    width: 180px;
    height: 46px;

    font-family: 'Raleway';
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;

    color: #868686;
  }
`
const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Button = styled.div`
  margin: 7px;
  width: 155px;
  height: 114px;

  background: #a328d6;
  border-radius: 5px;
  ion-icon {
    margin: 5px;
    width: 25px;
    height: 25px;
    border-radius: 100%;
    background-color: #a328d6;
    color: #ffffff;
  }

  p {
    margin-top: 30px;
    margin-left: 10px;
    width: 44px;
    height: 40px;

    font-family: 'Raleway';
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;

    color: #ffffff;
  }
`
