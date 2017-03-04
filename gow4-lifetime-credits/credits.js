var credits = function lifetimeCredits() {

    let xhttp = new XMLHttpRequest();
    let parser = new DOMParser();
    let statsUrl = "https://gearsofwar.com/en-us/stats/gears-of-war-4/xbox-one/service-records/players/";
    let gamertag = JSON.parse(document.getElementById('initialState').textContent).user.gamertag;

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let gow4Stats = JSON.parse(parser.parseFromString(this.responseText, "text/html").getElementById('initialState').textContent);
            let lifetimeCredits = 10 * gow4Stats.achievements.Achievements.filter(a => a.Id === "90").pop().Progress;
            displayLifetimeCredits(lifetimeCredits);
       }
    };

    xhttp.open("GET", statsUrl + encodeURIComponent(gamertag.toLowerCase()), true);
    xhttp.send();

    function displayLifetimeCredits(credits) {
        if(document.getElementById('lifetime-credits') == null) {
            let wallet = document.querySelector('.navWallet p');
            let creditsNode = document.createElement('span');
            creditsNode.className = "creditCounter";
            creditsNode.id = "lifetime-credits";
            creditsNode.textContent = credits.toLocaleString() + " ";
            wallet.insertBefore(creditsNode, wallet.childNodes[0]);    
        }
    };

}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.message === "clicked_browser_action") {
            credits();
        }
    }
 );