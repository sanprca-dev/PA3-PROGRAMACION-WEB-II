import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { SolicitudesProvider } from './context/SolicitudesContext';
import App from './App';
import './styles.css';
createRoot(document.getElementById('root')).render(
  <StrictMode><BrowserRouter><SolicitudesProvider><App /></SolicitudesProvider></BrowserRouter></StrictMode>
);