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
        $('.filters-wrap').on("click", function () {    
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

            $("#list-response").html(`
                <tr class="header">
                    <th>Name</th>
                    <th>Code/ID</th>
                </tr>
            `)
            $.each(result, function(key, value) {
                if (value == undefined)
                    return
    
                $("#list-response").append(`
                    <tr>
                        <td>
                            ${value.name}
                        </td>
                        <td>
                            ${value.code}
                        </td>
                    </tr>
                `)
            })

            model(); // model support
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
    })

    $("#creds").on("click", function () {
        $(".overlay").show()
        $(".overlay #creds-info").show()
    })

    // close
    $(window).click(function (env) {
        if (env.target.id == "overlays") {
            $(".overlay").hide()
            $(".overlay .model").hide()
        }
    })
}

$(document).ready(function () {
    search();
    json_list();
    startTime();
})