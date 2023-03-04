import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Cell,
  Pie,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import config from "../config/config";
import "../styles/Analytics.css";

function Analytics() {
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [expensesPie, setExpensesPie] = useState([]);
  const [inventory, setInventory] = useState([]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  useEffect(() => {
    async function fetchSalesData() {
      const res = await fetch(`${config.backendUrl}/api/sales`);
      const data = await res.json();
      setSales(data);
    }
    fetchSalesData();
  }, []);

  useEffect(() => {
    async function fetchExpensesData() {
      const res = await fetch(`${config.backendUrl}/api/expenses`);
      const data = await res.json();
      setExpenses(data);
    }
    fetchExpensesData();
  }, []);

  useEffect(() => {
    async function fetchExpensesPieData() {
      const res = await fetch(`${config.backendUrl}/api/expenses-pie`);
      if (res.ok) {
        const data = await res.json();
        setExpensesPie(data);
      } else {
        console.error("Failed to fetch expenses pie data");
      }
    }
    fetchExpensesPieData();
  }, []);

  useEffect(() => {
    async function fetchConsumablesData() {
      const res = await fetch(`${config.backendUrl}/api/consumables`);
      const data = await res.json();
      setInventory(data);
    }
    fetchConsumablesData();
  }, []);

  function CustomLegend({ payload }) {
    return (
      <div style={{ display: "flex" }}>
        {payload.map((entry) => {
          return (
            <div key={entry.value} style={{ marginRight: "10px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  marginRight: "8px",
                  backgroundColor: entry.color,
                }}
              />
              <span>
                {entry.value}: {entry.payload.name}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  const PieLegend = ({ payload }) => (
    <ul style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      {payload.map(({ value, color, payload }, index) => (
        <li
          key={index}
          style={{ display: "flex", alignItems: "center", marginTop: "0.5rem" }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: color,
              borderRadius: "50%",
              marginRight: "0.5rem",
            }}
          />
          <span>{payload.name}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="analytics-container">
      <div className="line-chart">
        <h1>Sales Analytics</h1>
        <LineChart
          width={600}
          height={300}
          data={sales}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line
            type="monotone"
            dataKey="totalAmount"
            stroke="#ff7300"
            yAxisId={0}
          />
        </LineChart>
      </div>

      <div className="bar-chart">
        <h1>Expenses Analytics</h1>
        <BarChart
          width={600}
          height={300}
          data={expenses}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="description" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </div>

      <div className="pie-chart">
        <h1>Expenses Pie Analytics</h1>
        {expensesPie ? (
          <PieChart width={600} height={400}>
            <Pie
              data={expensesPie}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={160}
              fill="#8884d8"
              label
            >
              {expensesPie.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend content={<PieLegend />} />
          </PieChart>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <div className="consumables-bar-chart">
        <h1>Consumables Analytics</h1>
        <BarChart
          width={600}
          height={300}
          data={inventory}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="currentLevel" fill="#8884d8" />
          <Bar dataKey="minThreshold" fill="#82ca9d" />
          <Legend content={<CustomLegend />} />
        </BarChart>
      </div>
    </div>
  );
}

export default Analytics;
