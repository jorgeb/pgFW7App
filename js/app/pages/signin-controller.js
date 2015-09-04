function SignInPageController (myapp, $$){
    return (function() {

        var nextPage = null;
        var deferred = Q.defer();

        $$('#lgisignin').off('click');
        $$('#lgisignin').click(function () {
            myapp.showPreloader();

            console.log(nextPage);

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
                    policyScope.DBuser.pass = user.password;

                    ssOptions.data['user'] = json;

                    storage.set(ssOptions, function(err, results){
                        if (err) throw err;
                    });

                    myapp.hidePreloader();
                    myapp.closeModal();
                    //myapp.getCurrentView().router.loadPage('./view/step-05.html');
                    if(nextPage != null)
                        myapp.getCurrentView().router.loadPage(nextPage);

                    deferred.resolve(policyScope.DBuser);
                },

                error: function( jqXHR, status) { // activated in iPad Safari as 200 ? w/o snd params
                    var err = JSON.parse(jqXHR.response);
                    console.log(jqXHR);
                    myapp.hidePreloader();
                    myapp.alert(err.message, 'Error al crear el nuevo Usuario');
                    deferred.reject(err);
                }
            });
        });

        return {
            Load: function(np,fsignin) {
                nextPage = np;

                if(!fsignin) {
                    storage.get(ssOptions, function (err, results) {
                        if (err) throw err;

                        if (typeof results.user != 'undefined') {
                            policyScope.user = JSON.parse(results.user);

                            $$('#lgiusername').val(policyScope.user.username);

                            //signinController.Load('./view/step-05.html');
                            myapp.loginScreen();
                        }
                        else {
                            myapp.getCurrentView().router.loadPage('./view/sign-in.html');
                        }
                    });
                }else{
                    myapp.loginScreen();
                }

                return deferred.promise;
            }
        };
    }());
}
