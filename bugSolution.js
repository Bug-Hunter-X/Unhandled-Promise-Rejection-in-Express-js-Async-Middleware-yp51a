const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.use(async (req, res, next) => {
  try {
    // Simulate an asynchronous operation (e.g., database query)
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Middleware executed');
    next(); // Always call next() after async operation
  } catch (error) {
    console.error('Error in middleware:', error);
    next(error); // Pass the error to the error handling middleware
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.get('/async', (req, res) => {
  res.send('This route should now work correctly!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});