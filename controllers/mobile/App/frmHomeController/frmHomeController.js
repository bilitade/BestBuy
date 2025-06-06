define([], function() {

    var presentationController =
        kony.mvc.MDAApplication.getSharedInstance()
            .getModuleManager()
            .getModule("App")
            .presentationController;

    return {
        preshow: function() {
          var self=this;
            kony.print("frmHomeController: getCategories called");

            presentationController.getCategories(function(err, categories) {
                if (err) {
                    kony.print("frmHomeController: Error fetching categories: " + JSON.stringify(err));
                    alert("Error occurred");
                    return;
                }

                kony.print("frmHomeController: Categories have arrived: " + JSON.stringify(categories));

                if (!Array.isArray(categories) || categories.length === 0) {
                    alert("No categories returned");
                    return;
                }
                var subCats = categories[0].subCategories || [];
                var segmentData = subCats.map(function(cat) {
                    return {
                        lblCategoryName: cat.name,
                        categoryId: cat.id
                    };
                });

                self.view.SegCategory.setData(segmentData);
            });
        }
    };
});
