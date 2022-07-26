$(document).ready(function() {

    $('#table-caixa').on('click', 'button.btn-edit', function(e){
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Edição de registros')

        let ID = `ID=${$(this).attr('id')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: ID,
            url: 'src/caixa/modelo/view-caixa.php',
            success: function(dado){
                if(dado.tipo == 'success'){
                    $('.modal-body').load('src/caixa/visao/form-caixa.html', function(){
                        $('#DESCRICAO').val(dado.dados.DESCRICAO)
                        $('#VALOR').val(dado.dados.VALOR)
                        if(dado.dados.LANCAMENTO === 1){
                            $('#LANCAMENTO').append(`<option value="1" selected>Crédito</option>`)
                        }else{
                            $('#LANCAMENTO').append(`<option value="2" selected>Débito</option>`)
                        }
                    })
                    $('.btn-save').show()
                    $('.btn-save').removeAttr('data-operation')
                    $('#modal-caixa').modal('show')
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