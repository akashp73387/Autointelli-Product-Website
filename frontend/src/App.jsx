import React from "react";
import Navbar from "./Components/Navbar";
import HeadSection from "./Components/HeadSection";
import FeaturedApp from "./Components/FeaturedApp";
import CardSection from "./Components/CardSection";
import ControlSection from "./Components/ControlSection";
import PricingSection from "./Components/PricingSection";
import LogoSection from "./Components/LogoSection";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import AvailableApps from "./Pages/AvailableApps";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import TwoFactorAuthPage from "./Pages/TwoFactorAuthPage";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HeadSection />
                <FeaturedApp />
                <CardSection />
                <ControlSection />
                <PricingSection />
                <LogoSection />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/available-apps" element={<AvailableApps />} />
          <Route path="/TwoFactorAuth" element={<TwoFactorAuthPage />} />
          <Route
            path="//reset-password/:id/:token"
            element={<ResetPasswordPage />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
