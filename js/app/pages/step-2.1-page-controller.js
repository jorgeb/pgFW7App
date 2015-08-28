var myapp = myapp || {};
myapp.pages = myapp.pages || {};


myapp.pages.Step21PageController = function (myapp, $$) {
    'use strict';
    // Init method
    (function () {
        var addDate = typeof(policyScope.previous) && policyScope.previous != 'step-1';

        console.log($$('#step03bpath3[from]').length)

        $$('#step03bto-step-4').click(function () {
            policyScope.previous = null;
            if(addDate)
                myapp.getCurrentView().router.loadPage('./view/step-04.html');
            else
                myapp.getCurrentView().router.loadPage('./view/step-02.html');
        });

        $$('#step03bpath3[from]').text(policyScope.path['path[from]'] + ' ==> ' + policyScope.path['path[to]']);

        if(addDate)
            $$('#step03bfligth3[date]').text(policyScope.fligth['fligth[day]'] + ', ' + policyScope.fligth['fligth[hour]']);
        else{
            $$('.in-step3 span').text('Ruta');
            $$('#step03bto-step-4').text('Vuelo');
        }

        $$('#step03bpath3[bagages]').text(policyScope.path['path[bagages]']);
        $$('#step03bpath3[paths]').text(1);

        var total = 150 * policyScope.path['path[bagages]'];

        if(policyScope.path['path[roundtrip]'].length > 0) {
            $$('#step03broundtrip-3-content').show();
            $$('#step03bstep-3-title').text('Se asegura la ruta completa');

            if(addDate)
                $$('#step03bfligth3[dateTo]').text(policyScope.fligth['fligth[returnday]'] + ', ' + policyScope.fligth['fligth[returnhour]']);

            $$('#step03bpath3[to]').text(policyScope.path['path[to]'] + ' ==> ' + policyScope.path['path[from]']);
            $$('#step03bpath3[bagages]').text(policyScope.path['path[bagages]']*2);
            $$('#step03bpath3[paths]').text(2);

            total = total*2;
        }

        /*TAX*/
        total = total * 1.16;

        if(addDate){
            $$('#step03bfligth-dateTo-3-content').show();
            $$('#step03bfligth-date-3-content').show();
        }else{
            $$('#step03bfligth-dateTo-3-content').hide();
            $$('#step03bfligth-date-3-content').hide();
        }

        $$('#step03btotal').text(total + ' MXN');
    }());
};
