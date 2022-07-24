$(document).ready(function() {

    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Adicionar uma nova cliente')

        $('.modal-body').load('src/cliente/visao/form-cliente.html')

        $('.btn-save').show()

        $('.btn-save').attr('data-operation', 'insert')

        $('#modal-cliente').modal('show')
    })

})