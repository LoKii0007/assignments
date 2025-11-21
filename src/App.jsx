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
              <Route path="projects" element={<Products />} />
              <Route path="online-courses" element={<Home />} />
            </Route>
            <Route path="/pages" element={<Layout />}>
              <Route path="user-profile" element={<Home />} />
              <Route path="account" element={<Home />} />
              <Route path="corporate" element={<Home />} />
              <Route path="blog" element={<Home />} />
              <Route path="social" element={<Home />} />
            </Route>
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
