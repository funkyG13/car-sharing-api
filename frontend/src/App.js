import React from 'react';
import LoginPage from './components/General/LoginPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import RoleBasedRoute from './components/General/RoleBasedRoute';
import NotAuthorized from "./components/General/NotAutorized";
import Register from './components/General/Register.js';
import VehiclesOwner from "./components/Owner/VehiclesOwner";
import RequestOwner from "./components/Owner/RequestOwner";
import RequestRenter from "./components/Renter/RequestRenter";
import VehiclesRenter from "./components/Renter/VehiclesRenter";

export default function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />

            <Route path="/owner" element={<RoleBasedRoute role="OWNER"><VehiclesOwner /></RoleBasedRoute>} />
            <Route path="/owner/vehicles" element={<RoleBasedRoute role="OWNER"><VehiclesOwner /></RoleBasedRoute>} />
            <Route path="/owner/requests" element={<RoleBasedRoute role="OWNER"><RequestOwner /></RoleBasedRoute>} />

            <Route path="/renter" element={<RoleBasedRoute role="RENTER"><VehiclesRenter /></RoleBasedRoute>} />
            <Route path="/renter/vehicles" element={<RoleBasedRoute role="RENTER"><VehiclesRenter /></RoleBasedRoute>} />
            <Route path="/renter/requests" element={<RoleBasedRoute role="RENTER"><RequestRenter /></RoleBasedRoute>} />

            <Route path="/not-authorized" element={<NotAuthorized />} />
          </Routes>
        </Router>
      </div>
  );
}