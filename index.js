require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const planetRoutes = require('./rotte');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/planets', planetRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
