import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function Signup() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  return (
    <Content>
      <h1>MyWallet</h1>

      <input
        type="text"
        placeholder="nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="text"
        placeholder="Confirme a senha"
        value={confirmation}
        onChange={(e) => setConfirmation(e.target.value)}
      />

      <Button onClick={() => register()}>Cadastrar</Button>

      <p onClick={() => nav("/")}>Já tem uma conta? Entre agora!</p>
    </Content>
  );

  function register() {
    if (password === confirmation) {
      axios
        .post("http://localhost:5000/", {
          name: name,
          email: email,
          password: password
        })
        .then((response) => {
          console.log("cadastro efetuado");
          nav("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else alert("As senhas não são iguais. Tente novamente.");
  }
}

const Content = styled.div`
  background-color: #8c11be;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    padding-top: 95px;
    padding-bottom: 25px;
    font-family: "Saira Stencil One";
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
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;

    color: #ffffff;
  }
`;
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
`;
