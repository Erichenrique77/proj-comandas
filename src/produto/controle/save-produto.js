$(document).ready(function(e){

    //monitora o click no botao salvar do formulário de form-produto.html
    $('.btn-save').click(function(e){
        e.preventDefault()

        //essa var temporária vai receber tudo o que foi digitado no formulário
        let dados = $('#form-produto').serialize()

        //atribuindo a dados...
        dados += `&operacao=${$('.btn-save').attr('data-operation')}`


        //chama e manda o php ser executado
        $.ajax({

            //como vou enviar a informação para o php, vai ser GET ou POST
            type: 'POST',
            dataType: 'json',
            assync: true, //o front é mostrado, enquanto o back-end é carregado, e depois incluso no front
            data: dados, //enviar dados
            url: 'src/produto/modelo/save-produto.php', //para onde as informações serão enviadas..
            success: function(dados){
                Swal.fire({
                    title: 'e-Comanda',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#modal-produto').modal('hide') //esconde o modal
                $('#table-produto').DataTable().ajax.reload()
            }

        })
    })
})