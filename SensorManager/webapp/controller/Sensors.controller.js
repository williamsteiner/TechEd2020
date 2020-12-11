/* syncatx error: Cannot find name 'sap'.ts(2304)

fix run npm install  -- did not help -- disabled eslint when it popped up
*/

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/IconColor",
    "sap/m/MessageToast",
    "sap/ui/model/Filter"
    ], function (Controller, IconColor, MessageToast, Filter) {
    "use strict";

        return Controller.extend("keepcool.SensorManager.controller.Sensors", {
            onInit: function() {
                this.getSensorModel().dataLoaded().then(function() {
                    MessageToast.show(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgSensorDataLoaded"), { closeOnBrowserNavigation: false });
                }.bind(this));
            },

            getSensorModel: function(){
                return this.getOwnerComponent().getModel("sensorModel");
            },
//
            formatIconColor: function(iTemperature) {
                var oThreshold = this.getSensorModel().getProperty("/threshold");
                if (!oThreshold) {
                    return IconColor.Neutral;
                } else if (iTemperature < oThreshold.warm) {
                    return IconColor.Default;
                } else if (iTemperature >= oThreshold.warm && iTemperature < oThreshold.hot) {
                    return IconColor.Critical;
                } else {
                    return IconColor.Negative;
                }
            },
//        
            onSensorSelect: function (oEvent) {
                this._aCustomerFilters = [];
                this._aStatusFilters = [];

                /*
                oBinding gets list: <f:GridList id="sensorsList" 
                key is pulled form IconTabBar/items/IconTabFilter/key   -- paramater from the onlick event
                oThreshold = from json object
                "threshold": {
                                "warm": 4,
                                "hot": 5
                            }
                 new Filter uses json Sensors child obj:
                 "temperature": {
                                    "value": 2.683823017448841,
                                    "time": 1565254865967
                                },           

                    which is pulled from the json obj sensors:
                        <f:GridList id="sensorsList" 
                            items="{path: 'sensorModel>/sensors'            
                */
                var oBinding = this.getView().byId("sensorsList").getBinding("items"),
                    sKey = oEvent.getParameter("key"),
                    oThreshold = this.getSensorModel().getProperty("/threshold");

                if (sKey === "Cold") {
                    this._aStatusFilters = [new Filter("temperature/value", "LT", oThreshold.warm, false)];
                } else if (sKey === "Warm") {
                    this._aStatusFilters = [new Filter("temperature/value", "BT", oThreshold.warm, oThreshold.hot, false)];
                } else if (sKey === "Hot") {
                    this._aStatusFilters = [new Filter("temperature/value", "GT", oThreshold.hot, false)];
                } else {
                    this._aStatusFilters = [];
                }

                oBinding.filter(this._aStatusFilters);
            }



        });
    });