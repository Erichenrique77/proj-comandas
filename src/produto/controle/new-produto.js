$(document).ready(function() {

    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Adicionar novo Produto')

        $('.modal-body').load('src/produto/visao/form-produto.html')

        $('#modal-produto').modal('show')
    })

})