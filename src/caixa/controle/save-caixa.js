$(document).ready(function() {

    $('.btn-save').click(function(e){
        e.preventDefault()

        let dados = $('#form-caixa').serialize()

        dados += `&operacao=${$('.btn-save').attr('data-operation')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/caixa/modelo/save-caixa.php',
            success: function(dados){
                Swal.fire({
                    title: 'e-Comanda',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })
                $('#modal-caixa').modal('hide')
                $('#table-caixa').DataTable().ajax.reload()
            }
        })
    })

})