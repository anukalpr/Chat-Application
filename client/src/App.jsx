import { useState } from 'react'
import Left from './Home/Left/left'
import Right from './Home/Right/right'

function App() {
  return(
    <>
      <div className='flex h-screen'>
        <Left/>
        <Right/>
      </div>
    </>
  )
}

export default App
