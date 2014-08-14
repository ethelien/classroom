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


rtpg.map.updateUi = function() {

  $(rtpg.map.MAP_KEYS_SELECTOR).empty();
  $(rtpg.map.MAP_VALUES_SELECTOR).empty();
  $(rtpg.map.MAP_KEYS_SELECTOR_NOMBRE).empty();
  $(rtpg.map.MAP_VALUES_SELECTOR_RESPUESTA).empty();

  var keys = rtpg.map.field.keys();
  keys.sort();
  var l = keys.length;

  for (var i=0; i < l; i++) {
    var key = keys[i];
    var val = rtpg.map.field.get(key);
    var newOptionKey = $('<option>').val(key).text('\xa0\xa0' + key);
    var newOptionValue = $('<option>').val(val).text('\xa0\xa0' + val);
    $(rtpg.map.MAP_KEYS_SELECTOR).append(newOptionKey);
    $(rtpg.map.MAP_VALUES_SELECTOR).append(newOptionValue);

    //var elem = val.split('/*//*/');
    //alert(elem[0]+" - "+elem[1]);

    if(key.length>"3"){
		var elem = key.split('-');
		alert(elem[0]+" - "+elem[1]);

		var newOptionKey = $('<option>').val(elem[1]).text('\xa0\xa0' + elem[1]);
		var newOptionValue = $('<option>').val(val).text('\xa0\xa0' + val);
		$(rtpg.map.MAP_KEYS_SELECTOR_NOMBRE).append(newOptionKey);
		$(rtpg.map.MAP_VALUES_SELECTOR_RESPUESTA).append(newOptionValue);
	}


  }
  l = l <= 1 ? 2 : l;
  $(rtpg.map.MAP_KEYS_SELECTOR).attr('size', l);
  $(rtpg.map.MAP_VALUES_SELECTOR).attr('size', l);
  $(rtpg.map.MAP_KEYS_SELECTOR_NOMBRE).attr('size', l);
  $(rtpg.map.MAP_VALUES_SELECTOR_RESPUESTA).attr('size', l);
}

rtpg.map.updateUiAlumno = function() {

  alert("updateUiAlumno");

  $(rtpg.map.MAP_PES_ALUMNO).empty();

  var keys = rtpg.map.field.keys();
  var check = true;
  keys.sort();

  var l = keys.length;
  for (var i=0; i < l; i++) {
    var key = keys[i];

	if(key.length=="3"){
		var val = rtpg.map.field.get(key);

		if(i==0)check=true;
		else check=false;
		
		var html = generar_html(key,val,check);
		alert(html);
		$(rtpg.map.MAP_PES_ALUMNO).append(html);
	}
  }
  l = l <= 1 ? 2 : l;
  $(rtpg.map.MAP_VALUES_PES_ALUMNO).attr('size', l);
}



rtpg.map.onRealtime = function(evt) {
  rtpg.map.updateUi();
  rtpg.map.updateUiAlumno();
  rtpg.map.updateDonAlumno();
  rtpg.map.connectUiAlumno();
  //rtpg.log.logEvent(evt, 'Map Value Changed');
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

  //var key = $(rtpg.map.PUT_KEY_SELECTOR).val();
  var keys = rtpg.map.field.keys();
  if(keys.length==0) var aux="1";
  else{ 
	keys.sort();
	keys.reverse();
	var aux = ((parseInt(keys[0]))+1).toString();
  }

  var key = add_zero(aux); 
  var val = $(rtpg.map.PUT_VALUE_SELECTOR).val();

  //PARA ENVIAR RESPUESTAS Y SABER NOMBRE ALUMNO LA ENVIA
  //var val_aux = obtener_alumno()+("/*//*/")+val;

  rtpg.map.field.set(key, val);

  alert("Su pregunta ha sido enviada correctamente");
  $(rtpg.map.PUT_VALUE_SELECTOR).val('');

};

