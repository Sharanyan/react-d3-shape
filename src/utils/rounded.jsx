"use strict";

export default function rounded(x, y, w, h, cornerRadius) {
  console.log(cornerRadius)
  var retval;
  retval  = "M" + (x + cornerRadius.topLeft) + "," + y;
  retval += "h" + (w - cornerRadius.topLeft - cornerRadius.topRight);
  if (cornerRadius.topRight != 0) { retval += "a" + cornerRadius.topRight + "," + cornerRadius.topRight + " 0 0 1 " + cornerRadius.topRight + "," + cornerRadius.topRight; }
  else { retval += "h" + cornerRadius.topRight; retval += "v" + cornerRadius.topRight; }
  retval += "v" + (h - cornerRadius.topRight - cornerRadius.bottomRight);
  if (cornerRadius.bottomRight != 0) { retval += "a" + cornerRadius.bottomRight + "," + cornerRadius.bottomRight + " 0 0 1 " + -cornerRadius.bottomRight + "," + cornerRadius.bottomRight; }
  else { retval += "v" + cornerRadius.bottomRight; retval += "h" + -cornerRadius.bottomRight; }
  retval += "h" + (cornerRadius.bottomLeft + cornerRadius.bottomRight - w);
  if (cornerRadius.bottomLeft != 0) { retval += "a" + cornerRadius.bottomLeft + "," + cornerRadius.bottomLeft + " 0 0 1 " + -cornerRadius.bottomLeft + "," + -cornerRadius.bottomLeft; }
  else { retval += "h" + -cornerRadius.bottomLeft; retval += "v" + -cornerRadius.bottomLeft; }
  retval += "v" + (cornerRadius.topLeft + cornerRadius.bottomLeft - h);
  if (cornerRadius.topLeft != 0) { retval += "a" + cornerRadius.topLeft + "," + cornerRadius.topLeft + " 0 0 1 " + cornerRadius.topLeft + "," + -cornerRadius.topLeft; }
  else { retval += "v" + -cornerRadius.topLeft; retval += "h" + cornerRadius.topLeft; }
  retval += "z";
  return retval;
}
