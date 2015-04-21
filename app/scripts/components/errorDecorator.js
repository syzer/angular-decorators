/**
 * Created by syzer on 4/17/2015.
 */
'use strict';
angular
    .module('errorDecorator', [])
    .controller('ErrorDecoratorCtrl', function ($scope, errorService) {
        $scope.errors = [];

        $scope.generateError = function () {
            if (Math.random() > 0.5) {
                throw new Error("InvalidArguments");
            } else {
                throw new Error("MethodNotImplemented")
            }
        };

        $scope.getErrors = function () {
            $scope.errors = errorService.get();
            console.warn(errorService);
        };

    })
    .provider('errorService', function ErrorService() {
        var errors = this.errors = [];

        // TODO debouce
        this.add = function (error) {
            errors.push(error);
        };

        this.get = function () {
            return errors.map(function (er) {
                return er.toString();
            });
        };

        // may inject here other providers
        this.$get = function () {
            return this;
        };
    })
    .config(function ($provide, errorServiceProvider) {
        $provide.decorator("$exceptionHandler", function ($delegate, $injector) {
            return function (exception, cause) {
                errorServiceProvider.add(exception);

                // rethrow exception
                $delegate(exception, cause);
            };
        });
    });
