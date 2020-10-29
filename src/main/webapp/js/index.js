window.onload = function() {

    //#region 渲染主页

    $.get('http://192.168.137.103:8080/Servlet/MainPageServlet', {
        requestType: 'get',
        getType: "init",
    }, function(res) {
        console.log(res);
        for (var i = 0; i < res.length; i++) {
            //记住每个分类的 scrollid 
            mainScrollid[i] = res[i].scrollId;

            // var quizlist;
            if (res.additionContent === "学习篇" || i == 0) {
                // quizlist = ".studyParty";
                inmaincontent(res, ".studyPartY", i);

            } else if (res.additionContent === "期末篇" || i == 1) {
                // quizlist = ".endOfTermPartY";
                inmaincontent(res, ".endOfTermPartY", i);
            } else if (res.additionContent === "宿舍篇" || i == 2) {
                // quizlist = ".dormitoryPartY";
                inmaincontent(res, ".dormitoryPartY", i);
            } else if (res.additionContent === "食堂篇" || i == 3) {
                // quizlist = ".canteenPartY";
                inmaincontent(res, ".canteenPartY", i);
            } else if (res.additionContent === "考证篇" || i == 4) {
                // quizlist = ".textualResearchPartY";
                inmaincontent(res, ".textualResearchPartY", i);
            } else {
                // quizlist = ".otherY";
                inmaincontent(res, '.otherY', i);
            }
        }

    }, 'json')

    // console.log(mainScrollid);

    //#endregion

    //#region 清空搜索框内的内容

    $(".search .searchBar").val("");

    //#endregion

}

var mainScrollid = new Array();
// console.log(mainScrollid);

//初始化 主要内容
var inmaincontent = function(res, quizlist, i) {

    //遍历 添加 div.queY 初始化 主要内容
    for (var j = 0; j < res[i].dataList.length; j++) {

        var data = res[i].dataList[j];

        //创建添加 div.queY > h3
        var contenturl = 'html/questionPage.html?id=' + data.id;
        var div = $("<div class='queY' target='_blank' data-list-index='" + j + "'><h3><a href='" + contenturl + "'>" + res[i].dataList[j].title + "</a></h3></div>");
        $(quizlist).find("h2").after(div);

        //创建添加 h3>span
        for (var tagi = 0; tagi < data.tag.length; tagi++) {
            var span = $("<span>#" + data.tag[tagi] + "</span>");
            $(quizlist).find(".queY").eq(0).find("h3").append(span);
        }

        //创建添加 div.queY > div.queImgY
        $(quizlist).find(".queY").eq(0).append($("<div class='queImgY'></div>"));

        //c创建 添加 .queImgY > p
        // console.log(data.contents[0].contentMain);
        var queImgYP = $("<p>" + data.contents[0].contentMain + "</p>");
        $(quizlist).find(".queY").eq(0).find(".queImgY").append(queImgYP);

        //创建添加 .queImgY > img
        for (var imgi = 1; imgi < data.contents.length; imgi++) {
            var src = 'http://192.168.137.103:8080/' + data.contents[imgi].contentMain.substring(2);
            var img = $("<img src='" + src + "'>");
            $(quizlist).find(".queY").eq(0).find(".queImgY").prepend(img);
        }

        $(quizlist).find(".queY").eq(0).append($('<div class="queControlY"><span><i class="iconfont icondianzan"></i>点赞</span><span><i class="iconfont iconchakan "></i>查看回答</span><span><i class="iconfont iconshoucang "></i>收藏</span><span><i class="iconfont copyurl"></i>复制链接</span></div>'));

        $(quizlist).find(".queY").eq(0).append($(' <span class="active_line"></span>'));


    }

    //#region 主要内容 的高度

    var height = $('.indexQuizList').outerHeight(true) + 40;
    // console.log(height);
    $('.maincontent').css('height', height);

    //#endregion
}

