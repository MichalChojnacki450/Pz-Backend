var express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');
const cors = require('cors');

var port = 3000;
var app = express();

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS,()=>console.log("Database connected"))

app.get('/',(req,res)=>{
    res.send('ok')
})


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json())
app.use(cors())
app.use('/app', routesUrls)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port} and swagger: http://localhost:${port}/api-docs`)
})