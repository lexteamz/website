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

function ReadAccountContent() {
    return fetch("../accountname")
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.text();
        })
        .catch((e) => console.error(e));
}

function constructDownloadUrl(accountName) {
    return `https://github.com/${accountName}/LInjector/releases/latest/download/LInjector.zip`;
}

window.onload = function () {
    let githubUsername;  // Define tu variable githubUsername aquí o asigna un valor

    function ReadAccountContent() {
        return fetch("../accountname")
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.text();
            })
            .catch((e) => console.error(e));
    }

    function constructDownloadUrl(accountName) {
        return `https://github.com/${accountName}/LInjector/releases/latest/download/LInjector.zip`;
    }

    ReadAccountContent()
        .then((accountName) => {
            githubUsername = accountName;

            setTimeout(() => {
                const downloadUrl = constructDownloadUrl(githubUsername);
                return alert("PATCHED")
                downloadURI(downloadUrl);
            }, 2000);
        })
        .catch((error) => {
            console.error("Error al leer el contenido de la cuenta:", error);
        });

    ReadVersionContent();
};
