import Layout from "./Layouts/Layout";
import "./App.css";
import { AppProvider } from "./context/AppContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./screens/Home";
import Products from "./screens/Products";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard/default" />} />
            <Route path="/dashboard" element={<Layout />}>
              <Route path="default" element={<Home />} />
              <Route path="ecommerce" element={<Home />} />
              <Route path="projects" element={<Home />} />
              <Route path="online-courses" element={<Home />} />
            </Route>
            <Route path="/pages" element={<Layout />}>
              <Route path="user-profile" element={<Products />} />
              <Route path="account" element={<Products />} />
              <Route path="corporate" element={<Products />} />
              <Route path="blog" element={<Products />} />
              <Route path="social" element={<Products />} />
            </Route>
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
