import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/Main'
import Room from './pages/Room'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={ Main } />
        <Route path='/chat/:id' Component={ Room } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
