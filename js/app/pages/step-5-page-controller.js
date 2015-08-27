var myapp = myapp || {};
myapp.pages = myapp.pages || {};


myapp.pages.Step5PageController = function (myapp, $$) {
    'use strict';
    // Init method
    (function () {
        myapp.picker({
            input: '#card[exp]',
            rotateEffect: true,
            formatValue: function (p, values, displayValues) {
                return displayValues[0] + ' ' + values[1];
            },
            cols: [
                {
                    textAlign: 'left',
                    values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
                    displayValues: ('Enero Febrero Marzo Abril Mayo Junio Julio Agosto Septiembre Octubre Noviembre Diciembre').split(' '),
                },
                {
                    values: (function () {
                        var arr = [];
                        for (var i = 2015; i <= 2030; i++) { arr.push(i); }
                        return arr;
                    })(),
                },
            ]
        });

        myapp.picker({
            input: '#card[name]',
            rotateEffect: true,
            cols: [
                {
                    values: ('Visa,Master Card,AMEX').split(','),
                }
            ]
        });

        var errors = function(){
            var ret = [];

            return ret;
        }


        $$('#to-step-6').click(function () {
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
                myapp.getCurrentView().router.loadPage('./view/step-06.html');
        });

    }());
};
