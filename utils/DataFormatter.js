module.exports = fn = data => {
    return {
        "nik": data.nik.value,
        "nama": data.nama.value,
        "lahir": data.lahir.value,
        "asalBerangkat": data.asalBerangkat.value,
        "tglPulang": data.tglPulang.value,
        "provinsi": data.provinsi.value,
        "kota": data.kota.value,
        "kecamatan": data.kecamatan.value,
        "alamat": data.alamat.value,
        "status": data.status.value
    }
}