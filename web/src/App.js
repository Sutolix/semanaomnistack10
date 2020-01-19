import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './sidebar.css';
import './main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

//todo html que entrar dentro desse return será exibido na tela
function App() {
  const [devs, setDevs] = useState([]);

  //useEffect dispara a função toda vez que uma informação alterar
  //Carrega os devs
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      //pega os dados que vierem da api
      setDevs(response.data);
    }

    //chama a função
    loadDevs();

  }, []);

  async function handleAddDev(data) {

    const response = await api.post('/devs', data)

    //adição de novo dev cadastrado pegando valor antigo e adicionando o novo
    setDevs([...devs, response.data]);
  }


  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            //devs a serem exibidos
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;