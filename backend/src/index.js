import app from './app.js';
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`process.env.PORT ${process.env.PORT}`);
  console.log(`Server is running on port ${PORT}`);
});
