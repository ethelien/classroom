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
    	setTimeout(function(){cargar_panel_clase(title);},600);
 		setTimeout(function(){rtpg.map.updateUiAlumno();},600);
	    setTimeout(function(){rtpg.map.updateDonAlumno();},600);
	    setTimeout(function(){rtpg.map.connectUiAlumno();},600);
	});
}

//Cargar panel de clase
function cargar_panel_clase(title){
    //SI PONES EL ALERT DEL TITLE SI LO CARGA 'TIEMPOs' alert(title);
    $("#titulo_asignatura").text(title);
}

//Generar ID de las respuestas y preguntas
function add_zero(n) {
    for(i=n.length;i<3;i++){
		n = ("0" + n);
	}
   
   return n;
}

//Control de usuario, si somos docente o alumno
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
	  //alert("Soy Admin");
      return true;
    }
    else{
      //alert("Soy Alumno");
  	  control_usuario(Admin,title);
    }
  });

}

//Obtener alumno que se encuentra en la aplicación
function obtener_alumno() {
    var collaborator = rtpg.getMe();

    return collaborator.displayName;
}


//Generar HTML de la pregunta al alumno
function generar_pregunta(key,val,check){

if(check){
var html = " <div class='tab'><input type='radio' id='tab-"+key+"' name='tab-group-1' checked><label for='tab-"+key+"'>Pregunta"+key+"</label><div class='content'><section id='collabMapDemo' class='rp-greyRuledBottom' style='padding-bottom: 60px'><div id='respuestas' class='rp-section-content'><h4>"+val+"</h4><textarea rows='8' cols='50' id='RespuestaValue_"+key+"' type='text' placeholder='Escribe aquí tu respuesta'></textarea><button id='RespuestaClean_"+key+"' value='"+key+"' class='rp-button'>Limpiar</button><button id='RespuestaPut_"+key+"' value='"+key+"' class='rp-button'>Enviar</button></div></section></div></div>";
}

else{
var html = " <div class='tab'><input type='radio' id='tab-"+key+"' name='tab-group-1'><label for='tab-"+key+"'>Pregunta"+key+"</label><div class='content'><section id='collabMapDemo' class='rp-greyRuledBottom' style='padding-bottom: 60px'><div id='respuestas' class='rp-section-content'><h4>"+val+"</h4><textarea rows='8' cols='50' id='RespuestaValue_"+key+"' type='text' placeholder='Escribe aquí tu respuesta'></textarea><button id='RespuestaClean_"+key+"' value='"+key+"' class='rp-button'>Limpiar</button><button id='RespuestaPut_"+key+"' value='"+key+"' class='rp-button'>Enviar</button></div></section></div></div>";
}

return html;

}

//Generar HTML con los resultados de las respuestas de los alumno
function generar_resultados(key,val,check){

if(check){
var html = "<div class='tab'><input type='radio' id='tab-"+key+"' name='tab-group-2' checked><label for='tab-"+key+"'>Pregunta "+key+"</label><div class='content'><h4>"+val+"</h4><table><tr><td style='text-align: center; color: grey; font-style: italic;'>ALUMNO</td><td style='text-align: center; color: grey; font-style: italic;'>RESPUESTA</td></tr><tr><td><select size='15' id='ProblemasNombre_"+key+"'></select></td><td><select size='15' id='ProblemasRespuesta_"+key+"'></select></td></tr></table></div></div>";
}

else{
var html = "<div class='tab'><input type='radio' id='tab-"+key+"' name='tab-group-2'><label for='tab-"+key+"'>Pregunta "+key+"</label><div class='content'><h4>"+val+"</h4><table><tr><td style='text-align: center; color: grey; font-style: italic;'>ALUMNO</td><td style='text-align: center; color: grey; font-style: italic;'>RESPUESTA</td></tr><tr><td><select size='15' id='ProblemasNombre_"+key+"'></select></td><td><select size='15' id='ProblemasRespuesta_"+key+"'></select></td></tr></table></div></div>";
}

return html;

}

//Leer valores del cuestionario

function leer_valores_cuestionario(){

	var option1 = $("#option1").val(); 
	var option2 = $("#option2").val();
	var option3 = $("#option3").val();
	var option4 = $("#option4").val();

    var options="/*/*/*/*/"+option1+"/*/*/"+option2+"/*/*/"+option3+"/*/*/"+option4+"/*/*/";
    alert(options);
    
   return options;

}

//Limpiar valores del cuestionario
function limpiar_valores_cuestionario(){

	$("#option1").val(''); 
	$("#option2").val('');
	$("#option3").val('');
	$("#option4").val('');

}

//Separamos la pregunta de las opciones del cuestionario (de existir)
function obtener_pregunta(val){

	var resul = val.split('/*/*/*/*/');
    return resul[0];

}
