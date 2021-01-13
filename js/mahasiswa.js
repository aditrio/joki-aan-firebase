
 var _db = firebase.database();
 var i = 1;
 var data_id = [];
$(document).ready(function () {
    
    _db.ref('mahasiswa').on('value', (snapshot) => {
        var item = snapshot.val();
        $.each(item,function(index) {

            fetchData(item[index],i);
           i++;
            
        });
    });

});


$('#storeBtn').click(  function() { 

    storeData();
});

$('#updateBtn').click(  function() { 

    updateData();
});


function storeData()
{
   
    var _nama = $('#nama_mhs').val();
    var _nim = $('#nim_mhs').val();
    var _ttl = $('#ttl_mhs').val();
    var _alamat = $('#alamat_mhs').val();
    var _id = _db.ref('mahasiswa').push().key;
    var data = {

        id : _id,
        nama : _nama,
        nim : _nim,
        ttl : _ttl,
        alamat : _alamat

    };


    _db.ref('mahasiswa/' + data['id']).set(data);

}


function fetchData(data,i){

    if (data_id.includes(data['id'])) {
        return;
    }

    var $html =  $('<tr><th scope="row">'+i+'</th><td>'+data['nama']+'</td><td>'+data['nim']+'</td><td>I'+data['ttl']+'</td><td>'+data['alamat']+'</td><td><a href="" class="btn btn-primary btn-sm">Detail</a></td><td><button onclick="getData(\''+data['id']+'\')" data-toggle="modal" data-target="#updateModal" class="btn btn-success btn-sm"><i class="fas fa-edit bg-success  text-white rounded" data-toggle="tooltip" title="Edit"></i></button></td><td><button onclick="deleteData(\''+data['id']+'\')" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt bg-danger  text-white rounded" data-toggle="tooltip" title="Hapus"></i></button></td></tr>');
    var row = $html.prop('outerHTML');
    $('#data-mhs').append(row);
    data_id.push(data['id']);

}

function getData(id)
{

    var data = [];
	_db.ref('/mahasiswa/' + id).once('value').then((snapshot)=>{
        
        data.push(snapshot.val());
        console.log(data);
		$('#edit_nama_mhs').val(data[0]['nama']);
        $('#edit_nim_mhs').val(data[0]['nim']);
		$('#edit_ttl_mhs').val(data[0]['ttl']);
		$('#edit_alamat_mhs').val(data[0]['alamat']);
		$('#edit_id_mhs').val(data[0]['id']);

			
	});	


}


function updateData(){

    var _nama = $('#edit_nama_mhs').val();
    var _nim = $('#edit_nim_mhs').val();
    var _ttl = $('#edit_ttl_mhs').val();
    var _alamat = $('#edit_alamat_mhs').val();
    var _id =  $('#edit_id_mhs').val();
    var data = {

        nama : _nama,
        nim : _nim,
        ttl : _ttl,
        alamat : _alamat

    };


    _db.ref('mahasiswa/' + _id).update(data);
    window.location.reload();

}

function deleteData(id)
{

    _db.ref('mahasiswa/'+id).remove();
    window.location.reload();


}

