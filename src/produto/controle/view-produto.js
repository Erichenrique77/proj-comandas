$(document).ready(function() {

    $('#table-produto').on('click', 'button.btn-view', function(e){
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
            url: 'src/produto/modelo/view-produto.php',
            success: function(dado){
                if(dado.tipo == 'success'){
                    $('.modal-body').load('src/produto/visao/form-produto.html', function(){
                        $('#NOME').val(dado.dados.NOME)
                        $('#NOME').attr('readonly', 'true')
                        $('#VALOR').val(dado.dados.VALOR)
                        $('#VALOR').attr('readonly', 'true')
                    })
                    $('.btn-save').hide()
                    $('#modal-produto').modal('show')
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