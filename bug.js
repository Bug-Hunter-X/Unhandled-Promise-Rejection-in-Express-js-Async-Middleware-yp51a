const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Uncommon bug: Unexpected behavior when using a middleware function with an async operation inside
app.use(async (req, res, next) => {
  try {
    // Simulate an asynchronous operation (e.g., database query)
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Middleware executed');
    next();
  } catch (error) {
    console.error('Error in middleware:', error);
    // The next() function is missing here for proper error handling 
    res.status(500).send('Internal Server Error');
  }
});

app.get('/async', (req, res) => {
  res.send('This route might not always work as expected');
});