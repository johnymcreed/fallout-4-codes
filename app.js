// this is a very messy file xd; works though

/**
 * Designed to show the time on the page
 */
function startTime() {
    setInterval(() => {
        var today = new Date();
        var hr = today.getHours();
        var min = today.getMinutes();
        var sec = today.getSeconds();

        ap = (hr < 12) ? "AM" : "PM";
        hr = (hr == 0) ? 12 : hr;
        hr = (hr > 12) ? hr - 12 : hr;
        hr = checkTime(hr);
        min = checkTime(min);
        sec = checkTime(sec);

        $("#clock").html(hr + ":" + min + ":" + sec + " " + ap);
    })

    function checkTime(i) {
        if(i < 10) {
            i="0"+i;
        }
    
        return i;
    }

    const date = new Date();
    $("#date").html(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)
}

/**
 * Gives the entire list of codes with the names to them
 */
function json_list() {
    $.getJSON('./app.json', function(json) {
        let custom_string = "";
        $('.filters-wrap').on("click", function () {   
            var dlc = $("#filter__dlc").is(":checked") 
            var ammo = $("#filter__ammo").is(":checked")
            var material = $("#filter__material").is(":checked")
            var armor = $("#filter__armor").is(":checked")
            var cloth = $("#filter__clothing").is(":checked")
            var weapon = $("#filter__weapon").is(":checked")
            var mod = $("#filter__mod").is(":checked")
            var bobble = $("#filter__bobble").is(":checked")
            var food = $("#filter__consumable").is(":checked")
            var notes_holos = $("#filter__note_holo").is(":checked")
            var key = $("#filter__key").is(":checked")
            var misc = $("#filter__misc").is(":checked")
            var junk = $("#filter__junk").is(":checked")
            var chars_vars = null;
            var weather = null;
            var perks = null;
            var factions = null;

            var result = []; // input
            result = result.concat(
                ammo ? result.concat(json.ammunition) : undefined,
                material ? result.concat(json.material) : undefined,
                armor ? result.concat(json.armor) : undefined,
                cloth ? result.concat(json.clothing) : undefined,
                weapon ? result.concat(json.weapon) : undefined,
                mod ? result.concat(json.modification) : undefined,
                bobble ? result.concat(json.bobblehead) : undefined,
                food ? result.concat(json.consumable) : undefined,
                notes_holos ? result.concat(json.note_and_holo) : undefined,
                key ? result.concat(json.key) : undefined,
                misc ? result.concat(json.miscellaneous) : undefined,
                junk ? result.concat(json.junk) : undefined
            )

            $(".response .no-items").remove();
            custom_string == "" ? $("#list-response").html(`
                <tr class="header">
                    <th>Name</th>
                    <th>Code/ID</th>
                </tr>
            `) : $("#list-response").html(`
                <tr class="header">
                    <th>Custom string</th>
                </tr>
            `)
                
            $.each(result, function(key, value) {
                if (value == undefined)
                    return

                if (!dlc && value.is_dlc)
                    return
    
                custom_string == "" ? $("#list-response").append(`
                    <tr>
                        <td>
                            ${value.name}
                        </td>
                        <td>
                            ${value.code}
                        </td>
                        <td style="display: none; width: 0; position: absolute;">
                            ${value.name}|${value.code}
                        </td>
                    </tr>
                `) : $("#list-response").append(`
                    <tr>
                        <td>
                            ${custom_string.replace("%item_name", value.name).replace("%item_id", value.code)}
                        </td>
                        <td style="display: none; width: 0; position: absolute;">
                            ${value.name}|${value.code}
                        </td>
                    </tr>
                `)
            })

            if ($("#list-response:not(.header) td").length == 0) {
                $(".response").append(`
                    <div class="no-items">
                        No items can be shown if all filters are off, if its not the filters then it is our website.
                    </div>
                `)
            }

            model(); // model support
        })
        
        $("#gen-submit").on("click", function () {
            custom_string = $("#gen-write").val()
            $('.filters-wrap').trigger("click")
            $(".overlay").hide()
            $(".overlay .model").hide()
        })

        // show before hand
        $('.filters-wrap').trigger("click")
    })
}

/**
 * Hides results that dont match the search value
 */
function search() {
    $("#actions_search .search").on("keyup", function () {
        let search = $("#actions_search .search").val().replace(/ /g, '').toLowerCase()
        $.each($("#list-response tr:not(tr:nth-child(1))"), function () {
            let result = $(this)
                            .first() // get first collection
                            .text() // transmit as text
                            .trim() // trim \n
                            .replace(/ /g, '') // remove \n or spaces
                            .split(" ")[0] // split to be readable
                            .toLowerCase() // so its readable at lowercase ONLY
    
            if (!result.includes(search)) { // KEYWORD DID NOT MATCH
                $(this).hide()
            } else { // KEYWORD DID MATCH
                $(this).show()
            }
        })
    })
}

/**
 * Model Handler
 */
function model() {
    $(".chip").on("click", function () {
        $(".overlay").show()
        $(".overlay #dlc-info").show()
        $(".overlay .model").animate({
            opacity: "1"
        }, .5)
    })

    $("#creds").on("click", function () {
        $(".overlay").show()
        $(".overlay #creds-info").show()
        $(".overlay .model").animate({
            opacity: "1"
        }, .5)
    })

    $("#gen").on("click", function () {
        $(".overlay").show()
        $(".overlay #command-gen").show()
        $(".overlay .model").animate({
            opacity: "1"
        }, .5)
    })

    // textbox handler
    $("#gen-write").on("keyup", function () {
        if ($(this).val().length > 100) {
            if ($(this).prop("scrollHeight") <= 300)
                $(this).height($(this).prop("scrollHeight")+"px")
        }
        
        if ($(this).val().length == 0)
            $(this).height("inherit")
    })
    
    // handles when you click Enter NOT Shift+Enter
    $("#gen-write").keypress(function (e) {
        if(e.which === 13 && !e.shiftKey) {
            e.preventDefault();
            $("#gen-submit").trigger("click");
        }
    });

    // close
    $(window).click(function (env) {
        if (env.target.id == "overlays") {
            $(".overlay").hide()
            $(".overlay .model").hide()
        }
    })
}

$(document).ready(function () {
    window.onscroll = function () {
        if (window.scrollY > 1080) {
            $("#to-top").css("right", "5px")
            $("#to-top").css("opacity", "1")
        } else {
            $("#to-top").css("right", "-60px")
            $("#to-top").css("opacity", "0")
        }
    }

    $("#to-top").on("click", function () {
        $('html, body').animate({scrollTop: '0px'}, 800);
    })

    search();
    json_list();
    startTime();
})