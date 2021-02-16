import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import KindergartenForm from '../Components/KindergartenForm';

import './style.css';

const App = () => (
  <Router>
    <KindergartenForm
      dorpListOptions={[{ value: 'غزة', id: 1, disabled: false }]}
    />
  </Router>
);

export default App;
