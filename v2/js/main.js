'use strict';

// TODO
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