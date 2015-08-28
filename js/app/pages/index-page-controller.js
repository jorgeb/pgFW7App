/*jslint browser: true*/
/*global console*/
var hoursPicker = function (input) {
    'use strict';
    return {
        input: input,
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
    return {
        input: input,
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

        welcomescreen_slides = [
            {
                id: 'slide0',
                picture: '<div class="tutorialicon flaticon-person279"></div>',
                text: 'Welcome to this tutorial. In the <a class="tutorial-next-link" href="#">next steps</a> we will guide you through a manual that will teach you how to use this app.'
            },
            {
                id: 'slide1',
                picture: '<div class="tutorialicon flaticon-dog73"></div>',
                text: 'This is slide 2'
            },
            {
                id: 'slide2',
                picture: '<div class="tutorialicon flaticon-baggage20"></div>',
                text: 'This is slide 3'
            },
            {
                id: 'slide3',
                picture: '<div class="tutorialicon flaticon-bag30"></div>',
                text: 'This is slide 4'
            },
            {
                id: 'slide4',
                picture: '<div class="tutorialicon flaticon-suitcases6"></div>',
                text: 'Thanks for reading! Enjoy this app or go to <a class="tutorial-previous-slide" href="#">previous slide</a>.<br><br><a class="tutorial-close-btn" href="#">End Tutorial</a>'
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