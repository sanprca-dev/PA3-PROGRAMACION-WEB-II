import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { SolicitudesProvider } from './context/SolicitudesContext';
import { store } from './store/store';
import App from './App';
import './styles.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SolicitudesProvider><App /></SolicitudesProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
