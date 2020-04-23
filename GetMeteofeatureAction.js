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
          var station;

          featureSet.features.forEach(function (f) {
            if (f.attributes.YEAR < 2009) {
              metadades = Strings.not_available_text;
            } else {
              var temperatura = f.attributes.TEMPERATUR;
              var precipitacio = f.attributes.PRECIPITAC;
              var humitat = f.attributes.HUMITAT;
              var vent = f.attributes.VENT;
              station = f.attributes.ESTACIO_XE;

              // null values
              if (temperatura == 0) temperatura = " - ";
              if (humitat == 0) humitat = " - ";
              if (vent == 0) vent = " - ";

              // weather data
              dades = "<table><tr><td>" + Strings.table_temp + ": </td><td> " + temperatura + "ºC </td></tr>" +
                "<tr><td>" + Strings.table_prec + ": </td><td> " + precipitacio + " mm </td></tr>" +
                "<tr><td>" + Strings.table_hum + ": </td><td> " + humitat + "% </td></tr>" +
                "<tr><td>" + Strings.table_wind + ": </td><td> " + vent + " m/s </td></tr>" +
                "</table>"

              // metadata
              var data = new Date(f.attributes.DATA);
              metadades = Strings.text_station1 + station + Strings.text_station2 +
                data.getDate() + "/" + String(data.getMonth() + 1) + "/" + data.getFullYear();
            }
          });
          myWidget.dadesMeteo.innerHTML = dades;
          myWidget.metadadesMeteo.innerHTML = metadades;

          //var expression = "CODI = '" + String(station) + "'";
          //myWidget.map.getLayer("XEMA_6372").setDefinitionExpression(expression);
          //myWidget.map.getLayer("XEMA_6372").show();
        });
      }
  
    });
    return clazz;
  });