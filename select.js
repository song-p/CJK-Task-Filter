$(function () {
    var declared_components = [];
    var declared_components_types = [];

    var filter_non_declared = function() {
        $( "#task_list > tbody > tr > td:nth-child(2) > a" ).each(function(index) {
            var task_item = $(this).text().trim().split(':');
            var task_component = task_item[0].trim();
            if ($.inArray(task_component, declared_components) == -1) {
                $("#non_declared_list").append($(this).text().trim() + '\n');
            }
        });
    };

    var parse_declared_list = function() {
        var components = $("#declared_list").val().split('\n');
        for ( var i = 0; i < components.length; i = i + 1 ) {
            if (components[i].trim() == '' || components[i].indexOf(':') === -1) continue;
            var component_entry = components[i].split(':');
            declared_components.push(component_entry[0].trim());
            declared_components_types.push(component_entry[1].split(";")[0].trim());
        }
        $("#declared_list").val('');
        for ( var i = 0; i < declared_components.length; i = i + 1 ) {
            $("#declared_list").val($("#declared_list").val() + declared_components[i] + ' : ' + declared_components_types[i] + '\n');
        }
    };

    var onclick_filter = function() {
        parse_declared_list();
        filter_non_declared();
    };

    $("<textarea id='non_declared_list' rows='8'></textarea>").prependTo('body');
    $("<strong style='color:red'>IMPORTANT: You must check the result manually!!!</strong>").prependTo('body');
    $("<button id='filter_button'>Click to filter non-declared components</button>").prependTo('body');
    $("#filter_button").click(onclick_filter);
    $("<textarea id='declared_list' rows='8'></textarea>").prependTo('body');
    $("<label for='declared_list'>Paste declared components here</label>").prependTo('body');
});