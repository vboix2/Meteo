define([
    'dojo/_base/declare',
    'jimu/BaseFeatureAction',
    'jimu/WidgetManager',
    'dojo/i18n!./nls/strings'

  ], function(declare, BaseFeatureAction, WidgetManager, Strings){
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
                metadades = Strings.not_available_text;
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
                metadades = Strings.text_station1 + f.attributes.ESTACIO_XE + Strings.text_station2 +
                  data.getDate() + "/" + String(data.getMonth() + 1) + "/" + data.getFullYear();

                dades = "<table><tr><td>" + Strings.table_temp + ": </td><td> " + temperatura + "ºC </td></tr>" +
                  "<tr><td>" + Strings.table_prec + ": </td><td> " + precipitacio + " mm </td></tr>" +
                  "<tr><td>" + Strings.table_hum + ": </td><td> " + humitat + "% </td></tr>" +
                  "<tr><td>" + Strings.table_wind + ": </td><td> " + vent + " m/s </td></tr>" +
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