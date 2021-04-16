window.onload = function() {

    //#region 渲染主页 √

    $.get('../Servlet/MainPageServlet', {
        requestType: 'get',
        getType: "init",
    }, function(res) {
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            //记住每个分类的 scrollid 
            mainScrollid[i] = res[i].scrollId;
            LoadNextPage[i] = res[i].next;

            // var quizlist;
            if (res.additionContent === "学习篇" || i == 0) {
                inmaincontent(res, ".studyPartY", i);
            } else if (res.additionContent === "期末篇" || i == 1) {
                inmaincontent(res, ".endOfTermPartY", i);
            } else if (res.additionContent === "宿舍篇" || i == 2) {
                inmaincontent(res, ".dormitoryPartY", i);
            } else if (res.additionContent === "食堂篇" || i == 3) {
                inmaincontent(res, ".canteenPartY", i);
            } else if (res.additionContent === "考证篇" || i == 4) {
                inmaincontent(res, ".textualResearchPartY", i);
            } else {
                inmaincontent(res, '.otherY', i);
            }
        }


    }, 'json')

    // console.log(mainScrollid);

    //#endregion

    //#region 清空搜索框内的内容 √

    $(".search .searchBar").val("");

    //#endregion

    //#region 确定.quizLeftSidar位置 √

    // ownheight ：左边栏 滑到 跟右边内容一底部一样高时  的scrollTop 值 
    var ownheight = $(".indexQuizList").offset().top + $(".indexQuizList").outerHeight(true) - 140 - $(".quizLeftSidar").outerHeight(true);
    // console.log($(document).scrollTop());
    // console.log(ownheight);
    if ($(document).scrollTop() >= 594 && $(document).scrollTop() < ownheight) {

        // top:页面被卷去的距离- 父级到document顶部的距离 + 120
        var topvalue = $(document).scrollTop() - $(".maincontent").offset().top + 140;
        // console.log(topvalue);
        $(".quizLeftSidar").css({
            top: topvalue,
        });
    } else if ($(document).scrollTop() >= ownheight) {
        var topvalue2 = ownheight - $(".quizLeftSidar").outerHeight(true);
        // console.log(topvalue2);
        $(".quizLeftSidar").css({
            top: topvalue2,
        })

    } else {
        $(".quizLeftSidar").css({
            top: "74px"
        })
    }

    //#endregion

}

var mainScrollid = new Array(); //存每一篇的scrollId 用来加载下一页
var LoadNextPage = new Array(); //存每一篇的next 用来判断是否有下一页

//初始化 主要内容 √
var inmaincontent = function(res, quizlist, i) {

    var contenturl;
    //遍历 添加 div.queY 初始化 主要内容
    for (var j = 0; j < res[i].dataList.length; j++) {

        var data = res[i].dataList[j];

        //创建添加 div.queY > h3
        contenturl = 'questionPage.html?id=' + data.id;
        var div = $("<div class='queY' data-list-index='" + j + "'><h3><a target='_blank' href='" + contenturl + "'>" + res[i].dataList[j].title + "</a></h3></div>");
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
            if (data.contents[imgi].contentMain != null) {
                var src = data.contents[imgi].contentMain;
                var img = $("<img src='" + src + "'>");
                $(quizlist).find(".queY").eq(0).find(".queImgY").prepend(img);
            }
        }


        var open = "window.open('" + contenturl + "')";
        $(quizlist).find(".queY").eq(0).append($('<div class="queControlY"><span onclick="' + open + '"><i class="iconfont iconchakan"></i>查看回答</span><span><i class="iconfont iconshoucang "></i>收藏</span><span class="copyurlY"><i class="iconfont"></i>复制链接</span></div>'));

        $(quizlist).find(".queY").eq(0).append($('<span class="active_line"></span>'));


    }

    //#region 主要内容 的高度

    var height = $('.indexQuizList').outerHeight(true) + 40;
    // console.log(height);
    $('.maincontent').css('height', height);

    //#endregion


}

