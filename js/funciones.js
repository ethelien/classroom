$(".checkbox").change(function() {
    if(this.checked) {
        alert("Opcion todavía no habilitada");
    }
});

//CONTROL DE USUARIO
function control_usuario(admin,title) {

    $("#panel").load( "html/user.html" );
	$(document).ready(function(){
    	cargar_panel(title);
	});
}

function cargar_panel(title){
    //SI PONES EL ALERT DEL TITLE SI LO CARGA 'TIEMPOs' alert(title);
    $("#titulo_asignatura").text(title);
}



