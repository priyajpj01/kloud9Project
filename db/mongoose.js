const mongoose = require('mongoose')
const config=require('../helper/config')
mongoose.connect(config.mongoURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
// mongoose.connection.close()
