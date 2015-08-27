var myapp = myapp || {};
myapp.pages = myapp.pages || {};

var d = new Date();
var today = new Date(d.getFullYear(),d.getMonth(),d.getDate());
var selectedDate = today;

myapp.pages.Step1PageController = function (myapp, $$) {
    'use strict';
    // Init method
    (function () {
        myapp.picker({
            input: '#path[hour]',
            rotateEffect: true,
            formatValue: function (p, values, displayValues) {
                return values[0] + ':' + values[1] + ' ' + values[2];
            },
            cols: [
                {
                    values: ('00 01 02 03 04 05 06 07 08 09 10 11 12').split(' ')
                },
                {
                    values: (function () {
                        var arr = [];
                        for (var i = 0; i <= 59; i++) { arr.push(String('00'+i).slice(-2)); }
                        return arr;
                    })()
                },
                {
                    values: ['AM','PM']
                },
            ]
        });

        myapp.picker({
            input: '#path[day]',
            rotateEffect: true,

            value: [today.getMonth(), today.getDate(), today.getFullYear()],

            onChange: function (picker, values, displayValues) {
                var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
                if (values[1] > daysInMonth) {
                    picker.cols[1].setValue(daysInMonth);
                }

                selectedDate = new Date(values[2], values[0], values[1], 0, 0,0, 0)
            },

            formatValue: function (p, values, displayValues) {
                return displayValues[0] + ' ' + values[1] + ', ' + values[2];
            },

            cols: [
                // Months
                {
                    values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
                    displayValues: ('Enero Febrero Marzo Abril Mayo Junio Julio Agosto Septiembre Octubre Noviembre Diciembre').split(' '),
                    textAlign: 'left'
                },
                // Days
                {
                    values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
                },
                // Years
                {
                    values: (function () {
                        var arr = [];
                        for (var i = 1950; i <= 2030; i++) { arr.push(i); }
                        return arr;
                    })()
                }
            ]
        });

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
