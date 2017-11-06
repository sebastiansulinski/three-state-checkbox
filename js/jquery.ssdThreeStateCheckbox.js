/*
 * ssdThreeStateCheckbox jQuery plugin
 * Examples and documentation at: https://github.com/sebastiansulinski/three-state-checkbox
 * Copyright (c) 2017 Sebastian Sulinski
 * Version: 1.2.2 (O6-NOV-2017)
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

				classButton			: 'checkboxButton',
				classMaster			: 'checkboxMaster',
				classRecord			: 'checkboxRecord',

				dataGroupButton		: 'group-button',
				dataGroupMaster		: 'group-master',
				dataGroupRecord		: 'group-record',
				dataGroupRecordId	: 'id',

				clickCallback		: function(ids, trigger) {
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
					if ($this.is(':input'))
						$this.prop('disabled', false);
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

					if ($this.is(':input'))
						$this.prop('disabled', true);
				});
			}

			function areAllGroupItemsChecked(thisGroupItems) {
				"use strict";
				var enabled = thisGroupItems.not('[disabled]');
				return (enabled.length === enabled.filter(':checked').length);
			}

			function areAllGroupItemsUnChecked(thisGroupItems) {
				"use strict";
				var enabled = thisGroupItems.not('[disabled]');
				return (enabled.length === enabled.not(':checked').length);
			}

    		function setMasterObject(thisGroup) {
    			"use strict";
				return $('input[data-' + settings.dataGroupMaster + '="' + thisGroup + '"].' + settings.classMaster);
			}

			function setRecordObject(thisGroup) {
				"use strict";
				return $('input.' + settings.classRecord + '[data-' + settings.dataGroupRecord + '="' + thisGroup + '"]');
			}

			function setCheckedRecordObject(thisGroup) {
				"use strict";
				return setRecordObject(thisGroup).filter(':checked');
			}

			function getSelectedIds(thisGroup) {
				"use strict";
				var deferred = $.Deferred(),
					groupItems = setCheckedRecordObject(thisGroup),
					ids = [];

				groupItems.each(function(k, v) {
					ids.push($(this).data(settings.dataGroupRecordId));

					if (parseInt((k + 1), 10) === groupItems.length)
						deferred.resolve(ids);
				});

				return deferred.promise();
			}

			function registerEvents(obj) {
				"use strict";
				$(obj).off('change.triState')
					.on('change.triState', '.' + settings.classMaster, function() {
						var $this = $(this),
							group = $this.data(settings.dataGroupMaster),
							groupItems = setRecordObject(group);

						if ($this.is(':checked')) {
							groupItems.not('[disabled]').prop('checked', true);
							enableButton(group);
						} else {
							groupItems.not('[disabled]').prop('checked', false);
							disableButton(group);
						}

					})
				.on('change.triState', '.' + settings.classRecord, function() {
						var group = $(this).data(settings.dataGroupRecord),
							groupItems = setRecordObject(group),
							groupMaster = setMasterObject(group);

						setMasterStatus(group, groupMaster, groupItems);
					})

				.off('click.triState').on('click.triState', '.' + settings.classButton, function(event) {
						event.preventDefault();
						if (!$(this).hasClass('disabled')) {
							var trigger = $(this),
								group = trigger.data(settings.dataGroupButton);

							$.when(getSelectedIds(group)).done(function(ids) {
								settings.clickCallback(ids, trigger);
							});
						}
					});
			}

			function setMasterStatus(group, groupMaster, groupItems) {
				"use strict";
				if (areAllGroupItemsUnChecked(groupItems)) {
					groupMaster.prop({
						indeterminate: false,
						checked: false
					});
					disableButton(group);
				} else if (areAllGroupItemsChecked(groupItems)) {

					groupMaster.prop({
						indeterminate: false,
						checked: true
					});
					enableButton(group);
				} else {
					groupMaster.prop({
						indeterminate: true,
						checked: false
					});
					enableButton(group);
				}
			}

			function initialise(obj) {
				"use strict";
				$('.' + settings.classMaster).each(function() {

					var $this = $(this),
						group = $this.data(settings.dataGroupMaster),
						groupItems = setRecordObject(group);

					if (groupItems.length === 0)
						return;

					setMasterStatus(group, $this, groupItems);
				});
                registerEvents(obj);
                return obj;
			}

			return initialise(this);
		}
	})();
}));
