'use strict';
require.config({
    paths: {
        'bootstrap': 'vendor/bootstrap/dist/js/bootstrap',
        'angular': 'vendor/angular/angular',
        'angularRoute': 'vendor/angular-route/angular-route',
        'text': 'vendor/requirejs-text/text',
        'requireLib': 'vendor/requirejs/require',
        'jquery': 'vendor/jquery/jquery',
        'underscore': 'vendor/underscore-amd/underscore',
        'moment': 'vendor/moment/moment',
        'has': 'vendor/has/has'
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