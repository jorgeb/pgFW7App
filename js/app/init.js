// Generate dynamic page
var dynamicPageIndex = 0;

// Initialize your app
var myapp = myapp || {};

var policyScope = policyScope || {};

myapp.init = (function () {
    'use strict';

    var exports = {};

    (function () {
        // Initialize app
        var fw7App = new Framework7(),
            fw7ViewOptions = {
                dynamicNavbar: true,
                domCache: true
            },
            mainView = fw7App.addView('.view-main', fw7ViewOptions),
            ipc,
            $$ = Dom7;

        ipc = new myapp.pages.IndexPageController(fw7App, $$);

        // Callbacks to run specific code for specific pages, for example for About page:
        fw7App.onPageInit('about', function (page) {
            console.log('about')
            // run createContentPage func after link was clicked
            $$('.create-page').on('click', function () {
                createContentPage();
            });
        });

        fw7App.onPageInit('step01', function (page) {
            new myapp.pages.Step1PageController(fw7App, $$);
        });

        fw7App.onPageInit('step02', function (page) {
            new myapp.pages.Step2PageController(fw7App, $$);
        });

        fw7App.onPageInit('step03', function (page) {
            new myapp.pages.Step3PageController(fw7App, $$);
        });

        fw7App.onPageInit('step04', function (page) {
            new myapp.pages.Step4PageController(fw7App, $$);
        });

        fw7App.onPageInit('step05', function (page) {
            new myapp.pages.Step5PageController(fw7App, $$);
        });

        fw7App.onPageInit('step06', function (page) {
            new myapp.pages.Step6PageController(fw7App, $$);
        });

        fw7App.onPageInit('step07', function (page) {
            new myapp.pages.Step7PageController(fw7App, $$);
        });

        function createContentPage() {
            mainView.router.loadContent(
                '<!-- Top Navbar-->' +
                '<div class="navbar">' +
                '  <div class="navbar-inner">' +
                '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
                '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
                '  </div>' +
                '</div>' +
                '<div class="pages">' +
                '  <!-- Page, data-page contains page name-->' +
                '  <div data-page="dynamic-pages" class="page">' +
                '    <!-- Scrollable page content-->' +
                '    <div class="page-content">' +
                '      <div class="content-block">' +
                '        <div class="content-block-inner">' +
                '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
                '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>'
            );
            return;
        }

    }());

    return exports;

}());


