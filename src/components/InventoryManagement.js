import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config/config";

import "../styles/InventoryManagement.css";

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    currentLevel: "",
    minThreshold: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${config.backendUrl}/api/inventory`);
      setInventory(result.data);
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await axios.post(`${config.backendUrl}/api/inventory`, formData);
    setInventory([...inventory, result.data]);
    setFormData({ name: "", currentLevel: "", minThreshold: "" });
  };

  const handleEdit = async (id) => {
    const inventoryItem = inventory.find((item) => item._id === id);
    setFormData(inventoryItem);
  };

  const handleUpdate = async (event, id) => {
    event.preventDefault();
    const result = await axios.put(`${config.backendUrl}/api/inventory/${id}`, formData);
    setInventory(
      inventory.map((item) => (item._id === id ? result.data : item))
    );
    setFormData({ name: "", currentLevel: "", minThreshold: "" });
  };
 

  const handleDelete = async (id) => {
    await axios.delete(`${config.backendUrl}/api/inventory/${id}`);

    setInventory(inventory.filter((item) => item._id !== id));
  };

  return (
    <div className="inventory-management-container">
      <h2 className="inventory-management-title">Inventory Management</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Current Level</th>
            <th>Minimum Threshold</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item._id} className="inventory-table-row">
              <td>{item.name}</td>
              <td>{item.currentLevel}</td>
              <td>{item.minThreshold}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(item._id)}>Edit</button>
                <button className="edit-button" onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={formData._id ? handleUpdate : handleSubmit}>
        <input
          className="form-input"
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          className="form-input"
          type="number"
          placeholder="Current Level"
          name="currentLevel"
          value={formData.currentLevel}
          onChange={handleChange}
        />
        <input
          className="form-input"
          type="number"
          placeholder="Minimum Threshold"
          name="minThreshold"
          value={formData.minThreshold}
          onChange={handleChange}
        />
        <button className="add-inventory-button" type="submit">{formData._id ? "Update" : "Add"}</button>
      </form>




    </div>
  );
};
export default InventoryManagement;