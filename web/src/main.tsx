import React from 'react'
import ReactDOM from 'react-dom'

import "./Styles/global.css";

import {App} from './App';



import { AuthPorvider } from './Contexts/auth';

ReactDOM.render(
  <React.StrictMode>
    <AuthPorvider>
    <App />
    </AuthPorvider>
  </React.StrictMode>,
  document.getElementById('root')
)
