import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send("Missing ?url parameter");

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        "Referer": "https://readnovelfull.com",
        "Origin": "https://readnovelfull.com",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"
      }
    });

    res.set("Access-Control-Allow-Origin", "*");
    res.send(response.data);
  } catch (err) {
    res.status(500).send("Error fetching target: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy API running at http://localhost:${PORT}`);
});
