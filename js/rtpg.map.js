/**
 * Copyright 2014 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";


/**** Problemas *****/

/**
 * Namespace
 */
rtpg.map 			= rtpg.map || {};
rtpg.allDemos.push(rtpg.map);


/**
 * Realtime model's field name.
 */
rtpg.map.FIELD_NAME = 'demo_map';

/**
 * Realtime model's field.
 */
rtpg.map.field = null;
rtpg.map.START_KEYS = ({});

/**
 * DOM selector for the elements for Problemas.
 */
rtpg.map.MAP_KEYS_SELECTOR = '#ProblemasKeys';
rtpg.map.MAP_VALUES_SELECTOR = '#ProblemasValues';
rtpg.map.REMOVE_SELECTOR = '#demoMapRemove';
rtpg.map.CLEAR_SELECTOR = '#demoMapClear';
rtpg.map.PUT_SELECTOR = '#ProblemasPut';
rtpg.map.CLEAN_SELECTOR = '#ProblemasClean';
rtpg.map.PUT_VALUE_SELECTOR = '#ProblemasValue';

rtpg.map.MAP_KEYS_SELECTOR_NOMBRE = '#ProblemasNombre';
rtpg.map.MAP_VALUES_SELECTOR_RESPUESTA = '#ProblemasRespuesta';
rtpg.map.MAP_PES_ALUMNO = '#preguntas_alumno';
rtpg.map.MAP_RES_ALUMNO = '#respuestas_alumno';

rtpg.map.loadField = function() {
  rtpg.map.field = rtpg.getField(rtpg.map.FIELD_NAME);
}


rtpg.map.initializeModel = function(model) {
  var field = model.createMap(rtpg.map.START_KEYS);
  for (var key in rtpg.map.START_KEYS) {
    field.set(key, rtpg.map.START_KEYS[key]);
  }
  model.getRoot().set(rtpg.map.FIELD_NAME, field);
}

rtpg.map.updateRespuestasDocente = function(){

  alert("updateRespuestasDocente");

}

rtpg.map.updateUi = function() {

  var key_aux = null;
  var check = true; 

  $(rtpg.map.MAP_RES_ALUMNO).empty();

  var keys = rtpg.map.field.keys();
  keys.sort();
  var l = keys.length;


  for (var i=0; i < l; i++) {

    var key = keys[i];
    var val = obtener_pregunta(rtpg.map.field.get(key));

	if(key.length=="3"){

		eval("rtpg.map.PROBLEMAS_NOMBRE_"+key+"= '#ProblemasNombre_"+key+"'");
		eval("rtpg.map.PROBLEMAS_RESPUESTA_"+key+"= '#ProblemasRespuesta_"+key+"'");

    	eval("$(rtpg.map.PROBLEMAS_NOMBRE_"+key+").empty()");
    	eval("$(rtpg.map.PROBLEMAS_RESPUESTA_"+key+").empty()");

		if(i==0)check=true;
		else check=false;

        var html = generar_resultados(key,val[0],check);
		$(rtpg.map.MAP_RES_ALUMNO).append(html);

        key_aux = key;
   }

    if(key.length>"3"){
		var elem = key.split('-');

		var newOptionKey = $('<option>').val(elem[1]).text('\xa0\xa0' + elem[1]);
		var newOptionValue = $('<option>').val(val[0]).text('\xa0\xa0' + val[0]);

    	eval("$(rtpg.map.PROBLEMAS_NOMBRE_"+key_aux+").append(newOptionKey)");
   		eval("$(rtpg.map.PROBLEMAS_RESPUESTA_"+key_aux+").append(newOptionValue)");
	}


  }
  l = l <= 1 ? 2 : l;
  $(rtpg.map.MAP_RES_ALUMNO).attr('size', l);
}


rtpg.map.onRealtime = function(evt) {
  rtpg.map.updateUi();
  rtpg.map.updateUiAlumno();
  rtpg.map.updateDonAlumno();
  rtpg.map.connectUiAlumno();
  cargar_preguntas_alumno();
};


rtpg.map.onRemoveItem = function(evt) {
  var key = $(rtpg.map.MAP_KEYS_SELECTOR).val();
  if (key != null) {
    rtpg.map.field.delete(key);
  }
};


rtpg.map.onClearMap = function(evt) {
  rtpg.map.field.clear();

};

