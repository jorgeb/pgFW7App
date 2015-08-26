var myapp = myapp || {};
myapp.pages = myapp.pages || {};


myapp.pages.Step4PageController = function (myapp, $$) {
    'use strict';
    // Init method
    (function () {
        $$('#to-step-5').click(function () {
            myapp.getCurrentView().router.loadPage('./view/step-05.html');
        });

    }());
};
