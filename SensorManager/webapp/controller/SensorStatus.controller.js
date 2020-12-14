sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/base/strings/formatMessage", 
    "sap/m/ValueColor"

], function (Controller, formatMessage, ValueColor) {
    "use strict";

    return Controller.extend("keepcool.SensorManager.controller.SensorStatus", {

            //formats your localized text
            formatMessage: formatMessage,

            onInit: function () {
            this.getOwnerComponent().getRouter().getRoute("RouteSensorStatus").attachMatched(this.onRouteMatched, this);
            },

            onRouteMatched: function (oEvent) {
            this.getView().bindElement({
                path: "/sensors/" + oEvent.getParameter("arguments").index,
                model: "sensorModel"
            });
            },
        // functions

        navToSensors: function () {
            this.getOwnerComponent().getRouter().navTo("RouteSensors");
        },

        // format color. note need to import module: "sap/m/ValueColor"
        formatValueColor: function (oTreshold, iTemperature) {
            oTreshold = oTreshold || {};
            if (iTemperature < oTreshold.warm) {
                return ValueColor.Neutral;
            } else if (iTemperature >= oTreshold.warm && iTemperature < oTreshold.hot) {
                return ValueColor.Critical;
            } else {
                return ValueColor.Error;
            }
        }

    // -- ------------ end of functions ----------------- --/

    });
});