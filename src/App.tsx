import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/auth/context/AuthContext";
import Layout from "./shared/components/layout";
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