$(function() {

    //#region 校区互通+失物招领+学校通知 功能 √

    //#region 3d效果 √
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

    //#region 点击互通 页面滑动到 √
    $('.quiz-div').on({
        click: function() {
            $("body, html").stop().animate({
                scrollTop: "600px",
            });
        }
    })

    //#endregion

    //#region 学校新闻 页面滑动到 √
    $('.campus-div').on({
        click: function() {
            var height = $(".schoolNews").offset().top - 130;
            console.log(height);
            $("body, html").stop().animate({
                scrollTop: height + "px",
            }, 1000);
        }
    })

    //#endregion

    //#endregion

    //#region 卷去页面 .quizLeftSidar固定 + 返回顶部 √

    $(window).scroll(function() {

        // console.log($(document).scrollTop());

        //#region 左边导航栏.quizLeftSidar 和 右边 .attentionAndCollection

        // ownheight ：左边栏 滑到 跟右边内容一底部一样高时  的scrollTop 值 
        var ownheight = $(".indexQuizList").offset().top + $(".indexQuizList").outerHeight(true) - 140 - $(".quizLeftSidar").outerHeight(true);

        if ($(document).scrollTop() >= 594 && $(document).scrollTop() < ownheight) {

            // top:页面被卷去的距离- 父级到document顶部的距离 + 120
            var topvalue = $(document).scrollTop() - $(".maincontent").offset().top + 140;

            $(".quizLeftSidar").css({
                top: topvalue,
            });
        } else if ($(document).scrollTop() >= ownheight) {
            var topvalue2 = ownheight - $(".quizLeftSidar").outerHeight(true);
            $(".quizLeftSidar").css({
                top: topvalue2,
            })

        } else {
            $(".quizLeftSidar").css({
                top: "74px"
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

    //#region 主要内容 √  

    //#region 点击 .quizLeftSidar 跳转相应part √

    $('.quizLeftSidar li').eq(0).find(".iconfont").css("color", "#028e9b");
    $('.quizLeftSidar li').eq(0).find("span").css("color", "#028e9b");
    $('.quizLeftSidar li').eq(0).css("boxShadow", "0 0 4px 2px rgba(43, 51, 59, 0.08)");
    $('.quizLeftSidar li').on({
        click: function() {
            var listIndex = $(this).attr('data-index');
            // console.log($('.indexQuizList h2').eq(listIndex).offset().top - 120);
            $("body, html").stop().animate({
                scrollTop: $('.indexQuizList h2').eq(listIndex).offset().top - 180,
            }, 500);
            $(this).siblings().find(".iconfont").css("color", "#777");
            $(this).find(".iconfont").css("color", "#028e9b");
            $(this).siblings().find("span").css("color", "#777");
            $(this).find("span").css("color", "#028e9b");
            $(this).css("boxShadow", "0 0 4px 2px rgba(43, 51, 59, 0.08)");
            $(this).siblings().css("boxShadow", 'none');

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

    //#region 加载更多 √

    $(".maincontent h4").on({
        click: function() {

            var i = $(this).parent().attr("data-part-index");
            // console.log(i);

            $.get('../Servlet/ScrollSearchServlet', {
                scrollId: mainScrollid[i],
                requestType: "get",
                pojoType: "question",
            }, function(res) {
                // console.log(res);
                if (LoadNextPage[i]) {

                    var quizlist;

                    if (i == 0) {
                        quizlist = ".studyPartY";
                    } else if (i == 1) {
                        quizlist = ".endOfTermPartY";
                    } else if (i == 2) {
                        quizlist = ".dormitoryPartY";
                    } else if (i == 3) {
                        quizlist = ".canteenPartY";
                    } else if (i == 4) {
                        quizlist = ".textualResearchPartY";
                    } else {
                        quizlist = ".otherY";
                    }
                    var contenturl;
                    for (var j = 0; j < res.dataList.length; j++) {

                        contenturl = "questionPage.html?id=" + res.dataList[j].id;
                        var div = $("<div class='queY'><h3><a target='_blank' href='" + contenturl + "'>" + res.dataList[j].title + "</a></h3></div>")
                        $(quizlist).find("h4").before(div);

                        var index = $(quizlist).find(".queY").length - 1;
                        console.log(index);
                        console.log($(quizlist).find(".queY").eq(index));

                        for (var tagi = 0; tagi < res.dataList[j].tag.length; tagi++) {
                            // displayTipPane('tag');
                            var span = $("<span>#" + res.dataList[j].tag[tagi] + "</span>");
                            $(quizlist).find(".queY").eq(index).find("h3").append(span);
                        }

                        $(quizlist).find(".queY").eq(index).append($("<div class='queImgY'></div>"));
                        var queImgYP = $("<p>" + res.dataList[j].contents[0].contentMain + "</p>");

                        $(quizlist).find(".queY").eq(index).find(".queImgY").append(queImgYP);

                        //创建添加 .queImgY > img
                        for (var imgi = 1; imgi < res.dataList[j].contents.length; imgi++) {
                            var src = res.dataList[j].contents[imgi].contentMain;
                            var img = $("<img src='" + src + "'>");
                            $(quizlist).find(".queY").eq(index).find(".queImgY").prepend(img);
                        }
                        var open = "window.open('" + contenturl + "')";
                        // console.log(open);
                        $(quizlist).find(".queY").eq(index).append($('<div class="queControlY"><span onclick="' + open + '"><i class="iconfont iconchakan"></i>查看回答</span><span><i class="iconfont iconshoucang "></i>收藏</span><span class="copyurl"><i class="iconfont"></i>复制链接</span></div>'));

                        $(quizlist).find(".queY").eq(index).append($(' <span class="active_line"></span>'));
                    }

                    //#region 主要内容 的高度

                    var height = $('.indexQuizList').outerHeight(true) + 40;
                    // console.log(height);
                    $('.maincontent').css('height', height);

                    //#endregion

                } else {
                    displayTipPane("没有更多了哦！");
                }

                mainScrollid[i] = res.scrollId;
                LoadNextPage[i] = res.next;
            })
        }
    })

    //#endregion

    //#endregion

    //#region 学校新闻 √

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

    // 点击失物招领图片页面跳转
    $(".lostAndFound-div").on("click", function() {
        location.assign("lost&found_index.html");
    })
})