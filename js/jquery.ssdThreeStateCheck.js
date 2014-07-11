;(function($) {

    $.fn.ssdThreeStateCheck = function(options) {

        "use strict";

        var settings = $.extend({

            classMaster : 'checkboxAll',
            classRecord : 'checkboxRecord',

            dataGroupMaster : 'group-master',
            dataGroupRecord : 'group-record'

        }, options);



        function _enableButton(thisGroup) {

            "use strict";

            $('.' + thisGroup).each(function() {

                $(this).removeClass('disabled');

                if ($(this).is(':input')) {

                    $(this).prop('disabled', false);

                }

            });

        }

        function _disableButton(thisGroup) {

            "use strict";

            $('.' + thisGroup).each(function() {

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

        });


    }

}(jQuery));