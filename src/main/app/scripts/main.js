
require.config({
    paths: {
        'bootstrap': '../vendor/bootstrap/dist/js/bootstrap',
        'angularRoute': '../vendor/angular-route/angular-route',
        'jquery': '../vendor/jquery/jquery',
        'eelnss': '../vendor/eelnss/eelnss',
        'angular': '../vendor/angular/angular',
        'angular-mocks': '../vendor/angular-mocks/angular-mocks',
        'angular-ui-router': '../vendor/angular-ui-router/release/angular-ui-router',
        'angular-breadcrumb': '../vendor/angular-breadcrumb/dist/angular-breadcrumb',
        'angular-resource': '../vendor/angular-resource/angular-resource',
        'angular-cookies': '../vendor/angular-cookies/angular-cookies',
        'angular-promise-tracker': '../vendor/angular-promise-tracker/promise-tracker',
        'text': '../vendor/requirejs-text/text',
        'requireLib': '../vendor/requirejs/require',
        'underscore': '../vendor/underscore/underscore',
        'moment': '../vendor/moment/moment',
        'has': '../vendor/has/has',
        'holderjs': '../vendor/holderjs/holder',
        'marked': '../vendor/marked/lib/marked'
    },
    shim : {
        angular  :{
            exports : "angular"
        },
        bootstrap  :{
            deps: ["jquery"]
        },
        "angularRoute": {
            deps: ["angular"]
        }
    },
    urlArgs: "bust=" + (new Date()).getTime(),
    waitSeconds : 150
});

require(['AppInjector','angular','bootstrap'], function (App) {
    App.initialize();
    return {};
});