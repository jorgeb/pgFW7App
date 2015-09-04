var myapp = myapp || {};
myapp.pages = myapp.pages || {};


myapp.pages.ListBaggagesController = function (myapp, $$, acController) {
    'use strict';
    // Init method

    (function () {

        /*acController.call('basic/policies','POST',{to:'Madrid',from:'Bolivia',numbaggages:4,roundtrip:true}).then(function (data) {
         try {
         console.log(data);
         }catch(e){
         console.log(e);
         }
         }, function (reason) {
         console.log(reason);
         });

         acController.call('basic/baggages','GET',null).then(function (data) {
         try {
         console.log(data);
         }catch(e){
         console.log(e);
         }
         }, function (reason) {
         console.log(reason);
         });

         acController.call('basic/policies/55e934d4ae9c422826c5a005/baggages','GET',null).then(function (data) {
         try {
         console.log(data);
         }catch(e){
         console.log(e);
         }
         }, function (reason) {
         console.log(reason);
         });

         acController.call('basic/policies/55e93df6af83740c1b7ba308/baggages','GET',null).then(function (data) {
         try {
         console.log(data);
         }catch(e){
         console.log(e);
         }
         }, function (reason) {
         console.log(reason);
         });

         */


        acController.call('basic/policies/' + policyScope.currentPolicy.id + '/baggages').then(function (data) {
            try {
                var jdata = JSON.parse(data);

                var inx = 1;
                var myList = myapp.virtualList('#lst-baggages', {
                    // Array with items data
                    items:jdata,
                    height:84,
                    onItemsAfterInsert:function(l,f){
                        $$('#lst-baggages li').each(function(i){
                            $$('.badge',this).text(i + 1);

                            if(l.items[i].barcode != '')
                                $$('.flaticon-rounded-gray',this).addClass('flaticon-rounded-green');
                        })

                        $$('.add-code').on('click', function () {
                            var $li = $$(this).parents('li');

                            myapp.prompt('Cual es el c&oacute;digo de la valija?', 'C&oacute;digo',
                                function (value) {
                                    if(value != '') {
                                        $$($li).find('.barcode').text(value);
                                        $$($li).find('.flaticon-rounded-gray').addClass('flaticon-rounded-green');

                                        acController.call('basic/baggages/' + $$($li).find('input').val(),'POST',{barcode:value}).then(function (data) {
                                            console.log(data);

                                        }, function (reason) {
                                            console.log(reason);
                                        });


                                    }
                                    myapp.swipeoutClose($li);
                                },
                                function (value) {
                                    myapp.swipeoutClose($li);
                                }
                            );
                        });
                    },
                    onItemBeforeInsert:function(l,i){

                    },
                    // Template 7 template to render each item
                    template: '<li class="swipeout">' +
                    '<div class="swipeout-content item-content">' +
                    '<input value="{{_id}}" type="hidden" />' +
                    '<div class="item-media"><i class="flaticon-heart56 flaticon-rounded flaticon-rounded-gray"></i></div>' +
                    '<div class="item-inner">' +
                    '<div class="item-title-row">' +
                    '<div class="item-title">Equipaje</div>' +
                    '<div class="item-after"><span class="badge">1</span></div>' +
                    '</div>' +
                    '<div class="item-text barcode">{{barcode}}</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="swipeout-actions-right">' +
                    '<a href="#" class="add-code bg-orange">C&oacute;digo</a>' +
                    '<a href="#" class="add-img">Im&aacute;gen</a>' +
                    '</div>' +
                    '</li>'
                });
            }catch(e){
                console.log(e);
            }

        }, function (reason) {
            console.log(reason);
        });

        $$('#add-policy').click(function(){
            myapp.showPreloader();
            $$.ajax ({
                url:  policyScope.baseUrl + 'email/policy/'
                + policyScope.user.username
                + '/' + policyScope.user.displayName,
                dataType: 'text',
                method:'GET',
                success: function(json, status, xhr) {

                    myapp.hidePreloader();
                    myapp.getCurrentView().router.back();
                },

                error: function( jqXHR, status, error ) { // activated in iPad Safari as 200 ? w/o snd params
                    console.log('error ' + jqXHR.statusText);
                    myapp.hidePreloader();
                    myapp.alert(jqXHR.statusText, 'Error en el envió de mail');
                }
            });
        })
    }());
};