$(document).ready(function() {

    $('.btn-close').click(function(e){
        e.preventDefault()

        let dados = $('#close-sale').serialize()

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/venda/modelo/save-venda.php',
            success: function(dados){
                Swal.fire({
                    title: 'e-Comanda',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('tbody').empty();
                $('#DESCONTO').empty()
                $('#TROCO').empty()
                $('#VALORRECEBER').empty()
                $('#VALORRECEBIDO').empty()
            }
        })
    })

})