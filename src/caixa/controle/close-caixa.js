$(document).ready(function() {

    $('.btn-money').click(function(e){
        e.preventDefault()

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            url: 'src/caixa/modelo/close-caixa.php',
            success: function(dados){
                Swal.fire({
                    title: 'e-Comanda',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#table-caixa').DataTable().ajax.reload()
                
            }
        })
    })

})