//////////////////////////////////////////////////////
// INCLUDES
//////////////////////////////////////////////////////
require('dotenv').config();
const app = require('./src/app');

//////////////////////////////////////////////////////
// SETUP ENVIRONMENT
//////////////////////////////////////////////////////
console.log('PORT:', process.env.EXPRESS_PORT)
const PORT = process.env.EXPRESS_PORT;

//////////////////////////////////////////////////////
// START SERVER
//////////////////////////////////////////////////////
app.listen(PORT,()=>{
    console.log(`app listening to port ${PORT}`);
});