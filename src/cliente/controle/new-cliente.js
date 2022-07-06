$(document).ready(function() {

    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Adicionar novo Cliente')

        $('.modal-body').load('src/cliente/visao/form-cliente.html')

        $('#modal-cliente').modal('show')
    })

})