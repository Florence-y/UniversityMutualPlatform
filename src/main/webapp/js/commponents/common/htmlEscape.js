function htmlEscape(text){
  return text.replace(/[<>"&]/g,function(match,pos,originalString){
      switch(match){
          case '<':
              return '&lt;';
          case '>':
              return '&gt;';
          case '\"':
              return '&quot;';
          case '&':
              return '&amp;';
      }   
  })
}