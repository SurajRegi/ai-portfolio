const express = require("express");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
app.use(express.json());

// Rate limit: max 10 requests per minute per IP
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: "Too many requests. Please wait a moment." },
});

app.post("/api/chat", chatLimiter, async (req, res) => {
  const { contents } = req.body;

  if (!contents || !Array.isArray(contents)) {
    return res.status(400).json({ error: "Invalid request body." });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Gemini API error." });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
