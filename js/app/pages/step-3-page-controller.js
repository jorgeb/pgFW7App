var myapp = myapp || {};
myapp.pages = myapp.pages || {};


myapp.pages.Step3PageController = function (myapp, $$) {
    'use strict';
    // Init method
    (function () {
        var addDate = typeof(policyScope.previous) && policyScope.previous != 'step-1';

        $$('#to-step-4').click(function () {
            policyScope.previous = null;
            if(addDate)
                myapp.getCurrentView().router.loadPage('./view/step-04.html');
            else
                myapp.getCurrentView().router.loadPage('./view/step-02.html');
        });

        $$('#path3[from]').text(policyScope.path['path[from]'] + ' / ' + policyScope.path['path[to]']);

        if(addDate)
            $$('#fligth3[date]').text(policyScope.fligth['fligth[day]'] + ', ' + policyScope.fligth['fligth[hour]']);
        else{
            $$('.in-step3 span').text('Ruta');
            $$('#to-step-4').text('Vuelo');
        }

        $$('#path3[bagages]').text(policyScope.path['path[bagages]']);
        $$('#path3[paths]').text(1);

        var total = 150 * policyScope.path['path[bagages]'];

        if(policyScope.path['path[roundtrip]'].length > 0) {
            $$('#roundtrip-3-content').show();
            $$('#step-3-title').text('Se asegura la ruta completa');

            if(addDate)
                $$('#fligth3[dateTo]').text(policyScope.fligth['fligth[returnday]'] + ', ' + policyScope.fligth['fligth[returnhour]']);

            $$('#path3[to]').text(policyScope.path['path[to]'] + ' / ' + policyScope.path['path[from]']);
            $$('#path3[bagages]').text(policyScope.path['path[bagages]']*2);
            $$('#path3[paths]').text(2);

            total = total*2;
        }

        /*TAX*/
        total = total * 1.16;

        if(addDate){
            $$('#fligth-dateTo-3-content').show();
            $$('#fligth-date-3-content').show();
        }else{
            $$('#fligth-dateTo-3-content').hide();
            $$('#fligth-date-3-content').hide();
        }


        $$('#total').text(total + ' MXN');
    }());
};
