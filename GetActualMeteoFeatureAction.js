define([
    'dojo/_base/declare',
    'jimu/BaseFeatureAction',
    'jimu/WidgetManager',
    'esri/request'
  ], function(declare, BaseFeatureAction, WidgetManager, esriRequest){
    var clazz = declare(BaseFeatureAction, {
  
      iconFormat: 'png',
  
      isFeatureSupported: function(featureSet){
        return featureSet.features.length > 0 && featureSet.features[0].geometry.type == 'point';
      },
  
      onExecute: function(featureSet){
        WidgetManager.getInstance().triggerWidgetOpen(this.widgetId)
        .then(function(myWidget) {

        });
      }
  
    });
    return clazz;
  });