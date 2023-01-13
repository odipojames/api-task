import React from 'react';
import {BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import {Header} from './components/header.jsx';
import {Footer} from './components/footer.jsx';
import {Home} from './components/home.jsx';



function AppRoutes(){
  return (
    <Router>
    <div>
<Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
    </Routes>

    </div>
    <Footer/>
    </Router>
  );
}


export default AppRoutes;
