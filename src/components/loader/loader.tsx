import React from 'react';
import { Spinner } from 'reactstrap';

const Loader = () => {
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spinner color="success" />
    </div>
  );
};

export default Loader;