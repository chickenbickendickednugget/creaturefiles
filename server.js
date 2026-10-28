const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  next();
});

app.get('/health', async (req, res) => {
  try {
    const r = await fetch('https://turbowarp-creature-ai.josiah-n-hart.workers.dev/health');
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/generate', async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    const r = await fetch('https://turbowarp-creature-ai.josiah-n-hart.workers.dev/generate?' + params);
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server running on port ' + port));
