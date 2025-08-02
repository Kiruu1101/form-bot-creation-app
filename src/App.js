import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Loginpage from "./Pages/Loginpage";
import Registerpage from "./Pages/Registerpage";
import WorkspacePage from "./Pages/WorkspacePage";
import FormbotPage from "./Pages/FormbotPage";
import SettingPage from "./Pages/SettingPage";
import ProtectedRoute from "./Component/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/workspace"
          element={<ProtectedRoute Component={WorkspacePage} />}
        />
        <Route
          path="/forms/:formName"
          element={<ProtectedRoute Component={FormbotPage} />}
        />
        <Route
          path="/setting"
          element={<ProtectedRoute Component={SettingPage} />}
        />

        {/* fallback route */}
        <Route path="*" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
