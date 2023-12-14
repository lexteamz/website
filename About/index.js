var ToHome = document.getElementById("ToHome");

function GoToUrl(params) {
    location.replace(`${params}`)
}

ToHome.onclick = function () { GoToUrl("https://lexploits.top"); }