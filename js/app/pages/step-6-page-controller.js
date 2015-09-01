var myapp = myapp || {};
myapp.pages = myapp.pages || {};


myapp.pages.Step6PageController = function (myapp, $$) {
    'use strict';
    // Init method
    (function () {

        var errors = function(){
            var ret = [];

            return ret;
        }


        $$('#lnk-end').click(function () {

            policyScope.invoice = myapp.formToJSON('#frm-invoice');

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
            else {
                myapp.showPreloader();

                $$.ajax ({
                    url: 'http://104.236.242.105:3010/api/email/invoice/'
                        + policyScope.invoice['invoice[email]']
                        + '/' + policyScope.invoice['invoice[name]']
                        + '/2/yes',
                    dataType: 'text',
                    method:'GET',
                    success: function(json, status, xhr) {

                        console.log(json);
                        console.log('inside ' + status);

                        console.log(xhr.status);
                        console.log(xhr.response);
                        console.log(xhr.responseText)
                        console.log(xhr.statusText);

                        myapp.hidePreloader();
                        myapp.getCurrentView().router.loadPage('./view/step-07.html');
                    },

                    error: function( jqXHR, status, error ) { // activated in iPad Safari as 200 ? w/o snd params
                        console.log('error ' + jqXHR.statusText);
                        myapp.hidePreloader();
                        myapp.alert(jqXHR.statusText, 'Error en el envió de mail');
                    }
                });

            }
        });

    }());
};
