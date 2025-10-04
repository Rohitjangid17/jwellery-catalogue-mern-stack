import { BrowserRouter, Routes } from 'react-router-dom';
import customerRoutes from './routes/CustomerRoutes';
import adminRoutes from './routes/AdminRoutes';
import authRoutes from './routes/AuthRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {customerRoutes}
        {adminRoutes}
        {authRoutes}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