rtpg.map.onPutMapRespuesta = function(evt) {

  var val = eval("$(rtpg.map.PUT_VALUE_RESPUESTA_"+evt.data.key+").val()");
  var key = evt.data.key+("-")+obtener_alumno();
  rtpg.map.field.set(key, val);

  alert("Su respuesta ha sido enviada correctamente");
  $(rtpg.map.PUT_VALUE_RESPUESTA).val('');

};


rtpg.map.connectUi = function() {
  $(rtpg.map.REMOVE_SELECTOR).click(rtpg.map.onRemoveItem);
  $(rtpg.map.CLEAR_SELECTOR).click(rtpg.map.onClearMap);
  $(rtpg.map.PUT_SELECTOR).click(rtpg.map.onPutMap);
  $(rtpg.map.CLEAN_SELECTOR).click(rtpg.map.CleanText);
};

rtpg.map.connectUiAlumno = function() {
  alert("ContectUiAlumno");

  var keys = rtpg.map.field.keys();
  keys.sort();
  var l = keys.length;

  for (var i=0; i < l; i++) {
    var key = keys[i];
	if(key.length=="3"){
	   eval("$(rtpg.map.PUT_RESPUESTA_"+key+").click({key:'"+key+"'},rtpg.map.onPutMapRespuesta)");
       eval("$(rtpg.map.CLEAN_RESPUESTA_"+key+").click({key:'"+key+"'},rtpg.map.CleanRespuesta)");
   }
  }
}

rtpg.map.connectRealtime = function() {
  rtpg.map.field.addEventListener(gapi.drive.realtime.EventType.VALUE_CHANGED, rtpg.map.onRealtime);
};


rtpg.map.CleanText = function(){
  $(rtpg.map.PUT_VALUE_SELECTOR).val('');
}

rtpg.map.CleanRespuesta = function(evt){
   eval("$(rtpg.map.PUT_VALUE_RESPUESTA_"+evt.data.key+").val('')"); 
}

rtpg.map.updateDonAlumno = function(){
  alert("updateDon");
    
  var keys = rtpg.map.field.keys();
  keys.sort();
  var l = keys.length;

  for (var i=0; i < l; i++) {
    var key = keys[i];
	if(key.length=="3"){
		eval("rtpg.map.PUT_VALUE_RESPUESTA_"+key+"= '#RespuestaValue_"+key+"'");
		eval("rtpg.map.PUT_RESPUESTA_"+key+"= '#RespuestaPut_"+key+"'");
		eval("rtpg.map.CLEAN_RESPUESTA_"+key+"= '#RespuestaClean_"+key+"'");
	}
  }
}

rtpg.map.updateAlumno = function(){
	 rtpg.map.updateUiAlumno();
	 rtpg.map.updateDonAlumno();
	 rtpg.map.connectUiAlumno();
}

/**** CUESTIONES *****/

/**
 * Namespace
 */
rtpg.map_cuestiones 			= rtpg.map_cuestiones || {};
rtpg.allDemos.push(rtpg.map_cuestiones);


/**
 * Realtime model's field name.
 */
rtpg.map_cuestiones.FIELD_NAME = 'demo_map_cuestiones';

/**
 * Realtime model's field.
 */
rtpg.map_cuestiones.field = null;
rtpg.map_cuestiones.START_KEYS = ({"Key 1":"Value 1", "Key 2":"Value 2", "Key 3":"Value 3", "Key 4":"Value 4"});

/**
 * DOM selector for the elements for Problemas.
 */
rtpg.map_cuestiones.MAP_KEYS_SELECTOR = '#CuestionesKeys';
rtpg.map_cuestiones.MAP_VALUES_SELECTOR = '#CuestionesValues';
rtpg.map_cuestiones.REMOVE_SELECTOR = '#demoMapRemove';
rtpg.map_cuestiones.CLEAR_SELECTOR = '#demoMapClear';
rtpg.map_cuestiones.PUT_SELECTOR = '#CuestionesPut';
rtpg.map_cuestiones.CLEAN_SELECTOR = '#CuestionesClean';
//rtpg.map.PUT_KEY_SELECTOR = '#demoMapKey';
rtpg.map_cuestiones.PUT_VALUE_SELECTOR = '#CuestionesValue';


