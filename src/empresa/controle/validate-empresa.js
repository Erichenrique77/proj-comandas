$(document).ready(function(){
    $.ajax({

        type: 'POST',
        dataType: 'json',
        assync: true, 
        url: 'src/empresa/modelo/validate-empresa.php',
        success: function(dados){

            if (dados.tipo == 'sucess'){

                Swal.fire({
                    title: 'e-Comanda',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

            } else if (dados.tipo == 'error'){
                //location faz redirecionamentos
                //se a pessoa não estiver logada no sistema, será redirecionada para index.html
                $(location).attr('href', 'index.html')
            }

        }

    })
})