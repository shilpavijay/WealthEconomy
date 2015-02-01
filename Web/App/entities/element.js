﻿(function () {
    'use strict';

    var serviceId = 'elementFactory';
    angular.module('main')
        .factory(serviceId, ['$rootScope', 'logger', elementFactory]);

    function elementFactory($rootScope, logger) {

        // Logger
        logger = logger.forSource(serviceId);

        // Service methods
        var service = {
            resourcePool: resourcePool,
            element: element,
            elementField: elementField,
            elementFieldIndex: elementFieldIndex,
            elementItem: elementItem,
            elementCell: elementCell
        }

        return (service);

        // Implementations

        function resourcePool() {
            var self = this;

            // Resource pool rate percentage
            self.resourcePoolRatePercentage = function () {

                if (!self.ResourcePoolRate)
                    return 0;

                return self.ResourcePoolRate / 100;
            }

            // Value filter
            self.valueFilter = 1;
            self.toggleValueFilter = function () {
                self.valueFilter = self.valueFilter === 1 ? 2 : 1;
            }
            self.valueFilterText = function () {
                return self.valueFilter === 1 ? "Only My Ratings" : "All Ratings";
            }

            // Current element
            self.currentElement = null;
            // TODO Just for test
            self.currentElementIndex = 0;
            self.toggleCurrentElement = function () {

                if (typeof self.ElementSet === 'undefined' || self.ElementSet.length === 0)
                    return null;

                self.currentElementIndex++;

                if (typeof self.ElementSet[self.currentElementIndex] === 'undefined') {
                    self.currentElementIndex = 0;
                }

                self.currentElement = self.ElementSet[self.currentElementIndex];
            }

            // CMRP Rate
            self.updateResourcePoolRate = function (value) {
                logger.log('update resource pool rate: ' + value);
            }
        }

        function element() {
            var self = this;

            self._resourcePoolField = null;
            self._multiplierField = null;
            self._totalIncome = 0;

            self.resourcePoolField = function () {

                // Cached value
                // TODO In case of add / remove field?
                if (self._resourcePoolField)
                    return self._resourcePoolField;

                // Validate
                if (typeof self.ElementFieldSet === 'undefined')
                    return null;

                for (var i = 0; i < self.ElementFieldSet.length; i++) {
                    var field = self.ElementFieldSet[i];
                    if (field.ElementFieldType === 11) {
                        self._resourcePoolField = field;
                        break;
                    }
                }

                return self._resourcePoolField;
            }

            self.multiplierField = function () {

                // Cached value
                // TODO In case of add / remove field?
                if (self._multiplierField)
                    return self._multiplierField;

                // Validate
                if (typeof self.ElementFieldSet === 'undefined')
                    return null;

                for (var i = 0; i < self.ElementFieldSet.length; i++) {
                    var field = self.ElementFieldSet[i];
                    if (field.ElementFieldType === 12) {
                        self._multiplierField = field;
                        break;
                    }
                }

                return self._multiplierField;
            }

            self.resourcePoolValue = function () {

                // TODO Check totalIncome notes

                // Validate
                if (typeof self.ElementItemSet === 'undefined')
                    return 0;

                var value = 0;
                for (var i = 0; i < self.ElementItemSet.length; i++) {
                    var item = self.ElementItemSet[i];
                    value += item.resourcePoolValue();
                }

                return value;
            }

            self.multiplierValue = function () {

                // TODO Check totalIncome notes

                // Validate
                if (typeof self.ElementItemSet === 'undefined')
                    return 0;

                var value = 0;
                for (var i = 0; i < self.ElementItemSet.length; i++) {
                    var item = self.ElementItemSet[i];
                    value += item.multiplierValue();
                }

                return value;
            }

            self.indexRatingAverage = function () {

                // TODO Check totalIncome notes

                // Validate
                if (typeof self.ElementFieldSet === 'undefined')
                    return 0;

                var value = 0;
                for (var i = 0; i < self.ElementFieldSet.length; i++) {
                    var item = self.ElementFieldSet[i];

                    if (item.ElementFieldIndexSet.length > 0)
                        value += item.ElementFieldIndexSet[0].IndexRatingAverage;
                }

                return value;
            }

            self.resourcePoolValueMultiplied = function () {

                // TODO Check totalIncome notes

                // Validate
                if (typeof self.ElementItemSet === 'undefined')
                    return 0;

                var value = 0;
                for (var i = 0; i < self.ElementItemSet.length; i++) {
                    var item = self.ElementItemSet[i];
                    value += item.resourcePoolValueMultiplied();
                }

                return value;
            }

            self.resourcePoolAddition = function () {

                // TODO Check totalIncome notes

                // Validate
                if (typeof self.ElementItemSet === 'undefined')
                    return 0;

                var value = 0;
                for (var i = 0; i < self.ElementItemSet.length; i++) {
                    var item = self.ElementItemSet[i];
                    value += item.resourcePoolAddition();
                }

                return value;
            }

            self.resourcePoolAdditionMultiplied = function () {

                // TODO Check totalIncome notes

                // Validate
                if (typeof self.ElementItemSet === 'undefined')
                    return 0;

                var value = 0;
                for (var i = 0; i < self.ElementItemSet.length; i++) {
                    var item = self.ElementItemSet[i];
                    value += item.resourcePoolAdditionMultiplied();
                }

                return value;
            }

            self.resourcePoolValueIncludingAddition = function () {

                // TODO Check totalIncome notes

                // Validate
                if (typeof self.ElementItemSet === 'undefined')
                    return 0;

                var value = 0;
                for (var i = 0; i < self.ElementItemSet.length; i++) {
                    var item = self.ElementItemSet[i];
                    value += item.resourcePoolValueIncludingAddition();
                }

                return value;
            }

            self.resourcePoolValueIncludingAdditionMultiplied = function () {

                // TODO Check totalIncome notes

                // Validate
                if (typeof self.ElementItemSet === 'undefined')
                    return 0;

                var value = 0;
                for (var i = 0; i < self.ElementItemSet.length; i++) {
                    var item = self.ElementItemSet[i];
                    value += item.resourcePoolValueIncludingAdditionMultiplied();
                }

                return value;
            }

            self.totalIncome = function () {

                // TODO If elementItems could set their parent element's totalIncome when their totalIncome changes, it wouldn't be necessary to sum this result everytime?

                // Validate
                if (typeof self.ElementItemSet === 'undefined')
                    return 0;

                var value = 0;
                for (var i = 0; i < self.ElementItemSet.length; i++) {
                    var item = self.ElementItemSet[i];
                    value += item.totalIncome();
                }

                return value;
            }

            self.increaseMultiplier = function () {

                var multiplierField = self.multiplierField();

                if (!multiplierField || typeof self.ElementItemSet === 'undefined')
                    return;

                // TODO Continue with this!
                for (var i = 0; i < self.ElementItemSet.length; i++) {
                    var elementItem = self.ElementItemSet[i];
                    elementItem.multiplierCell().UserElementCellSet[0].DecimalValue++;
                    var rowVersion = elementItem.multiplierCell().UserElementCellSet[0].RowVersion;
                    elementItem.multiplierCell().UserElementCellSet[0].RowVersion = '';
                    elementItem.multiplierCell().UserElementCellSet[0].RowVersion = rowVersion;
                }

                // Raise the event
                // TODO Can't it be done by scope.watch?
                $rootScope.$broadcast('elementMultiplierIncreased', self.Id);
            }

            self.decreaseMultiplier = function () {

                var multiplierField = self.multiplierField();

                if (!multiplierField || typeof self.ElementItemSet === 'undefined')
                    return;

                // TODO Continue with this!
                for (var i = 0; i < self.ElementItemSet.length; i++) {
                    var elementItem = self.ElementItemSet[i];
                    if (elementItem.multiplierCell().UserElementCellSet[0].DecimalValue > 0) {
                        elementItem.multiplierCell().UserElementCellSet[0].DecimalValue--;
                        var rowVersion = elementItem.multiplierCell().UserElementCellSet[0].RowVersion;
                        elementItem.multiplierCell().UserElementCellSet[0].RowVersion = '';
                        elementItem.multiplierCell().UserElementCellSet[0].RowVersion = rowVersion;
                    }
                }

                // Raise the event
                // TODO Can't it be done by scope.watch?
                $rootScope.$broadcast('elementMultiplierDecreased', self.Id);
            }

            self.resetMultiplier = function () {

                var multiplierField = self.multiplierField();

                if (!multiplierField || typeof self.ElementItemSet === 'undefined')
                    return;

                // TODO Continue with this!
                for (var i = 0; i < self.ElementItemSet.length; i++) {
                    var elementItem = self.ElementItemSet[i];
                    elementItem.multiplierCell().UserElementCellSet[0].DecimalValue = 0;
                    var rowVersion = elementItem.multiplierCell().UserElementCellSet[0].RowVersion;
                    elementItem.multiplierCell().UserElementCellSet[0].RowVersion = '';
                    elementItem.multiplierCell().UserElementCellSet[0].RowVersion = rowVersion;
                }

                // Raise the event
                // TODO Can't it be done by scope.watch?
                $rootScope.$broadcast('elementMultiplierReset', self.Id);
            }

        }

        function elementField() {
            var self = this;

            self.valueMultiplied = function () {

                // Validate
                if (typeof self.ElementCellSet === 'undefined')
                    return 0;

                var value = 0;
                for (var i = 0; i < self.ElementCellSet.length; i++) {
                    var cell = self.ElementCellSet[i];
                    value += cell.valueMultiplied();
                }

                return value;
            }

            self.valuePercentage = function () {

                // Validate
                if (typeof self.ElementCellSet === 'undefined')
                    return 0;

                var value = 0;
                for (var i = 0; i < self.ElementCellSet.length; i++) {
                    var cell = self.ElementCellSet[i];
                    value += cell.valuePercentage();
                }

                return value;
            }
        }

        function elementFieldIndex() {
            var self = this;

            //self.indexRatingCount = function () {
            //    return 1; // TODO
            //}

            //self.indexRatingAverage = function () {
            //    return 1; // TODO Rating average from server
            //}

            self.indexRatingPercentage = function () {

                var elementIndexRatingAverage = self.ElementField.Element.indexRatingAverage();
                return elementIndexRatingAverage == 0
                    ? 0
                    : self.IndexRatingAverage / elementIndexRatingAverage;
            }

            self.indexIncome = function () {
                var value = self.ElementField.Element.resourcePoolAdditionMultiplied() * self.indexRatingPercentage();
                return value;
            }

            //self.indexIncome = function () {
            //    // TODO
            //    return 1;
                
            //    //return ElementField.ElementCellSet.Sum(item => item.IndexIncome());
            //}
        }

        function elementItem() {
            var self = this;

            // Locals
            // TODO Is it possible to make them 'private'?
            self._resourcePoolCell = null;
            self._multiplierCell = null;

            self.resourcePoolCell = function () {

                // Cached value
                // TODO In case of add / remove field?
                if (self._resourcePoolCell) {
                    return self._resourcePoolCell;
                }

                // Validate
                if (typeof self.ElementCellSet === 'undefined')
                    return null;

                for (var i = 0; i < self.ElementCellSet.length; i++) {
                    var cell = self.ElementCellSet[i];
                    if (cell.isResourcePoolCell()) {
                        self._resourcePoolCell = cell;
                        break;
                    }
                }

                return self._resourcePoolCell;
            }

            self.multiplierCell = function () {

                // Cached value
                // TODO In case of add / remove field?
                if (self._multiplierCell)
                    return self._multiplierCell;

                // Validate
                if (typeof self.ElementCellSet === 'undefined')
                    return null;

                for (var i = 0; i < self.ElementCellSet.length; i++) {
                    var cell = self.ElementCellSet[i];
                    if (cell.isMultiplierCell()) {
                        self._multiplierCell = cell;
                        break;
                    }
                }

                return self._multiplierCell;
            }

            // TODO Compare this function with server-side
            // TODO How about Object.defineProperty?
            self.resourcePoolValue = function () {

                var value = 0; // Default value

                if (self.resourcePoolCell())
                    value = self.resourcePoolCell().DecimalValue;

                return value;
            }

            // TODO Compare this function with server-side
            // TODO How about Object.defineProperty?
            self.multiplierValue = function () {

                var value = 1; // Default value

                // TODO Review!
                if (self.multiplierCell())
                    value = self.multiplierCell().UserElementCellSet[0].DecimalValue;

                return value;
            }

            self.resourcePoolValueMultiplied = function () {
                return self.resourcePoolValue() * self.multiplierValue();
            }

            self.resourcePoolAddition = function () {
                return self.resourcePoolValue() * self.Element.ResourcePool.resourcePoolRatePercentage();
            }

            self.resourcePoolAdditionMultiplied = function () {
                return self.resourcePoolAddition() * self.multiplierValue();
            }

            self.resourcePoolValueIncludingAddition = function () {
                return self.resourcePoolValue() + self.resourcePoolAddition();
            }

            self.resourcePoolValueIncludingAdditionMultiplied = function () {
                return self.resourcePoolValueIncludingAddition() * self.multiplierValue();
            }

            self.indexIncome = function () {

                // Validate
                if (typeof self.ElementCellSet === 'undefined')
                    return 0;

                var value = 0;
                for (var i = 0; i < self.ElementCellSet.length; i++) {
                    var cell = self.ElementCellSet[i];
                    value += cell.indexIncome();
                }

                return value;
            }

            self.totalIncome = function () {
                return self.resourcePoolValueMultiplied() + self.indexIncome();
            }
        }

        function elementCell() {
            var self = this;

            self.isResourcePoolCell = function () {
                if (typeof self.ElementField === 'undefined')
                    return false;

                return self.ElementField.ElementFieldType === 11;
            }

            self.isMultiplierCell = function () {
                if (typeof self.ElementField === 'undefined')
                    return false;

                return self.ElementField.ElementFieldType === 12;
            }

            self.value = function () {

                // valueFilter?

                var value = 0;

                // Validate
                if (typeof self.ElementField === 'undefined')
                    throw 'No element field, no cry!';

                if (self.ElementField.UseFixedValue) {

                    switch (self.ElementField.ElementFieldType) {
                        case 2: { value = self.BooleanValue; break; }
                        case 3: { value = self.IntegerValue; break; }
                        case 4:
                        // TODO 5 (DateTime?)
                        case 11:
                        case 12: { value = self.DecimalValue; break; }
                        default: { throw 'Not supported'; }
                    }

                } else {

                    // TODO Users' average

                    switch (self.ElementField.ElementFieldType) {
                        case 2: { value = self.UserElementCellSet[0].BooleanValue; break; }
                        case 3: { value = self.UserElementCellSet[0].IntegerValue; break; }
                        case 4:
                            // TODO 5 (DateTime?)
                        case 11:
                        case 12: { value = self.UserElementCellSet[0].DecimalValue; break; }
                        default: { throw 'Not supported'; }
                    }
                }

                return value;
            }

            self.valueMultiplied = function () {

                var multiplierValue = 1;

                if (typeof self.ElementItem !== 'undefined')
                    multiplierValue = self.ElementItem.multiplierValue();

                return self.value() * self.ElementItem.multiplierValue();
            }

            self.valuePercentage = function () {

                if (typeof self.ElementField === 'undefined')
                    return 0;

                var elementFieldValueMultiplied = self.ElementField.valueMultiplied();

                return elementFieldValueMultiplied === 0
                    ? 0
                    : self.valueMultiplied() / elementFieldValueMultiplied;
            }

            self.indexIncome = function () {

                // TODO
                //if (self.ElementField.ElementFieldIndex === null) {
                //    return ElementField.ElementFieldType == (byte)ElementFieldTypes.Element && SelectedElementItem != null
                //        ? SelectedElementItem.IndexIncome()
                //        : 0;
                //}

                if (self.ElementField.ElementFieldIndexSet.length === 0)
                    return 0;

                var value = self.valuePercentage();

                // If Rating sort type is 'Lowest to Highest', reverse the value
                if (self.ElementField.ElementFieldIndexSet[0].RatingSortType == 1) {
                    value = 1 - value;
                }

                return self.ElementField.ElementFieldIndexSet[0].indexIncome() * value;
            }

            // TODO
            self.increaseIndexCellValue = function () {
                if (typeof self.ElementField === 'undefined')
                    return;

                logger.log('increase index cell value');
            }

            // TODO
            self.decreaseIndexCellValue = function () {
                if (typeof self.ElementField === 'undefined')
                    return;

                logger.log('decrease index cell value');
            }
        }
    }
})();