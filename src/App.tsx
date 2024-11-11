import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from './pages/MainPage'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
