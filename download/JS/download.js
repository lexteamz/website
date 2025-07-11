var ToHome = document.getElementById('ToHome');
var uwpver = document.getElementById('uwpver');
var version_supported = "";
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
    // Try multiple CORS proxies to fetch from Roblox API
    const proxyUrls = [
        "https://api.allorigins.win/raw?url=",
        "https://api.codetabs.com/v1/proxy?quest=",
        "https://corsproxy.io/?" 
    ];
    
    const targetUrl = "https://clientsettings.roblox.com/v2/client-version/WindowsPlayer/channel/LIVE";
    
    // Try each proxy in sequence until one works
    tryNextProxy(0);
    
    function tryNextProxy(index) {
        if (index >= proxyUrls.length) {
            console.log("All proxies failed, using local version");
            useLocalVersion();
            return;
        }
        
        const proxyUrl = proxyUrls[index] + encodeURIComponent(targetUrl);
        
        fetch(proxyUrl)
            .then((res) => res.json())
            .then((data) => {
                const text = data.clientVersionUpload;
                version_supported = text;
                uwpver.innerHTML = text;
            })
            .catch((e) => {
                console.error(`Proxy ${index} failed:`, e);
                // Try next proxy
                tryNextProxy(index + 1);
            });
    }
    
    function useLocalVersion() {
        fetch("../version")
            .then((res) => res.text())
            .then((text) => {
                version_supported = text;
                uwpver.innerHTML = text;
            })
            .catch((fallbackErr) => console.error("Local version fallback also failed:", fallbackErr));
    }
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
