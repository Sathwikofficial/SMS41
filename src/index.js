import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './login';
import StudentHome from './studenthome';
import CounsellorHome from './counsellorhome';
import AdminHome from './adminhome';
import AddStudent from './addstudent';
import ViewStudent from './viewstudent'
import ViewCounsellor from './viewcounsellor'
import AddCounsellor from './addcounsellor';
import DeleteStudent from './deletestudent';
import AHome from './ahome';
import SHome from './shome';
import SChangePassword from './schangepassword';
import SMyProfile from './smyprofile';

import {BrowserRouter, Routes, Route} from 'react-router-dom'


function Website(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
          <Route path="/studenthome" element={<StudentHome/>} />
          <Route path="/counsellorhome" element={<CounsellorHome/>} />
          <Route path="/adminhome" element={<AdminHome/>} />
          <Route path="/ahome" element={<AHome/>}/>
          <Route path="/shome" element={<SHome/>}/>
          <Route path="/addstudent" element={<AddStudent/>}/>
          <Route path="/viewstudent" element={<ViewStudent/>}/>
          <Route path="/deletestudent" element={<DeleteStudent/>}/>
          <Route path="/viewcounsellor" element={<ViewCounsellor/>}/>
          <Route path="/addcounsellor" element={<AddCounsellor/>}/>
          <Route path="/schangepassword" element={<SChangePassword/>}/>
          <Route path="/smyprofile" element={<SMyProfile/>}/>
          
      </Routes>
    </BrowserRouter>

    
  );
}

ReactDOM.render(<Website/>, document.getElementById('root'));