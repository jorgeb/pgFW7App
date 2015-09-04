var myapp = myapp || {};
myapp.pages = myapp.pages || {};


myapp.pages.Step6PageController = function (myapp, $$, acController) {
    'use strict';
    // Init method
    (function () {

        var errors = function(){
            var ret = [];

            return ret;
        }

        var setInvoiceForm = {};
        setInvoiceForm['invoice[name]'] = policyScope.DBuser.displayName;
        setInvoiceForm['invoice[email]'] = policyScope.DBuser.email;

        /*
        $$('#invoice[email]').val(setInvoiceForm['invoice[email]']);
        $$('#invoice[name]').val(setInvoiceForm['invoice[name]']);
*/
        myapp.formFromJSON('#frm-invoice', setInvoiceForm);

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

                acController.call('basic/policies','POST',{to:policyScope.path['path[to]'],
                    from:policyScope.path['path[from]'],
                    numbaggages:policyScope.path['path[bagages]'],
                    roundtrip:policyScope.path['path[roundtrip]']}).then(function (data) {

                    console.log(data);
                    $$.ajax ({
                        url:  policyScope.baseUrl + 'email/invoice/'
                        + policyScope.invoice['invoice[email]']
                        + '/' + policyScope.invoice['invoice[name]']
                        + '/2/yes',
                        dataType: 'text',
                        method:'GET',
                        success: function(json, status, xhr) {

                            console.log('inside ' + status);
                            myapp.hidePreloader();
                            myapp.getCurrentView().router.loadPage('./view/thank-you.html');
                        },

                        error: function( jqXHR, status, error ) { // activated in iPad Safari as 200 ? w/o snd params
                            console.log('error ' + jqXHR.statusText);
                            myapp.hidePreloader();
                            myapp.alert(jqXHR.statusText, 'Error en el envió de mail');
                        }
                    });

                }, function (reason) {
                    console.log(reason);
                });


            }
        });

    }());
};
