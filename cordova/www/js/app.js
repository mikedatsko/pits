var watchID;
var x = 0;
var y = 0;
var z = 0;
var count = 0;
var positions = [];
var map;
var splash;
var markers = [];
var isLogs = false;
// const mapbox = require('mapbox-gl/dist/mapbox-gl');

if (localStorage.getItem('count')) {
  count = +localStorage.getItem('count');
}

if (localStorage.getItem('positions')) {
  positions = JSON.parse(localStorage.getItem('positions'));
}

// la: 49.9300314,
// lo: 36.4414191

// for (let i = 0; i < 10000; i++) {
//   let rand1 = (Math.floor(Math.random() * (999 - 100)) + 100).toString();
//   let rand2 = (Math.floor(Math.random() * (999 - 100)) + 100).toString();

//   positions.push({
//     la: parseFloat(49.9300 + rand1),
//     lo: parseFloat(36.4414 + rand2)
//   });
// }

function onSuccess(acc) {
  var isChanged = false;
  var delta = 1;
  if (x > (acc.x + delta) || x < (acc.x - delta)) {
    isChanged = true;
    x = acc.x;
  }

  if (y > (acc.y + delta) || y < (acc.y - delta)) {
    isChanged = true;
    y = acc.y;
  }

  if (z > (acc.z + delta) || z < (acc.z - delta)) {
    isChanged = true;
    z = acc.z;
  }

  if (isChanged) {
    
    navigator.geolocation.getCurrentPosition(function(position) {
      // log('device accelerometer', position);
      // debug('device accelerometer');

      count ++;
      positions.push({
        la: position.coords.latitude,
        lo: position.coords.longitude
      });

      localStorage.setItem('positions', JSON.stringify(positions));

      var signal = document.getElementById('signal');
      signal.className = 'alert';
      setTimeout(function() {
        signal.className = '';
        // getPositions();
      }, 500);

    }, function(error) {
      debug('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    });
  }
}

function onError() {
  debug('onError!');
}

function debug(msg) {
  var dbg = document.getElementById('debug');
  var msgContainer = document.createElement('div');
  msgContainer.innerHTML = msg;

  dbg.appendChild(msgContainer);
}

function isInBounds(position){
  return map.getBounds().contains(position);
}

function getPositions(btn) {
  log(cordova.file.applicationDirectory);

  markers = [];
  // btn.className += ' checked';

  for (let i = 0; i < positions.length; i++) {
    let position = positions[i];

    // heatmapData.push(new google.maps.LatLng(position.la, position.lo));
    var pos = new google.maps.LatLng(position.la, position.lo);
    // log(pos, isInBounds(pos), position, map.getBounds());
    
    // if (!isInBounds(pos)) { continue }

    var marker = new google.maps.Marker({
      position: pos,
      icon: 'http://share.datsko.it/images/icon.png',
      map: map
    });

    markers.push(marker);
  }

  var markerCluster = new MarkerClusterer(map, markers, {
    imagePath: 'http://share.datsko.it/images/icon-'
  });

  

  // if (btn && btn.className.search('checked') > -1) {
  //   btn.className = btn.className.replace(/checked/g, '');

  //   markers.forEach(function(marker) {
  //     marker.setMap(null);
  //   });
  // } else {
  //   markers = [];
  //   btn.className += ' checked';

  //   for (let i = 0; i < positions.length; i++) {
  //     let position = positions[i];

  //     // heatmapData.push(new google.maps.LatLng(position.la, position.lo));
  //     var pos = new google.maps.LatLng(position.la, position.lo);
  //     log(pos, isInBounds(pos), position, map.getBounds());
      
  //     if (!isInBounds(pos)) { continue }

  //     var marker = new google.maps.Marker({
  //       position: pos,
  //       icon: cordova.file.applicationDirectory + 'images/icon.png',
  //       map: map
  //     });

  //     markers.push(marker);
  //   }

  //   var markerCluster = new MarkerClusterer(map, markers, {
  //     imagePath: cordova.file.applicationDirectory + 'images/icon-'
  //   });
  // }

  // var pos = document.getElementById('positions');

  if (!pos) {
    pos = document.createElement('div');
    pos.id = 'positions';
    document.getElementById('content').appendChild(pos);
  }
  
  pos.innerHTML = cordova.file.applicationDirectory;

  // heatmap
  // var heatmapData = [];

  

  // var heatmap = new google.maps.visualization.HeatmapLayer({
  //   data: heatmapData
  // });
  // heatmap.setMap(map);
}

// function getMap() {

//   var mapEl = document.createElement('map');
//   mapEl.id = 'map';
//   document.getElementById('content').appendChild(mapEl);

//   navigator.geolocation.getCurrentPosition(function(position) {
//     // log(position);
//     debug('init getMap', positions.length)

//     var myLatLng = {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude
//     };

//     var currentPos = new google.maps.LatLng(
//       position.coords.latitude,
//       position.coords.longitude
//     );

//     map = new google.maps.Map(mapEl, {
//       zoom: 16,
//       center: currentPos
//     });

//     // marker
//     var marker = new google.maps.Marker({
//       position: myLatLng,
//       map: map,
//       title: 'Marker #' + (1)
//     });

//     // heatmap
//     var heatmapData = [];

//     positions.forEach(function(position, i) {
//       heatmapData.push(new google.maps.LatLng(position.la, position.lo));
//     });

//     var heatmap = new google.maps.visualization.HeatmapLayer({
//       data: heatmapData
//     });
//     heatmap.setMap(map);
//   }, function(error) {
//     debug('code: '    + error.code    + '\n' +
//           'message: ' + error.message + '\n');
//   });
// }

function initMap() {
  log('init map');
}

function startMap() {
  log('start map');
  var mapEl = document.createElement('map');
  mapEl.id = 'map';
  document.getElementById('content').appendChild(mapEl);

  splash.innerHTML = '<span class="loading">Loading...</span>';
  setTimeout(loadMap, 1000);

  function loadMap() {
    
    navigator.geolocation.getCurrentPosition(function(position) {
      // log(position);
      log('init getMap', positions.length)

      // var myLatLng = {
      //   lat: position.coords.latitude,
      //   lng: position.coords.longitude
      // };

      var currentPos = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );

      map = new google.maps.Map(mapEl, {
        zoom: 16,
        center: currentPos
      });

      google.maps.event.addListenerOnce(map, 'idle', function() {
        splash.style.display = 'none';
      });

      getPositions();

      // // marker
      // var marker = new google.maps.Marker({
      //   position: myLatLng,
      //   map: map,
      //   title: 'Marker #' + (1)
      // });

      // // heatmap
      // var heatmapData = [];

      // positions.forEach(function(position, i) {
      //   heatmapData.push(new google.maps.LatLng(position.la, position.lo));
      // });

      // var heatmap = new google.maps.visualization.HeatmapLayer({
      //   data: heatmapData
      // });
      // heatmap.setMap(map);
    }, function(error) {
      debug('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    });
  }
}

function saveToFile() {
  window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {

    debug('file system open: ' + fs.name);
    createFile(fs.root, "newTempFile.txt", false);

  }, function() {

  });
}

function createFile(dirEntry, fileName, isAppend) {
  // Creates a new file or returns the file if it already exists.
  dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {

    writeFile(fileEntry, null, isAppend);

  }, onErrorCreateFile);

}

function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            readFile(fileEntry);
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['some file data'], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);
    });
}

function readFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {
            console.log("Successful file read: " + this.result);
            displayFileData(fileEntry.fullPath + ": " + this.result);
        };

        reader.readAsText(file);

    }, onErrorReadFile);
}

function clearContent() {
  document.getElementById('content').innerHTML = '';
}

function clearPositions() {
  localStorage.clear();
}



window.onload = function() {
  log('loaded');
  splash = document.getElementById('splash');
  document.addEventListener('deviceready', onDeviceReady, false);
};

function onDeviceReady() {
  log('device ready');
  // alert('hello');
  navigator.accelerometer.getCurrentAcceleration(function(acc) {
    log('device accelerometer', acc);
    x = acc.x;
    y = acc.y;
    z = acc.z;

  }, onError);

  var options = { frequency: 100 };  // Update every 50 miliseconds
  var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);

  startMap();
}

function log() {
  if (!isLogs) { return }

  console.info.apply(null, arguments);
}