//加载更多
var inmaincontent2 = function(res, quizlist) {

    //遍历 添加 div.queY 初始化 主要内容
    for (var j = 0; j < res.dataList.length; j++) {

        var data = res.dataList[j];

        //创建添加 div.queY > h3
        var contenturl = 'html/questionPage.html?id=' + data.id;
        var div = $("<div class='queY'><h3><a target='_blank' href='" + contenturl + "'>" + res.dataList[j].title + "</a></h3></div>");
        $(quizlist).find("h4").before(div);

        //创建添加 h3>span
        for (var tagi = 0; tagi < data.tag.length; tagi++) {
            var span = $("<span>#" + data.tag[tagi] + "</span>");
            $(quizlist).find(".queY").eq($(".queY").length - 1).find("h3").append(span);
        }

        //创建添加 div.queY > div.queImgY
        $(quizlist).find(".queY").eq($(".queY").length - 1).append($("<div class='queImgY'></div>"));

        //c创建 添加 .queImgY > p
        // console.log(data.contents[0].contentMain);
        var queImgYP = $("<p>" + data.contents[0].contentMain + "</p>");
        $(quizlist).find(".queY").eq($(".queY").length - 1).find(".queImgY").append(queImgYP);

        //创建添加 .queImgY > img
        for (var imgi = 1; imgi < data.contents.length; imgi++) {
            var src = 'http://192.168.137.103:8080/' + data.contents[imgi].contentMain.substring(2);
            var img = $("<img src='" + src + "'>");
            $(quizlist).find(".queY").eq($(".queY").length - 1).find(".queImgY").prepend(img);
        }

        $(quizlist).find(".queY").eq($(".queY").length - 1).append($('<div class="queControlY"><span><i class="iconfont icondianzan"></i>点赞</span><span><i class="iconfont iconchakan "></i>查看回答</span><span><i class="iconfont iconshoucang "></i>收藏</span><span><i class="iconfont copyurl"></i>复制链接</span></div>'));

        $(quizlist).find(".queY").eq($(".queY").length - 1).append($(' <span class="active_line"></span>'));


    }

    //#region 主要内容 的高度

    var height = $('.indexQuizList').outerHeight(true) + 40;
    // console.log(height);
    $('.maincontent').css('height', height);

    //#endregion
}

