/**
 * Created by syzer on 4/21/2015.
 */
'use strict';

angular
    .module('underscoreDecorator', ['ngLodash'])
    .config(function ($provide, lodash) {
        $provide.constant('_', lodash);
    });
