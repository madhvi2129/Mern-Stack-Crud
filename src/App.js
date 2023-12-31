import logo from './logo.svg';
import './App.css';
import Home from './components/Home';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NewUser from './components/NewUser';
import Updateform from './components/Updateform';

function App() {
  return (
    <div>
   
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<Home/>}/>
    <Route path="/addnew" element={<NewUser/>}/>
    <Route path="/update/:id" element={<Updateform/>}/>
   </Routes>
   </BrowserRouter>

    </div>
  );
}

export default App;