rtpg.map.onPutMap = function(evt) {

  var keys = rtpg.map.field.keys();
  if(keys.length==0) var aux="1";
  else{ 
	keys.sort();
	keys.reverse();
	var aux = ((parseInt(keys[0]))+1).toString();
  }

  var key = add_zero(aux); 
  var val = $(rtpg.map.PUT_VALUE_SELECTOR).val();


  rtpg.map.field.set(key, val);

  alert("Su pregunta ha sido enviada correctamente");
  $(rtpg.map.PUT_VALUE_SELECTOR).val('');

};

rtpg.map.connectUi = function() {
  $(rtpg.map.REMOVE_SELECTOR).click(rtpg.map.onRemoveItem);
  $(rtpg.map.CLEAR_SELECTOR).click(rtpg.map.onClearMap);
  $(rtpg.map.PUT_SELECTOR).click(rtpg.map.onPutMap);
  $(rtpg.map.CLEAN_SELECTOR).click(rtpg.map.CleanText);
  //Cuestiones
  $(rtpg.map.PUT_CUESTIONES).click(rtpg.map.onPutMapCuestiones);
  $(rtpg.map.CLEAN_CUESTIONES).click(rtpg.map.CleanTextCuestiones);
};


rtpg.map.connectRealtime = function() {
  rtpg.map.field.addEventListener(gapi.drive.realtime.EventType.VALUE_CHANGED, rtpg.map.onRealtime);
};


rtpg.map.CleanText = function(){
  $(rtpg.map.PUT_VALUE_SELECTOR).val('');
}

rtpg.map.updateDonDocente = function(){
    
  var keys = rtpg.map.field.keys();
  keys.sort();
  var l = keys.length;

  for (var i=0; i < l; i++) {
    var key = keys[i];
	if(key.length=="3"){
		eval("rtpg.map.PROBLEMAS_NOMBRE_"+key+"= '#ProblemasNombre_"+key+"'");
		eval("rtpg.map.PROBLEMAS_RESPUESTA_"+key+"= '#ProblemasRespuesta_"+key+"'");
	}
  }
}


/***** ALUMNO ****/

rtpg.map.updateUiAlumno = function() {

  $(rtpg.map.MAP_PES_ALUMNO).empty();

  var keys = rtpg.map.field.keys();
  var check = true;
  keys.sort();

  var l = keys.length;
  for (var i=0; i < l; i++) {
    var key = keys[i];

	if(key.length=="3"){
		var val = obtener_pregunta(rtpg.map.field.get(key));

		if(i==0)check=true;
		else check=false;

		if(val[1]==null){
			var html = generar_pregunta(key,val[0],check);
			$(rtpg.map.MAP_PES_ALUMNO).append(html);
		}

		else{
			var html = generar_cuestionario(key,val[0],val[1],check);
			$(rtpg.map.MAP_PES_ALUMNO).append(html);
		}

	}
  }
  l = l <= 1 ? 2 : l;
  $(rtpg.map.MAP_VALUES_PES_ALUMNO).attr('size', l);
}


rtpg.map.onPutMapRespuesta = function(evt) {

  var val = eval("$(rtpg.map.PUT_VALUE_RESPUESTA_"+evt.data.key+").val()");
  var key = evt.data.key+("-")+obtener_alumno();
  rtpg.map.field.set(key, val);

  alert("Su respuesta ha sido enviada correctamente");
  $(rtpg.map.PUT_VALUE_RESPUESTA).val('');

};

rtpg.map.onPutMapRespuestaCuestionario = function(evt) {

  var val = capturar_valor_cuestionario(evt.data.key);
  var key = evt.data.key+("-")+obtener_alumno();
	
  rtpg.map.field.set(key, val);

  alert("Su respuesta ha sido enviada correctamente");

};


rtpg.map.connectUiAlumno = function() {

  var keys = rtpg.map.field.keys();
  keys.sort();
  var l = keys.length;

  for (var i=0; i < l; i++) {
    var key = keys[i];
	if(key.length=="3"){

   		var val = obtener_pregunta(rtpg.map.field.get(key));

    	if(val[1]!=null){
			eval("$(rtpg.map.PUT_RESPUESTA_CUESTIONARIO"+key+").click({key:'"+key+"'},rtpg.map.onPutMapRespuestaCuestionario)");
		}
		else{
	   		eval("$(rtpg.map.PUT_RESPUESTA_"+key+").click({key:'"+key+"'},rtpg.map.onPutMapRespuesta)");
       		eval("$(rtpg.map.CLEAN_RESPUESTA_"+key+").click({key:'"+key+"'},rtpg.map.CleanRespuesta)");
		}
   }
  }
}

