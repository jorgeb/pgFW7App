var myapp = myapp || {};
myapp.pages = myapp.pages || {};


myapp.pages.Step2PageController = function (myapp, $$) {
    'use strict';
    // Init method
    (function () {
        var hpfd = hoursPicker('#fligth[hour]');
        myapp.picker(hpfd);

        var hpfr = hoursPicker('#fligth[returnhour]');
        myapp.picker(hpfr);

        var dpfd = datePicker('#fligth[day]');
        myapp.picker(dpfd);

        var dpfr = datePicker('#fligth[returnday]');
        myapp.picker(dpfr);

        if(policyScope.path['path[roundtrip]'].length > 0)
            $$('#roundtrip-content').show();


        var errors = function(){
            var ret = [];

            if(!hpfd.selectedHour)
                ret.push('Por favor ingrese una hora, para la salida del vuelo.')

            if(!dpfd.selectedDate)
                ret.push('Por favor ingrese una fecha, para la salida del vuelo.')

            if(policyScope.path['path[roundtrip]'].length > 0){
                if(!hpfr.selectedHour)
                    ret.push('Por favor ingrese una hora, para el vuelo de regreso.')

                if(!dpfr.selectedDate)
                    ret.push('Por favor ingrese una fecha, para el vuelo de regreso.')

            }

            return ret;
        }


        $$('#to-step-3').click(function () {

            policyScope.fligth = myapp.formToJSON('#fligth');

            var ver = errors();
            var clossed = 0;
            var $$this = $$(this);

            if (ver.length > 0){
                ver.forEach(function(e){
                    myapp.addNotification({
                        title: 'Error',
                        message: e,
                        onClose: function () {
                            clossed++;

                            if(clossed >= ver.length)
                                $$this.removeAttr('disabled');
                        }
                    });
                });

                $$this.attr('disabled','disabled');
            }
            else
                myapp.getCurrentView().router.loadPage('./view/step-03.html');
        });

    }());

};

