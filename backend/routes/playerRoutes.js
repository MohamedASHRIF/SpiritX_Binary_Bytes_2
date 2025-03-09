const express = require("express");
const Player = require("../models/Player");
const { calculateValue, calculatePoints } = require("../utils/calculateStats");
const { verifyAdmin } = require("../middleware/authMiddleware");


const router = express.Router();

// Get All Players
router.get("/", async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

// Get Player by ID
router.get("/:id", async (req, res) => {
  const player = await Player.findById(req.params.id);
  res.json(player);
});

// Create Player (Admin Only)
router.post("/", verifyAdmin, async (req, res) => {
  const { name, team, runs, wickets, matches } = req.body;

  const value = calculateValue(runs, wickets);
  const points = calculatePoints(runs, wickets);

  const newPlayer = new Player({ name, team, runs, wickets, matches, value, points });
  await newPlayer.save();

  global.io.emit("playerUpdated"); // Real-time update
  res.status(201).json(newPlayer);
});

// Update Player (Admin Only)
router.put("/:id", verifyAdmin, async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (!player) return res.status(404).json({ message: "Player not found" });

  Object.assign(player, req.body);

  player.value = calculateValue(player.runs, player.wickets);
  player.points = calculatePoints(player.runs, player.wickets);

  await player.save();

  global.io.emit("playerUpdated"); // Real-time update
  res.json(player);
});

// Delete Player (Admin Only)
router.delete("/:id", verifyAdmin, async (req, res) => {
  await Player.findByIdAndDelete(req.params.id);
  
  global.io.emit("playerUpdated"); // Real-time update
  res.json({ message: "Player deleted" });
});

// Tournament Summary (Admin Only)
router.get("/summary", verifyAdmin, async (req, res) => {
  const players = await Player.find();

  const totalRuns = players.reduce((sum, p) => sum + p.runs, 0);
  const totalWickets = players.reduce((sum, p) => sum + p.wickets, 0);
  const highestRunScorer = players.sort((a, b) => b.runs - a.runs)[0]?.name;
  const highestWicketTaker = players.sort((a, b) => b.wickets - a.wickets)[0]?.name;

  res.json({ totalRuns, totalWickets, highestRunScorer, highestWicketTaker });
});

module.exports = router;
