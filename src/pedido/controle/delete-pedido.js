$(document).ready(function() {

    $('#table-pedido').on('click', 'button.btn-delete', function(e){
        e.preventDefault()

        let ID = `DATA=${$(this).attr('data-time')}`

        Swal.fire({
            title: 'e-Comanda',
            text: 'Deseja realmente excluir o registro?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then(result => {
            if(result.value){
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    assync: true,
                    data: ID,
                    url: 'src/pedido/modelo/delete-pedido.php',
                    success: function(dados){
                        Swal.fire({
                            title: 'e-Comanda',
                            text: dados.mensagem,
                            icon: dados.tipo,
                            confirmButtonText: 'OK'
                        })
                        $('#table-pedido').DataTable().ajax.reload()
                    }
                })
            }
        })

    })
})