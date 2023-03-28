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
}

/**
 * Gives the entire list of codes with the names to them
 */
function app() {
    $.getJSON('./app.json', function(json) {
        let result = [];
        $('.filters-wrap input[type="checkbox"]').on("click", function () {    
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

            //result = result.concat()

            $("#list-response").html("")
            $.each(result, function(key, value) {
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
        })
    })

    $("#search").on("keyup", function () {
        let search = $("#search").val().replace(/ /g, '').toLowerCase()
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

app();
startTime();