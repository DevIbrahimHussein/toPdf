const base64 = require('base64topdf')
const model = require('./pdf.model')

exports.exportToPdf = async(req, res) => {

    try {

        let base64Str = ''

        for(var i = 0 ; i < req.body.pdf.length; i++){
            base64Str += req.body.pdf[i].base64
        }

        base64.base64Decode(base64Str, `${req.body.filename}.pdf`)

        const pdfModel = await new model({
            name: req.body.fileName
        })

        const data = await pdfModel.save()
        
        return res.json({ msg: 'success' })

    } catch (e) {
        res.status(500).json({ msg: e })
    }

}