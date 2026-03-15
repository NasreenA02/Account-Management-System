import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Statement from "./pages/Statement";
import { AuthProvider } from "./context/AuthContext";

function App() {

  return (
    <AuthProvider>

      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/statement" element={<Statement />} />

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;