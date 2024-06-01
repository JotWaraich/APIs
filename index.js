const express = require("express");

const app = express();
const port = 2001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const QRCode = require("qrcode");
app.get("/api/qrcode", async (req, res) => {
  try {
    const url = req.query.url || "https://example.com";
    const qrCodeImage = await QRCode.toDataURL(url);
    res.send(
      `<img src="${qrCodeImage}" alt="QR Code" style="height: 200px; width: 200px"/>`
    );
  } catch (err) {
    console.error("Error generating QR code:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
