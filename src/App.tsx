import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;