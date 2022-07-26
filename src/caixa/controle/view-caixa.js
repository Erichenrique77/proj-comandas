$(document).ready(function() {

    $('#table-caixa').on('click', 'button.btn-view', function(e){
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
            url: 'src/caixa/modelo/view-caixa.php',
            success: function(dado){
                if(dado.tipo == 'success'){
                    $('.modal-body').load('src/caixa/visao/form-caixa.html', function(){
                        $('#DESCRICAO').val(dado.dados.DESCRICAO)
                        $('#DESCRICAO').attr('readonly', 'true')
                        $('#VALOR').val(dado.dados.VALOR)
                        $('#VALOR').attr('readonly', 'true')
                        $('#LANCAMENTO').empty()
                        if(dado.dados.LANCAMENTO === 1){
                            $('#LANCAMENTO').append(`<option value="1">Crédito</option>`)
                        }else{
                            $('#LANCAMENTO').append(`<option value="2">Débito</option>`)
                        }
                    })
                    $('.btn-save').hide()
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