import EasingVis from './easing-vis';
var domready = require('domready');
var Plunder = require('plunder');

function addTocEntry(tocId, id) {
  var toc = document.getElementById(tocId);
  var li = document.createElement('li');
  li.innerHTML = "- <a href='#" + id + "'>" + id + "</a>"
  toc.appendChild(li);
}

function createContainer(containerId, key) {
  var width = 500;
  var div = document.createElement('div');

  div.style.display = 'inline-block';
  div.style.width = '' + width + 'px';
  div.style.marginLeft = '5px';
  div.style.marginRight = '5px';
  div.id = key;

  var h = document.createElement('h3');
  h.innerHTML = key;

  div.appendChild(h);

  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = 200;

  canvas.id = "canvas-" + key;

  div.appendChild(canvas);

  document.getElementById(containerId).appendChild(div);
  return canvas.id;
}

function addDemoEntry(containerId, easingFn) {
  var canvasId = createContainer(containerId, easingFn);
  new EasingVis(canvasId, easingFn).go();
}


function easingDoc(tocId, demoContainerId) {
  domready(() => {
    for(var key in Plunder.Easie) {
      if (Plunder.Easie.hasOwnProperty(key)) {
        addTocEntry(tocId, key);
        addDemoEntry(demoContainerId, key);
      }
    }
  });
}

export default easingDoc;
