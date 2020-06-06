const DataRepo = require('../repo/DataRepo')
const DataFormatter = require ('../utils/DataFormatter')

module.exports = {
    getData: async(req, res) => {
        try {
            let patients = await DataRepo.getData(req.query);
            if(!patients.bindings.length) {
                return res.status(200).json({
                    success: true,
                    status: 200,
                    data: [],
                    message: 'Patient not found'
                })
            }

            patients = patients.bindings.map((patient) => DataFormatter(patient))
            
            if (req.params.nik) {

                let patient = patients.filter((patient) => { return patient.nik == req.params.nik })

                return res.status(200).json({
                    success: true,
                    status: 200,
                    data: patient[0],
                    message: patient.length ? 'Patient found' : 'Patient not found'
                })
            } else {
                return res.status(200).send(patients)
            }

        } catch (err) {
            return res.status(200).json({
                success: false,
                status: 200,
                data: '',
                message: `Error: ${err.message}`
            })
        }
    }
}