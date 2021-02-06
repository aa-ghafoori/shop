import React, { Fragment } from 'react';
import './App.css';
import Purchases from './Purchases/Purchases';
import PurchaseForm from './Purchases/PurchaseForm';

const App = () => {
  return (
    <Fragment>
      <PurchaseForm />
      <Purchases />
      {/* Sales */}
      {/* Report */}
    </Fragment>
  );
};

export default App;
