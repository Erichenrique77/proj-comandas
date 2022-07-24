$(document).ready(function() {

    $('#table-cliente').on('click', 'button.btn-view', function(e){
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Visualização de registros')

        let ID = `ID=${$(this).attr('id')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: ID,
            url: 'src/cliente/modelo/view-cliente.php',
            success: function(dado){
                if(dado.tipo == 'success'){
                    $('.modal-body').load('src/cliente/visao/form-cliente.html', function(){
                        $('#NOME').val(dado.dados.NOME)
                        $('#NOME').attr('readonly', 'true')
                        $('#TELEFONE').val(dado.dados.TELEFONE)
                        $('#TELEFONE').attr('readonly', 'true')
                    })
                    $('.btn-save').hide()
                    $('#modal-cliente').modal('show')
                }else{
                    Swal.fire({
                        title: 'e-Comanda',
                        text: dados.mensagem,
                        icon: dados.tipo,
                        confirmButtonText: 'OK'
                    })
                }
            }
        })
    })

})