import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './containers/Home/home.component';
import NotFound from './containers/NotFound/not-found.comonent';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import 'react-data-grid/lib/styles.css';
import Metadata from './containers/MetaData/metadata.component';
import Upload from './containers/Upload/upload.component';

const App = () => {
  return (
    <>
      <ToastContainer position='top-right' autoClose={3000} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/metadata' element={<Metadata />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='*' element={<NotFound />} />{' '}
        {/* Catch-all for undefined routes */}
      </Routes>
    </>
  );
};

export default App;
