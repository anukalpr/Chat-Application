import {  } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from "./context/authContext.jsx"
import SocketProvider from "./context/socketContext.jsx";
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SocketProvider>
        <App />
    </SocketProvider>
  </AuthProvider>
);


