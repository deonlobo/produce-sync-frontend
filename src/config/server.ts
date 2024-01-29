import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8080;

// Enable CORS for all routes
app.use(cors());

// Your API routes go here

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
