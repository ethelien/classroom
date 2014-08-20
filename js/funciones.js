/**
Funciones UPV E-Class especificas
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
    	setTimeout(function(){cargar_preguntas_alumno();},600);
 		setTimeout(function(){rtpg.map.updateUiAlumno();},600);
	    setTimeout(function(){rtpg.map.updateDonAlumno();},600);
	    setTimeout(function(){rtpg.map.connectUiAlumno();},600);

		setTimeout(function(){rtpg.map_consultas.updateDonAlumno();},600);
 		setTimeout(function(){rtpg.map_consultas.updateUiAlumno();},600);
	    setTimeout(function(){rtpg.map_consultas.connectUi();},600);

	});
}

//CONTROL DE ADMINISTRADOR
function control_admin() {

	$(document).ready(function(){
		setTimeout(function(){rtpg.map_consultas.updateUi();},600);
		setTimeout(function(){rtpg.map_consultas.updateDonDocente();},600);
		setTimeout(function(){rtpg.map_consultas.connectUiDocente();},600);
	});
}

//Cargar panel de clase
function cargar_panel_clase(title){
    $("#titulo_asignatura").text(title);
}

function cargar_preguntas_alumno(){

	var respondidas="";

	var keys = rtpg.map.field.keys();
 	keys.sort();
    var l = keys.length;

	for (var i=0; i < l; i++) {

		var key = keys[i];

		if(key.length>"3"){
			var elem = key.split('-');
			if(obtener_alumno()==elem[1]) respondidas+=(elem[0]+", ");
		}
	}

    $("#preguntas_respondidas").text(respondidas);

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
		}
		catch(e){
	}

    var collaborator = rtpg.getMe();

    if(collaborator.displayName == Admin){
       control_admin();
    }
    else{
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
var html = " <div class='tab'><input type='radio' id='tab-"+key+"' name='tab-group-1' checked><label for='tab-"+key+"'>Pregunta"+key+"</label><div class='content'><div id='respuestas' class='rp-section-content'><h4>"+val+"</h4><textarea rows='8' cols='50' id='RespuestaValue_"+key+"' type='text' placeholder='Escribe aquí tu respuesta'></textarea><button id='RespuestaClean_"+key+"' value='"+key+"' class='rp-button'>Limpiar</button><button id='RespuestaPut_"+key+"' value='"+key+"' class='rp-button'>Enviar</button></div></div></div>";
}

else{
var html = " <div class='tab'><input type='radio' id='tab-"+key+"' name='tab-group-1'><label for='tab-"+key+"'>Pregunta"+key+"</label><div class='content'><div id='respuestas' class='rp-section-content'><h4>"+val+"</h4><textarea rows='8' cols='50' id='RespuestaValue_"+key+"' type='text' placeholder='Escribe aquí tu respuesta'></textarea><button id='RespuestaClean_"+key+"' value='"+key+"' class='rp-button'>Limpiar</button><button id='RespuestaPut_"+key+"' value='"+key+"' class='rp-button'>Enviar</button></div></div></div>";
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
    return resul;

}

//Generar HTML el cuestionario para los alumno
function generar_cuestionario(key,val,opciones,check){

var opt = opciones.split('/*/*/');

if(check){
var html = " <div class='tab'><input type='radio' id='tab-"+key+"' name='tab-group-1' checked><label for='tab-"+key+"'>Pregunta"+key+"</label><div class='content'><div id='respuestas' class='rp-section-content'><h4>"+val+"</h4><form id='RespuestaCuestionarioValue_"+key+"'><input type='radio' id='option_"+key+"_1' name='option_"+key+"' value='"+opt[0]+"'>"+opt[0]+"<br><input type='radio' id='option_"+key+"_2' name='option_"+key+"' value='"+opt[1]+"'>"+opt[1]+"<br><input type='radio' id='option_"+key+"_3' name='option_"+key+"' value='"+opt[2]+"'>"+opt[2]+"<br><input type='radio' id='option_"+key+"_4' name='option_"+key+"' value='"+opt[3]+"'>"+opt[3]+"<br></form><button id='RespuestaCuestionarioPut_"+key+"' value='"+key+"' class='rp-button'>Enviar</button></div></div></div>";
}

