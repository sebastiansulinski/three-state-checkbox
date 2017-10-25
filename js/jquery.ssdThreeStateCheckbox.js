/*
 * ssdThreeStateCheckbox jQuery plugin
 * Examples and documentation at: https://github.com/sebastiansulinski/three-state-checkbox
 * Copyright (c) 2017 Sebastian Sulinski
 * Version: 1.2.0 (8-SEP-2017)
 * Licensed under the MIT.
 * Requires: jQuery v1.9 or later
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module unless amdModuleId is set
        define(['jquery'], function (a0) {
            return (factory(a0));
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        factory(root["jQuery"]);
    }
}(this, function ($) {

    (function() {

        $.fn.ssdThreeStateCheckbox = function(options) {

            "use strict";

            var settings = $.extend({

                classButton         : 'checkboxButton',
                classMaster         : 'checkboxMaster',
                classRecord         : 'checkboxRecord',

                dataGroupButton     : 'group-button',
                dataGroupMaster     : 'group-master',
                dataGroupRecord     : 'group-record',
                dataGroupRecordId   : 'id',

                clickCallback       : function(ids, trigger) {

                    console.log("clickCallback method call : collected [" + ids + "]");

                }

            }, options);


            function isEmpty(thisValue) {

                return (
                    thisValue === '' ||
                    typeof thisValue === 'undefined'
                );

            }


            function enableButton(thisGroup) {

                "use strict";

                var identity = '[data-'
                    + settings.dataGroupButton
                    + '="'
                    + thisGroup
                    + '"].'
                    + settings.classButton;

                $(identity).each(function() {
                    
                    var $this = $(this);
                    
                    $this.removeClass('disabled');

                    if ($this.is(':input')) {

                        $this.prop('disabled', false);

                    }

                });

            }

            function disableButton(thisGroup) {

                "use strict";

                var identity = '[data-'
                    + settings.dataGroupButton
                    + '="'
                    + thisGroup
                    + '"].'
                    + settings.classButton;

                $(identity).each(function() {
                    
                    var $this = $(this);
                    
                    $this.addClass('disabled');

                    if ($this.is(':input')) {

                        $this.prop('disabled', true);

                    }

                });

            }

            function areAllGroupItemsChecked(thisGroupItems) {

                "use strict";

                var checked = thisGroupItems.filter(':checked');

                return (checked.length === thisGroupItems.length);

            }

            function areAllGroupItemsUnChecked(thisGroupItems) {

                "use strict";

                var unChecked = thisGroupItems.filter(':not(:checked)');

                return (unChecked.length === thisGroupItems.length);

            }


            function setMasterObject(thisGroup) {

                "use strict";

                return $('input[data-' + settings.dataGroupMaster + '="' + thisGroup + '"].' + settings.classMaster);

            }


            function setRecordObject(thisGroup) {

                "use strict";

                return $('input[data-' + settings.dataGroupRecord + '="' + thisGroup + '"].' + settings.classRecord);

            }


            function setCheckedRecordObject(thisGroup) {

                "use strict";

                return $('input:checked[data-' + settings.dataGroupRecord + '="' + thisGroup + '"].' + settings.classRecord);

            }


            function getSelectedIds(thisGroup) {

                "use strict";

                var thisDeferred = $.Deferred(),
                    thisGroupItems = setCheckedRecordObject(thisGroup),
                    thisIds = [];

                thisGroupItems.each(function(k, v) {

                    thisIds.push($(this).data(settings.dataGroupRecordId));

                    if (parseInt((k + 1), 10) === thisGroupItems.length) {

                        thisDeferred.resolve(thisIds);

                    }

                });

                return thisDeferred.promise();

            }



            return this.each(function() {

                "use strict";

                $(this).on('change', '.' + settings.classMaster, function() {

                    var thisObject = $(this),
                        thisGroup = thisObject.data(settings.dataGroupMaster),
                        thisGroupItems = setRecordObject(thisGroup);

                    if (thisObject.is(':checked')) {

                        thisGroupItems.prop('checked', true);

                        enableButton(thisGroup);

                    } else {

                        thisGroupItems.prop('checked', false);

                        disableButton(thisGroup);

                    }

                });

                $(this).on('change', '.' + settings.classRecord, function() {

                    var thisObject = $(this),
                        thisGroup = thisObject.data(settings.dataGroupRecord),
                        thisGroupItems = setRecordObject(thisGroup),
                        thisGroupMaster = setMasterObject(thisGroup);

                    if (areAllGroupItemsUnChecked(thisGroupItems)) {

                        thisGroupMaster.prop({
                            indeterminate: false,
                            checked: false
                        });

                        disableButton(thisGroup);

                    } else if (areAllGroupItemsChecked(thisGroupItems)) {

                        thisGroupMaster.prop({
                            indeterminate: false,
                            checked: true
                        });

                        enableButton(thisGroup);

                    } else {

                        thisGroupMaster.prop('indeterminate', true);

                        enableButton(thisGroup);

                    }

                });

                $(this).on('click', '.' + settings.classButton, function(event) {

                    event.preventDefault();

                    if (!$(this).hasClass('disabled')) {

                        var thisTrigger = $(this),
                            thisGroup = thisTrigger.data(settings.dataGroupButton);


                        $.when(getSelectedIds(thisGroup))
                            .done(function(ids) {


                                settings.clickCallback(ids, thisTrigger);


                            });

                    }


                });

            });


        }

    })();

}));
