(function F4C() {
    /**
     * Prevents code from causing errors and also allows for 
     * try .. catch blocks to work no matter what happens.
     */
    "use strict";


    /**
     * Sets the time of the #clock id in the breadcrumb tab
     * and also will constantly update.
     */
    function SETTIME(id) {
        setInterval(() => {
            var today = new Date(),
            hour = today.getHours(),
            minute = today.getMinutes(),
            second = today.getSeconds(),
            PM_OR_AM = (hour < 12) ? "AM" : "PM",
            hour = (hour == 0) ? 12 : hour,
            hour = (hour > 12) ? hour - 12 : hour,
            hour = CHECK(hour),
            minute = CHECK(minute),
            second = CHECK(second);

            $(id).html(`${hour}:${minute}:${second} ${PM_OR_AM}`);
        });

        function CHECK(item_to_check) {
            if (item_to_check < 10)
                item_to_check = "0" + item_to_check;

            return item_to_check;
        }
    }

    /**
     * Sets the date of the #date id in the breadcrumb tab
     * and will also constantly update like SETTIME
     */
    function SETDATE(id) {
        setInterval(() => {
            var today = new Date(),
                date = today.getDate(),
                month = today.getMonth(),
                year = today.getFullYear();

            $(id).html(`${date}/${month}/${year}`);
        })
    }

    /**
     * Searches within the F4C list with matching text within the
     * search bar.
     */
    function F4CSEARCH(id, to_search_id) {
        $(id).on("keyup", function () {
            let search = $(id).val().replace(/ /g, "").toLowerCase();
            $.each($(to_search_id), function () {
                let result = $(this).first().text().trim().replace(/ /g, "").split(" ")[0].toLowerCase();

                if (!result.includes(search))
                    $(this).hide();
                else
                    $(this).show();
            })

            localStorage.setItem("search_quota", $(id).val());
        })
    }

    /**
     * Handles the models that are inside this website
     */
    function MODELHANDLER() {
        // Shows the things that should show
        // by default to reduce space use
        function DEF_SHOW() {
            $(".overlay").show();
            $(".overlay .model").animate({
                opacity: "1"
            }, .5);
        }

        // DLC Chip info
        $(".chip").on("click", function () {
            DEF_SHOW();
            $(".overlay #dlc-info").show();
        })

        // Credits info
        $("#creds").on("click", function () {
            DEF_SHOW();
            $(".overlay #creds-info").show();
        })

        // Command generator
        $("#gen").on("click", function () {
            DEF_SHOW();
            $(".overlay #command-gen").show();
        })

        $("#help").on("click", function () {
            DEF_SHOW();
            $(".overlay #help-info").show();
        })

        // Command textbox Height handler
        $("#gen-write").on("keyup", function () {
            if ($(this).val().length > 100) {
                if ($(this).prop("scrollHeight") <= 300)
                    $(this).height($(this).prop("scrollHeight")+"px");
            }
            
            if ($(this).val().length == 0)
                $(this).height("inherit");

            localStorage.setItem("generator_quota", $(this).val())
        })
        
        // Shift+Enter / Enter Handler for Command textbox
        $("#gen-write").keypress(function (e) {
            if(e.which === 13 && !e.shiftKey) {
                e.preventDefault();
                $("#gen-submit").trigger("click");
            }
        });

        // Close Model
        $(window).click(function (env) {
            if (env.target.id == "overlays") {
                $(".overlay").hide();
                $(".overlay .model").hide();
            }
        })
    }

    /**
     * Handles the back-to-top button that appears on the lower
     * right of the website.
     */
    function BACKTOTOP(id) {
        $(window).on("scroll", function () {
            if (this.scrollY > 1080) {
                $(id).css("right", "5px");
                $(id).css("opacity", "1");
            } else {
                $(id).css("right", "-60px");
                $(id).css("opacity", "0");
            }
        })

        // clicked
        $(id).on("click", function () {
            $("html, body").animate({
                scrollTop: "0px"
            }, 800)
        })
    }

    /**
     * Saves data from the checkbox/Input/Textarea and loads it
     * Based off what you did previously to it.
     */
    function SAVEHANDLER() {
        $(".filters-wrap").on("click", function () {
            localStorage.setItem("filter_quota", JSON.stringify({
                dlc: $("#filter__dlc").is(":checked"),
                ammo: $("#filter__ammo").is(":checked"),
                material: $("#filter__material").is(":checked"),
                armor: $("#filter__armor").is(":checked"),
                clothing: $("#filter__clothing").is(":checked"),
                weapon: $("#filter__weapon").is(":checked") ,
                modification: $("#filter__mod").is(":checked"),
                bobblehead: $("#filter__bobble").is(":checked"),
                consumable: $("#filter__consumable").is(":checked"),
                note_and_holo: $("#filter__note_holo").is(":checked"),
                key: $("#filter__key").is(":checked"),
                miscellaneous: $("#filter__misc").is(":checked"),
                junk: $("#filter__junk").is(":checked"),
                chars_and_vars: $("#filter__char_var").is(":checked"),
                weather: $("#filter__weather").is(":checked"),
                perks: $("#filter__perks").is(":checked"),
                factions: $("#filter__factions").is(":checked"),
            }))
        })

        if (localStorage.getItem("search_quota") != "")
            $("#search").attr("placeholder", `Last search: ${localStorage.getItem("search_quota")}`)

        if (localStorage.getItem("generator_quote") != "")
            $("#gen-write").val(localStorage.getItem("generator_quota"))

        $("#filter__dlc").prop("checked", JSON.parse(localStorage.getItem("filter_quota")).dlc)
        $("#filter__ammo").prop("checked", JSON.parse(localStorage.getItem("filter_quota")).ammo)
        $("#filter__material").prop("checked", JSON.parse(localStorage.getItem("filter_quota")).material)
        $("#filter__armor").prop("checked", JSON.parse(localStorage.getItem("filter_quota")).armor)
        $("#filter__clothing").prop("checked", JSON.parse(localStorage.getItem("filter_quota")).clothing)
        $("#filter__weapon").prop("checked", JSON.parse(localStorage.getItem("filter_quota")).weapon)
        $("#filter__mod").prop("checked", JSON.parse(localStorage.getItem("filter_quota")).modification)
        $("#filter__bobble").prop("checked", JSON.parse(localStorage.getItem("filter_quota")).bobblehead)
        $("#filter__consumable").prop("checked", JSON.parse(localStorage.getItem("filter_quota")).consumable)
        $("#filter__note_holo").prop("checked", JSON.parse(localStorage.getItem("filter_quota")).note_and_holo)
        $("#filter__key").prop("checked", JSON.parse(localStorage.getItem("filter_quota")).key)
        $("#filter__misc").prop("checked", JSON.parse(localStorage.getItem("filter_quota")).miscellaneous)
        $("#filter__junk").prop("checked", JSON.parse(localStorage.getItem("filter_quota")).junk)
        $("#filter__char_var").prop("checked", JSON.parse(localStorage.getItem("filter_quota")).chars_and_vars)
        $("#filter__weather").prop("checked", JSON.parse(localStorage.getItem("filter_quota")).weather)
        $("#filter__perks").prop("checked", JSON.parse(localStorage.getItem("filter_quota")).perks)
        $("#filter__factions").prop("checked", JSON.parse(localStorage.getItem("filter_quota")).factions)
    }

    /**
     * Perpose: Grab from list.json all the data and check each item at hand for
     * filter perposes; This allows the filters to work.
     */
    function F4CTABLELIST(path) {
        var custom_result = "",
            result = [];

        // In the event the user wants a custom string
        // using the Command generator we must handle it.
        $("#gen-submit").on("click", function () {
            custom_result = $("#gen-write").val()
            $(".overlay").hide()
            $(".overlay .model").hide()
            $('.filters-wrap').trigger("click")
        })

        // Handles appending things and such
        // it is where everything works
        function F4CAPPEND(result, custom_result, json) {
            result = [];
            result = result.concat(
                $("#filter__ammo").is(":checked") ? result.concat(json.ammunition) : undefined,
                $("#filter__material").is(":checked") ? result.concat(json.material) : undefined,
                $("#filter__armor").is(":checked") ? result.concat(json.armor) : undefined,
                $("#filter__clothing").is(":checked") ? result.concat(json.clothing) : undefined,
                $("#filter__weapon").is(":checked") ? result.concat(json.weapon) : undefined,
                $("#filter__mod").is(":checked") ? result.concat(json.modification) : undefined,
                $("#filter__bobble").is(":checked") ? result.concat(json.bobblehead) : undefined,
                $("#filter__consumable").is(":checked") ? result.concat(json.consumable) : undefined,
                $("#filter__note_holo").is(":checked") ? result.concat(json.note_and_holo) : undefined,
                $("#filter__key").is(":checked") ? result.concat(json.key) : undefined,
                $("#filter__misc").is(":checked") ? result.concat(json.miscellaneous) : undefined,
                $("#filter__junk").is(":checked") ? result.concat(json.junk) : undefined,
                $("#filter__char_var").is(":checked") ? result.concat(json.chars_and_vars) : undefined,
                $("#filter__weather").is(":checked") ? result.concat(json.weather) : undefined,
                $("#filter__perks").is(":checked") ? result.concat(json.perks) : undefined,
                $("#filter__factions").is(":checked") ? result.concat(json.factions) : undefined
            );
            
            // Shows when there is no results but must be removed
            // to prevent duplication in the event there is results.
            $(".response .no-items").remove();

            // Append header before doing anything since the result table
            // is dynamic and resets after any changes.
            custom_result == "" ? 
                $("#list-response").html(`
                    <tr class="header">
                        <th>Name</th>
                        <th>Code/ID</th>
                    </tr>
                `) 
            : 
                $("#list-response").html(`
                    <tr class="header">
                        <th>Custom string</th>
                    </tr>
                `)
            ;

            // Append the actual list and change based off user settings
            // and make it viewable for them.
            $.each(result, function (key, val) {
                if (val == undefined)
                    return;

                // Filter DLCs
                if (!$("#filter__dlc").is(":checked") && val.is_dlc)
                    return;

                custom_result == "" ?
                    $("#list-response").append(`
                        <tr>
                            <td>
                                ${val.name}
                            </td>
                            <td>
                                ${val.code}
                            </td>
                        </tr>
                    `)
                :
                    $("#list-response").append(`
                        <tr>
                            <td>
                                ${custom_result.replace("%item_name", val.name).replace("%item_id", val.code)}
                            </td>
                            <td style="display: none; width: 0; position: absolute;">
                                ${val.name}|${val.code}
                            </td>
                        </tr>
                    `)
                ;
            })

            // When there is nothing in the list we append this so the user
            // knows that there is nothing left.
            if ($("#list-response:not(.header) td").length == 0) {
                $(".response").append(`
                    <div class="no-items">
                        No items can be shown if all filters are off, if its not the filters then it is our website.
                    </div>
                `)
            }

            $("#list-response:not(.header) td").on("click", function () {
                var clicked = $(this).first().text().trim().replace(/ /g, "").split(" ")[0].toLowerCase();
                var temp = $("<input>");
                $("body").append(temp);
                temp.val(clicked).select();
                document.execCommand("copy");
                temp.remove();
            })

            // Append total in list to Filter title
            $("#items-total").html($("#list-response:not(.header) td").length);

            // Prevents the models from not working
            MODELHANDLER();
        }

        $.getJSON(path, function (json) {
            // Every time this runs we check values and reset
            // so that each time its been clicked it matches.
            $(".filters-wrap").on("click", function () { F4CAPPEND(result, custom_result, json); })
            

            // Initalize it before-hand
            F4CAPPEND(result, custom_result, json);
        })
    }

    // finally run everything
    $(document).ready(function () {
        SETTIME("#time");
        SETDATE("#date");
        BACKTOTOP("#to-top");
        MODELHANDLER();
        try { SAVEHANDLER(); } catch (e) {}
        F4CSEARCH("#search", "#list-response tr:not(tr:nth-child(1))");
        F4CTABLELIST("./list.json");
    })
})()