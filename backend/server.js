const express = require("express");
const cors = require("cors");
const supabase = require("./supabase");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "WhatsApp Appointment Reminder Backend Running"
  });
});

app.post("/appointments", async (req, res) => {
  const { name, phone, appointmentTime } = req.body;

  const { data, error } = await supabase
    .from("appointments")
    .insert([
      {
        name,
        phone,
        appointment_time: appointmentTime,
      },
    ]);

  if (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to save appointment",
    });
  }

  console.log(`
=================================
SIMULATED WHATSAPP MESSAGE
=================================
To: ${phone}

Hello ${name},

Your appointment has been confirmed.

Appointment Time: ${appointmentTime}

Thank you!
=================================
`);


  res.status(201).json({
    success: true,
    message: "Appointment saved successfully",
    data,
  });
});


app.get("/appointments", async (req, res) => {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
    });
  }

  res.json({
    success: true,
    appointments: data,
  });
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});