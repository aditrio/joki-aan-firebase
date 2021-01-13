
var _db = firebase.database();
var i = 1;
var data_id = [];
$(document).ready(function () {
    
    _db.ref('dosen').on('value', (snapshot) => {
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
   
    var _nama = $('#nama_dos').val();
    var _nidn = $('#nidn_dos').val();
    var _ttl = $('#ttl_dos').val();
    var _keahlian = $('#keahlian_dos').val();
    var _id = _db.ref('dosen').push().key;
   
    var data = {

        nama : _nama,
        nidn : _nidn,
        ttl : _ttl,
        keahlian : _keahlian,
        id : _id
    
    }


    _db.ref('dosen/' + data['id']).set(data);

     $('#nama_dos').val('');
     $('#nidn_dos').val('');
     $('#ttl_dos').val('');
     $('#keahlian_dos').val('');

}


function fetchData(data,i){

    if (data_id.includes(data['id'])) {
        return;
    }

    var $html =  $('<tr><th scope="row">'+i+'</th><td>'+data['nama']+'</td><td>'+data['nidn']+'</td><td>'+data['ttl']+'</td><td>'+data['keahlian']+'</td><td><a href="" class="btn btn-primary btn-sm">Detail</a></td><td><button onclick="getData(\''+data['id']+'\')" data-toggle="modal" data-target="#updateModal" class="btn btn-success btn-sm"><i class="fas fa-edit bg-success  text-white rounded" data-toggle="tooltip" title="Edit"></i></button></td><td><button onclick="deleteData(\''+data['id']+'\')" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt bg-danger  text-white rounded" data-toggle="tooltip" title="Hapus"></i></button></td></tr>');
    var row = $html.prop('outerHTML');
    $('#data-dosen').append(row);
    data_id.push(data['id']);

}

function getData(id)
{

    var data = [];
	_db.ref('/dosen/' + id).once('value').then((snapshot)=>{
        
        data.push(snapshot.val());
        console.log(data);
		$('#edit_nama_dos').val(data[0]['nama']);
        $('#edit_nidn_dos').val(data[0]['nidn']);
		$('#edit_ttl_dos').val(data[0]['ttl']);
		$('#edit_keahlian_dos').val(data[0]['keahlian']);
		$('#edit_id_dos').val(data[0]['id']);

			
	});	


}


function updateData(){

    var _nama = $('#edit_nama_dos').val();
    var _nidn = $('#edit_nidn_dos').val();
    var _ttl = $('#edit_ttl_dos').val();
    var _keahlian = $('#edit_keahlian_dos').val();
    var _id =  $('#edit_id_dos').val();
    var data = {

        nama : _nama,
        nidn : _nidn,
        ttl : _ttl,
        keahlian : _keahlian

    };


    _db.ref('dosen/' + _id).update(data);
    window.location.reload();

}

function deleteData(id)
{

    _db.ref('dosen/'+id).remove();
    window.location.reload();


}
