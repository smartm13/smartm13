/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

// Version 0.1

'use strict';

// TODO
console.log('Started', self);

function showNotification(title, body, icon, data) {
  var notificationOptions = {
    body: body ? body : 'body',
    icon: icon ? icon : 'images/ic.png',
    tag: 'simple-push-demo-notification',
    data: data ? data : 'data'
  };

  self.registration.showNotification(title, notificationOptions);
  return;
}


self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});
self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});
self.addEventListener('push', function(event) {
  console.log('Push message', event);
  /*var title = 'Push message';
  event.waitUntil(
    alert(self.registration.showNotification(title, {
      body: 'The Message 2',
      icon: 'images/ic2.png',
//      tag: 'my-tag'
    })));*/
	
	fetch("msg.txt").then(function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        // Throw an error so the promise is rejected and catch() is executed
        throw new Error();
      }

      // Examine the text in the response
      return response.json().then(function(data) {
	  console.log(data);
        var title = data.title ? data.title : 'title';
        var message = data.message ? data.message : 'message';
		var icon = data.icon ? data.icon : '/images/ic2.png';
        return showNotification(title, message, icon);
      });
    }).catch(function(err) {
      console.error('Unable to retrieve data', err);

      var title = 'An error occured';
      var message = 'We were unable to get the information for this ' +
        'push message';

      return showNotification(title, message);
    })
});
self.addEventListener('notificationclick', function(event) {
    console.log('Notification click: tag ', event.notification.tag);
    event.notification.close();
    var url = 'https://youtu.be/gYMkEMCHtJ4';
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
        .then(function(windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
