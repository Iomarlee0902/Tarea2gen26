require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');

db.authenticate()
  .then(() => console.log('Database authentication...👍'))
  .catch((err) => console.log(err));
db.sync()
  .then(() => console.log('Database sync...✌'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...✌`);
})