rtpg.map.updateDonAlumno = function(){
    
  var keys = rtpg.map.field.keys();
  keys.sort();
  var l = keys.length;

  for (var i=0; i < l; i++) {
    var key = keys[i];
	if(key.length=="3"){

   		var val = obtener_pregunta(rtpg.map.field.get(key));

    	if(val[1]!=null){

			eval("rtpg.map.PUT_VALUE_RESPUESTA_CUESTIONARIO"+key+"= '#RespuestaCuestionarioValue_"+key+"'");
			eval("rtpg.map.PUT_RESPUESTA_CUESTIONARIO"+key+"= '#RespuestaCuestionarioPut_"+key+"'");
		
			eval("rtpg.map.CUESTION_RESPUESTA_"+key+"_1 = '#option_"+key+"_1'");
			eval("rtpg.map.CUESTION_RESPUESTA_"+key+"_1 = '#option_"+key+"_1'");	
			eval("rtpg.map.CUESTION_RESPUESTA_"+key+"_1 = '#option_"+key+"_1'");
			eval("rtpg.map.CUESTION_RESPUESTA_"+key+"_1 = '#option_"+key+"_1'");
		}

		else{

			eval("rtpg.map.PUT_VALUE_RESPUESTA_"+key+"= '#RespuestaValue_"+key+"'");
			eval("rtpg.map.PUT_RESPUESTA_"+key+"= '#RespuestaPut_"+key+"'");
			eval("rtpg.map.CLEAN_RESPUESTA_"+key+"= '#RespuestaClean_"+key+"'");

		}
	}

  }
}


rtpg.map.updateAlumno = function(){
	 rtpg.map.updateUiAlumno();
	 rtpg.map.updateDonAlumno();
	 rtpg.map.connectUiAlumno();
}

rtpg.map.CleanRespuesta = function(evt){
   eval("$(rtpg.map.PUT_VALUE_RESPUESTA_"+evt.data.key+").val('')"); 
}

/***** CUESTIONES ****/

rtpg.map.PUT_CUESTIONES = '#CuestionesPut';
rtpg.map.CLEAN_CUESTIONES = '#CuestionesClean';
rtpg.map.PUT_VALUE_CUESTIONES = '#CuestionesValue';

rtpg.map.onPutMapCuestiones = function(evt) {

  var keys = rtpg.map.field.keys();
  if(keys.length==0) var aux="1";
  else{ 
	keys.sort();
	keys.reverse();
	var aux = ((parseInt(keys[0]))+1).toString();
  }

  var key = add_zero(aux); 
  var val = $(rtpg.map.PUT_VALUE_CUESTIONES).val();
  var opciones = leer_valores_cuestionario();

  val+=opciones;
  rtpg.map.field.set(key, val);

  alert("Su cuestión ha sido enviada correctamente");
  $(rtpg.map.PUT_VALUE_CUESTIONES).val('');
  limpiar_valores_cuestionario();

};

rtpg.map.CleanTextCuestiones = function(){
  $(rtpg.map.PUT_VALUE_CUESTIONES).val('');
};



/********************/
/**** CONSULTAS *****/
/********************/

/**
 * Namespace
 */
rtpg.map_consultas 			= rtpg.map_consultas || {};
rtpg.allDemos.push(rtpg.map_consultas);


/**
 * Realtime model's field name.
 */
rtpg.map_consultas.FIELD_NAME = 'demo_map_consultas';

/**
 * Realtime model's field.
 */
rtpg.map_consultas.field = null;
rtpg.map_consultas.START_KEYS = ({});

/**
 * DOM selector for the elements for Problemas.
 */
rtpg.map_consultas.MAP_KEYS_SELECTOR = '#ConsultasKeys';
rtpg.map_consultas.MAP_VALUES_SELECTOR = '#ConsultasValues';
rtpg.map_consultas.REMOVE_SELECTOR = '#demoMapRemove';
rtpg.map_consultas.CLEAR_SELECTOR = '#demoMapClear';
rtpg.map_consultas.PUT_SELECTOR = '#ConsultasPut';
rtpg.map_consultas.CLEAN_SELECTOR = '#ConsultasClean';
rtpg.map_consultas.PUT_VALUE_SELECTOR = '#ConsultasValue';
//rtpg.map.MAP_PES_ALUMNO = '#preguntas_alumno';
//rtpg.map.MAP_RES_ALUMNO = '#respuestas_alumno';
rtpg.map_consultas.CONSULTAS_PROFESOR = '#consultas_admin';


rtpg.map_consultas.loadField = function() {
  rtpg.map_consultas.field = rtpg.getField(rtpg.map_consultas.FIELD_NAME);
}


