import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/navbar";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Navbar />
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;