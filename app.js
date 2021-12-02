var express = require('express');
var port = 3000;
var app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const dotenv = require('dotenv');
const mongDB = require('./config/database')
const healthRoutes = require('./Routes/HealthRoutes')
const userRoutes = require('./Routes/UserRouter')
dotenv.config({path:'.env'})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json())
app.use(cors())

app.use('/user',userRoutes)
app.use('/health',healthRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port} and swagger: http://localhost:${port}/api-docs`)
})