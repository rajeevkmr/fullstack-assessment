import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Header from './components/Header/header.component';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <>
      <Header />
      <App />
    </>
  </BrowserRouter>
);
