import Signup from "./components/Signup"
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import "../src/App.css"
import Login from "./components/Login"
function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </Router>
        
    </>
  )
}

export default App
