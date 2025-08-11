const express = require("express");
const cors = require('cors');
const path = require('path');
const app = express();
const port = 5000;

// Middleware
app.use(cors()); // allow requests from frontend
app.use(express.json()); // parse incoming JSON

// --- API ROUTES ---
// Example route (replace with your real data or load from apiRoutes.js later)
app.get('/api/projects', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Tanuki Hunt: Stolen',
      url: 'https://lunaruu.itch.io/tanuki-hunt-stolen'
    },
    {
      id: 2,
      name: 'Another Cool Project',
      url: 'https://github.com/zerothenerd'
    }
  ]);
});

// --- PRODUCTION SETUP ---
// Serve frontend's build folder if it's been built
app.use(express.static(path.join(__dirname, '../portfolio-frontend/build')));

// All other GET requests not handled by API routes will return React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../portfolio-frontend/build', 'index.html'));
});

app.get("/", (req, res) => {
  res.send("Hello from the Node.js backend!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
