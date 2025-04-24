const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/update-data', (req, res) => {
  const { quality, sizing } = req.body;

  if (!quality || !sizing) {
    return res.status(400).json({ message: "Missing quality or sizing data." });
  }

  const updatedData = { quality, sizing };

  fs.writeFile('chart-data.json', JSON.stringify(updatedData, null, 2), (err) => {
    if (err) return res.status(500).json({ message: "Failed to save data." });
    res.status(200).json({ message: "Data updated successfully!" });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
