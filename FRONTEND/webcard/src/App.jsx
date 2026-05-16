import React from 'react'
import {Routes, Route } from 'react-router-dom';
import Input from './components/LHS/input';
import Lock_icon from './components/RHS/lock_icon';
import Result from './pages/result';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={
    <div className='mainFrame h-screen w-screen flex flex-col'>
      <div className='innerFrame lg:h-4/6 w-2/3 flex flex-col lg:flex-row'>
        <Input/>
        <Lock_icon/>
      </div>
    </div>
      }/>
      <Route path='/result' element={<Result/>} />
    </Routes>
  )
}

export default App
