
define(['dojo/_base/declare',
  'jimu/BaseWidget'
],
function(declare, BaseWidget) {
  var clazz = declare([BaseWidget], {

    _getMapId: function(){
      alert(this.map.id);
    }
  });
  return clazz;
});