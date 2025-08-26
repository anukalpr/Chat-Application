import React from 'react';
import Left from '../components/left/Left';
import Right from '../components/right/Right';

function Home() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Left />
      <Right />
    </div>
  );
}

export default Home;
