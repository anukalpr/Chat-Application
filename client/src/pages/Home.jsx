import React from 'react';
import Left from '../components/left/Left';
import Right from '../components/right/Right';

const Home = () => {
  return (
    <div className="flex h-screen">
      <Left />
      <Right />
    </div>
  );
};

export default Home;
