window.onload = function() {

    //#region 渲染 √


    $.get('../Servlet/MainPageServlet', {
        requestType: 'get',
        getType: "init",
    }, function(res) {
        // console.log(res);
        mainScrollid1 = res.scrollId;
        LoadNextPage1 = res.next;
        for (var i = 0; i < res.dataList.length; i++) {
            var json = {
                queYurl: 'questionPage.html?id=' + res.dataList[i].id,
                queYtitle: res.dataList[i].title,
                queYkind: res.dataList[i].questionType,
                queYremarks: res.dataList[i].contents[0].contentMain,
            }

            var queY = template("campusIntercommunicationQueY_template", json);
            $('.studyPartY').append(queY);
            if (res.dataList[i].tag != null) {
                for (var j = 0; j < res.dataList[i].tag.length; j++) {
                    if (res.dataList[i].tag[j] != null) {
                        $('.queY').eq($('.queY').length - 1).find('h3').append('<span># ' + res.dataList[i].tag[j] + '</span>')
                    }
                    // json["queYtag" + j] = res.dataList[i].tag[j];
                }
            }
            if (res.dataList[i].contents.length != 1) {
                for (var j = 1; j < res.dataList[i].contents.length; j++) {
                    if (res.dataList[i].contents[j].contentMain != null) {
                        var src = res.dataList[i].contents[j].contentMain;
                        $('.queY').eq($('.queY').length - 1).find('.queImgY').prepend('<img src="' + src + '" alt="">');
                    }
                    // json["queYimgsrc" + j] = 'http://192.168.137.105:8080/' + res.dataList[i].contents[j].contentMain.substring(2);
                }
            }
        }
        $('.maincontent').css('height', $('.indexQuizList').outerHeight(true) + 'px');
        // console.log("$('.indexQuizList').outerHeight(true)" + $('.indexQuizList').outerHeight(true));
        // console.log("$('.maincontent').outerHeight(true)" + $('.maincontent').outerHeight(true));

    }, 'json')

    $.get('../Servlet/DynamicCommunicateCircleServlet', {
        requestType: "get",
        type: "all",
        ViewerMarkNumber: $.cookie("markNumber"),
    }, function(res) {
        console.log(res);
        mainScrollid2 = res.scrollId;
        LoadNextPage2 = res.next;
        for (var i = 0; i < res.dataList.length; i++) {
            // var time = res.dataList[i].time.toLocaleDateString().replace(/\//g, "-") + " " + res.dataList[i].time.toTimeString().substr(0, 8)
            var json = {
                divkind: "trendsY-person",
                content: res.dataList[i].title,
                trendsTime: totime(res.dataList[i].time),
            }
            if (res.dataList[i].userType === "student") {
                json["userface"] = res.dataList[i].student.face;
                json["username"] = res.dataList[i].student.userName;
                json["major"] = res.dataList[i].student.major;
                json["grade"] = res.dataList[i].student.level;
            } else {
                json["userface"] = res.dataList[i].teacher.face;
                json["username"] = res.dataList[i].teacher.username;
                json["major"] = res.dataList[i].teacher.major;
                json["grade"] = res.dataList[i].teacher.level;
            }
            var trend = template("schoolDevelopmentTrendsY-template", json);
            $('.dynamicsY').prepend(trend);

            if (res.dataList[i].contents != null) {
                if (res.dataList[i].contents.length == 1 && res.dataList[i].contents[0].contentType === "video") {
                    var video = $('<div class="videoFather"><video src="' + res.dataList[i].contents[0].contentMain + '" loop muted></video><i class="iconfont iconset trendsMuted"></i></div>');
                    $(".trendsY-person").eq(0).find('.trendsContent').append(video);
                } else {
                    for (var j = 0; j < res.dataList[i].contents.length; j++) {
                        if (res.dataList[i].contents[j].contentMain != null) {

                            var img = $('<img src="' + res.dataList[i].contents[j].contentMain + '">')

                            $(".trendsY-person").eq(0).find('.trendsContent').append(img);
                        }
                    }
                }
            }
        }

        //#region 内容中视频的播放暂停

        $('.trendsMuted').on({
            click: function(e) {
                e.stopPropagation();
                $(this).siblings('video').attr('autoplay', 'autoplay');
                $(this).siblings('video')[0].play();
                $(this).hide();

                $(this).siblings('video').on({
                    click: function() {
                        $(this)[0].pause();
                        $(this).siblings('.trendsMuted').show();
                    }
                })
            }
        })

        //#endregion

    })

    //#endregion

    //#region 清空搜索框内的内容 √

    $(".search .searchBar").val("");

    //#endregion


    //#region  清空发表动态文本域的内容+图片+视频

    $('.issuePersonalDY textarea').val("");
    $('.addpicSon').find('.develimgY').remove();
    $('.addpicSon').find('.develvideoY').remove();

    //#endregion
}

