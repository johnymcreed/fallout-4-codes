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
    // All codes
    $(".button-list a:nth-child(1)").on("click", function () {
        $(".button-list a:nth-child(1)").addClass("active");
        $(".button-list a:nth-child(2)").removeClass("active")
        $(".button-list a:nth-child(3)").removeClass("active")

        $("#change").html(`
            <input class="search" id="search" type="text" placeholder="Search for an item and code that you need" autocapitalize="off" autocomplete="off">
            <table id="list">
                <tr class="head">
                    <th>Item</th>
                    <th>Code</th>
                </tr>
            </table>    
        `)
        
        $.getJSON('./json/all.json', function(json) {
            $.each(json, function(key, value) {
                $("#list").append(`
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

        $("#search").on("keyup", function () {
            let search = $("#search").val().replace(/ /g, '').toLowerCase()
            $.each($("#list tr:not(tr:nth-child(1))"), function () {
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
    })

    // Resource codes
    $(".button-list a:nth-child(2)").on("click", function () {
        $(".button-list a:nth-child(1)").removeClass("active");
        $(".button-list a:nth-child(2)").addClass("active")
        $(".button-list a:nth-child(3)").removeClass("active")
        
        $("#change").html(`
            <input class="search" id="search" type="text" placeholder="Search for an item and code that you need" autocapitalize="off" autocomplete="off">
            <table id="list">
                <tr class="head">
                    <th>Item</th>
                    <th>Code</th>
                </tr>
            </table>    
        `)
        
        $.getJSON('./json/all.json', function(json) {
            json.length = 31; // yea :(
            $.each(json, function(key, value) {
                $("#list").append(`
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

        $("#search").on("keyup", function () {
            let search = $("#search").val().replace(/ /g, '').toLowerCase()
            $.each($("#list tr:not(tr:nth-child(1))"), function () {
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
    })

    // Command generator
    $(".button-list a:nth-child(3)").on("click", function () {
        $(".button-list a:nth-child(1)").removeClass("active");
        $(".button-list a:nth-child(2)").removeClass("active")
        $(".button-list a:nth-child(3)").addClass("active")

        $("#change").html(`
            <div>
                use 
                <input type="text" id="cmd" placeholder="Command" list="commands"> then
                <input type="text" id="amt" placeholder="Amount"> &ensp;
                <a class="btn" id="submit">Apply</a>
                <!---->
                <datalist id="commands">
                    <option value="player.additem">
                    <option value="player.placeatme">
                </datalist>
            </div>
        `)

        $("#submit").on("click", function () {
            var cmd = $("#cmd")
            var amt = $("#amt")

            if (cmd.val() == "")
                return;

            if (isNaN(amt.val()))
                return;

            $("#change").append(`
                <div style="padding-top: 20px;">
                    <table id="list">
                        <tr class="head">
                            <th>Command</th>
                            <th>item</th>
                        </tr>
                    </table>
                </div>
            `)

            $.getJSON('./json/all.json', function(json) {
                $.each(json, function(key, value) {
                    $("#list").append(`
                        <tr>
                            <td>
                                ${cmd.val()} ${value.code} ${amt.val()}
                            </td>
                            <td style="user-select: none;">
                                ${value.name.replace(" ", "_")}
                            </td>
                        </tr>
                    `)
                })
            })
        })
    })

    // default
    $(".button-list a:nth-child(1)").trigger("click");
}

app();
startTime();