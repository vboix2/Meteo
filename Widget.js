
define(['dojo/_base/declare',
  'jimu/BaseWidget',
  'esri/request'
],
function(declare, BaseWidget, esriRequest) {
  var clazz = declare([BaseWidget], {

    name: 'Meteo',

    btnTempAnualClicked: false,
    btnPrecAnualClicked: false,

    postCreate: function(){
      this.inherited(arguments);
    },

    _onBtnTempAnualClicked: function(){
      this.map.getLayer("wms_9115").show();
      this.map.getLayer("wms_347").hide();
      this.btnTempAnualClicked = true;
      this.btnPrecAnualClicked = false;
      this._dataRequest();
    },

    _onBtnPrecAnualClicked: function(){
      this.map.getLayer("wms_347").show();
      this.map.getLayer("wms_9115").hide();
      this.btnPrecAnualClicked = true;
      this.btnTempAnualClicked = false;
    }

  });
  return clazz;
});