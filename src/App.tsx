import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Activities from './pages/Activities';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import ActivityList from './pages/dashboard/ActivityList';
import AddActivity from './pages/dashboard/AddActivity';
import EditActivity from './pages/dashboard/EditActivity';
import DeleteActivity from './pages/dashboard/DeleteActivity';
import TestConnection from './pages/dashboard/TestConnection';
import MigrateData from './pages/dashboard/MigrateData';
import Orders from './pages/dashboard/Orders';
import Charts from './pages/dashboard/Charts';
import Login from './pages/Login';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="activities" replace />} />
            <Route path="activities" element={<ActivityList />} />
            <Route path="add-activity" element={<AddActivity />} />
            <Route path="edit-activity/:id" element={<EditActivity />} />
            <Route path="delete-activity/:id" element={<DeleteActivity />} />
            <Route path="migrate-data" element={<MigrateData />} />
            <Route path="orders" element={<Orders />} />
            <Route path="test-connection" element={<TestConnection />} />
            <Route path="charts" element={<Charts />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App; 