import { BrowserRouter, Routes } from 'react-router-dom';
import customerRoutes from './routes/CustomerRoutes';
import adminRoutes from './routes/AdminRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {customerRoutes}
        {adminRoutes}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
