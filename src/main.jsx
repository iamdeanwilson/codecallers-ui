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
  <GoogleOAuthProvider clientId="1049693025889-kq9cae684vj2sg0o3tdelod6pof2lgo5.apps.googleusercontent.com">
    <React.StrictMode>
    <Router>
      <App />
    </Router>
    </React.StrictMode>
  </GoogleOAuthProvider>
    
  
  
  
);

//reportWebVitals();
