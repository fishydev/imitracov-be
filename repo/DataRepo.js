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
            
            FILTER regex(?nik, "${param.nik ? param.nik : ''}", "i")
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

exports.getDataGuest = async(param) => {
    const queryDataGuest = {
        query: `PREFIX data: <http://example.com>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

        SELECT ?asalBerangkat (COUNT(*) AS ?jumlah)

        WHERE {
            ?any rdf:type data:patient;
            data:asalBerangkat ?asalBerangkat;
            data:status '${param.status}';
        }
        GROUP BY ?asalBerangkat
        `
    }

    try {
        const { data } = await axios(`${BASE_URL}imitracov/query`, {
            method: 'POST',
            headers,
            data: qs.stringify(queryDataGuest)
        });
        
        return data.results;
    } catch (err) {
        return Promise.reject(err);
    }
}

exports.getDataConf = async(param) => {
    const queryDataConf = {
        query: `PREFIX data: <http://example.com>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        
        SELECT ?asalBerangkat (SUM(IF(?status = 'Positif', 1, 0)) AS ?jumlahPositif) (SUM(IF(?status = 'Negatif', 1, 0)) AS ?jumlahNegatif)
        
        WHERE {
            ?any rdf:type data:patient;
                data:asalBerangkat ?asalBerangkat;
                data:status ?status;
        }
        GROUP BY ?asalBerangkat
        `
    }

    try {
        const { data } = await axios(`${BASE_URL}imitracov/query`, {
            method: 'POST',
            headers,
            data: qs.stringify(queryDataConf)
        });
        
        return data.results;
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = exports