var myapp = myapp || {};
myapp.pages = myapp.pages || {};


myapp.pages.Step3PageController = function (myapp, $$) {
    'use strict';
    // Init method
    (function () {
        $$('#to-step-4').click(function () {
            console.log('#to-step-4')
            myapp.getCurrentView().router.loadPage('./view/step-04.html');
        });

    }());
};
