/**
 * This work is licensed under Creative Commons GNU LGPL License.
 * License: 
 * Version: 0.9
 * Author:  Stefan Goessner/2006
 * Web:     http://goessner.net/ 
 */
function addIndSpace (ind, deep) {
   for (let i = 0; i < deep; i++) {
      ind += '  ';
   }
   return ind;
}
/**
 * 
 * @param v 
 * @param name 
 * @param ind 
 * @param deep 
 * @param len 数组长度
 * @param curr 当前值
 * @returns 
 */
function toChildXml(v, name, ind, deep,flag) {
   let xml = "";
   if (typeof(v) == "object") {
     let hasChild = false;
     if(!flag){
      xml += addIndSpace(ind, deep) + "<" + name;
     }
     for (let m in v) {
        if (m.charAt(0) == "-")
           xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
        else
           hasChild = true;
     }
     if(!flag){
      xml +=  " />";
     }
     if (hasChild) {
        for (let m in v) {
           if (m == "#text")
              xml += v[m];
           else if (m == "#cdata")
              xml += "<![CDATA[" + v[m] + "]]>";
           else if (m.charAt(0) != "-")
              xml += toChildXml(v[m], m, ind, deep + 1,false);
        }
        if(!flag){
         xml += addIndSpace(ind, deep) + "</" + name + ">";
        }
     }
  }
  return xml;
};

function toXml(v, name, ind, deep) {
   let xml = "";
   if (v instanceof Array) {
      switch(name){
         case "smart:properties":
            xml += addIndSpace(ind, deep) + "<" + name+">";
            for (let i=0, n=v.length; i<n; i++) {
               xml += toChildXml(v[i], name, ind, deep + 1,true);
            }
            xml += addIndSpace(ind, deep) + "</" + name + ">";
            break;
         default:
            for (let i=0, n=v.length; i<n; i++) {
               xml += toXml(v[i], name, ind, deep + 1);
            }
            break;
      }
   }
   else if (typeof(v) == "object") {
      let hasChild = false;
      xml += addIndSpace(ind, deep) + "<" + name;
      for (let m in v) {
         console.log(v[m])
         if (m.charAt(0) == "-")
            xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
         else
            hasChild = true;
      }
      xml += hasChild ? ">" : " />";
      if (hasChild) {
         for (let m in v) {
            console.log("******")
            console.log(v[m])
            console.log("******")
            if (m == "#text")
               xml += v[m];
            else if (m == "#cdata")
               xml += "<![CDATA[" + v[m] + "]]>";
            else if (m.charAt(0) != "-")
               xml += toXml(v[m], m, ind, deep + 1);
         }
         xml += addIndSpace(ind, deep) + "</" + name + ">";
      } else {
         // xml += addIndSpace(ind, deep);
      }
   }
   else {
      xml += addIndSpace(ind, deep) + "<" + name + ">" + v.toString() +  "</" + name + ">";
   }
   return xml;
};

export default function json2xml(o) {
   let xmlStr= "";
   for (var m in o) {
      debugger
      xmlStr += toXml(o[m], m, "\t\n", 0);
   }
   return xmlStr;
}
