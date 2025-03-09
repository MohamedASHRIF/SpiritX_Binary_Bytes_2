const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    team: { type: String, required: true },
    runs: { type: Number, required: true },
    wickets: { type: Number, required: true },
    matches: { type: Number, required: true },
    value: { type: Number, required: true },
    points: { type: Number, required: true },
  });
module.exports = mongoose.model("Player", playerSchema);
