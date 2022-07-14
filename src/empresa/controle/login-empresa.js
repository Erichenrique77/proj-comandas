$(document).ready(function(){
    $('.btn-login').click(function(e){

        e.preventDefault()

        let dados = $('#form-login').serialize()

        $.ajax({
            
            type: 'POST',
            dataType: 'json',
            assync: true, 
            data: dados, 
            url: 'src/empresa/modelo/login-empresa.php', 
            success: function(dados){

                if (dados.tipo == 'success'){
                    $(location).attr('href', 'controle.html')
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