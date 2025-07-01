import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Dashboard from "pages/dashboard";
import EmployeeRegistration from "pages/employee-registration";
import MyRides from "pages/my-rides";
import FindRides from "pages/find-rides";
import OfferRide from "pages/offer-ride";
import RideDetails from "pages/ride-details";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/employee-registration" element={<EmployeeRegistration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-rides" element={<MyRides />} />
        <Route path="/find-rides" element={<FindRides />} />
        <Route path="/offer-ride" element={<OfferRide />} />
        <Route path="/ride-details" element={<RideDetails />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;