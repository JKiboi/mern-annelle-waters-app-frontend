import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import DeliverySchedule from "./components/DeliverySchedule";
import ClientManagement from "./components/ClientManagement";
import InventoryManagement from "./components/InventoryManagement";
import SalesTracking from "./components/SalesTracking";
import ExpensesTracking from "./components/ExpensesTracking";
import Analytics from "./components/Analytics";

function App() {
  return (
    <Router>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/delivery-schedule" element={<DeliverySchedule />} />

          <Route path="/client-management" element={<ClientManagement />} />

          <Route path="/inventory-management" element={<InventoryManagement />}/>

          <Route path="/sales-tracking" element={<SalesTracking />} />

          <Route path="/expenses-tracking" element={<ExpensesTracking />} />

          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
