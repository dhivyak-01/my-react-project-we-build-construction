import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import './tailwind.css';
import "bootstrap/dist/css/bootstrap.min.css";
import SignupForm from "./pages/signup";
import Signin from "./pages/signin";
import About from "./pages/about";
import Service from "./pages/Service";
import Project from "./pages/Project";
import TheTeam from "./pages/TheTeam"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestimonialHeader from "./pages/Testimonial";
import Bloggrid from "./pages/BlogGrid";
import Blogdetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Adminlogin from "./admin/adminlogin";
import Admin from "./admin/admin"
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';
import { createStore } from "redux";
import { Provider } from "react-redux";
import cartReducer from "./redux/reducers/cartReducer";
import CartPage from './pages/CartPage';
const store = createStore(cartReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route path="/admin" element={<ProtectedRoute component={Admin} />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/project" element={<Project />} />
        <Route path="/team" element={<TheTeam />} />
        <Route path="/testimonial" element={<TestimonialHeader />} />
        <Route path="/blog" element={<Bloggrid />} />
        <Route path="/detail" element={<Blogdetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  </AuthProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
