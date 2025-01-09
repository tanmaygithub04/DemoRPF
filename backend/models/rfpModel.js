const mongoose = require('mongoose');

const rfpSchema = new mongoose.Schema({
  content: String,
  proposal: String,
  date: { type: Date, default: Date.now },
});

const RFP = mongoose.model('RFP', rfpSchema);

async function saveRFP(content, proposal) {
  const rfp = new RFP({ content, proposal });
  await rfp.save();
}

module.exports = { saveRFP };
