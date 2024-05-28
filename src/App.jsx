
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Forgotpassword from './Pages/Forgotpassword';
import CreatenewPassword from './Pages/CreatenewPassword';
import Home from './Pages/Home';
import Editprofile from './Components/Editprofile';
import ViewProfile from './Components/ViewProfile';
function App() {


  return (
    <>
      <Router>
        <div className='app'>
          <div className='screen'>
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot" element={<Forgotpassword />} />
              <Route path="/newpassword" element={<CreatenewPassword />} />
              <Route path="/home">
              <Route path="" element={<Home />} />
              <Route path="myAccount" element={<Home />} />
              </Route>
             
              <Route path="/editprofile" element={<Editprofile />} />
              <Route path="/viewprofile" element={<ViewProfile />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App
