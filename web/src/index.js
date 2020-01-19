//O React será importado em todo arquivo que for usar html
import React from 'react';
//React DOM permite a comunicação com a árvore de elementos da aplicação /HTML/
import ReactDOM from 'react-dom';
//tipo o conteudo html a ser renderizado (injetado).
import App from './App';


ReactDOM.render(<App />, document.getElementById('root'));