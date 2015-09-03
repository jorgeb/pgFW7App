var myapp = myapp || {};
myapp.pages = myapp.pages || {};


myapp.pages.SignInPageController = function (myapp, $$) {
    'use strict';
    // Init method
    (function () {

        console.log('sign-in.html');

        var errors = function(){
            var ret = [];

            return ret;
        }

        $$('#new-sigin').click(function () {

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
            {
                myapp.showPreloader();

                policyScope.user = myapp.formToJSON('#frm-sign-in');

                var user = {firstName:policyScope.user['signin[name]'],
                    lastName:policyScope.user['signin[lastname]'],
                    email:policyScope.user['signin[eamil]'],
                    username:policyScope.user['signin[eamil]'],
                    password:policyScope.user['signin[pass]']
                };

                $$.ajax ({
                    url:  policyScope.baseUrl + 'auth/signup',
                    method:'POST',
                    data:user,
                    success: function(json, status, xhr) {
                        policyScope.DBuser =  JSON.parse(json);
                        ssOptions.data['user'] = json;
                        storage.set(ssOptions, function(err, results){
                            if (err) throw err;
                        });

                        myapp.hidePreloader();
                        myapp.getCurrentView().router.loadPage('./view/step-03.html');
                    },

                    error: function( jqXHR, status) { // activated in iPad Safari as 200 ? w/o snd params
                        var err = JSON.parse(jqXHR.response);
                        myapp.hidePreloader();
                        myapp.alert(err.message, 'Error al crear el nuevo Usuario');
                    }
                });


            }

        });

    }());
};
