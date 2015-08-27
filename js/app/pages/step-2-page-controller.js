var myapp = myapp || {};
myapp.pages = myapp.pages || {};


myapp.pages.Step2PageController = function (myapp, $$) {
    'use strict';
    // Init method
    (function () {
        var d = new Date();
        var today = new Date(d.getFullYear(),d.getMonth(),d.getDate());
        var selectedDate = today;

        var pickerInline = myapp.picker({
            input: '#picker-date-roundtrip',
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
                    })(),
                }
            ]
        });

        var errors = function(){
            var ret = [];
            var isChecked = $$('#roundtrip').prop('checked');

            if (isChecked && (selectedDate < today))
                ret.push('Por favor ingrese una fecha posterior a la ida.')

            return ret;
        }


        $$('#to-step-3').click(function () {
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
                myapp.getCurrentView().router.loadPage('./view/step-03.html');
        });

    }());

};
