import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Analysis from './pages/Analysis';

const App = () => {
  return (
    <Routes>
      <Route path='/' index element={<HomePage />}></Route>
      <Route path='/analysis' index element={<Analysis />}></Route>
    </Routes>
  );
};

export default App;
