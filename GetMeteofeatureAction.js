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
          var resultat = "";
          
          featureSet.features.forEach(function(f){
              if (f.attributes.YEAR<2009){
                resultat = "Dades no disponibles per a incendis anteriors al 2009";
              } else {
                resultat = "Temperatura: " + f.attributes.TEMPERATUR + " ºC <br/>";
                resultat = resultat + "Precipitació: " + f.attributes.PRECIPITAC + " mm <br/>";
                resultat = resultat + "Humitat relativa: " + f.attributes.HUMITAT + " % <br/>";
                if (f.attributes.VENT==0){
                  resultat = resultat + "Intensitat del vent: (Dada no disponible)<br/>";
                } else {
                  resultat = resultat + "Intensitat del vent: " + f.attributes.VENT + " m/s <br/>";
                }
                
              }

          });
          myWidget.infoMeteo.innerHTML = resultat;

        });
      }
  
    });
    return clazz;
  });