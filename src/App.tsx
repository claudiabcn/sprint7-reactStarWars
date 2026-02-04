import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;