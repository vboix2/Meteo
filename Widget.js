
define(['dojo/_base/declare',
  'jimu/BaseWidget',
  "jimu/LayerInfos/LayerInfos"
],
function(declare, BaseWidget, LayerInfos) {
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