$(document).ready(function() {

    $('.btn-save').click(function(e){
        e.preventDefault()

        let dados = $('#form-pedido').serialize()

        dados += `&operacao=${$('.btn-save').attr('data-operation')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/pedido/modelo/save-pedido.php',
            success: function(dados){
                Swal.fire({
                    title: 'e-Comanda',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })
                $('#modal-pedido').modal('hide')
                $('#table-pedido').DataTable().ajax.reload()
            }
        })
    })

})