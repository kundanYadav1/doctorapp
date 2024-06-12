import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/home/loginRegister/Login';


function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />}/>
      </Routes>  
    </div>
  );
}

export default App;
