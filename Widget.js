
define(['dojo/_base/declare',
'jimu/BaseWidget',
'dijit/form/CheckBox'
],
function(declare, BaseWidget, CheckBox) {
var clazz = declare([BaseWidget], {

  name: 'Meteo',

  //Temperatures
  tempAnual: "wms_9115",
  tempMensual: "wms_8343",
  wmsTemperatura: {
    "1":"ATMOSFERA_ATLES6190_TMPGEN", "2":"ATMOSFERA_ATLES6190_TMPFEB",
    "3":"ATMOSFERA_ATLES6190_TMPMARC", "4":"ATMOSFERA_ATLES6190_TMPABRIL",
    "5":"ATMOSFERA_ATLES6190_TMPMAIG", "6":"ATMOSFERA_ATLES6190_TMPJUNY",
    "7":"ATMOSFERA_ATLES6190_TMPJULIO", "8":"ATMOSFERA_ATLES6190_TMPAGOST",
    "9":"ATMOSFERA_ATLES6190_TMPSETE", "10":"ATMOSFERA_ATLES6190_TMPOCT",
    "11":"ATMOSFERA_ATLES6190_TMPNOV", "12":"ATMOSFERA_ATLES6190_TMPDES"},

  // Precipitacions
  precAnual: "wms_347", 
  precMensual: "wms_5172",
  wmsPrecipitacio: {
    "1":"ATMOSFERA_ATLES6190_PPTGEN", "2":"ATMOSFERA_ATLES6190_PPTFEB",
    "3":"ATMOSFERA_ATLES6190_PPTMARC", "4":"ATMOSFERA_ATLES6190_PPTABRI",
    "5":"ATMOSFERA_ATLES6190_PPTMAIG", "6":"ATMOSFERA_ATLES6190_PPTJUNY",
    "7":"ATMOSFERA_ATLES6190_PPTJULIO", "8":"ATMOSFERA_ATLES6190_PPTAGOST",
    "9":"ATMOSFERA_ATLES6190_PPTSETE", "10":"ATMOSFERA_ATLES6190_PPTOCT",
    "11":"ATMOSFERA_ATLES6190_PPTNOV", "12":"ATMOSFERA_ATLES6190_PPTDES"},

  // XEMA
  XEMA: "XEMA_6372",
  xemaClicked: false,

  variable: "temp",
  period: "0",
  mapesChecked: false,


  postCreate: function(){
    this.inherited(arguments);
  },

  MapesBtn: function(){

    this._hideAll();

    if (!this.mapesChecked) {
      // Form options
      var mapa;
      this.inputForm.mapa.forEach(function (radio) {
        if (radio.checked) {
          mapa = radio.value;
        }
      });
      this.variable = mapa;
      this.period = this.inputForm.month.value;

      // Temperature selected
      if (this.variable == "temp") {
        if (this.period == "0") {
          this.map.getLayer(this.tempAnual).show();
        } else {
          this.map.getLayer(this.tempMensual).setVisibleLayers([this.wmsTemperatura[this.period]]);
          this.map.getLayer(this.tempMensual).show();
        }

        // Precipitation selected 
      } else if (this.variable == "prec") {
        if (this.period == "0") {
          this.map.getLayer(this.precAnual).show();
        } else {
          this.map.getLayer(this.precMensual).setVisibleLayers([this.wmsPrecipitacio[this.period]]);
          this.map.getLayer(this.precMensual).show();
        }
      }
      this.mapesChecked = true;
    } else {
      this.mapesChecked = false;
    }

  },

  _hideAll: function(){
    this.map.getLayer(this.precAnual).hide();
    this.map.getLayer(this.tempAnual).hide();
    this.map.getLayer(this.precMensual).hide();
    this.map.getLayer(this.tempMensual).hide();
  },

  _onBtnXEMAClicked: function(){
    if (this.xemaClicked){
      this.map.getLayer(this.XEMA).hide();
      this.xemaClicked = false;
    } else {
      this.map.getLayer(this.XEMA).show();
      this.xemaClicked = true;
    } 
  }

});
return clazz;
});