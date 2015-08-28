var myapp = myapp || {};
myapp.pages = myapp.pages || {};


myapp.pages.Step2PageController = function (myapp, $$) {
    'use strict';
    // Init method
    (function () {
        var d = new Date();
        var today = new Date(d.getFullYear(),d.getMonth(),d.getDate());
        var selectedDate = today;

        myapp.picker(hoursPicker("#fligth[hour]"));
        myapp.picker(hoursPicker("#fligth[returnhour]"));

        myapp.picker(datePicker("#fligth[day]"));
        myapp.picker(datePicker("#fligth[returnday]"));

        var errors = function(){
            var ret = [];
            var isChecked = $$('#roundtrip').prop('checked');

            if (isChecked && (selectedDate < today))
                ret.push('Por favor ingrese una fecha posterior a la ida.')

            return ret;
        }


        $$('#to-step-3').click(function () {
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