$(function() {


    //#region 校区互通+失物招领+提问 功能

    //#region 3d效果
    var rotateDivs = document.querySelectorAll('.rotate-div');
    for (var i = 0; i < rotateDivs.length; i++) {
        rotateDivs[i].parentNode.addEventListener("mouseenter", function(e) {

            e.stopPropagation();
            this.addEventListener("mousemove", function(e) {
                // console.log("move");
                e.stopPropagation();
                var distance = e.pageX - this.offsetLeft;
                var center = this.offsetWidth / 2;

                if (distance < center) {
                    $(this).children("div").css({
                        transform: "rotateY(-30deg)"
                    })
                } else {
                    $(this).children("div").css({
                        transform: "rotateY(30deg)"
                    })
                }
            })

        })
        rotateDivs[i].parentNode.addEventListener("mouseleave", function(e) {

            e.stopPropagation();
            $(this).children("div").css({
                transform: "rotateY(0)"
            })
        })

    }
    //#endregion

    //#region 点击交流 页面滑动到
    $('.quiz-div').on({
        click: function() {
            $("body, html").stop().animate({
                scrollTop: "600px",
            });
        }
    })

    //#endregion

    //#endregion

    //#region 卷去页面 导航栏发生变化 + 问题分类左边固定的框固定 + 返回顶部

    $(window).scroll(function() {

        // console.log($(document).scrollTop());

        //#region 左边导航栏.quizLeftSidar 和 右边 .attentionAndCollection

        // ownheight ：左边栏 滑到 跟右边内容一底部一样高时  的scrollTop 值 
        var ownheight = $(".indexQuizList").offset().top + $(".indexQuizList").outerHeight(true) - 120 - $(".quizLeftSidar").outerHeight(true);

        if ($(document).scrollTop() >= 594 && $(document).scrollTop() < ownheight) {

            // top:页面被卷去的距离- 父级到document顶部的距离 + 120
            var topvalue = $(document).scrollTop() - $(".maincontent").offset().top + 130;

            $(".quizLeftSidar").css({
                top: topvalue,
            });
        } else if ($(document).scrollTop() >= ownheight) {

            $(".quizLeftSidar").css({
                top: topvalue,
            })

        } else {
            $(".quizLeftSidar").css({
                top: "60px"
            })
        }

        //#endregion

        //#region   // 返回顶部

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
    })


    //#endregion

    //#region 主要内容   

    //#region 点击 左侧边栏 跳转到页内相应分类 part

    $('.quizLeftSidar li').eq(0).find(".iconfont").css("color", "#02a7f0");
    $('.quizLeftSidar li').eq(0).find("span").css("color", "#02a7f0");
    $('.quizLeftSidar li').eq(0).css("boxShadow", "0 0 17px 8px rgba(43, 51, 59, 0.08)");
    $('.quizLeftSidar li').on({
        click: function() {
            var listIndex = $(this).attr('data-index');
            // console.log($('.indexQuizList h2').eq(listIndex).offset().top - 120);
            $("body, html").stop().animate({
                scrollTop: $('.indexQuizList h2').eq(listIndex).offset().top - 120,
            }, 500);
            $(this).siblings().find(".iconfont").css("color", "#777");
            $(this).find(".iconfont").css("color", "#02a7f0");
            $(this).siblings().find("span").css("color", "#777");
            $(this).find("span").css("color", "#02a7f0");
            $(this).css("boxShadow", "0 0 17px 8px rgba(43, 51, 59, 0.08)");
            $(this).siblings().css("boxShadow", 'none');

        }
    })

    //#endregion

    //#region 点赞
    $(".queControlY").find(".icondianzan").on({
        click: function() {
            // $.ajax({
            //     url: 'http://192.168.137.103:8080/Servlet/AgreeServlet',
            //     requestType: 'post',
            //     agreeType: "question",
            //     markNumber: "",
            //     dataType: 'json',
            //     processData: false, //用FormData传fd时需有这两项
            //     contentType: false,
            //     success: function(data) {
            //         imgObj.attr("remoteURL", data.message);
            //         sendingImg = false;
            //     },
            //     error: function() {
            //         imgObj.remove();
            //         sendingImg = false;
            //         alert("上传失败！已自动删除原图片！");
            //     },
            //     timeout: function() {
            //         imgObj.remove();
            //         sendingImg = false;
            //         alert("上传超时！已自动删除原图片！");
            //     }

            // })


            // $(this).css("color", "#f37335");
            // $(this).parent("color", "#f37335");
        }
    })

    //#endregion

    //#region 复制链接

    $(".queY .copyurlY").on({
            click: function(e) {
                var text = $(this).parents(".queY").find("a").attr("href");
                window.clipboardData.setData("Text", text);
                // $(this).parents(".queY").find("a").attr("href").select()
                // document.execCommand("copy");
                // // e.copyCnblogsCode($(this).parents(".queY").find("a").prop("href"));
                // console.log($(this).parents(".queY").find("a").attr("href"));
            }
        })
        //#endregion

    //#region 加载更多

    $(".maincontent h4").on({
        click: function() {

            var i = $(this).parent().attr("data-part-index");
            // console.log(i);

            $.get('http://192.168.137.103:8080/Servlet/ScrollSearchServlet', {
                scrollId: mainScrollid[i],
                requestType: "get",
                pojoType: "question",
            }, function(res) {
                // console.log(res);

                if (res.questionType === "学习篇") {
                    // quizlist = ".studyParty";
                    inmaincontent2(res, ".studyPartY");

                } else if (res.questionType === "期末篇") {
                    // quizlist = ".endOfTermPartY";
                    inmaincontent2(res, ".endOfTermPartY");
                } else if (res.questionType === "宿舍篇") {
                    // quizlist = ".dormitoryPartY";
                    inmaincontent2(res, ".dormitoryPartY");
                } else if (res.questionType === "食堂篇") {
                    // quizlist = ".canteenPartY";
                    inmaincontent2(res, ".canteenPartY");
                } else if (res.questionType === "考证篇") {
                    // quizlist = ".textualResearchPartY";
                    inmaincontent2(res, ".textualResearchPartY");
                } else {
                    // quizlist = ".otherY";
                    inmaincontent2(res, '.otherY');
                }
                mainScrollid[i] = res.scrollId;


            })
        }
    })

    //#endregion



    //#endregion

    //#region 学校新闻

    //#region 点击换一批 新闻页面 换一批


    $(".changeTheBatchNews").on({

        click: function() {

            var indexCur = parseInt($(this).siblings("ul").find(".displayNewsDiv").attr("data-part"));
            console.log(indexCur);
            console.log(indexCur <= $(this).siblings("ul").find(".NewsDiv").length);
            if (indexCur < $(this).siblings("ul").find(".NewsDiv").length - 1) {
                indexCur++;

                $(this).siblings("ul").find(".NewsDiv").eq(indexCur).addClass("displayNewsDiv");
                $(this).siblings("ul").find(".NewsDiv").eq(indexCur).siblings().removeClass("displayNewsDiv");
            } else {

                indexCur = 0;
                $(this).siblings("ul").find(".NewsDiv").eq(0).addClass("displayNewsDiv");
                $(this).siblings("ul").find(".NewsDiv").eq(0).siblings().removeClass("displayNewsDiv");
            }
        }
    })

    //#endregion

    //#region 添加title
    var Anews = document.querySelector(".schoolNews").querySelectorAll("a");
    var sourceNews = document.querySelector(".schoolNews").querySelectorAll("i");
    for (var i = 0; i < Anews.length; i++) {
        Anews[i].title = Anews[i].innerText;
    }
    for (var i = 0; i < sourceNews.length; i++) {
        sourceNews[i].title = sourceNews[i].innerText;
    }

    //#endregion

    //#endregion

})