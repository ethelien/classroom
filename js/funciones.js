$(".checkbox").change(function() {
    if(this.checked) {
        alert("Opcion todavía no habilitada");
    }
});

//CONTROL DE USUARIO
function control_usuario(admin) {
	alert(admin);
    //$(rtpg.CREATE_SELECTOR).addClass('disabled');
    //$(rtpg.OPEN_SELECTOR).addClass('disabled');
    //document.getElementById("clase").innerHTML = "PROBANDO";
    $("#adminContainer" ).load( "html/user.html #clase" );
}

