import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/home/loginRegister/Login';
import Register from './components/home/loginRegister/Register';
import AdminPage from './components/admin/AdminPage';
import AddNews from './components/admin/addNews/AddNews';
import AdminDetails from './components/admin/adminDetails/AdminDetails'
import EditAdminDetails from './components/admin/editAdminDetails/EditAdminDetails';


function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/admin/*' element={<AdminPage />}>
        <Route exact path='news' element={<AddNews />} />
        <Route exact path='admindetails' element={<AdminDetails />} />
        <Route exact path='admindetails/editadmindetails' element={<EditAdminDetails />} />
        </Route>                                          {/*nesting route*/}
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />


      </Routes>
    </div>
  );
  
}

export default App;
