//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

(function () {
    'use strict';

    var controllerId = 'elementEditController';
    angular.module('main')
        .controller(controllerId, ['elementFactory',
            'resourcePoolFactory',
            'logger',
            '$location',
            '$routeParams',
            elementEditController]);

    function elementEditController(elementFactory,
		resourcePoolFactory,
		logger,
		$location,
		$routeParams) {
        logger = logger.forSource(controllerId);

        var isNew = $location.path() === '/manage/generated/element/new';
        var isSaving = false;

        // Controller methods (alphabetically)
        var vm = {};
        vm.resourcePoolSet = [];
        vm.cancelChanges = cancelChanges;
        vm.isSaveDisabled = isSaveDisabled;
        vm.entityErrors = [];
        vm.element = null;
        vm.saveChanges = saveChanges;
        vm.hasChanges = hasChanges;

        initialize();

        /*** Implementations ***/

        function cancelChanges() {

            $location.path('/manage/generated/element');

            //if (elementFactory.hasChanges()) {
            //    elementFactory.rejectChanges();
            //    logWarning('Discarded pending change(s)', null, true);
            //}
        }

        function hasChanges() {
            return elementFactory.hasChanges();
        }

        function initialize() {

            resourcePoolFactory.getResourcePoolSet(false)
                .then(function (data) {
                    vm.resourcePoolSet = data;
                });

            if (isNew) {
                // TODO For development enviroment, create test entity?
            }
            else {
                elementFactory.getElement($routeParams.Id)
                    .then(function (data) {
                        vm.element = data;
                    })
                    .catch(function (error) {
                        // TODO User-friendly message?
                    });
            }
        }

        function isSaveDisabled() {
            return isSaving ||
                (!isNew && !elementFactory.hasChanges());
        }

        function saveChanges() {

            if (isNew) {
                elementFactory.createElement(vm.element);
            }

            isSaving = true;
            elementFactory.saveChanges()
                .then(function (result) {
                    $location.path('/manage/generated/element');
                })
                .catch(function (error) {
                    // Conflict (Concurrency exception)
                    if (typeof error.status !== 'undefined' && error.status === '409') {
                        // TODO Try to recover!
                    } else if (typeof error.entityErrors !== 'undefined') {
                        vm.entityErrors = error.entityErrors;
                    }
                })
                .finally(function () {
                    isSaving = false;
                });
        }
    }
})();
