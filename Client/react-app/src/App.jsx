import Signup from "./components/Signup"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "../src/App.css"
import Login from "./components/Login"
import StatusAlert from 'react-status-alert'
import 'react-status-alert/dist/status-alert.css'
import Redirect from "./components/Redirect"
import MainApp from "./components/MainApp"
import ForgotPassword from "./components/ForgotPassword"
import Displayposts from "./components/Displayposts"
import Profile from "./components/Profile"

function App() {

  return (
    <>
      <StatusAlert />
      <Router>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/redirect" element={<Redirect/>}></Route>
          <Route path="/main-app" element={<MainApp/>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
          <Route path="/display-posts" element={<Displayposts></Displayposts>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
        </Routes>
      </Router>

    </>
  )
}

export default App
