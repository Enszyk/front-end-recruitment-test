/*
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features

  const isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );

  if (
    'serviceWorker' in navigator
    && (window.location.protocol === 'https:' || isLocalhost)
  ) {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function() {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            const installingWorker = registration.installing;

            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                    'service worker became redundant.');

              default:
                  // Ignore
              }
            };
          }
        };
      }).catch(function(e) {
        console.error('Error during service worker registration:', e);
      });
  }

  // Your custom JavaScript goes here

  const baconButton = document.querySelector('#overview button');
  const baconImage = document.querySelector('#overview img');
  const baconImageWrapper = baconImage.parentNode
 
  baconImageWrapper.style.position = "relative"
   
  let counter = 0
 
  baconButton.addEventListener('click', () => {
 
    // If counter was displayed remove it from dom
    if (document.querySelector('.counter'))
      baconImageWrapper.removeChild(document.querySelector('.counter'))
 
    const clonedBaconImage = baconImage.cloneNode(true);
 
    // Calculate distortion
    const distortionRange = baconImage.clientWidth / 3;  
    const sizeChange = randomIntFromRange(50, 105) + "%"
    const xShift = randomIntFromRange(-distortionRange, distortionRange) + "px"
    const yShift = randomIntFromRange(-distortionRange, distortionRange) + "px"
 
 
    clonedBaconImage.style.position = "absolute"
    clonedBaconImage.style.width = sizeChange
    clonedBaconImage.style.height = sizeChange
    clonedBaconImage.style.bottom = yShift
    clonedBaconImage.style.right = xShift
 
    // Create counter and add some styling
    const counterElem = document.createElement('div')
 
    counter += 1;
    counterElem.innerHTML = counter
    counterElem.style.fontSize = "7rem"
    counterElem.style.zIndex= "99999"
    counterElem.className="counter"
    counterElem.style.position="absolute"
    counterElem.style.color="black"
    counterElem.style.top= baconImage.clientWidth/3 + 'px'
    counterElem.style.left= baconImage.clientWidth/2 + 'px'
 
    baconImageWrapper.appendChild(clonedBaconImage);
    baconImageWrapper.appendChild(counterElem);
  });
 
  const randomIntFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
})();
