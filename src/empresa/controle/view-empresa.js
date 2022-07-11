$(document).ready(function(){

    //monitora o click na tabela empresa, no botão view
    $('#table-empresa').on('click', 'button.btn-view', function(e){

        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Visualização de Registro')

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
                        $('#NOME').attr('readonly', 'true')

                        $('#LOGIN').val(dado.dados.LOGIN)
                        $('#LOGIN').attr('readonly', 'true')

                        $('#SENHA').val(dado.dados.SENHA)
                        $('#SENHA').attr('readonly', 'true')
                    })

                    $('.btn-save').hide()
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