$(document).ready(function(){

    $('.btn-logout').click(function(e){
        e.preventDefault()

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            url: 'src/empresa/modelo/logout-empresa.php',
            success: function(dados){
                if(dados.tipo == 'success'){
                    $(location).attr('href', 'index.html')
                }else{
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