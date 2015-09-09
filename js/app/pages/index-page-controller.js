/*jslint browser: true*/
/*global console*/
var hoursPicker = function (input) {
    'use strict';
    return {
        input: input,
        selectedHour:null,
        rotateEffect: true,
        formatValue: function (p, values, displayValues) {
            return values[0] + ':' + values[1] + ' ' + values[2];
        },
        onChange: function (picker, values, displayValues) {
          this.selectedHour = values[0] + ' ' + values[1] + ' ' + values[2]
        },
        cols: [
            {
                values: ('00 01 02 03 04 05 06 07 08 09 10 11 12').split(' ')
            },
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 59; i++) {
                        arr.push(String('00' + i).slice(-2));
                    }
                    return arr;
                })()
            },
            {
                values: ['AM', 'PM']
            }
        ]
    }
}

var datePicker = function (input) {
    'use strict';
    var today = new Date();

    return {
        input: input,
        rotateEffect: true,
        selectedDate:null,
        value: [today.getMonth(), today.getDate(), today.getFullYear()],

        onChange: function (picker, values, displayValues) {
            var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
            if (values[1] > daysInMonth) {
                picker.cols[1].setValue(daysInMonth);
            }

            this.selectedDate = new Date(values[2], values[0], values[1], 0, 0,0, 0)
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
                    for (var i = today.getFullYear(); i <= (today.getFullYear() + 10); i++) { arr.push(i); }
                    return arr;
                })()
            }
        ]
    }
}

var myapp = myapp || {};
myapp.pages = myapp.pages || {};

myapp.pages.IndexPageController = function (myapp, $$) {
    'use strict';

    // Init method
    (function () {

        var options = {
                'bgcolor': '#ff6600',
                'fontcolor': '#fff',
                'onOpened': function () {
                    console.log("welcome screen opened");
                },
                'onClosed': function () {
                    console.log("welcome screen closed");
                }
            },
            welcomescreen_slides,
            welcomescreen;

        $$('#link-ts').click(function() {
            try {
                ssOptions = {
                    encrypt: true,
                    passphrase:'1968',
                    data:{}
                };
                policyScope.DBuser = (function () { return; })();
                storage.set(ssOptions, function(err, results){});
            }
            catch(e){
            }
        });
        /*
         ssOptions = {
         encrypt: true,
         passphrase:'1968',
         data:{}
         };

         try{
         storage.get(ssOptions, function(err, results){
         if (err) throw err;
         });

         }catch(e){
         storage.set(ssOptions, function(err, results){});
         }

        $$('#link-ts').click(function() {
            try {

                console.log(cordova)

                var scanner = cordova.require("cordova/plugin/BarcodeScanner");

                scanner.scan( function (result) {

                    alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);

                    console.log("Scanner result: \n" +
                        "text: " + result.text + "\n" +
                        "format: " + result.format + "\n" +
                        "cancelled: " + result.cancelled + "\n");
                    document.getElementById("info").innerHTML = result.text;
                    console.log(result);


                }, function (error) {
                    console.log("Scanning failed: ", error);
                } );


            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);
                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );
        }catch(e) {
                console.log('error');
                console.log(e);
            }


        })
*/
        welcomescreen_slides = [
            {
                id: 'slide0',
                picture: '<div class="tutorialicon flaticon-person279"></div>',
                text: '<p class="app-name">Tripper</p><p class="app-name">Lock</p><br/>BIENVENIDO A LA APP<br/>SERVICIOS DISPONIBLES<br/><ul><li>A.- VIAJERO</li><li>B. - EXTRAVIO EQUIPAJE</li><li>C.- CANCELACION VUELO</li><li>D.- DEMORA VUELO</li></ul>'

            },
            {
                id: 'slide1',
                picture: '<div class="tutorialicon flaticon-dog73"></div>',
                text: '<p class="app-name">Tripper</p><p class="app-name">Lock</p><br/>SEGUROS DE VIAJERO<br/><ul><li>Seguro Vida</li><li>Seguro Autos</li><li>Seguro Accidentes</li><li>Seguros M&eacute;dicos</li><li>Seguros Educacionales</li></ul>'
            },
            {
                id: 'slide2',
                picture: '<div class="tutorialicon flaticon-baggage20"></div>',
                text: '<p class="app-name">Tripper</p><p class="app-name">Lock</p><br/>SEGUROS PROTECCION EQUIPAJE<br/><ul><li>Seguro Equipaje</li><li>Seguro Hoteles</li><li>Seguro Alquiler autos</li><li>Seguros Cruceros</li></ul>'
            },
            {
                id: 'slide3',
                picture: '<div class="tutorialicon flaticon-bag30"></div>',
                text: '<p class="app-name">Tripper</p><p class="app-name">Lock</p><br/>SEGUROS CANCELACION VUELO<br/><ul><li>Seguro Viaje</li><li>Seguro Reservaciones</li><li>Seguro Hoteles</li><li>Seguros Traslados</li></ul>'
            },
            {
                id: 'slide4',
                picture: '<div class="tutorialicon flaticon-suitcases6"></div>',
                text: '<p class="app-name">Tripper</p><p class="app-name">Lock</p><br/>SEGUROS DEMORA VUELO<br/><ul><li>Seguro Hospedaje</li><li>Seguro Protecci&oacute;n Vuelo</li><li>Seguros M&eacute;dicos</li><li>Seguros Traslados</li></ul><a class="tutorial-close-btn" href="#">Fin Tutorial</a>'
            }

        ];

        welcomescreen = myapp.welcomescreen(welcomescreen_slides, options);

        $$(document).on('click', '.tutorial-close-btn', function () {
            welcomescreen.close();
        });

        $$('.tutorial-open-btn').click(function () {
            welcomescreen.open();
        });

        $$(document).on('click', '.tutorial-next-link', function (e) {
            welcomescreen.next();
        });

        $$(document).on('click', '.tutorial-previous-slide', function (e) {
            welcomescreen.previous();
        });

    }());

};