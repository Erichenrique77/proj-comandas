$(document).ready(function() {

    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Adicionar novo pedido')

        $('.modal-body').load('src/pedido/visao/form-pedido.html', function(){

            $.ajax({
                type: 'POST',
                dataType: 'json',
                assync: true,
                url: 'src/cliente/modelo/all-cliente.php',
                success: function(dados){
                    
                    for(const result of dados){
                        $('#CLIENTE_ID').append(`<option value="${result.ID}">${result.NOME}</option>`)
                    }
                }
            })

            $.ajax({
                type: 'POST',
                dataType: 'json',
                assync: true,
                url: 'src/produto/modelo/all-produto.php',
                success: function(dados){
                    
                    for(const result of dados){
                        $('#PRODUTO_ID').append(`<option value="${result.ID}">${result.NOME}</option>`)
                    }
                }
            })
        })

        $('.btn-save').show()

        $('.btn-save').attr('data-operation', 'insert')

        $('#modal-pedido').modal('show')
    })

})