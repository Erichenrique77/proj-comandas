$(document).ready(function(){
    $.ajax({

        type: 'POST',
        dataType: 'json',
        assync: true, 
        url: 'src/empresa/modelo/validate-empresa.php',
        success: function(dados){

            if (dados.tipo == 'success'){

                Swal.fire({
                    title: 'e-Comanda',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

            } else if (dados.tipo == 'error'){
                $(location).attr('href', 'index.html')
            }

        }

    })
})