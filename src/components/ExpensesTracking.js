import React, { useState, useEffect } from "react";
import "../styles/ExpensesTracking.css";

function ExpensesTracking() {
  const [expenses, setExpenses] = useState([]);
    const [formData, setFormData] = useState({
      date: new Date(),
      description: "",
      amount: "",
    });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/expenses");
      const data = await response.json();
      setExpenses(data);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleDeleteExpense(id) {
    await fetch(`/api/expenses/${id}`, {
      method: "DELETE",
    });
    const updatedExpenses = expenses.filter((expense) => expense._id !== id);
    setExpenses(updatedExpenses);
  }

  async function handleAddExpense(e) {
    e.preventDefault();
    const response = await fetch("/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const newExpense = await response.json();
    setExpenses([...expenses, newExpense]);
    setFormData({
      date: new Date(),
      description: "",
      amount: "",
    });
  }
  

  async function handleUpdateExpense(expense) {
    const response = await fetch(`/api/expenses/${expense._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });
    const updatedExpense = await response.json();
    const updatedExpenses = expenses.map((exp) =>
      exp._id === expense._id ? updatedExpense : exp
    );
    setExpenses(updatedExpenses);
  }

  let totalExpenses = 0;
  expenses.forEach((expense) => {
    totalExpenses += expense.amount;
  });

  return (
    <div className="expenses-tracking-container">
      <h2 className="expenses-tracking-title">Expenses Tracking</h2>
      <table>
        <thead className="expenses-tracking-table">
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>
                <button onClick={() => handleDeleteExpense(expense._id)}>
                  Delete
                </button>
                <button onClick={() => handleUpdateExpense(expense)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleAddExpense} className="expenses-tracking-form">
        <input
          type="date"
          placeholder="Date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>

      <p className="total-expenses">Total Expenses: {totalExpenses}</p>
    </div>
  );
}

export default ExpensesTracking;
