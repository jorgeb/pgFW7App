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


        $$('#to-step-7').click(function () {
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
                myapp.getCurrentView().router.loadPage('./view/step-07.html');
        });

    }());
};