var mainScrollid1; //存scrollId 用来加载下一页
var LoadNextPage1; //存next 用来判断是否有下一页
var mainScrollid2; //存scrollId 用来加载下一页
var LoadNextPage2; //存next 用来判断是否有下一页
//校区互通 1 校园动态 2
var PART = 1;

var totime = function(time) {
    //直接用 new Date(时间戳) 格式转化获得当前时间
    var timestamp = new Date(time);

    //再利用拼接正则等手段转化为yyyy-MM-dd hh:mm:ss 格式
    return timestamp.toLocaleDateString().replace(/\//g, "-") + " " + timestamp.toTimeString().substr(0, 8);
}

$(function() {

    $('body').on({
        click: function() {

            //#region 校园动态 点击表情/图片/视频 下拉二级导航

            $('.issWidgetSonY').slideUp(300);
            $('.issueWidgetY li>.iconfont').css('color', '#000');
            $('.issueWidgetY li>em').css('color', '#000');

            //#endregion

            //#region 动态的视频 暂停播放
            for (var vindex = 0; vindex < $('.trendsContent').find('video').length; vindex++) {
                $('.trendsContent').find('video')[vindex].pause();
                $('.trendsContent').find('.trendsMuted').show();
            }


            //#endregion
        }
    })

    //#region 卷去页面  返回顶部 √ + 滚到底部 加载更多(校区互通) √

    $(window).scroll(function() {

        //#region  返回顶部

        if ($(document).scrollTop() >= 478) {
            $(".returnTop").show(200);
            $(".returnTop").on("click", function() {
                $("body, html").stop().animate({
                    scrollTop: 0
                }, 1000);
            })
        } else {
            $(".returnTop").hide(400);

        }

        //#endregion

        //#region   加载更多

        if ($('html, body').scrollTop() + window.innerHeight >= Math.floor($('html').outerHeight(true))) {
            console.log('底部');
            console.log(PART);
            if (PART == 1) {

                if (LoadNextPage1) {
                    displayTipPane("加载问题ing~");
                    $.get('../Servlet/ScrollSearchServlet', {
                        requestType: 'get',
                        scrollId: mainScrollid1,
                        pojoType: 'question'
                    }, function(res) {
                        // console.log(res);
                        mainScrollid1 = res.scrollId;
                        LoadNextPage1 = res.next;
                        for (var i = 0; i < res.dataList.length; i++) {
                            var json = {
                                queYurl: 'questionPage.html?id=' + res.dataList[i].id,
                                queYtitle: res.dataList[i].title,
                                queYkind: res.dataList[i].questionType,
                                queYremarks: res.dataList[i].contents[0].contentMain,
                            }
                            var queY = template("campusIntercommunicationQueY_template", json);
                            $('.studyPartY').append(queY);
                            if (res.dataList[i].tag != null) {
                                for (var j = 0; j < res.dataList[i].tag.length; j++) {
                                    if (res.dataList[i].tag[j] != null) {
                                        $('.queY').eq($('.queY').length - 1).find('h3').append('<span># ' + res.dataList[i].tag[j] + '</span>')
                                    }

                                }
                            }
                            if (res.dataList[i].contents.length != 1) {
                                for (var j = 1; j < res.dataList[i].contents.length; j++) {
                                    if (res.dataList[i].contents[j].contentMain != null) {
                                        var src = res.dataList[i].contents[j].contentMain;
                                        $('.queY').eq($('.queY').length - 1).find('.queImgY').prepend('<img src="' + src + '" alt="">');
                                    }

                                }
                            }
                        }
                        $('.maincontent').css('height', $('.studyPartY').outerHeight(true) + 'px');

                    }, 'json')
                } else {
                    displayTipPane("没有更多问题了哦~");
                }
            } else if (PART == 2) {
                if (LoadNextPage2) {
                    displayTipPane("加载动态ing~");
                    $.get('../Servlet/ScrollSearchServlet', {
                        requestType: 'get',
                        scrollId: mainScrollid2,
                        pojoType: 'question'
                    }, function(res) {
                        console.log(res);
                        mainScrollid2 = res.scrollId;
                        LoadNextPage2 = res.next;
                        for (var i = 0; i < res.dataList.length; i++) {
                            // var time = res.dataList[i].time.toLocaleDateString().replace(/\//g, "-") + " " + res.dataList[i].time.toTimeString().substr(0, 8)
                            var json = {
                                divkind: "trendsY-person",
                                content: res.dataList[i].title,
                                trendsTime: totime(res.dataList[i].time),
                                userface: res.dataList[i].student.face,
                                username: res.dataList[i].student.userName,
                                major: res.dataList[i].student.major,
                                grade: res.dataList[i].student.level,
                            }

                            var trend = template("schoolDevelopmentTrendsY-template", json);
                            $('.dynamicsY').append(trend);

                            if (res.dataList[i].contents != null) {
                                if (res.dataList[i].contents.length == 1 && res.dataList[i].contents[0].contentType === "video") {
                                    var video = $('<div class="videoFather"><video src="' + res.dataList[i].contents[0].contentMain + '" loop muted></video><i class="iconfont iconset trendsMuted"></i></div>');
                                    $(".trendsY-person").eq($(".trendsY-person").length - 1).find('.trendsContent').append(video);
                                } else {
                                    for (var j = 0; j < res.dataList[i].contents.length; j++) {
                                        if (res.dataList[i].contents[j].contentMain != null) {
                                            console.log(1);
                                            var img = $('<img src="' + res.dataList[i].contents[j].contentMain + '">')

                                            $(".trendsY-person").eq($(".trendsY-person").length - 1).find('.trendsContent').append(img);
                                        }
                                    }
                                }
                            }
                        }

                        $('.hb').css('height', $('.allD-div').outerHeight(true) + 'px');
                        $('.maincontent').css('height', $('.schoolDevelopmentY').css('height'));

                        //#region 内容中视频的播放暂停

                        $('.trendsMuted').on({
                            click: function(e) {
                                e.stopPropagation();
                                $(this).siblings('video').attr('autoplay', 'autoplay');
                                $(this).siblings('video')[0].play();
                                $(this).hide();

                                $(this).siblings('video').on({
                                    click: function() {

                                        $(this)[0].pause();
                                        $(this).siblings('.trendsMuted').show();
                                    }
                                })
                            }
                        })

                        //#endregion

                    })
                } else {
                    displayTipPane("没有更多动态了哦~");
                }
            }
        }

        //#endregion
    })

    //#endregion



    //#region 点击切换 校园动态/校区互通

    $('.switchY .change').on({
        click: function() {
            $('.switchY').animate({
                'top': '-50px',
            }, 500)
            $(this).css({
                'backgroundColor': '#028e9b',
                'color': '#fff'
            })
            if (PART == 2) {
                $('.switchY .change').html('<i class = "iconfont iconqiehuan-"></i>校园动态');
                $('.schoolDevelopmentY').slideUp(1000);
                $('.indexQuizList').slideDown(2000);
                $('.change').attr('title', '切换校园动态');

                $('.maincontent').css('height', $('.indexQuizList').outerHeight(true) + 'px');

                PART = 1;
            } else {
                $('.switchY .change').html(' <i class="iconfont iconqiehuan-"></i>校区互通');
                $('.indexQuizList').slideUp(1000);
                $('.schoolDevelopmentY').slideDown(2000);
                $('.change').attr('title', '切换校区互通');

                $('.hb').css('height', $('.allD-div').outerHeight(true) + 'px');
                $('.maincontent').css('height', $('.schoolDevelopmentY').css('height'));

                PART = 2;
            }
            $("body, html").stop().animate({
                scrollTop: 0
            }, 500);
            $('.switchY').animate({
                'top': '-100px',
            }, 500)
            $(this).css({
                'backgroundColor': '#fff',
                'color': '#028e9b'
            })
        }
    })

    //#endregion

    //#region 复制链接 √

    $(".copyurlY").on({
        click: function() {
            // console.log(window.location.href);
            if (window.location.href.indexOf('?') == -1) {
                var url = window.location.href.substring(0, window.location.href.length - 10) + $(this).parents(".queY").find("a").attr("href");
            } else {
                var url = window.location.href;
            }
            console.log(url);
            var input = $("<input  value='" + url + "'>");
            $(this).parent().prepend(input);
            $(this).parent().find("input").select();
            document.execCommand("copy");
            $(this).parent().find('input').remove();

        }
    })

    //#endregion

    //#region 发动态

    //#region 点击表情/图片/视频 下拉二级导航

    $('.issueWidgetY li').on({
        click: function(e) {
            e.stopPropagation();
            $(this).find('.issWidgetSonY').slideDown(300);
            $(this).find('.iconfont').css('color', '#028e9b');
            $(this).find('em').css('color', '#028e9b');
            $(this).siblings('li').find('.issWidgetSonY').slideUp(300);
            $(this).siblings('li').find('.iconfont').css('color', '#000');
            $(this).siblings('li').find('em').css('color', '#000');

            //#region 点击关闭 二级导航上拉

            $(this).find('.sonout').on({
                click: function(e) {
                    e.stopPropagation();
                    $(this).parent('.issWidgetSonY').slideUp(300);
                    $(this).parent('.issWidgetSonY').siblings('.iconfont').css('color', '#000');
                    $(this).parent('.issWidgetSonY').siblings('em').css('color', '#000');
                }
            })

            //#endregion

        }
    })

    //#endregion

    //#region 图片

    var sendingImg = false;

    //#region 插入图片 + 删除图片

    $(".addimgsY").on({
        change: function(e) {
            if (sendingImg) {
                displayTipPane("有图片还在上传中...");
                return;
            }
            var formdata = new FormData();
            var div = $("<div class='develimgY'><b class='removeimg' title='删除'>&times;</b></div>");
            var img = $('<img>');
            $(div).prepend(img);
            var url = window.URL || window.webkitURL || window.mozURL;
            var obj = e.currentTarget.files[0]; //图片资源对象
            console.log(obj);
            // console.log(e.currentTarget);
            formdata.append(0, obj);
            console.log(formdata);
            var imgSrc = url.createObjectURL(obj);
            $(img).attr("src", imgSrc);

            $(this).parents(".addfileY").before(div);
            sendImage1(formdata, $(img)); //发送图片
            if ($(".develimgY").length > 8) {
                $(this).parent().hide();
            }

            //×出现与消失
            $(".develimgY").on({
                mouseover: function() {
                    $(this).find(".removeimg").stop().show(200);
                },
                mouseout: function() {
                    $(this).find(".removeimg").stop().hide(200);
                }
            })

            //删除图片 
            $(".removeimg").on({
                click: function() {

                    if ($(".develimgY").length <= 9) {

                        $('.addpicY').find(".addfileY").show();
                    }
                    $(this).parent().remove();
                }
            })
        }
    })

    //发送图片
    function sendImage1(formdata, imgObj) { //imgObj是jq对象
        sendingImg = true;
        $.ajax({
            url: '../Servlet/ReceiveFileServlet',
            type: 'post',
            data: formdata,
            dataType: 'json',
            processData: false, //用FormData传fd时需有这两项
            contentType: false,
            success: function(data) {
                console.log(data);
                console.log(formdata);
                imgObj.attr("remoteURL", data.message);
                sendingImg = false;
            },
            error: function() {
                imgObj.remove();
                sendingImg = false;
                displayTipPane("上传失败！已自动删除原图片！");
            },
            timeout: function() {
                imgObj.remove();
                sendingImg = false;
                displayTipPane("上传超时！已自动删除原图片！");
            }

        })
    }
    //#endregion

    //#endregion

    //#region 视频

    var sendingVideo = false;
    $(".addvideoY").on({
        change: function(e) {
            if (sendingVideo) {
                displayTipPane("有视频还在上传中...");
                return;
            }
            var formdata = new FormData();
            var div = $("<div class='develvideoY'><b class='removevideo' title='删除'>&times;</b></div>");
            var video = $('<video muted autoplay loop></video>');
            $(div).prepend(video);
            $(this).find(".addfileY").hide();
            var url = window.URL || window.webkitURL || window.mozURL;
            var obj = e.currentTarget.files[0]; //视频资源对象
            console.log(e.currentTarget);
            formdata.append(0, obj);
            var videoSrc = url.createObjectURL(obj);
            $(video).attr("src", videoSrc);
            // console.log(videoSrc);
            // console.log(obj);
            $(this).parents(".addfileY").before(div);
            $(video).css({
                'width': $(this).find('video').css('width') + 'px',
                'margin': '0 auto'
            })

            sendVideo(formdata, $(video)); //发送图片


            //×出现与消失
            $(".develvideoY").on({
                mouseover: function() {
                    $(this).find(".removevideo").stop().show(200);
                },
                mouseout: function() {
                    $(this).find(".removevideo").stop().hide(200);
                }
            })

            //删除图片 
            $(".removevideo").on({
                click: function() {

                    $(this).parents('.addvideo').find(".addfileY").show();

                    $(this).parent().remove();
                }
            })
        }
    })


    function sendVideo(formdata, videoObj) {
        sendingVideo = true;
        $.ajax({
            url: '../Servlet/ReceiveFileServlet',
            type: 'post',
            data: formdata,
            dataType: 'json',
            processData: false, //用FormData传fd时需有这两项
            contentType: false,
            success: function(data) {
                videoObj.attr("remoteURL", data.message);
                sendingVideo = false;
            },
            error: function() {
                videoObj.remove();
                sendingVideo = false;
                displayTipPane("上传失败！已自动删除原视频！");
            },
            timeout: function() {
                videoObj.remove();
                sendingVideo = false;
                displayTipPane("上传超时！已自动删除原视频！");
            }

        })
    }

    //#endregion

    //#region 发送
    function sendDevel() {
        if (sendingImg) {
            displayTipPane("有图片正在上传中！");
            return;
        }
        if (sendingVideo) {
            displayTipPane("有视频正在上传中！");
            return;
        }
        var title = $(".issuePersonalDY textarea").val();

        //判空
        if (title == "" || title == null || title == undefined) {
            displayTipPane("文章内容不能为空!");
            return;
        }

        var contents = [];
        var contents_order = 0;

        function addContentItem1(order, type, content) {
            return {
                "contentOrder": order,
                "contentType": type,
                "contentMain": content
            }
        }

        if ($('.develimgY').length > 0) {
            var imgArr = $(".issuePersonalDY .addpicY .addpicSon .develimgY img");

            for (var i = 0; i < imgArr.length; i++) {

                var url = $(imgArr[i]).attr("remoteurl");
                console.log("url=" + url);
                contents[i] = addContentItem1(++contents_order, "img", url);
            }
        } else if ($('.develvideoY').length > 0) {
            var videoArr = $(".issuePersonalDY .addvideoY .addvideoSon .develvideoY video");
            for (var i = 0; i < videoArr.length; i++) {
                var url = $(videoArr[i]).attr("remoteurl");
                contents[0] = addContentItem1(++contents_order, "video", url);
            }
        }

        //判断敏感词
        $.ajax({
            url: "../Servlet/SensitiveWordServlet",
            data: JSON.stringify({
                "textArr": [
                    title
                ]
            }),
            type: "post",
            success: function(res) {
                if (res.statusCode == 500) {
                    displayTipPane("内容" + res.message + "请修改后再发送！");
                } else {
                    // console.log(res);
                    sendD();
                }
            }
        })

        function sendD() {
            //获取内容
            //发送内容
            if ($.cookie("markNumber") != null) {

                $.ajax({
                    url: "../Servlet/QuestionServlet",
                    type: "post",
                    dataType: "json",
                    data: JSON.stringify({
                        "requestType": "post",
                        "title": title,
                        "questionType": "Dynamic",
                        "authorMarkNumber": $.cookie("markNumber"),
                        "contents": contents,

                    }),
                    success: function(res) {
                        displayTipPane("发布成功！");

                        //清空title,detail

                        $(".issuePersonalDY textarea").val("");

                        //清空图片
                        $(".addpicY .develimgY").remove();
                        $(".addpicY .addfileY").show();
                        $(".addvideoY .develvideoY").remove();
                        $(".addvideoY .addfileY").show();
                        console.log(res);
                    }
                })

            } else {
                displayTipPane('您还没有登录哦~');
            }
        }
    }

    $(".issuePersonalDY .issuebtnY").click(sendDevel);

    //#endregion

    //#endregion

    //#region 点击动态分类的类别 背景+文字√ 板块切换√ +模块获取动态

    $('.dclassifyY li').on({
        click: function() {

            //#region 背景+文字

            $(this).css({
                'backgroundColor': '#f5f6f7',
                'color': '#028e9b',
            });
            $(this).siblings('li').css({
                'backgroundColor': '#028e9b',
                'color': '#fff',
            })

            //#endregion

            //#region 板块切换

            var partindex = $(this).attr('data-part-index');
            $('.dynamicsY').eq(partindex).siblings('.dynamicsY').fadeOut(300);
            $('.dynamicsY').eq(partindex).fadeIn(300);

            //#endregion

        }

    })

    //#endregion

    //#region 内容中视频的播放暂停

 

    //#endregion



})