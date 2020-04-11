define([
    'dojo/_base/declare',
    'jimu/BaseFeatureAction',
    'jimu/WidgetManager'
  ], function(declare, BaseFeatureAction, WidgetManager){
    var clazz = declare(BaseFeatureAction, {
  
      iconFormat: 'png',
  
      isFeatureSupported: function(featureSet){
        return featureSet.features.length > 0 && featureSet.features[0].geometry.type !== 'point';
      },
  
      onExecute: function(featureSet){
        WidgetManager.getInstance().triggerWidgetOpen(this.widgetId)
        .then(function(myWidget) {
          var dades = "";
          var metadades = "";
          
          featureSet.features.forEach(function(f){
              if (f.attributes.YEAR<2009){
                dades = "Dades no disponibles per a incendis anteriors al 2009";
              } else {
                dades = "Temperatura màxima: " + f.attributes.TEMPERATUR + " ºC <br/>";
                dades += "Precipitació acumulada: " + f.attributes.PRECIPITAC + " mm <br/>";
                dades += "Humitat relativa mínima: " + f.attributes.HUMITAT + " % <br/>";
                if (f.attributes.VENT==0){
                  dades += "Intensitat màxima del vent: - <br/><br/>";
                } else {
                  dades += "Intensitat màxima del vent: " + f.attributes.VENT + " m/s <br/><br/>";
                }
                var data = new Date(f.attributes.DATA);
                metadades += "Dades de l'estació " + f.attributes.ESTACIO_XE + " durant el dia " +
                data.getDate() + "/" + String(data.getMonth()+1) + "/" + data.getFullYear() + "<br/>"; 
              }

          });
          myWidget.dadesMeteo.innerHTML = dades;
          myWidget.metadadesMeteo.innerHTML = metadades;

        });
      }
  
    });
    return clazz;
  });