else{
var html = " <div class='tab'><input type='radio' id='tab-"+key+"' name='tab-group-1'><label for='tab-"+key+"'>Pregunta"+key+"</label><div class='content'><div id='respuestas' class='rp-section-content'><h4>"+val+"</h4><form id='RespuestaCuestionarioValue_"+key+"'><input type='radio' id='option_"+key+"_1' name='option_"+key+"' value='"+opt[0]+"'>"+opt[0]+"<br><input type='radio' id='option_"+key+"_2' name='option_"+key+"' value='"+opt[1]+"'>"+opt[1]+"<br><input type='radio' id='option_"+key+"_3' name='option_"+key+"' value='"+opt[2]+"'>"+opt[2]+"<br><input type='radio' id='option_"+key+"_4' name='option_"+key+"' value='"+opt[3]+"'>"+opt[3]+"<br></form><button id='RespuestaCuestionarioPut_"+key+"' value='"+key+"' class='rp-button'>Enviar</button></div></div></div>";
}

return html;

}

//Capturar respuesta del cuestionario del alumno
function capturar_valor_cuestionario(key) { 
	var resultado="ninguno"; 
	var id = eval("'option_"+key+"'");
	var porNombre=document.getElementsByName(id);
	
	for(var i=0;i<porNombre.length;i++) { 
		if(porNombre[i].checked) resultado=porNombre[i].value; 
	} 

	return resultado;

}


//Generar HTML con las consultas de los alumno
function generar_pregunta_consultas(key,alumno,val,check){

if(check){
var html = " <div class='tab'><input type='radio' id='tabC-"+key+"' name='tabC-group-1' checked><label for='tabC-"+key+"'>"+alumno+"</label><div class='content'><div id='respuestas_consultas' class='rp-section-content'><h4>"+val+"</h4><textarea rows='8' cols='50' id='RespuestaConsultaValue_"+key+"' type='text' placeholder='Escribe aquí tu respuesta'></textarea><button id='RespuestaConsultaClean_"+key+"' value='"+key+"' class='rp-button'>Limpiar</button><button id='RespuestaConsultaPut_"+key+"' value='"+key+"' class='rp-button'>Enviar</button></div></div></div>";
}

else{
var html = " <div class='tab'><input type='radio' id='tabC-"+key+"' name='tabC-group-1'><label for='tabC-"+key+"'>"+alumno+"</label><div class='content'><div id='respuestas_consultas' class='rp-section-content'><h4>"+val+"</h4><textarea rows='8' cols='50' id='RespuestaConsultaValue_"+key+"' type='text' placeholder='Escribe aquí tu respuesta'></textarea><button id='RespuestaConsultaClean_"+key+"' value='"+key+"' class='rp-button'>Limpiar</button><button id='RespuestaConsultaPut_"+key+"' value='"+key+"' class='rp-button'>Enviar</button></div></div></div>";
}

return html;

}

//Generar HTML con las respuestas del profesor a las consultas del alumno en cuestion
function generar_respuesta_consultas(key,pregunta,val,check){

if(check){
var html = " <div class='tab'><input type='radio' id='tabCR-"+key+"' name='tabC-group-2' checked><label for='tabCR-"+key+"'>Consulta "+key+"</label><div class='content'><div id='respuestas_consultas' class='rp-section-content'><h4>Pregunta: "+pregunta+"</h4><h4>Respuesta: "+val+"</h4></div></div></div>";
}

else{
var html = " <div class='tab'><input type='radio' id='tabCR-"+key+"' name='tabC-group-2' ><label for='tabCR-"+key+"'>Consulta "+key+"</label><div class='content'><div id='respuestas_consultas' class='rp-section-content'><h4>Pregunta: "+pregunta+"</h4><h4>Respuesta: "+val+"</h4></div></div></div>";
}

return html;

}

