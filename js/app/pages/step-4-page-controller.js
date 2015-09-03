var myapp = myapp || {};
myapp.pages = myapp.pages || {};


myapp.pages.Step4PageController = function (myapp, $$) {
    'use strict';
    // Init method
    (function () {

        $$('#lgisignin').off('click');
        $$('#lgisignin').click(function () {
            myapp.showPreloader();

            var user = {
                username:$$('#lgiusername').val(),
                password:$$('#lgipassword').val()
            };

            $$.ajax ({
                url:  policyScope.baseUrl + 'auth/signin',
                method:'POST',
                data:user,
                success: function(json, status, xhr) {
                    console.log(json);

                    policyScope.DBuser =  JSON.parse(json);
                    ssOptions.data['user'] = json;

                    storage.set(ssOptions, function(err, results){
                        if (err) throw err;
                    });

                    myapp.hidePreloader();
                    myapp.closeModal();
                    myapp.getCurrentView().router.loadPage('./view/step-05.html');
                },

                error: function( jqXHR, status) { // activated in iPad Safari as 200 ? w/o snd params
                    var err = JSON.parse(jqXHR.response);
                    console.log(jqXHR);
                    myapp.hidePreloader();
                    myapp.alert(err.message, 'Error al crear el nuevo Usuario');
                }
            });
        });


        $$('#to-step-5').click(function () {

            storage.get(ssOptions, function(err, results){
                if (err) throw err;

                if (typeof results.user != 'undefined'){
                    policyScope.user = JSON.parse( results.user);

                    $$('#lgiusername').val(policyScope.user.username);

                    myapp.loginScreen();
                }
                else {
                    myapp.getCurrentView().router.loadPage('./view/sign-in.html');
                    console.log('sigin');
                }
            });

        });

    }());
};
