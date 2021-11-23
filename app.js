var express = require('express');
var port = 3000;
var app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const dotenv = require('dotenv');
const mongDB = require('./DB/mongoose')
dotenv.config()

const healthRoutes = require('./Routes/HealthRoutes')
const UserRoutes = require('./Routes/UserRouter')




app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json())
app.use(cors())

app.use('/health',healthRoutes)
app.use('/user',UserRoutes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port} and swagger: http://localhost:${port}/api-docs`)
})