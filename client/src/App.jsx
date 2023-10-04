import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Routes>
      <Route index element={<HomePage />}></Route>
    </Routes>
  );
};

export default App;
