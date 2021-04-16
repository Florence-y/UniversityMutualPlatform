$(function() {
    //#region 获取本页的内容

    //失物id=xEb3e3UB32gOD-0jRg7H  得物id=KEZefHUB32gOD-0jLBpg

    // var id = 'nkaufHUB32gOD-0jLCIE';
    var id = getQueryVariable("id");

    //获取键和获取值
    function getQueryVariable(variable) {
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            if (pair[0] == variable) { return pair[1]; }
        }
        return (false);
    }

    //#region 时间戳转时间

    var totime = function(time) {
        //直接用 new Date(时间戳) 格式转化获得当前时间
        var timestamp = new Date();

        //再利用拼接正则等手段转化为yyyy-MM-dd hh:mm:ss 格式
        // console.log(timestamp.toLocaleDateString().replace(/\//g, "-") + " " + timestamp.toTimeString().substr(0, 8));

        return timestamp.toLocaleDateString().replace(/\//g, "-") + " " + timestamp.toTimeString().substr(0, 8);
    }

    //#endregion

    //#region 渲染拾/失主页面  失主lostAndFound-lost 得主lostAndFound-found

    if (window.location.href.indexOf('lostAndFound-lost') != -1) {

        $.get('../Servlet/LostAndFoundServlet', {
            type: "lost",
            getInfWay: "term",
            requestType: 'get',
            id: id,
        }, function(res) {
            // console.log(res);

            //#region 添加元素

            //#region 物品详情

            $(".YitemName").find("em").eq(1).text(res.lostObjectName);
            $(".YitemCategory").find("em").eq(1).text(res.objectType);
            $(".YitemLocationLost").find("em").eq(1).text(res.lostLocation);
            $(".YitemTimeLost").find("em").eq(1).text(totime(res.lostTime));
            $(".YitemNotes").find("em").eq(1).text(res.lostDescribe);

            //#endregion

            //#region 用户详情

            var identity; //身份：老师/学生
            if (res.student != null) {
                identity = res.student;
                $(".YuserIdentity").find("em").eq(1).text("学生");
                $(".Ymajor").find("em").eq(0).text("专业");
            } else {
                identity = res.teacher;
                $(".YuserIdentity").find("em").eq(1).text("老师");
                $(".Ymajor").find("em").eq(0).text("学院");
            }
            $(".YuserPhotos").attr("src",  identity.face);
            $(".YuserName").find("em").eq(1).text(identity.userName);
            $(".YuserName").find("em").eq(1).attr("title", identity.userName);

            //#endregion

            //#region 图片

            $(".Ymajor").find("em").eq(1).text(identity.major);
            $(".Ymajor").find("em").eq(1).attr("title", identity.major);

            for (var imgi = 0; imgi < res.imgs.length; imgi++) {
                if (res.imgs[imgi] != null) {
                    $(".YitemPictureLost").find("img").eq(imgi).attr("src", res.imgs[imgi])
                }
            }
            //#endregion
            //#endregion
        }, 'json')

    } else if (window.location.href.indexOf('lostAndFound-found') != -1) {

        $.get('../Servlet/LostAndFoundServlet', {
            type: "found",
            getInfWay: "term",
            requestType: 'get',
            id: id,
        }, function(res) {
            // console.log(res);

            //#region 添加元素

            //#region 物品详情

            $(".YitemName").find("em").eq(1).text(res.foundObjectName);
            $(".YitemCategory").find("em").eq(1).text(res.objectType);
            $(".YitemLocationFound").find("em").eq(1).text(res.foundLocation);
            // $(".YitemStatusFound").find("em").eq(1).text(totime(res.foundTime));
            $(".YitemNotes").find("em").eq(1).text(res.foundDescribe);

            //#endregion

            //#region 用户详情

            var identity; //身份：老师/学生
            if (res.student != null) {
                identity = res.student;
                $(".YuserIdentity").find("em").eq(1).text("学生");
                $(".Ymajor").find("em").eq(0).text("专业");
            } else {
                identity = res.teacher;
                $(".YuserIdentity").find("em").eq(1).text("老师");
                $(".Ymajor").find("em").eq(0).text("学院");
            }
            $(".YuserPhotos").attr("src",identity.face);
            $(".YuserName").find("em").eq(1).text(identity.userName);
            $(".YuserName").find("em").eq(1).attr("title", identity.userName);

            //#endregion

            //#region 图片

            $(".Ymajor").find("em").eq(1).text(identity.major);
            $(".Ymajor").find("em").eq(1).attr("title", identity.major);

            for (var imgi = 0; imgi < res.imgs.length; imgi++) {
                if (res.imgs[imgi] != null) {
                    $(".YitemPictureFound .w").append("<img src="+res.imgs[imgi]+">")
                }
            }

            //#endregion

            //#endregion
        }, 'json')

    }
    //#endregion

    //#endregion
})