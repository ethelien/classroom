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
    $("#contenedorcentral").load( "html/clase_user.html" );
	$(document).ready(function(){
    	cargar_panel_clase(title);
 		rtpg.map.updateUiAlumno();
	    rtpg.map.updateDonAlumno();
	    rtpg.map.connectUiAlumno();
	});
}

function cargar_panel_clase(title){
    //SI PONES EL ALERT DEL TITLE SI LO CARGA 'TIEMPOs' alert(title);
    $("#titulo_asignatura").text(title);
}

function add_zero(n) {
    for(i=n.length;i<3;i++){
		n = ("0" + n);
	}
   
   return n;
}

function validar_usuario(fileId) {
  var request = gapi.client.drive.files.get({
    'fileId': fileId
  });

  request.execute(function(resp) {

	try{
		var Admin = resp.ownerNames;
		var title = resp.title;
        //console.log('Description: ' + resp.ownerNames);
		}
		catch(e){
	}

    var collaborator = rtpg.getMe();

    if(collaborator.displayName == Admin){
	  alert("Soy Admin");
      return true;
    }
    else{
      alert("Soy Alumno");
  	  control_usuario(Admin,title);
    }
  });

}

function obtener_alumno() {
    var collaborator = rtpg.getMe();

    return collaborator.displayName;
}

function generar_html(key,val,check){

if(check){
var html = " <div class='tab'><input type='radio' id='tab-"+key+"' name='tab-group-1' checked><label for='tab-"+key+"'>Preguntas</label><div class='content'><section id='collabMapDemo' class='rp-greyRuledBottom' style='padding-bottom: 60px'><div id='respuestas' class='rp-section-content'><h4>"+val+"</h4><textarea rows='8' cols='50' id='RespuestaValue_"+key+"' type='text' placeholder='Escribe aquí la pregunta deseas enviar'></textarea><button id='RespuestaClean_"+key+"' value='"+key+"' class='rp-button'>Limpiar</button><button id='RespuestaPut_"+key+"' value='"+key+"' class='rp-button'>Enviar</button></div></section></div></div>";
}

else{
var html = " <div class='tab'><input type='radio' id='tab-"+key+"' name='tab-group-1'><label for='tab-"+key+"'>Preguntas</label><div class='content'><section id='collabMapDemo' class='rp-greyRuledBottom' style='padding-bottom: 60px'><div id='respuestas' class='rp-section-content'><h4>"+val+"</h4><textarea rows='8' cols='50' id='RespuestaValue_"+key+"' type='text' placeholder='Escribe aquí la pregunta deseas enviar'></textarea><button id='RespuestaClean_"+key+"' value='"+key+"' class='rp-button'>Limpiar</button><button id='RespuestaPut_"+key+"' value='"+key+"' class='rp-button'>Enviar</button></div></section></div></div>";
}

return html;


}
