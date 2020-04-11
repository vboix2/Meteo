
define(['dojo/_base/declare',
  'jimu/BaseWidget',
  'esri/request'
],
function(declare, BaseWidget, esriRequest) {
  var clazz = declare([BaseWidget], {

    name: 'Meteo',

    btnTempAnualClicked: false,
    btnPrecAnualClicked: false,
    XEMA: "XEMA_6372",
    tempAnual: "wms_9115",
    precAnual: "wms_347",

    postCreate: function(){
      this.inherited(arguments);
      this.map.getLayer(this.XEMA).show();
      var textMeteo = "Selecciona un incendi i l'opció <i>Obtenir dades meteorològiques</i>.<br/>";
      textMeteo = textMeteo + "Dades no disponibles per a incendis anteriors al 2009.";
      this.infoMeteo.innerHTML = textMeteo;
    },

    _onBtnTempAnualClicked: function(){
      this.map.getLayer(this.tempAnual).show();
      this.map.getLayer(this.precAnual).hide();
      this.btnTempAnualClicked = true;
      this.btnPrecAnualClicked = false;
      this._dataRequest();
    },

    _onBtnPrecAnualClicked: function(){
      this.map.getLayer(this.precAnual).show();
      this.map.getLayer(this.tempAnual).hide();
      this.btnPrecAnualClicked = true;
      this.btnTempAnualClicked = false;
    },

    onMinimize: function(){
      this.map.getLayer(this.XEMA).hide();
    }

  });
  return clazz;
});