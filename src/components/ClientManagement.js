import React, { useState, useEffect } from "react";
import "../styles/ClientManagement.css";

function ClientManagement() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/clients");
      const data = await response.json();
      setClients(data);
    }
    fetchData();
  }, []);

  const handleEdit = async (id) => {
    const response = await fetch(`/api/clients/${id}`);
    const data = await response.json();
    console.log(data);
    // code to update the form with the client data
  };

  const handleDelete = async (id) => {
    await fetch(`/api/clients/${id}`, {
      method: "DELETE",
    });
    const updatedClients = clients.filter((client) => client.index !== id);
    setClients(updatedClients);
  };

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    family_size: "",
    consumption: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setClients([...clients, data]);
    setFormData({
      name: "",
      phoneNumber: "",
      address: "",
      family_size: "",
      consumption: "",
    });
  };

  return (
    <div className="client-management">
      <h1 className="client-management__title">Client Management</h1>
      <table className="client-management__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Family Size</th>
            <th>Consumption Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.index}>
              <td>{client.name}</td>
              <td>{client.phoneNumber}</td>
              <td>{client.address}</td>
              <td>{client.family_size}</td>
              <td>{client.consumption}</td>
              <td>
                <button
                  className="client-management__edit-btn"
                  onClick={() => handleEdit(client.index)}
                >
                  Edit
                </button>
                <button
                  className="client-management__delete-btn"
                  onClick={() => handleDelete(client.index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="client-management__add-title">Add Client</h2>
      <form className="client-management__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="family_size"
          placeholder="Family Size"
          value={formData.family_size}
          onChange={handleChange}
        />
        <input
          type="text"
          name="consumption"
          placeholder="Consumption Rate"
          value={formData.consumption}
          onChange={handleChange}
        />
        <button type="submit">Add </button>
      </form>
    </div>
  );
}

export default ClientManagement;