rtpg.map_consultas.initializeModel = function(model) {

  var field = model.createMap(rtpg.map_consultas.START_KEYS);
  for (var key in rtpg.map_consultas.START_KEYS) {
    field.set(key, rtpg.map_consultas.START_KEYS[key]);
  }
  model.getRoot().set(rtpg.map_consultas.FIELD_NAME, field);
}


rtpg.map_consultas.updateUiAlumno = function() {
 /* $(rtpg.map_consultas.MAP_KEYS_SELECTOR).empty();
  $(rtpg.map_consultas.MAP_VALUES_SELECTOR).empty();
  var keys = rtpg.map_consultas.field.keys();
  keys.sort();
  var l = keys.length;
  alert("KEYS: "+l);
  for (var i=0; i < l; i++) {
    var key = keys[i];
    var val = rtpg.map_consultas.field.get(key);
    alert(key+" - "+val+" - LUGAR: "+rtpg.map_consultas.MAP_KEYS_SELECTOR);
    var newOptionKey = $('<option>').val(key).text('\xa0\xa0' + key);
    var newOptionValue = $('<option>').val(val).text('\xa0\xa0' + val);
    $(rtpg.map_consultas.MAP_KEYS_SELECTOR).append(newOptionKey);
    $(rtpg.map_consultas.MAP_VALUES_SELECTOR).append(newOptionValue);
  }
  l = l <= 1 ? 2 : l;
  $(rtpg.map_consultas.MAP_KEYS_SELECTOR).attr('size', l);
  $(rtpg.map_consultas.MAP_VALUES_SELECTOR).attr('size', l);
*/


  $(rtpg.map_consultas.RESPUESTAS_PROFESOR).empty();

  var keys = rtpg.map_consultas.field.keys();
  var check = true;
  keys.sort();

  var l = keys.length;
  for (var i=0; i < l; i++) {
    var key = keys[i];
	var elem = key.split('-');
    alert(elem[0]+" -- "+elem[1]);
    //SERA 4 - XXXR - 0001 --> POR AHORA PARA PROBAR 3 hasta que ponga la R en la key generada por el docente
    alert(elem[0].length);
    alert(obtener_alumno())

	if(elem[0].length=="4" && elem[1]==obtener_alumno()){
		alert("ENTRO");
		var val = rtpg.map_consultas.field.get(key);
		var aux = elem[0].substring(0, elem[0].length-1)+"-"+elem[1];
		//LA PREGUNTA SERA LA QUE TENGA LA KEY XXX sin La R

		var pregunta = rtpg.map_consultas.field.get(aux);
        alert(pregunta);
        //var pregunta = "PRUEBA";

		var html = generar_respuesta_consultas(elem[0],pregunta,val,check);
		check=false;

		$(rtpg.map_consultas.RESPUESTAS_PROFESOR).append(html);
	}
  }
  l = l <= 1 ? 2 : l;
  $(rtpg.map_consultas.RESPUESTAS_PROFESOR).attr('size', l);
}


rtpg.map_consultas.onRealtime = function(evt) {
  rtpg.map_consultas.updateUi();
  rtpg.map_consultas.updateUiAlumno();
  rtpg.map_consultas.updateDonDocente();
  rtpg.map_consultas.connectUiDocente();
};


rtpg.map_consultas.onRemoveItem = function(evt) {
  var key = $(rtpg.map_consultas.MAP_KEYS_SELECTOR).val();
  if (key != null) {
    rtpg.map_consultas.field.delete(key);
  }
};


rtpg.map_consultas.onClearMap = function(evt) {
  rtpg.map_consultas.field.clear();
};

rtpg.map_consultas.onPutMap = function(evt) {

  var keys = rtpg.map_consultas.field.keys();
  if(keys.length==0) var aux="1";
  else{ 
	keys.sort();
    keys.reverse();
    var aux = ((parseInt(keys[0]))+1).toString();
  }

  var key = add_zero(aux)+("-")+obtener_alumno();
  var val = $(rtpg.map_consultas.PUT_VALUE_SELECTOR).val();
  rtpg.map_consultas.field.set(key, val);

  alert("Su consulta ha sido enviada correctamente");
  $(rtpg.map_consultas.PUT_VALUE_SELECTOR).val('');
};


rtpg.map_consultas.connectUi = function() {
  $(rtpg.map_consultas.REMOVE_SELECTOR).click(rtpg.map_consultas.onRemoveItem);
  $(rtpg.map_consultas.CLEAR_SELECTOR).click(rtpg.map_consultas.onClearMap);
  $(rtpg.map_consultas.PUT_SELECTOR).click(rtpg.map_consultas.onPutMap);
  $(rtpg.map_consultas.CLEAN_SELECTOR).click(rtpg.map_consultas.CleanText);
};


