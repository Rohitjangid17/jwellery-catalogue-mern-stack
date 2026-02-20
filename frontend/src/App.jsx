import { BrowserRouter, Routes } from 'react-router-dom';
import customerRoutes from './routes/CustomerRoutes';
import AuthRoutes from './routes/AuthRoutes';
import AdminRoutes from './routes/AdminRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {customerRoutes}
        {AuthRoutes}
        {AdminRoutes}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
