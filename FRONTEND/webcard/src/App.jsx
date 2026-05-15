import React from 'react'
import Input from './components/LHS/input'
import Lock_icon from './components/RHS/lock_icon'

const App = () => {
  return (
    <div className='mainFrame h-screen w-screen flex flex-col'>
      <div className='innerFrame lg:h-4/6 w-2/3 flex flex-col lg:flex-row'>
        <Input/>
        <Lock_icon/>
      </div>
    </div>
  )
}

export default App
