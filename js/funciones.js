/**
Funciones UPV E-Class
**/

$(".checkbox").change(function() {
    if(this.checked) {
        alert("Opcion todavía no habilitada");
    }
});

//CONTROL DE USUARIO
function control_usuario(admin,title) {

    $("#panel").load( "html/user.html" );
	$(document).ready(function(){
    	cargar_panel_clase(title);
	});
}

function cargar_panel_clase(title){
    //SI PONES EL ALERT DEL TITLE SI LO CARGA 'TIEMPOs' alert(title);
    $("#titulo_asignatura").text(title);
}

function add_zero(n) {
    for(i=n.length;i<10;i++){
		n = ("0" + n);
	}
   
   return n;
}
