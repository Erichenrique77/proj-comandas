$(document).ready(function() {

    $('#CLIENTE_ID').change(function(e) {
        e.preventDefault()

        let CLIENTE_ID = `CLIENTE_ID=${$(this).val()}`

        var conta = 0

        $.ajax({
            dataType: 'json',
            type: 'POST',
            assync: true,
            data: CLIENTE_ID,
            url: 'src/pedido/modelo/search-pedido.php',
            success: function(dados){
                $('tbody').empty()
                for(const result of dados){
                    $('tbody').append(`
                        <tr>
                            <th scope="col" class="text-center">${result.DATA}</th>
                            <th scope="col" class="text-center">${result.PRODUTO}</th>
                            <th scope="col" class="text-center">${result.VALOR.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"})}</th>
                            <th scope="col" class="text-center">${result.QTDE}</th>
                        </tr>
                    `)

                    // Cálculo do valor total da conta
                    conta += result.VALOR * result.QTDE
                }
                // Atribuindo a soma da conta no campo valor a receber
                $('#VALORRECEBER').val(conta)
                $('#VALORRECEBIDO').val(conta)
                $('#TROCO').val('0')
                $('#DESCONTO').val('0')
                $('.btn-close').removeClass('disabled')
            }
        })
    })

    $('#DESCONTO').focusout(function(e){
        var conta = $('#VALORRECEBER').val() - $('#DESCONTO').val()
        $('#VALORRECEBIDO').val(conta)
    })

    $('#VALORRECEBIDO').focusout(function(e){
        var conta = $('#VALORRECEBIDO').val() - ($('#VALORRECEBER').val() - $('#DESCONTO').val())
        $('#TROCO').val(conta)
    })
})