var myapp = myapp || {};
myapp.pages = myapp.pages || {};


myapp.pages.ListPoliciesController = function (myapp, $$, acController) {
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


        acController.call('basic/policiesbyuser').then(function (data) {
            try {
                var jdata = JSON.parse(data);

            var myList = myapp.virtualList('#lst-policies', {
                // Array with items data
                items:jdata,
                height:84,
                onItemBeforeInsert:function(l,i){
                    $$(i).click(function(){
                       var id = $$('input',this).val();
                        policyScope.currentPolicy.id = id;
                        myapp.getCurrentView().router.loadPage('./view/list-baggages.html');
                    });
                },
                // Template 7 template to render each item
                template: '<li>' +
                '<a href="#" class="item-link item-content">' +
                '<input value="{{_id}}" type="hidden" />' +
                '<div class="item-media"><i class="flaticon-suitcases6 flaticon-rounded flaticon-rounded-pink"></i></div>' +
                '<div class="item-inner">' +
                '<div class="item-title-row">' +
                '<div class="item-title">{{from}} / {{to}}</div>' +
                '</div>' +
                '<div class="item-text">Valijas [{{numbaggages}}], Viaje Redondo [{{roundtrip}}]</div>' +
                '</div>' +
                '</a>' +
                '</li>'
            });
            }catch(e){
                console.log(e);
            }

        }, function (reason) {
            console.log(reason);
        });

    }());
};