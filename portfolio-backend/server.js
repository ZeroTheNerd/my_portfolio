const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 5001;

// Middleware
app.use(cors()); // allow requests from frontend
app.use(express.json()); // parse incoming JSON

// --- API ROUTES ---
// Example route (replace with your real data or load from apiRoutes.js later)
// app.get('/api/projects', (req, res) => {
//   res.json([
//     {
//       id: 1,
//       name: 'Tanuki Hunt: Swiped Spritis',
//       description: 'A stealth platformer made in Unity for the Ludem Dare 56 game jam',
//       url: 'https://lunaruu.itch.io/tanuki-hunt-stolen'
//     },
//     {
//       id: 2,
//       name: 'PC Builder Simulator',
//       description: 'A qt app created in c++ as a final project for my Software Development 2 class',
//       url: 'https://github.com/ZeroTheNerd/pc_builder_simulator'
//     },
//     {
//       id: 3,
//       name: 'Dream Scape',
//       description: 'An FPS shooter that I developed with a few other engineers for one of my Universities game jams',
//       url: 'https://almitytuhm.itch.io/dream-scape'
//     }
//   ]);
// });

// --- PRODUCTION SETUP ---
// Serve frontend's build folder if it's been built
app.use(express.static(path.join(__dirname, "../portfolio-frontend/build")));

// All other GET requests not handled by API routes will return React's index.html
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../portfolio-frontend/build", "index.html")
  );
});

app.get("/", (req, res) => {
  res.send("Hello from the Node.js backend!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
