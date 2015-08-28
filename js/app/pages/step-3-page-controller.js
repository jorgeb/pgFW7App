var myapp = myapp || {};
myapp.pages = myapp.pages || {};


myapp.pages.Step3PageController = function (myapp, $$) {
    'use strict';
    // Init method
    (function () {
        $$('#to-step-4').click(function () {
            myapp.getCurrentView().router.loadPage('./view/step-04.html');
        });

        $$('#path3[from]').text(policyScope.path['path[from]'] + ' ==> ' + policyScope.path['path[to]']);
        $$('#fligth3[date]').text(policyScope.fligth['fligth[day]'] + ', ' + policyScope.fligth['fligth[hour]']);
        $$('#path3[bagages]').text(policyScope.path['path[bagages]']);
        $$('#path3[paths]').text(1);

        var total = 150 * policyScope.path['path[bagages]'];

        if(policyScope.path['path[roundtrip]'].length > 0) {
            $$('#roundtrip-3-content').show();
            $$('#step-3-title').text('Se asegura la ruta completa');

            $$('#fligth3[dateTo]').text(policyScope.fligth['fligth[returnday]'] + ', ' + policyScope.fligth['fligth[returnhour]']);
            $$('#path3[to]').text(policyScope.path['path[to]'] + ' ==> ' + policyScope.path['path[from]']);
            $$('#path3[bagages]').text(policyScope.path['path[bagages]']*2);
            $$('#path3[paths]').text(2);

            total = total*2;
        }

        $$('#total').text(total + ' MXN');
    }());
};
