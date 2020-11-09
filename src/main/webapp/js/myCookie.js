 // json数据，保存时间
 function setCookie(json, day) {
     // var date = new Date(new Date().getTime() + day * 24 * 60 * 60 * 1000).toUTCString(); //转毫秒
     for (var key in json) {
         document.cookie = key + "=" + json[key] ;
     }
 }

 function getCookie(attr) {
     return document.cookie.match(new RegExp('(^|\\s)' + attr + '=([^;]+)(;|$)'));
 }

 function removeCookie(attr) {
     var json = {};
     json[attr] = "";
     setCookie(json, -1);
 }