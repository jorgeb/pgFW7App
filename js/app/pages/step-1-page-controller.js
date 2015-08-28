var myapp = myapp || {};
myapp.pages = myapp.pages || {};

var d = new Date();
var today = new Date(d.getFullYear(),d.getMonth(),d.getDate());
var selectedDate = today;

myapp.pages.Step1PageController = function (myapp, $$) {
    'use strict';
    // Init method
    (function () {

        var errors = function(){
            console.log(selectedDate)
            console.log(today)

            var ret = [];
             if($$('#sel-from').val() == $$('#sel-to').val())
                ret.push('Por favor ingrese un destino distinto al de origen.')

            if (selectedDate < today)
                ret.push('Por favor indrese una fecha a futuro.')

            return ret;
        }

        $$('#to-step-2').click(function () {
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
                myapp.getCurrentView().router.loadPage('./view/step-02.html');
        });

    }());

};
