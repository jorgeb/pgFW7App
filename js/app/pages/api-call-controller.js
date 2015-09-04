function apiCallController (myapp, $$,sipController){
    return (function() {
        var checkUser = function(url,m,d){
            var deferred = Q.defer();

            if((typeof policyScope.DBuser === 'undefined') || (typeof policyScope.DBuser.pass === 'undefined')){
                sipController.Load(null,false).then(function (user) {
                    ajaxCall(url,deferred,m,d);
                }, function (reason) {
                    console.log(reason);
                });

            }else {
                ajaxCall(url,deferred,m,d);
            }

            return deferred.promise;
        };

        var ajaxCall = function(url,deferred,m,d){
            var method = 'GET';
            var data = null;

            if((typeof m !== 'undefined') && (m != null))
                method = m;

            if(typeof d !== 'undefined')
                data = d;

            var opt = {
                username:policyScope.DBuser.username,
                password:policyScope.DBuser.pass
            };

            if(data != null) {
                var obj3 = {};
                for (var attrname in opt) {
                    obj3[attrname] = opt[attrname];
                }
                for (var attrname in data) {
                    obj3[attrname] = data[attrname];
                }
                opt = obj3;
            }

            myapp.showPreloader();

            $$.ajax({
                url: policyScope.baseUrl + url,
                method: method,
                data: opt,
                success: function (json, status, xhr) {
                    console.log(json);
                    myapp.hidePreloader();
                    deferred.resolve(json);
                },

                error: function (jqXHR, status) { // activated in iPad Safari as 200 ? w/o snd params
                    myapp.hidePreloader();
                    var err = JSON.parse(jqXHR.response);
                    console.log(jqXHR);
                    deferred.reject(err);
                }
            });

        }
        return{
            call:function(url,m,d){
                return checkUser(url,m,d);
            }
        }
    }());
}
