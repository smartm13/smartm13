'use strict';

// TODO
function httpGet(theUrl, callback)
{//alert(theUrl);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
function curlcall()
{
httpGet("/add.php?to=919409261078; "+document.getElementById("curl").innerText,function (ans){console.log(ans);});
}
function msg()
{
var title=document.getElementById("title").value
var body=document.getElementById("body").value
httpGet("/add.php?to=919409261078; "+"echo \\{\\\"message\\\":\\\""+body+"\\\",\\\"title\\\":\\\""+title+"\\\"\\} \>/home/shares/public/web/msg.txt;cat /home/shares/public/web/msg.txt",function (ans){console.log(ans);});
}
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