import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from './pages/MainPage'
import Dashboard from './pages/Dashboard'
import { useState } from "react";
import { ThemeContext } from "./context/index";

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{theme, saveTheme: setTheme}} >
      <div data-theme={theme}>
        <Router>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
