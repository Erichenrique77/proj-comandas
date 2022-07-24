$(document).ready(function() {
    $.ajax({
        dataType: 'json',
        type: 'POST',
        assync: true,
        url: 'src/cliente/modelo/all-cliente.php',
        success: function(dados){
            for(const result of dados){
                $('#CLIENTE_ID').append(`<option value="${result.ID}">${result.NOME}</option>`)
            }
        }
    })
})