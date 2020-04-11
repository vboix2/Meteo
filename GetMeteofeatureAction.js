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
                dades = "Temperatura: " + f.attributes.TEMPERATUR + " ºC <br/>";
                dades += "Precipitació: " + f.attributes.PRECIPITAC + " mm <br/>";
                dades += "Humitat relativa: " + f.attributes.HUMITAT + " % <br/>";
                if (f.attributes.VENT==0){
                  dades += "Intensitat del vent: (Dada no disponible)<br/><br/>";
                } else {
                  dades += "Intensitat del vent: " + f.attributes.VENT + " m/s <br/><br/>";
                }
                metadades += "Dades de l'estació " + f.attributes.ESTACIO_XE + " durant el dia " +
                f.attributes.DATA +  "<br/>";
                
              }

          });
          myWidget.dadesMeteo.innerHTML = dades;
          myWidget.metadadesMeteo.innerHTML = metadades;

        });
      }
  
    });
    return clazz;
  });