rtpg.map_cuestiones.loadField = function() {
  rtpg.map_cuestiones.field = rtpg.getField(rtpg.map_cuestiones.FIELD_NAME);
}


rtpg.map_cuestiones.initializeModel = function(model) {
  var field = model.createMap(rtpg.map_cuestiones.START_KEYS);
  for (var key in rtpg.map_cuestiones.START_KEYS) {
    field.set(key, rtpg.map_cuestiones.START_KEYS[key]);
  }
  model.getRoot().set(rtpg.map_cuestiones.FIELD_NAME, field);
}


rtpg.map_cuestiones.updateUi = function() {
  $(rtpg.map_cuestiones.MAP_KEYS_SELECTOR).empty();
  $(rtpg.map_cuestiones.MAP_VALUES_SELECTOR).empty();
  var keys = rtpg.map_cuestiones.field.keys();
  keys.sort();
  var l = keys.length;
  for (var i=0; i < l; i++) {
    var key = keys[i];
    var val = rtpg.map_cuestiones.field.get(key);
    var newOptionKey = $('<option>').val(key).text('\xa0\xa0' + key);
    var newOptionValue = $('<option>').val(val).text('\xa0\xa0' + val);
    $(rtpg.map_cuestiones.MAP_KEYS_SELECTOR).append(newOptionKey);
    $(rtpg.map_cuestiones.MAP_VALUES_SELECTOR).append(newOptionValue);
  }
  l = l <= 1 ? 2 : l;
  $(rtpg.map_cuestiones.MAP_KEYS_SELECTOR).attr('size', l);
  $(rtpg.map_cuestiones.MAP_VALUES_SELECTOR).attr('size', l);
}


rtpg.map_cuestiones.onRealtime = function(evt) {
  rtpg.map_cuestiones.updateUi();
  //rtpg.log.logEvent(evt, 'Map Value Changed');
};


rtpg.map_cuestiones.onRemoveItem = function(evt) {
  var key = $(rtpg.map_cuestiones.MAP_KEYS_SELECTOR).val();
  if (key != null) {
    rtpg.map_cuestiones.field.delete(key);
  }
};


rtpg.map_cuestiones.onClearMap = function(evt) {
  rtpg.map_cuestiones.field.clear();
};

rtpg.map_cuestiones.onPutMap = function(evt) {
  //var key = $(rtpg.map.PUT_KEY_SELECTOR).val();
  var keys = rtpg.map_cuestiones.field.keys();
  if(keys.length==0) var aux="1";
  else{ 
	keys.sort();
    keys.reverse();
    var aux = ((parseInt(keys[0]))+1).toString();
  }

  var key = add_zero(aux); 
  var val = $(rtpg.map_cuestiones.PUT_VALUE_SELECTOR).val();
  rtpg.map_cuestiones.field.set(key, val);

  alert("Su pregunta ha sido enviada correctamente");
  $(rtpg.map_cuestiones.PUT_VALUE_SELECTOR).val('');
};


rtpg.map_cuestiones.connectUi = function() {
  $(rtpg.map_cuestiones.REMOVE_SELECTOR).click(rtpg.map.onRemoveItem);
  $(rtpg.map_cuestiones.CLEAR_SELECTOR).click(rtpg.map.onClearMap);
  $(rtpg.map_cuestiones.PUT_SELECTOR).click(rtpg.map.onPutMap);
  $(rtpg.map_cuestiones.CLEAN_SELECTOR).click(rtpg.map.CleanText);
};


rtpg.map_cuestiones.connectRealtime = function() {
  rtpg.map_cuestiones.field.addEventListener(gapi.drive.realtime.EventType.VALUE_CHANGED, rtpg.map_cuestiones.onRealtime);
};

rtpg.map_cuestiones.CleanText = function(){
  $(rtpg.map_cuestiones.PUT_VALUE_SELECTOR).val('');
}

