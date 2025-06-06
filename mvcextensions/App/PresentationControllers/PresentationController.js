define([], function() {
    /**
     * User-defined presentation controller
     * @constructor
     * @extends kony.mvc.Presentation.BasePresenter
     */
    function PresentationController() {
        kony.mvc.Presentation.BasePresenter.call(this);
        this.categories = null;
    }

    inheritsFrom(PresentationController, kony.mvc.Presentation.BasePresenter);

    // Business controller lives in the "AppManager" module
    var appBusinessController = 
        kony.mvc.MDAApplication.getSharedInstance()
            .getModuleManager()
            .getModule("AppManager")
            .businessController;

    PresentationController.prototype.initializePresentationController = function() {
        // Any initialization logic can go here.
    };


    PresentationController.prototype.getCategories = function(callback) {
        var self = this;


        if (this.categories) {
            callback(null, this.categories);
            return;
        }

        appBusinessController.callAPIService(
            "getCategories",
            null,
            function(response) {
             
                self.categories = response.categories || response;
                kony.print("PresentationController: stored categories = " + JSON.stringify(self.categories));


                callback(null, self.categories);
            },
            function(error) {
 
                callback(error, null);
            }
        );
    };

   
    PresentationController.prototype.getStoredCategories = function() {
        return this.categories;
    };

    return PresentationController;
});
