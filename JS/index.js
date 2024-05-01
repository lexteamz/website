var ToHome = document.getElementById('ToHome');
var ToDownl = document.getElementById('ToDownl');
var ToAbout = document.getElementById('ToAbout');
var Keydown = document.getElementById('keydown');
var ToFeat = document.getElementById('ToFeat');
var GoToLuau = document.getElementById('Luau');
var GoToGitHub = document.getElementById('GoGitHub');
var GoToFluxus = document.getElementById('Fluxus');
var DownloadLInj = document.getElementById('downloadLInj');
var GoToGitHub1 = document.getElementsByName('goToGitHub');
var GoToDisc = document.getElementById('ToDisc');
var AccountName = "";

function GoToImage(event) {
    event.preventDefault();
    var target = document.querySelector('#features1');
    target.scrollIntoView({ behavior: 'smooth' });
}

function GoToHome(event) {
    event.preventDefault();
    var target = document.querySelector('#home');
    target.scrollIntoView({ behavior: 'smooth' });
}

function GoToDownload(event) {
    event.preventDefault();
    var target = document.querySelector('#download');
    target.scrollIntoView({ behavior: 'smooth' });
}

function GoToFeatures(event) {
    event.preventDefault();
    var target = document.querySelector('#features');
    target.scrollIntoView({ behavior: 'smooth' });
}

function GoToUrl(url) {
    window.location.assign(url);
}

function addCustomFeature(titlez, descriptionz) {
    var template = document.getElementById('template');
    const clone = template.cloneNode(true);
    clone.style.display = 'flex';

    clone.querySelector('#temptitle').innerHTML = titlez;
    clone.querySelector('#tempdesc').innerHTML = descriptionz;

    const container = document.querySelector('.thisisthepartwhereistarttoputrandomnameslol');
    container.appendChild(clone);
}

function obtenerSeccionVisible() {
    const desplazamientoActual = window.scrollY;
    const secciones = document.querySelectorAll('.getfullscreen');

    for (const seccion of secciones) {
        const offsetSuperior = seccion.offsetTop;
        const offsetInferior = offsetSuperior + seccion.offsetHeight;

        if (desplazamientoActual >= offsetSuperior && desplazamientoActual < offsetInferior) {
            return seccion.id;
        }
    }

    return null;
}

function downloadURI(uri, name) {
    var URI = document.createElement("a");
    URI.download = name;
    URI.href = uri;
    URI.click();
}

function ClearFocused() {
    ToHome.classList.remove('current');
    ToFeat.classList.remove('current');
    ToDownl.classList.remove('current');
}

function onScroll() {
    const idSeccionVisible = obtenerSeccionVisible();
    switch (idSeccionVisible) {
        case 'home':
            ClearFocused();
            ToHome.classList.add('current');
            break;
        case 'image':
            break;
        case 'features':
            ClearFocused();
            ToFeat.classList.add('current');
            break;
        case 'features1':
            ClearFocused();
            ToFeat.classList.add('current');
            break;
        case 'download':
            ClearFocused();
            ToDownl.classList.add('current');
            break;
        case 'about':
            ClearFocused();
            ToAbout.classList.add('current');
            break;
        default:
            ClearFocused();
    }

    const elementos = document.querySelectorAll('.hidden');

    elementos.forEach(elemento => {
        const rect = elemento.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom >= 0) {
            elemento.classList.add('shown');
        } else {
            elemento.classList.remove('shown');
        }
    });
}

function GetAccountName() {
    return fetch("accountname")
        .then((res) => {
            if (!res.ok) {
                throw new Error('Could not fetch');
            }
            return res.text();
        })
        .then((response) => {
            AccountName = response;

            // Asignar las URLs de los enlaces con el nombre de cuenta obtenido
            GoToGitHub1.forEach(link => {
                link.href = `https://github.com/${AccountName}/LInjector`;
                link.onclick = function () { GoToUrl(`https://github.com/${AccountName}/LInjector`); }
            });
            GoToGitHub.href = `https://github.com/${AccountName}/LInjector`;
            DownloadLInj.href = `https://github.com/${AccountName}/LInjector/releases/latest/download/LInjector.zip`;
            DownloadLInj.onclick = function () {
                return alert("PATCHED");
                downloadURI(`https://github.com/${AccountName}/LInjector/releases/latest/download/LInjector.zip`);
            }

            // Llamar a la función para construir la característica de código abierto
            buildOpenSourceFeature();
        })
        .catch((error) => {
            console.error('Could not fetch:', error);
            throw error;
        });
}

async function buildOpenSourceFeature() {
    try {
        const openSourceFeature = `LInjector is a notable open-source software project, actively maintained and made publicly available on GitHub. You can find the complete source code and contribute to its development at the repository<br><span id='GoToGitHub' onclick='GoToUrl("https://github.com/${AccountName}/LInjector");' style='color: white; cursor: pointer;' class='hov-und-anm goToGitHub' name='goToGitHub'>${AccountName}/LInjector</span>.`;

        addCustomFeature("Open-Source Software Project", openSourceFeature);
    } catch (error) {
        console.error("Error:", error);
    }
}

GetAccountName();

GoToDisc.onclick = function () { GoToUrl("https://discord.gg/NQY28YSVAb"); }
GoToGitHub.onclick = function () { GoToUrl(`https://github.com/${AccountName}/LInjector`); }
GoToFluxus.onclick = function () { GoToUrl("https://fluxteam.net"); }
GoToLuau.onclick = function () { GoToUrl("https://luau-lang.org/"); }
ToHome.onclick = GoToHome;
ToDownl.onclick = GoToDownload;
Keydown.onclick = GoToImage;
ToFeat.onclick = GoToFeatures;

addCustomFeature("Focused on achieving maximum compatibility", "LInjector is meticulously engineered to uphold the highest level of compatibility with a diverse range of scripts and programming environments, prioritizing seamless integration and smooth operation.");
addCustomFeature("Tailored Functions for Real Environment", "LInjector incorporates specialized functions that enable users to interact with their authentic computer environment. These include features like rconsole, setclipboard, and more.");
addCustomFeature("Simplified User Interface", "LInjector boasts a sophisticated graphical interface that is characterized by its minimalistic design, ensuring ease of use and comprehension for users.");
addCustomFeature("Malware-Free Assurance", "LInjector guarantees a malware-free experience, implementing stringent security measures to ensure the software remains untainted by malicious elements. Users can confidently operate within a secure computing environment, free from concerns about malware.");
addCustomFeature("Acknowledgements", `LInjector is diligently maintained by Excel and Depso, who consistently strive to elevate the overall user experience.<br><br>— Made with love by Excel and Depso. <3`);
window.addEventListener('scroll', onScroll);
