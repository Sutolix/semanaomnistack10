import React from 'react';
import { StatusBar, YellowBox } from 'react';

import Routes from './src/routes';

//Pra tirar a mensagem amarela de aviso que aparece
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7"/>
      <Routes />
    </>
  );
}