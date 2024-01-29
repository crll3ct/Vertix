window.addEventListener("storage", function (event) {
    if (event.key === "UVEnabled") {
        let newValue = JSON.parse(event.newValue) || false;
        UVEnabled = newValue;
    }
});

function performSearch(query) {
    let urlInput = document.getElementById("urlInput");
    urlInput.value = query;
    document.getElementById("searchButton").click();
}

let UVEnabled = JSON.parse(localStorage.getItem("UVEnabled")) || false;

document
    .getElementById("urlInput")
    .addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("searchButton").click();
        }
    });

document.getElementById("mainWindow").src = "home.html";

document.getElementById("searchButton").onclick = function (event) {
    event.preventDefault();

    let url = document.getElementById("urlInput").value;

    let iframeWindow = document.getElementById("mainWindow");

    let preferredSearchEngine = localStorage.getItem("preferredSearchEngine");
    let searchUrl = preferredSearchEngine || "https://www.bing.com/search?q=";

    if (!url.includes(".")) {
        url = searchUrl + encodeURIComponent(url);
    } else {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url;
        }
    }

    if (UVEnabled) {
        iframeWindow.src = __uv$config.prefix + __uv$config.encodeUrl(url);
    } else {
        iframeWindow.src =
            __dynamic$config.prefix + "route?url=" + encodeURIComponent(url);
    }
};

document.getElementById("reloadButton").onclick = function (event) {
    document.getElementById("mainWindow").contentWindow.location.reload(true);
};

console.log(
    "Yea, I dont know if something I did broke so horribly that you needed to open the dev console to fix it. If that is the case, you should probably tell me about it"
);
