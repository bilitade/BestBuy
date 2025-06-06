define([], function() { 
    function BusinessController() { 
        kony.mvc.Business.Delegator.call(this); 
    } 

    inheritsFrom(BusinessController, kony.mvc.Business.Delegator); 
  
    BusinessController.prototype.callAPIService = function(operationName, inputParams, successCallback, errorCallback) {
      if (!inputParams) {
            inputParams = { catId: "abcat0900000" };
        }
        
        try {
            this.integrationService = kony.sdk.getCurrentInstance().getIntegrationService("bestbuy-api");
            this.integrationService.invokeOperation(
                operationName,
                null, 
                inputParams,
                function(response) {
                    successCallback(response);
                },
                function(error) {
                    errorCallback(error);
                }
            );
        } catch (error) {
            kony.print("Error initializing service: " + JSON.stringify(error));
            errorCallback(error);
        }
    };

    return BusinessController;
});