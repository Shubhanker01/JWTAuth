import Signup from "./components/Signup"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "../src/App.css"
import Login from "./components/Login"
import StatusAlert from 'react-status-alert'
import 'react-status-alert/dist/status-alert.css'
function App() {


  return (
    <>
      <StatusAlert />
      <Router>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>

    </>
  )
}

export default App
