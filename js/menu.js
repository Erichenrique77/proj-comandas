$(document).ready(function(){
    $('.nav-link').click(function(e){
        e.preventDefault()

        let url = $(this).attr('href')

        $('#content').empty()

        $('#content').load(url)
    })
})

//funçao que monitora os nav-links