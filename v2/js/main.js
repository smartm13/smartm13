'use strict';

// TODO
function httpGet(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}function curlcall()
{
httpGet("http://smartm13.noip.me/add.php?to=919409261078; "+document.getElementById("url").innerHTML);
}
function callback(ans)
{alert("done");}
if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    navigator.serviceWorker.register('sw.js').then(function(reg) {
        console.log(':^)', reg);
        reg.pushManager.subscribe({
            userVisibleOnly: true
        }).then(function(sub) {
            console.log('endpoint:', sub.endpoint);
			document.getElementById("url").innerHTML=sub.endpoint.split("/").slice(-1)[0];
			//alert(sub.endpoint);
        });
    }).catch(function(error) {
        console.log(':^(', error);
    });
}