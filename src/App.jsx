
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Forgotpassword from './Pages/Forgotpassword';
import CreatenewPassword from './Pages/CreatenewPassword';
import Home from './Pages/Home';
import Editprofile from './Components/Editprofile';
import ViewProfile from './Components/ViewProfile';
function App() {
  const RequireAuth = ({ children }) => {
    const currentUser = localStorage.getItem("userId");
    return currentUser?.length>0 && currentUser !=undefined  ? children : <Navigate to="/login" />;
  };

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
              <Route path="" element={<RequireAuth><Home /></RequireAuth>} />
              <Route path="myAccount" element={<RequireAuth><Home /></RequireAuth>} />
              </Route>
             
              <Route path="/editprofile/:id" element={<RequireAuth><Editprofile /></RequireAuth>} />
              <Route path="/viewprofile/:id" element={<ViewProfile />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App
