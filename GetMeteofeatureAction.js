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
                metadades = "Dades no disponibles per a incendis anteriors al 2009";
              } else {
                var temperatura = f.attributes.TEMPERATUR;
                var precipitacio = f.attributes.PRECIPITAC;
                var humitat = f.attributes.HUMITAT;
                var vent;
                if (f.attributes.VENT==0){
                  vent = " - ";
                } else {
                  vent = f.attributes.VENT;
                }

                var data = new Date(f.attributes.DATA);
                metadades = "Dades de l'estació " + f.attributes.ESTACIO_XE + " durant el dia " +
                  data.getDate() + "/" + String(data.getMonth() + 1) + "/" + data.getFullYear();

                dades = "<table><tr><td>Temperatura màxima: </td><td> " + temperatura + "ºC </td></tr>" +
                  "<tr><td>Precipitació acumulada: </td><td> " + precipitacio + " mm </td></tr>" +
                  "<tr><td>Humitat relativa mínima: </td><td> " + humitat + "% </td></tr>" +
                  "<tr><td>Intensitat màxima del vent: </td><td> " + vent + " m/s </td></tr>" +
                  "</table>"
              }
          });
          myWidget.dadesMeteo.innerHTML = dades;
          myWidget.metadadesMeteo.innerHTML = metadades;
        });
      }
  
    });
    return clazz;
  });