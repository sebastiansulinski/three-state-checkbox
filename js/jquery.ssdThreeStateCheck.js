;(function($) {

    $.fn.ssdThreeStateCheck = function(options) {

        "use strict";

        var settings = $.extend({

            classButton         : 'checkboxButton',
            classMaster         : 'checkboxMaster',
            classRecord         : 'checkboxRecord',

            dataButtonUrl       : 'url',
            dataGroupButton     : 'group-button',
            dataGroupMaster     : 'group-master',
            dataGroupRecord     : 'group-record',
            dataGroupRecordId   : 'id'

        }, options);


        function _isEmpty(thisValue) {

            return (
                thisValue === '' ||
                typeof thisValue === 'undefined'
            );

        }


        function _enableButton(thisGroup) {

            "use strict";

            var identity  = '[data-';
                identity += settings.dataGroupButton;
                identity += '="';
                identity += thisGroup;
                identity += '"].';
                identity += settings.classButton;

            $(identity).each(function() {

                $(this).removeClass('disabled');

                if ($(this).is(':input')) {

                    $(this).prop('disabled', false);

                }

            });

        }

        function _disableButton(thisGroup) {

            "use strict";

            var identity  = '[data-';
                identity += settings.dataGroupButton;
                identity += '="';
                identity += thisGroup;
                identity += '"].';
                identity += settings.classButton;

            $(identity).each(function() {

                $(this).addClass('disabled');

                if ($(this).is(':input')) {

                    $(this).prop('disabled', true);

                }

            });

        }

        function _areAllGroupItemsChecked(thisGroupItems) {

            "use strict";

            var checked = thisGroupItems.filter(':checked');

            return (checked.length === thisGroupItems.length);

        }

        function _areAllGroupItemsUnChecked(thisGroupItems) {

            "use strict";

            var unChecked = thisGroupItems.filter(':not(:checked)');

            return (unChecked.length === thisGroupItems.length);

        }


        function _setMasterObject(thisGroup) {

            "use strict";

            return $('input[data-' + settings.dataGroupMaster + '="' + thisGroup + '"].' + settings.classMaster);

        }


        function _setRecordObject(thisGroup) {

            "use strict";

            return $('input[data-' + settings.dataGroupRecord + '="' + thisGroup + '"].' + settings.classRecord);

        }


        function _setCheckedRecordObject(thisGroup) {

            "use strict";

            return $('input:checked[data-' + settings.dataGroupRecord + '="' + thisGroup + '"].' + settings.classRecord);

        }


        function _getSelectedIds(thisGroup) {

            "use strict";

            var thisDeferred = $.Deferred(),
                thisGroupItems = _setCheckedRecordObject(thisGroup),
                thisIds = [];

            thisGroupItems.each(function(k, v) {

                thisIds.push($(this).data(settings.dataGroupRecordId));

                if (parseInt((k + 1), 10) == thisGroupItems.length) {

                    thisDeferred.resolve(thisIds);

                }

            });

            return thisDeferred.promise();

        }



        return this.each(function() {

            "use strict";

            $(this).on('click', '.' + settings.classMaster, function() {

                var thisObject = $(this),
                    thisGroup = thisObject.data(settings.dataGroupMaster),
                    thisGroupItems = _setRecordObject(thisGroup);

                if (thisObject.is(':checked')) {

                    thisGroupItems.prop('checked', true);

                    _enableButton(thisGroup);

                } else {

                    thisGroupItems.prop('checked', false);

                    _disableButton(thisGroup);

                }

            });

            $(this).on('click', '.' + settings.classRecord, function() {

                var thisObject = $(this),
                    thisGroup = thisObject.data(settings.dataGroupRecord),
                    thisGroupItems = _setRecordObject(thisGroup),
                    thisGroupAll = _setMasterObject(thisGroup);

                if (_areAllGroupItemsUnChecked(thisGroupItems)) {

                    thisGroupAll.prop('indeterminate', false);
                    thisGroupAll.prop('checked', false);

                    _disableButton(thisGroup);

                } else if (_areAllGroupItemsChecked(thisGroupItems)) {

                    thisGroupAll.prop('indeterminate', false);
                    thisGroupAll.prop('checked', true);

                    _enableButton(thisGroup);

                } else {

                    thisGroupAll.prop('indeterminate', true);

                    _enableButton(thisGroup);

                }

            });

            $(this).on('click', '.' + settings.classButton, function(event) {

                event.preventDefault();

                if (!$(this).hasClass('disabled')) {

                    var thisObject = $(this),
                        thisGroup = thisObject.data(settings.dataGroupButton),
                        thisUrl = thisObject.data(settings.dataButtonUrl);

                    if (!_isEmpty(thisUrl)) {

                        $.when(_getSelectedIds(thisGroup))
                            .done(function(ids) {


                                // replace with your ajax call
                                var message  = 'Selected ids: [' + ids;
                                    message += '] | Url to be called: ' + thisUrl;

                                console.log(message);


                            });

                    }

                }


            });

        });


    }

}(jQuery));