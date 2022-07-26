$(document).ready(function() {
    $('#table-caixa').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "src/caixa/modelo/list-caixa.php",
            "type": "POST"
        },
        "language": {
            "url": "libs/DataTables/pt_br.json"
        },
        "columns": [{
                "data": 'DATA',
                "className": 'text-center'
            },
            {
                "data": 'DESCRICAO',
                "className": 'text-center'
            },
            {
                "data": 'LANCAMENTO',
                "className": 'text-center'
            },
            {
                "data": 'VALOR',
                "orderable": false,
                "searchable": false,
                "className": 'text-center',
                "render": function(data, type, row, meta) {
                    let valor = parseFloat(data)
                    return valor.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"})
                }
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