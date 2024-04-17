import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';





ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    // <App />,
  // </React.StrictMode>,
  <GoogleOAuthProvider clientId="848914083070-4ufmt91eelrr7bh348jtfprsdba6fihu.apps.googleusercontent.com">
    <React.StrictMode>
    <Router>
      <App />
    </Router>
    </React.StrictMode>
  </GoogleOAuthProvider>
    
  
  
  
);

//reportWebVitals();
