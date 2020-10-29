function template(id, data) {
    var reg = /{{(\w+)}}/;
    id = "#" + id;
    var str = document.querySelector(id).innerHTML;
    var result = reg.exec(str);
    while (result != null) {
        //替换
        str = str.replace(result[0], data[result[1]]);
        result = reg.exec(str);
    }
    return str;
}