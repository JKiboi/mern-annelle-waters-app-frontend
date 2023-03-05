import React, { useState, useEffect } from "react";
import "../styles/DeliverySchedule.css";
import config from "../config/config";

function DeliverySchedule() {
  const [deliveries, setDeliveries] = useState([]);
  const [formData, setFormData] = useState({
    date: new Date(),
    name: "",
    phoneNumber: "",
    address: "",
    consumption: "",
    frequency: "",
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${config.backendUrl}/api/delivery-schedule`);
      const data = await response.json();
      setDeliveries(data);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleDeleteDelivery(id) {
    await fetch(`${config.backendUrl}/api/delivery-schedule/${id}`, {
      method: "DELETE",
    });
    const updatedDeliveries = deliveries.filter(
      (delivery) => delivery._id !== id
    );
    setDeliveries(updatedDeliveries);
  }

  async function handleAddDelivery(e) {
    e.preventDefault();
    const delivery = {
      ...formData,
      secondDelivery: calculateSecondDelivery(
        formData.date,
        formData.frequency
      ),
    };

    const response = await fetch(`${config.backendUrl}/api/delivery-schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(delivery),
    });
    const newDelivery = await response.json();
    setDeliveries([...deliveries, newDelivery]);
    setFormData({
      date: new Date(),
      name: "",
      phoneNumber: "",
      address: "",
      consumption: "",
      frequency: "",
    });
  }

  async function handleUpdateDelivery(delivery) {
    const updatedDelivery = {
      ...delivery,
      ...formData,
      secondDelivery: calculateSecondDelivery(formData.date, formData.frequency)
    };
    const response = await fetch(`${config.backendUrl}/api/delivery-schedule/${delivery._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDelivery),
    });
    const updatedDeliveryData = await response.json();
    const updatedDeliveries = deliveries.map((del) => del._id === updatedDeliveryData._id ? updatedDeliveryData : del);
    setDeliveries(updatedDeliveries);
  }
  

  const calculateSecondDelivery = (date, frequency) => {
    let secondDelivery;
    switch (frequency) {
      case "daily":
        secondDelivery = addDays(date, 1);
        break;
      case "weekly":
        secondDelivery = addDays(date, 7);
        break;
      case "biweekly":
        secondDelivery = addDays(date, 4);
        break;
      case "triweekly":
        secondDelivery = addDays(date, 3);
        break;
      case "bimonthly":
        secondDelivery = addDays(date, 15);
        break;
      case "monthly":
        secondDelivery = addDays(date, 30);
        break;
      default:
        secondDelivery = date;
        break;
    }
    return secondDelivery;
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const { date, name, phoneNumber, address, consumption, frequency } = formData;

  return (
    <div className="delivery-schedule">
      <h1 className="delivery-schedule__title">Delivery Schedule</h1>
      <table className="delivery-schedule__table">
        <thead className="delivery-schedule__table-head">
          <tr>
            <th className="delivery-schedule__table-head-cell">Date</th>
            <th className="delivery-schedule__table-head-cell">Name</th>
            <th className="delivery-schedule__table-head-cell">Phone Number</th>
            <th className="delivery-schedule__table-head-cell">Address</th>
            <th className="delivery-schedule__table-head-cell">Consumption</th>
            <th className="delivery-schedule__table-head-cell">Frequency</th>
            <th className="delivery-schedule__table-head-cell">
              Second Delivery
            </th>
            <th className="delivery-schedule__table-head-cell">Actions</th>
          </tr>
        </thead>
        <tbody className="delivery-schedule__table-body">
          {deliveries.map((delivery) => (
            <tr key={delivery._id}>
              <td className="delivery-schedule__table-body-cell">
                {new Date(delivery.date).toLocaleDateString()}
              </td>
              <td className="delivery-schedule__table-body-cell">
                {delivery.name}
              </td>
              <td className="delivery-schedule__table-body-cell">
                {delivery.phoneNumber}
              </td>
              <td className="delivery-schedule__table-body-cell">
                {delivery.address}
              </td>
              <td className="delivery-schedule__table-body-cell">
                {delivery.consumption}
              </td>
              <td className="delivery-schedule__table-body-cell">
                {delivery.frequency}
              </td>
              <td className="delivery-schedule__table-body-cell">
                {new Date(delivery.secondDelivery).toLocaleDateString()}
              </td>
              <td className="delivery-schedule__table-body-cell">
                <button
                  className="delivery-schedule__action-button"
                  onClick={() => handleUpdateDelivery(delivery)}
                >
                  Edit
                </button>
                <button
                  className="delivery-schedule__action-button"
                  onClick={() => handleDeleteDelivery(delivery._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form className="delivery-schedule__form" onSubmit={handleAddDelivery}>
        <input
          className="delivery-schedule__form-input"
          type="date"
          name="date"
          value={date}
          onChange={handleChange}
        />
        <input
          className="delivery-schedule__form-input"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          className="delivery-schedule__form-input"
          type="tel"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          className="delivery-schedule__form-input"
          type="text"
          name="address"
          value={address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          className="delivery-schedule__form-input"
          type="text"
          name="consumption"
          value={consumption}
          onChange={handleChange}
          placeholder="Consumption"
        />
        <select
          name="frequency"
          type="option"
          value={frequency}
          onChange={handleChange}
          className="delivery-schedule__form-input"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="biweekly">BiWeekly</option>
          <option value="triweekly">TriWeekly</option>
          <option value="bimonthly">BiMonthly</option>
          <option value="monthly">Monthly</option>
        </select>

        <button className="delivery-schedule__form-button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default DeliverySchedule;
