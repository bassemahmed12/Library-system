const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./src/config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger/swagger');

const bookRoutes = require('./src/routes/book.routes');
const borrowerRoutes = require('./src/routes/borrower.routes');
const borrowingRoutes = require('./src/routes/borrowing.routes');
const basicAuth = require('./src/middleware/basicAuth');

dotenv.config();
const app = express();
app.use(express.json());


// Swagger UI
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/api/books', basicAuth,bookRoutes);
app.use('/api/borrowers', basicAuth,borrowerRoutes);
app.use('/api/borrowings', basicAuth,borrowingRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Database sync failed:', err));
