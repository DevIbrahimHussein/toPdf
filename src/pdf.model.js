const mongoose = require('mongoose')

const pdf = mongoose.Schema({

    name: {
        type: String,
        require: true
    }

})

module.exports = mongoose.model('Pdf', pdf)