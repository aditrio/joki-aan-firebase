
var _db = firebase.database();
var i = 1;
var data_id = [];
$(document).ready(function () {
    
    _db.ref('pegawai').on('value', (snapshot) => {
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
   
    var _nama = $('#nama_peg').val();
    var _idPeg = $('#idPeg_peg').val();
    var _ttl = $('#ttl_peg').val();
    var _department = $('#department_peg').val();
    var _id = _db.ref('pegawai').push().key;
   
    var data = {

        nama : _nama,
        idPeg : _idPeg,
        ttl : _ttl,
        department : _department,
        id : _id
    
    }


    _db.ref('pegawai/' + data['id']).set(data);

     $('#nama_peg').val('');
     $('#idPeg_peg').val('');
     $('#ttl_peg').val('');
     $('#department_peg').val('');
}


function fetchData(data,i){

    if (data_id.includes(data['id'])) {
        return;
    }

    var $html =  $('<tr><th scope="row">'+i+'</th><td>'+data['nama']+'</td><td>'+data['idPeg']+'</td><td>'+data['ttl']+'</td><td>'+data['department']+'</td><td><a href="" class="btn btn-primary btn-sm">Detail</a></td><td><button onclick="getData(\''+data['id']+'\')" data-toggle="modal" data-target="#updateModal" class="btn btn-success btn-sm"><i class="fas fa-edit bg-success  text-white rounded" data-toggle="tooltip" title="Edit"></i></button></td><td><button onclick="deleteData(\''+data['id']+'\')" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt bg-danger  text-white rounded" data-toggle="tooltip" title="Hapus"></i></button></td></tr>');
    var row = $html.prop('outerHTML');
    $('#data-pegawai').append(row);
    data_id.push(data['id']);

}

function getData(id)
{

    var data = [];
	_db.ref('/pegawai/' + id).once('value').then((snapshot)=>{
        
        data.push(snapshot.val());
        console.log(data);
		$('#edit_nama_peg').val(data[0]['nama']);
        $('#edit_idPeg_peg').val(data[0]['idPeg']);
		$('#edit_ttl_peg').val(data[0]['ttl']);
		$('#edit_department_peg').val(data[0]['department']);
		$('#edit_id_peg').val(data[0]['id']);

			
	});	


}


function updateData(){

    var _nama = $('#edit_nama_peg').val();
    var _idPeg = $('#edit_idPeg_peg').val();
    var _ttl = $('#edit_ttl_peg').val();
    var _department = $('#edit_department_peg').val();
    var _id =  $('#edit_id_peg').val();

    var data = {

        nama : _nama,
        idPeg : _idPeg,
        ttl : _ttl,
        department : _department

    };


    _db.ref('pegawai/' + _id).update(data);
    window.location.reload();

}

function deleteData(id)
{

    _db.ref('pegawai/'+id).remove();
    window.location.reload();


}
