$(function() {

    //#region 搜索框 得失焦点
    $(".nav").find(".searchBar").on({
            focus: function() {
                $(this).css("boxShadow", "0 0 20px 0 rgba(43,51,59,0.08)");
                $(this).siblings(".searchBtn").css("boxShadow", "0 0 20px 0 rgba(43,51,59,0.08)");
            },
            blur: function() {
                $(this).css("boxShadow", "none");
                $(this).siblings(".searchBtn").css("boxShadow", "none");
            }

        })
        //#endregion

    //#region 卷去页面 导航栏发生变化 + 问题分类左边固定的框固定

    $(window).scroll(function() {

        //#region // 卷去页面 导航栏发生变化

        if ($(document).scrollTop() >= 433) {
            $(".nav .functionNav").show(200);
            $(".nav .search").css("left", "67%");

        } else {
            $(".nav .functionNav").hide(200);

            $(".nav .search").css("left", "50%");
        }

        //#endregion

        //#region 左边导航栏.quizLeftSidar 和 右边 .attentionAndCollection

        // ownheight ：左边栏 滑到 跟右边内容一底部一样高时  的scrollTop 值 
        var ownheight = $(".indexQuizList").offset().top + $(".indexQuizList").outerHeight(true) - 120 - $(".quizLeftSidar").outerHeight(true);
        if ($(document).scrollTop() >= 534 && $(document).scrollTop() < ownheight) {

            // top:页面被卷去的距离- 父级到document顶部的距离 + 120
            var topvalue = $(document).scrollTop() - $(".maincontent").offset().top + 120;
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
                });
            })
        } else {
            $(".returnTop").hide(400);

        }
        //#endregion
    })


    //#endregion

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

    //#region 3d效果

    var rotateDivs = document.querySelectorAll('.rotate-div');
    for (var i = 0; i < rotateDivs.length; i++) {
        rotateDivs[i].addEventListener("mouseover", function() {


            this.addEventListener("mousemove", function(e) {

                var distance = e.pageX - this.parentNode.offsetLeft;
                var center = this.offsetWidth / 2;

                if (distance < center) {
                    $(this).css({
                        transform: "rotateY(-30deg)"
                    })
                } else {
                    $(this).css({
                        transform: "rotateY(30deg)"
                    })
                }
            })
            this.addEventListener("mouseout", function() {
                $(this).css({
                    transform: "rotateY(0)"
                })
            })
        })
    }

    //#endregion
})