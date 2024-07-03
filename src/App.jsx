import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Forgotpassword from "./Pages/Forgotpassword";
import CreatenewPassword from "./Pages/CreatenewPassword";
import Home from "./Pages/Home";
import Editprofile from "./Components/Editprofile";
import ViewProfile from "./Components/ViewProfile";
import Qr from "./Pages/Qr";
import TagAssign from "./Pages/TagAssign";
function App() {
  const RequireAuth = ({ children }) => {
    const currentUser = localStorage.getItem("userId");
    return currentUser?.length > 0 && currentUser != undefined ? (
      children
    ) : (
      <Navigate to="/" />
    );
  };
  const RequireAuthhome = ({ children }) => {
    const currentUser = localStorage.getItem("userId");

    // If currentUser is found, redirect to "/create"
    if (currentUser) {
      return <Navigate to="/home" />;
    }

    // If no currentUser, render the children components
    return children;
  };
  return (
    <>
      <Router>
        <div className="app">
          <div className="screen">
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/"
                element={
                  <RequireAuthhome>
                    <Login />
                  </RequireAuthhome>
                }
              />
              <Route path="/forgot" element={<Forgotpassword />} />
              <Route path="/newpassword" element={<CreatenewPassword />} />
              <Route path="/qr/:id" element={<Qr />} />
              <Route path="/home">
                <Route
                  path=""
                  element={
                    <RequireAuth>
                      <Home />
                    </RequireAuth>
                  }
                />
                <Route
                  path=":tagUid"
                  element={
                    <RequireAuth>
                      <Home />
                    </RequireAuth>
                  }
                />

                <Route
                  path="myAccount"
                  element={
                    <RequireAuth>
                      <Home />
                    </RequireAuth>
                  }
                />
              </Route>

              <Route
                path="/editprofile/:id"
                element={
                  <RequireAuth>
                    <Editprofile />
                  </RequireAuth>
                }
              />
              <Route path="/assign/:tag" element={<TagAssign />} />
              <Route path="/viewprofile/:id" element={<ViewProfile />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
