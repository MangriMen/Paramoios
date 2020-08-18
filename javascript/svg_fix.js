"use strict"

function htmlToElement(html) {
  var template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

var HttpClient = function () {
  this.get = function (aUrl, aCallback) {
    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function () {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
        aCallback(anHttpRequest.response);
    }
    anHttpRequest.open("GET", aUrl, true);
    anHttpRequest.send(null);
  }
}

var client = new HttpClient();

let svgArr = Array.from(document.getElementsByClassName('img-svg'));

for (let svgItem in svgArr) {
  let img = svgArr[svgItem];
  let imgId = img.id;
  let imgClass = img.className;
  let imgURL = img.src;
  console.log(img);

  client.get(imgURL, function(data) {
    let svg = htmlToElement(data);
    img.parentElement.replaceChild(svg, img);
    if (typeof imgClass !== 'undefined') {
      svg.classList = imgClass + ' replaced-svg';
    }
  })
}