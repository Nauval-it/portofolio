const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Serve semua file di folder website
app.use(express.static(__dirname));

// Jika file tidak ditemukan → redirect ke 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "error404.html"));
});

app.listen(PORT, () => {
  console.log(`Server berjalan → http://localhost:${PORT}`);
});
