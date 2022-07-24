$(document).ready(function() {

    $('.btn-save').click(function(e){
        e.preventDefault()

        let dados = $('#form-cliente').serialize()

        dados += `&operacao=${$('.btn-save').attr('data-operation')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/cliente/modelo/save-cliente.php',
            success: function(dados){
                Swal.fire({
                    title: 'e-Comanda',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })
                $('#modal-cliente').modal('hide')
                $('#table-cliente').DataTable().ajax.reload()
            }
        })
    })

})