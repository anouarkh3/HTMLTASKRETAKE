const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const feedbacks = [];

app.post('/feedback', (req, res) => {
  feedbacks.push(req.body);
  res.status(200).send({ message: 'Feedback received' });
});

app.get('/feedback', (req, res) => {
  res.send(feedbacks);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
