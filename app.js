var express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
var port = 3000;
var app = express();

app.get('/',(req,res)=>{
    res.send('ok')
})


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port} and swagger: http://localhost:${port}/api-docs`)
})