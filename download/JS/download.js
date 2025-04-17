var ToHome = document.getElementById('ToHome');
var uwpver = document.getElementById('uwpver');
var supported_version = "";
ToHome.onclick = GoToHome;

function GoToHome(event) {
    window.location.replace("../")
}

function downloadURI(uri, name) {
    var URI = document.createElement("a");
    URI.download = name;
    URI.href = uri;
    URI.click();
}

function ReadVersionContent() {
    fetch("../version")
        .then((res) => res.text())
        .then((text) => {
            version_supported = text;
            uwpver.innerHTML = text;
        })
        .catch((e) => console.error(e));
}

window.onload = function () {
    function redirectToUrl(url) {
		location.href = (url);
	}

    ReadVersionContent();

    setTimeout(() => {
        redirectToUrl("https://go.lexploits.top/update");
    }, 5000);
};
