$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$(document).ready(function () {
  
    var _dosen = firebase.database().ref('dosen');
    var _mhs = firebase.database().ref('mahasiswa');
    var _peg = firebase.database().ref('pegawai');

    var _jumlahDosen = 0;
    _dosen.on('value', (snapshot)=>{

        var item = snapshot.val();
        $.each(item, function (indexInArray, valueOfElement) { 
           _jumlahDosen++;
        });

        $('#jumlah-dosen').html(_jumlahDosen.toString());
    })

    var _jumMhs = 0;
    _mhs.on('value', (snapshot)=>{

        var item = snapshot.val();
        $.each(item, function (indexInArray, valueOfElement) { 
           _jumMhs++;
        });

        $('#jumlah-mhs').html(_jumMhs.toString());
    })

    var _jumlahPeg = 0;
    _peg.on('value', (snapshot)=>{

        var item = snapshot.val();
        $.each(item, function (indexInArray, valueOfElement) { 
           _jumlahPeg++;
        });

        $('#jumlah-peg').html(_jumlahPeg.toString());
    })

    


});