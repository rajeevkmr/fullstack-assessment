import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Header from './components/Header/header.component';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <>
      <Header />
      <App />
    </>
  </BrowserRouter>
);
