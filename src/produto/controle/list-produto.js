$(document).ready(function() {
    $('#table-produto').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "src/produto/modelo/list-produto.php",
            "type": "POST"
        },
        "language": {
            "url": "libs/DataTables/pt_br.json"
        },
        "columns": [{
                "data": 'ID',
                "className": 'text-center'
            },
            {
                "data": 'NOME',
                "className": 'text-center'
            },
            {
                "data": 'VALOR',
                "className": 'text-center'
            },
            {
                "data": 'ID',
                "orderable": false,
                "searchable": false,
                "className": 'text-center',
                "render": function(data, type, row, meta) {
                    return `
                    <button id="${data}" class="btn btn-info btn-view"><i class="fa-solid fa-eye"></i></button>
                    <button id="${data}" class="btn btn-primary btn-edit"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button id="${data}" class="btn btn-danger btn-delete"><i class="fa-solid fa-trash"></i></button>
                    `
                }
            }
        ]
    })
})