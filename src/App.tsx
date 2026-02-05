import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Layout>
            <AppRoutes />
          </Layout>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;