var svg; // reference to SVG
var pt; // reference to a point, saves realloc

// Generic touch handling stuff
function touchHandler(event) {
  var touches = event.changedTouches,
       first = touches[0], type = "";
  switch(event.type) {
    case "touchstart": type="mousedown"; break;
    case "touchmove":  type="mousemove"; break;        
    case "touchend":   type="mouseup"; break;
    default: return;
  }
  var simulatedEvent = document.createEvent("MouseEvent");
  simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                            first.screenX, first.screenY, 
                            first.clientX, first.clientY, false, 
                            false, false, false, 0, null);
  first.target.dispatchEvent(simulatedEvent);
  event.preventDefault();
}
document.addEventListener("touchstart", touchHandler, true);
document.addEventListener("touchmove", touchHandler, true);
document.addEventListener("touchend", touchHandler, true);
document.addEventListener("touchcancel", touchHandler, true);

// General functions to handle movement of any guage
var dragging, clicking;
function setDragging(e, d) {
  dragging = d;
  dragging.getElementsByClassName("needle")[0].style.fill = "#ff0000";
  newMousePos(e);
}
function setClick(c) {
  clicking = c;
  clicking.style.fill = "#ff0000";
}
function newMousePos(e) {
  if (dragging) {
    e.preventDefault();
    pt.x = e.clientX; pt.y = e.clientY;
    var p = pt.matrixTransform(dragging.getScreenCTM().inverse());
    var ang = Math.atan2(p.x,-p.y)*180/Math.PI;
//    console.log(p.x, p.y, ang);
    dragging.getElementsByClassName("needle")[0].setAttribute("transform","rotate("+ang+")");        
    // ... now we need to work out the value based on minimum/maximum angles
  }
}
document.addEventListener("mouseup", function(e) {
  if (dragging) {
    var needle = dragging.getElementsByClassName("needle")[0];
    needle.style.fill = needle.oldcol;
    dragging = undefined;
  }  
  if (clicking) {
    clicking.style.fill = clicking.oldcol;
    clicking = undefined;
  } 
});
document.addEventListener("mousemove", function(e) {
  newMousePos(e);
});

// Now find and bind stuff to all SVG items
function applyToSVG() {
  // general stuff we need
  svg = document.getElementsByTagName("svg")[0];
  pt = svg.createSVGPoint();
  // guages
  Array.prototype.filter.call(svg.getElementsByClassName("guage"), function (guage) {
    var bg = guage.getElementsByClassName("bg")[0];
    var needle = guage.getElementsByClassName("needle")[0];
    bg.oldcol = bg.style.fill;
    needle.oldcol = needle.style.fill;
    bg.onmousedown = needle.onmousedown = function(e) { setDragging(e, this.parentNode); };
  });
  // buttons
  Array.prototype.filter.call(svg.getElementsByClassName("btn"), function (btn) {
    btn.oldcol = btn.style.fill;
    btn.onmousedown = function(e) { e.preventDefault(); setClick(this); };
  });
}
