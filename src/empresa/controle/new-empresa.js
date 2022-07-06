$(document).ready(function() {

    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Adicionar uma nova empresa')

        $('.modal-body').load('src/empresa/visao/form-empresa.html')

        $('#modal-empresa').modal('show')
    })

})