$(document).ready(function(){

    //monitora o click na tabela produto, no botão edit
    $('#table-produto').on('click', 'button.btn-edit', function(e){

        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Edição de Registro')

        let ID = `ID=${$(this).attr('id')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: ID,
            url: 'src/produto/modelo/view-produto.php',
            success: function(dado){

                //carregar o formulário na tela
                if (dado.tipo == 'success'){
                    $('.modal-body').load('src/produto/visao/form-produto.html', function(){
                        $('#NOME').val(dado.dados.NOME)
                        $('#VALOR').val(dado.dados.VALOR)
                        $('#ID').val(dado.dados.ID)
                    })
                    $('.btn-save').show()
                    //remove o data-operation para não dobrar registros
                    $('.btn-save').removeAttr('data-operation')
                    $('#modal-produto').modal('show')
                } else{
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