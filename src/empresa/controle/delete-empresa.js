$(document).ready(function(){

    //monitora o click na tabela empresa, no botão view
    $('#table-empresa').on('click', 'button.btn-delete', function(e){

        e.preventDefault()

        let ID = `ID=${$(this).attr('id')}`

        Swal.fire({
            title: 'e-Comanda',
            text: 'Deseja realmente excluir o registro?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then (result => {
            if (result.value){
                $.ajax({

                    //como vou enviar a informação para o php, vai ser GET ou POST
                    type: 'POST',
                    dataType: 'json',
                    assync: true, //o front é mostrado, enquanto o back-end é carregado, e depois incluso no front
                    data: ID,
                    url: 'src/empresa/modelo/delete-empresa.php', //para onde as informações serão enviadas..
                    success: function(dados){
                        Swal.fire({
                            title: 'e-Comanda',
                            text: dados.mensagem,
                            icon: dados.tipo,
                            confirmButtonText: 'OK'
                        })
        
                        $('#table-empresa').DataTable().ajax.reload()
                    }
        
                })
            }
        })
    })

})