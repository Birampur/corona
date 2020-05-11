
window.addEventListener("DOMContentLoaded", function () {

    // Keep map legend initially collapsed for screen width < 576px
    let legend = document.querySelector(".info.legend .legend-cont");;
    if (window.innerWidth < 576 && legend) {
        toggle_map_legend(0);
    }

    // Show/collapse map legend based on user interaction.
    let legend_toggler = document.getElementById("legend_toggler");
    if (legend_toggler) {
        legend_toggler.addEventListener("click", function () {
            let css_tr = legend_toggler.style.transform;

            // Show or hide/collapse map legend
            if (!css_tr || css_tr === "rotate(90deg)") {
                toggle_map_legend(0);
            } else {
                toggle_map_legend(1);
            }
        });
    }

});



// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

function toggle_map_legend(showLegend) {
    let legend = document.querySelector(".info.legend .legend-cont");
    let toggler_label = document.getElementById("legend_toggler_label");

    if (showLegend) {
        toggler_label.style.maxHeight = 0;
        legend.style.maxHeight = "100vh";
        legend_toggler.style.transform = "rotate(90deg)";
    } else {
        legend.style.maxHeight = 0;
        legend_toggler.style.transform = "rotate(-90deg)";
        setTimeout(function () {
            toggler_label.style.maxHeight = "100vh";
        }, 500);
    }
}



// Convert integer from English to Bengali
function bn_num(num) {
    if (!parseInt(num)) {
        return num === "0" ? "০" : num;
    }

    let p = (num + "").length - 1;
    let bn_num = "";

    while (p >= 0) {
        n = num % 10;
        n = n === 0
            ? "০"
            : n ===1
                ? "১"
                : n ===2
                    ? "২"
                    : n ===3
                        ? "৩"
                        : n ===4
                            ? "৪"
                            : n ===5
                                ? "৫"
                                : n ===6
                                    ? "৬"
                                    : n ===7
                                        ? "৭"
                                        : n ===8
                                            ? "৮"
                                            : n ===9
                                                ? "৯"
                                                : "";
        bn_num = n + bn_num;
        num = Math.floor(num / 10);
        --p;
    }

    return bn_num;
}



function show_map_layer_name(id) {
    let layer_name = document.getElementById(id);
    if (layer_name) {
        layer_name.parentNode.style.display = "block";
    }
}



// Remove current data layer, and add target layer. (Add/remove district labels
// as necessary.)
// Then remove "active" class from all layer names, and add it to clicked name.
function change_map_layer(el) {
    if (el.value === "lock") {
        conf_layer && conf_layer.remove();
        conf_num_group && conf_num_group.remove();
        hosp_layer_icon_group && hosp_layer_icon_group.remove();
        toggle_map_legend(0);
        lock_layer.addTo(map);

        let layers = document.querySelectorAll(".layer-switch-area > .wrap");
        for (let i = 0; i < layers.length; ++i) {
            layers[i].classList.remove("active");
        }
        el.parentNode.classList.add("active");
    } else if (el.value === "hosp") {
        conf_layer && conf_layer.remove();
        conf_num_group && conf_num_group.remove();
        lock_layer && lock_layer.remove();
        toggle_map_legend(0);
        hosp_layer_icon_group.addTo(map);

        let layers = document.querySelectorAll(".layer-switch-area > .wrap");
        for (let i = 0; i < layers.length; ++i) {
            layers[i].classList.remove("active");
        }
        el.parentNode.classList.add("active");
    } else if (el.value === "conf") {
        lock_layer && lock_layer.remove();
        hosp_layer_icon_group && hosp_layer_icon_group.remove();
        toggle_map_legend(1);
        conf_layer.addTo(map);
        conf_num_group.addTo(map);

        let layers = document.querySelectorAll(".layer-switch-area > .wrap");
        for (let i = 0; i < layers.length; ++i) {
            layers[i].classList.remove("active");
        }
        el.parentNode.classList.add("active");
    }
}



// Add a new map layer name to layer list.
function add_map_layer_name({input_id, text, input_value}) {
    let name_cont = document.createElement("div");
    name_cont.classList.add(("map-layer-" + input_value), "wrap");

    let input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "layer");
    input.id = input_id;
    input.setAttribute("value", input_value);
    input.addEventListener("change", function (e) {
        change_map_layer(e.target);
    });

    let label = document.createElement("label");
    label.setAttribute("for", input_id);
    label.innerText = text;

    name_cont.appendChild(input);
    name_cont.appendChild(label);

    let layer_switch = document.querySelector(".layer-switch-area");
    layer_switch.appendChild(name_cont);
}
