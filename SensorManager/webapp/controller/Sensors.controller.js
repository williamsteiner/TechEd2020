/* syncatx error: Cannot find name 'sap'.ts(2304)

fix run npm install  -- did not help -- disabled eslint when it popped up
*/

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/IconColor",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/core/Fragment"
], function (Controller, IconColor, MessageToast, Filter, Fragment) {
    "use strict";

        return Controller.extend("keepcool.SensorManager.controller.Sensors", {
            onInit: function() {
                this.getSensorModel().dataLoaded().then(function() {
                    MessageToast.show(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("msgSensorDataLoaded"), { closeOnBrowserNavigation: false });
                }.bind(this));

                this._aCustomerFilters = [];
                this._aStatusFilters = [];

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
// icon bar - icon selected - cold, hot...
            onSensorSelect: function (oEvent) {
 
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

                console.log('icon key: ' + oEvent.getParameter("key"));

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
                    this._aStatusFilters = []; // All
                }

                //oBinding.filter(this._aStatusFilters);
                oBinding.filter(this._aStatusFilters.concat(this._aCustomerFilters));
            },

// when select customer filter icon (top right corner) selected open fragment dialog (popup)
// loads fragment xml
            onCustomerSelect: function (oEvent) {
                if (this._oDialog) {
                    this._oDialog.open();
                } else {
                    Fragment.load({
                        type: "XML",
                        name: "keepcool.SensorManager.view.CustomerSelectDialog",
                        controller: this
                    }).then(function(oDialog) {
                        this._oDialog = oDialog;
                        this._oDialog.setModel(this.getSensorModel(), "sensorModel");
                        this._oDialog.setModel(this.getView().getModel("i18n"), "i18n");
                        this._oDialog.setMultiSelect(true);
                        this._oDialog.open();
                    }.bind(this));
                }
            },
            //

            // livechange from fragment  --- search input field for customer
            /*  builds selection list from json customers obj
                items="{
                path: 'sensorModel>/customers',
                sorter: {path:'name'}
            }">

            live change - as you type the below filter continues to fire to filter on list of customer selections
            */
            onCustomerSelectChange: function(oEvent) {
                var sValue = oEvent.getParameter("value"); 
                 alert('value: ' + sValue);
                var oFilter = new Filter("name", "Contains", sValue);
                // get xml list bidnding
                var oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter([oFilter]);
            }            ,
            //
            // fired from fragment -- uses both filters
            onCustomerSelectConfirm: function(oEvent) {
                var aSelectedItems = oEvent.getParameter("selectedItems");
                 alert('aSelectedItems: ' + aSelectedItems);
                var oBinding = this.getView().byId("sensorsList").getBinding("items");
                this._aCustomerFilters = aSelectedItems.map(function(oItem) {
                    return new Filter("customer", "EQ", oItem.getTitle());
                });
                oBinding.filter(this._aCustomerFilters.concat(this._aStatusFilters));
            }


//--//
        });
    });