rtpg.map_consultas.connectRealtime = function() {
  rtpg.map_consultas.field.addEventListener(gapi.drive.realtime.EventType.VALUE_CHANGED, rtpg.map_consultas.onRealtime);
};

rtpg.map_consultas.CleanText = function(){
  $(rtpg.map_consultas.PUT_VALUE_SELECTOR).val('');
}


rtpg.map_consultas.updateDonAlumno = function(){

	rtpg.map_consultas.MAP_KEYS_SELECTOR = '#ConsultasKeys';
	rtpg.map_consultas.MAP_VALUES_SELECTOR = '#ConsultasValues';
	rtpg.map_consultas.REMOVE_SELECTOR = '#demoMapRemove';
	rtpg.map_consultas.CLEAR_SELECTOR = '#demoMapClear';
	rtpg.map_consultas.PUT_SELECTOR = '#ConsultasPut';
	rtpg.map_consultas.CLEAN_SELECTOR = '#ConsultasClean';
	rtpg.map_consultas.PUT_VALUE_SELECTOR = '#ConsultasValue';
	rtpg.map_consultas.RESPUESTAS_PROFESOR = '#respuestas_alumno_consultas';
  
}


rtpg.map_consultas.updateUi = function() {

  $(rtpg.map_consultas.CONSULTAS_PROFESOR).empty();

  var keys = rtpg.map_consultas.field.keys();
  var check = true;
  keys.sort();

  var l = keys.length;
  for (var i=0; i < l; i++) {
    var key = keys[i];

	if(key.length>"4"){
        
		var val = rtpg.map_consultas.field.get(key);

		if(i==0)check=true;
		else check=false;

		var elem = key.split('-');
		var html = generar_pregunta_consultas(elem[0],elem[1],val,check);
		$(rtpg.map_consultas.CONSULTAS_PROFESOR).append(html);

	}
  }
  l = l <= 1 ? 2 : l;
  $(rtpg.map_consultas.CONSULTAS_PROFESOR).attr('size', l);
}


rtpg.map_consultas.onPutMapConsulta = function(evt) {

  var val = eval("$(rtpg.map_consultas.VALUE_RESPUESTA_CONSULTA_"+evt.data.key+").val()");

  var key = (evt.data.key+"R-"+evt.data.alumno);
  rtpg.map_consultas.field.set(key, val);

  alert("La respuesta a la consulta ha sido enviada correctamente");
  $(rtpg.map_consultas.PUT_VALUE_RESPUESTA).val('');

};

rtpg.map_consultas.updateDonDocente = function(){
    
  var keys = rtpg.map_consultas.field.keys();
  keys.sort();
  var l = keys.length;

  for (var i=0; i < l; i++) {
    var key = keys[i];
    var elem = key.split('-');

	if(elem[0].length=="3"){
		eval("rtpg.map_consultas.VALUE_RESPUESTA_CONSULTA_"+elem[0]+"= '#RespuestaConsultaValue_"+elem[0]+"'");
		eval("rtpg.map_consultas.RESPUESTA_CUESTIONARIO_"+elem[0]+"= '#RespuestaConsultaPut_"+elem[0]+"'");
		eval("rtpg.map_consultas.CLEAN_RESPUESTA_"+elem[0]+"= '#RespuestaConsulta_"+elem[0]+"'");
	}

  }
}

rtpg.map_consultas.connectUiDocente = function() {

  var keys = rtpg.map_consultas.field.keys();
  keys.sort();
  var l = keys.length;

  for (var i=0; i < l; i++) {
    var key = keys[i];
	var elem = key.split('-');
	if(elem[0].length=="3"){
   		eval("$(rtpg.map_consultas.RESPUESTA_CUESTIONARIO_"+elem[0]+").click({key:'"+elem[0]+"', alumno:'"+elem[1]+"'},rtpg.map_consultas.onPutMapConsulta)");
   		eval("$(rtpg.map_consultas.CLEAN_RESPUESTA_"+elem[0]+").click({key:'"+elem[0]+"'},rtpg.map_consultas.CleanConsulta)");
   }
  }
}

rtpg.map_consultas.CleanConsulta = function(evt){
   eval("$(rtpg.map_consultas.VALUE_RESPUESTA_CONSULTA_"+evt.data.key+").val('')"); 
};

