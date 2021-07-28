const base64 = require('base64topdf')
const pdfModel = require('./pdf.model')
const model = require('./pdf.model')
const fs = require('fs')

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

exports.updatePdf = async(req, res) => {

    try {

        let updatedBody = {}

        // get current pdf
        const currentPdf = await pdfModel.findById(req.params.pdfId)

        if(req.body.pdf){
            
            let base64Str = ''
            
            for(var i = 0 ; i < req.body.pdf.length; i++){
                base64Str += req.body.pdf[i].base64
            }

            fs.writeFile(`${currentPdf}.pdf`)

        }

        if(req.body.filename) {
            updatedBody.name = req.body.filename
            await pdfModel.findByIdAndUpdate(req.params.pdfId, updatedBody)
            fs.rename(`${currentPdf.name}.pdf`, `${req.body.filename}.pdf`)
        }

        return res.json({ msg: 'success' })

    } catch (e) {
        res.status(500).json({ msg: e })
    }

}

exports.deletePdf = async(req, res) => {

    try {
        const deletedPdf = await pdfModel.findByIdAndDelete(req.params.pdfId)
    
        fs.unlinkSync(`${deletedPdf.name}.pdf`)
    
        return res.json({ msg: 'Deleted Successfully' })

    } catch (e){
        return res.status(500).json({ msg: e })
    }


}