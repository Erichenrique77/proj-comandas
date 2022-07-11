$(document).ready(function(){

    //monitora o click na tabela empresa, no botão edit
    $('#table-empresa').on('click', 'button.btn-edit', function(e){

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
            url: 'src/empresa/modelo/view-empresa.php',
            success: function(dado){

                //carregar o formulário na tela
                if (dado.tipo == 'success'){
                    $('.modal-body').load('src/empresa/visao/form-empresa.html', function(){
                        $('#NOME').val(dado.dados.NOME)
                        $('#LOGIN').val(dado.dados.LOGIN)
                        $('#SENHA').val(dado.dados.SENHA)
                        $('#ID').val(dado.dados.ID)
                    })

                    $('.btn-save').show()
                    //remove o data-operation para não dobrar registros
                    $('.btn-save').removeAttr('data-operation')
                    $('#modal-empresa').modal('show')
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