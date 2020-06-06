const axios = require('axios')
const qs = require('qs')
const BASE_URL = 'http://qrary-fuseki-service.herokuapp.com/';

const headers = {
    'Accept': 'application/sparql-results+json,*/*;q=0.9',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

exports.getData = async(param) => {

    const queryData = {
        query: `PREFIX data: <http://example.com>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        
        SELECT ?nik ?nama ?lahir ?asalBerangkat ?tglPulang ?provinsi ?kota ?kecamatan ?alamat ?status
        
        WHERE {
            ?any rdf:type data:patient;
                data:nik ?nik;
                data:nama ?nama;
                data:lahir ?lahir;
                data:asalBerangkat ?asalBerangkat;
                data:tglPulang ?tglPulang;
                data:provinsi ?provinsi;
                data:kota ?kota;
                data:kecamatan ?kecamatan;
                data:alamat ?alamat;
                data:status ?status;
        }`
    }

    try {
        const { data } = await axios(`${BASE_URL}imitracov/query`, {
            method: 'POST',
            headers,
            data: qs.stringify(queryData)
        });
        
        return data.results;
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = exports