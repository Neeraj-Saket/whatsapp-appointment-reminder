import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    appointmentTime: "",
  });

  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/appointments"
      );

      const data = await response.json();

      setAppointments(data.appointments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      alert(data.message);

      // Dashboard refresh
      fetchAppointments();

      // Form clear
      setFormData({
        name: "",
        phone: "",
        appointmentTime: "",
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>WhatsApp Appointment Reminder</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Phone Number</label>
          <br />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Appointment Time</label>
          <br />
          <input
            type="datetime-local"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <button type="submit">
          Save Appointment
        </button>
      </form>

      <hr />

      <h2>Appointments Dashboard</h2>
       {appointments.map((appointment, index) => (
      <div
          key={appointment.id}
          className={`appointment-card ${index % 2 === 0 ? "me" : ""}`}
        >   
          <p>
            <strong>Name:</strong> {appointment.name}
          </p>

          <p>
            <strong>Phone:</strong> {appointment.phone}
          </p>

          <p>
            <strong>Appointment:</strong>{" "}
            {appointment.appointment_time}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;