import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './component/Home/Home/Home';
import Appointment from './component/Appointment/Appointment/Appointment';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import Dashboard from './component/Dashboard/Dashboard/Dashboard';
import AllPatients from './component/AllPatients/AllPatients';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
   <Router>
     <Switch>
       <Route exact path="/">
          <Home></Home>
       </Route>
       <Route exact path="/appointment">
          <Appointment></Appointment>
       </Route>
       <Route exact path="/dashboard/appointment">
         <Dashboard></Dashboard>
       </Route>
       <Route exact path="/dashboard/allpatients">
          <AllPatients></AllPatients>
       </Route>
       <Route exact path="/register">
          <Register></Register>
       </Route>
       <Route exact path="/login">
          <Login></Login>
       </Route>
     </Switch>
   </Router>
   </UserContext.Provider>
  );
}

export default App;
