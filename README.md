#jQuery Three State Checkbox Plugin

## Demo

[jQuery Three State Checkbox Plugin Demo](http://jquery-three-state-checkbox.ssdtutorials.com/)

## Usage instructions

### List / table structure

To start with create an html structure of you list with one column (in case of the table) containing checkbox for the given record:

```
<form>

    <table>

        <thead>

            <tr>
                <th class="col1">
                    <input
                        type="checkbox"
                        class="checkboxMaster"
                        data-group-master="checkboxRemove"
                        >
                </th>
                <th>
                    Name
                </th>
            </tr>

        </thead>

        <tbody>

            <tr>
                <td>
                    <input
                        type="checkbox"
                        class="checkboxRecord"
                        data-group-record="checkboxRemove"
                        data-id="1"
                        >
                </td>
                <td>
                    Name 1
                </td>
            </tr>
            <tr>
                <td>
                    <input
                        type="checkbox"
                        class="checkboxRecord"
                        data-group-record="checkboxRemove"
                        data-id="2"
                        >
                </td>
                <td>
                    Name 2
                </td>
            </tr>
            <tr>
                <td>
                    <input
                        type="checkbox"
                        class="checkboxRecord"
                        data-group-record="checkboxRemove"
                        data-id="3"
                        >
                </td>
                <td>
                    Name 3
                </td>
            </tr>

        </tbody>

    </table>

</form>
```

The important things here are:

- The main checkbox in the heading of the table, which selects / de-selects all of the child checkboxes, needs to have some class, that we either pass as an argument when we call the plugin or use the default one, which is 'checkboxMaster'. It also needs to have a data-* attribute, the default one is 'data-group-master', but again, you can overwrite it with the argument when calling the plugin.

- Each child checkbox also needs to have the class and data-* attribute. The default class is 'checkboxRecord' and default data-* attribute is 'data-group-record'.

- The 'data-group-master' and 'data-group-record' have to contain the same value, which is used to identify the group (corresponding items). If there is more than one group of checkboxes i.e. more than one table with master checkbox and its children - make sure that the group name is different for each group. (The above example only shows one table, with one group)


### Button

We can also add a button, which will be disabled by default and becomes enabled when at least one checkbox is checked. I'm using Zurb Foundation css, hence the classes associated with the button, but you can use any styling and element - including input or button. The important thing here is to give it a 'data-group-buttton' attribute (or your custom defined one) and set is value to the corresponding group - with the above example it would be 'checkboxRemove'.

We also add the class 'checkboxButton', which will be used as a trigger identifier (this class name can be overwritten - see customisations below).


```
<a
    href="#"
    class="tiny alert button disabled checkboxButton"
    data-group-button="checkboxRemove"
    >REMOVE</a>
```

### Plugin initiation

To initiate the plugin use the following method:

```
$(document).ssdThreeStateCheckbox();
```

Make sure that you have the latest version of jQuery and plugin file included:

```
<script src="js/jquery-2.1.1.min.js"></script>
<script src="js/jquery.ssdThreeStateCheckbox.min.js"></script>
<script>
    $(function() {
        $(document).ssdThreeStateCheckbox();
    });
</script>
```

### Button click callback

When you click the button after making your selection, plugin will collect the ids matching selected checkboxes and will pass them as an array to the callback method `clickCallback()` together with the instance of the button. You can specify what you wish to do with that data by overwriting this method. In the following example I've added `data-url` to our Remove button with the url to which I wish the selected ids to be posted using `$.getJSON` call.

```
<a
    href="#"
    class="tiny alert button disabled checkboxButton"
    data-group-button="checkboxRemove"
    data-url="remove.php"
    >REMOVE</a>
```

```
<script>
$(document).ssdThreeStateCheckbox({

    clickCallback : function(ids, trigger) {

        $.getJSON(trigger.data('url'), { collection : ids }, function(data) {

            // do something with your returned data

        });

    }

});
```


### Custom class and data-* attributes

If you've used different than default data-* or class attributes you can pass them to the plugin using the following arguments:

```
$(document).ssdThreeStateCheckbox({

    classButton         : 'myCustomButtonClass',
    classMaster         : 'myCustomMasterClass',
    classRecord         : 'myCustomRecordClass',

    dataGroupButton     : 'group-custom-button',
    dataGroupMaster     : 'group-custom-master',
    dataGroupRecord     : 'group-custom-record',
    dataGroupRecordId   : 'row'

});
```

The above would result in our master input to be called as:

```
<input
    type="checkbox"
    class="myCustomMasterClass"
    data-group-custom-master="checkboxRemove"
    >
```

The child input as:

```
<input
    type="checkbox"
    class="myCustomRecordClass"
    data-group-custom-record="checkboxRemove"
    data-row="1"
    >
```

And the button as:

```
<a
    href="#"
    class="tiny alert button disabled myCustomButtonClass"
    data-group-custom-button="checkboxRemove"
    >REMOVE</a>
```