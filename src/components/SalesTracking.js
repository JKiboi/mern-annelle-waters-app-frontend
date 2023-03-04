import React, { useState, useEffect } from "react";
import "../styles/SalesTracking.css";
import config from '../config/config';


function SalesTracking() {
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [formData, setFormData] = useState({
    date: new Date(),
    clientName: "",
    consumption: "",
    totalAmount: "",
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${config.backendUrl}/api/sales`);
      const data = await response.json();
      setSales(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch(`${config.backendUrl}/api/expenses`);
        const data = await res.json();
        setExpenses(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleDeleteSale(id) {
    await fetch(`${config.backendUrl}/api/sales/${id}`, {
      method: "DELETE",
    });
    const updatedSales = sales.filter((sale) => sale._id !== id);
    setSales(updatedSales);
  }

  async function handleAddSale(e) {
    e.preventDefault();
    const response = await fetch(`${config.backendUrl}/api/sales`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const newSale = await response.json();
    setSales([...sales, newSale]);
    setFormData({
      date: new Date(),
      clientName: "",
      consumption: "",
      totalAmount: "",
    });
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/sales");
      const data = await response.json();
      setSales(data);
    }
    fetchData();
  }, [sales]);

  async function handleUpdateSale(sale) {
    const response = await fetch(`${config.backendUrl}/api/sales/${sale._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sale),
    });
    const updatedSale = await response.json();
    const updatedSales = sales.map((sale) =>
      sale._id === updatedSale._id ? updatedSale : sale
    );
    setSales(updatedSales);
  }

  let totalSales = 0;
  sales.forEach((sale) => {
    totalSales += sale.totalAmount;
  });

  let totalExpenses = 0;
  expenses.forEach((expense) => {
    totalExpenses += expense.amount;
  });
  const totalProfit = totalSales - totalExpenses;

  return (
    <div className="sales-tracking-container">
      <h2 className="sales-tracking-title">Sales Tracking</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Client Name</th>
            <th>Capacity (Litres)</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td>{new Date(sale.date).toLocaleDateString()}</td>
              <td>{sale.clientName}</td>
              <td>{sale.consumption}</td>
              <td>{sale.totalAmount}</td>
              <td>
                <button onClick={() => handleDeleteSale(sale._id)}>
                  Delete
                </button>
                <button onClick={() => handleUpdateSale(sale)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">Total:</td>
            <td>{totalSales}</td>
          </tr>
        </tfoot>
      </table>
      <form onSubmit={handleAddSale} className="sales-tracking_form">
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={formData.date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="clientName"
          placeholder="ClientName"
          value={formData.clientName}
          onChange={handleChange}
        />
        <input
          type="number"
          name="consumption"
          placeholder="Consumption"
          value={formData.consumption}
          onChange={handleChange}
        />
        <input
          type="number"
          name="totalAmount"
          placeholder="TotalAmount"
          value={formData.totalAmount}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
      <div className="sales-tracking__summary">
        <div className="sales-tracking__summary__total-sales">
          <span className="sales-tracking__summary__title">Total Sales:</span>
          <span className="sales-tracking__summary__amount">{totalSales}</span>
        </div>
        <div className="sales-tracking__summary__total-expenses">
          <span className="sales-tracking__summary__title">
            Total Expenses:
          </span>
          <span className="sales-tracking__summary__amount">
            {totalExpenses}
          </span>
        </div>
        <div className="sales-tracking__summary__profit">
          <span className="sales-tracking__summary__title">Total Profit:</span>
          <span className="sales-tracking__summary__amount">{totalProfit}</span>
        </div>
      </div>
    </div>
  );
}

export default SalesTracking;
