$(function() {

    //#region nav

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

    //#region 点击登录button进入登录弹框
    $('.fadein').click(function() {
        $("input").val("");
        $(".logOn").siblings().fadeOut();
        $(".logOn").fadeIn();
        $('.modal_bg').fadeIn();
        $('.modal').css({
            transform: 'translate(-50%,-50%) scale(1)'
        })
    })

    $('.fadeout').click(function() {
        $('.modal_bg').fadeOut(); // 其实就是css 的过渡+ display
        $('.modal').css({
            transform: 'translate(-50%,-50%) scale(0.7)'
        })

    })

    //#endregion

    //#region 点击注册 进入 注册页面
    $(".toRegister").on({
        click: function() {
            window.open("html/register.html");
        }
    })

    //#endregion

    //#region 用户名/密码 与后端交互
    var option = 1;
    $(".logOn h2").on("click", function() {
        //点击 学生/老师 相应模块 显示
        $(this).parent().addClass("logOnDisplay");
        $(this).parent().siblings().removeClass("logOnDisplay");

        //设置option 1/2 当前登录状态 1 学生 2 老师
        if ($(this).text() === "学生") {
            option = 1;
        } else if ($(this).text() === "教师") {
            option = 2;
        }
    })

    // //点击登录按钮 
    //点击登录按钮 
    $('.btnLogon').click(function() {
        //得到接口传递的数据
        var pwd, account, type;
        if (option == 1) {
            pwd = $('#stu_pwd').val();
            account = $('#stu_account').val();
            type = "student"
        } else {
            pwd = $('#teacher_pwd').val();
            account = $('#teacher_account').val();
            type = "teacher"
        }

        //账号密码判空 / 正则
        if (pwd === "" || account === "") {
            alert('用户名/密码不能为空');
        } else {
            $.get('http://192.168.137.108:8080/Servlet/UserServlet', {
                password: pwd,
                loginValue: account,
                requestType: 'get',
                userType: type
            }, function(res) {
                if (res.statusCode == 200) {
                    // alert('登录成功');
                    clearCookie(); //清除cookie
                    setCookie(res.messagePojo, 30); //保存30天
                    // console.log(res)

                    //if登录成功 退出登录框 登录+注册 -> 消息+头像


                    $('.modal_bg').fadeOut(); // 其实就是css 的过渡+ display
                    $('.modal').css({
                        transform: 'translate(-50%,-50%) scale(0.7)'
                    })

                    $('.personal').hide(100);
                    $('.logonHeadPortrait').show(100);
                    console.log(res);
                    $('.ResUserName').text(res.userName);
                    $('.ResUserName').prop("title", res.userName);
                    $('.ResMarkNumber').text(res.markNumber);
                    $('.ResMarkNumber').prop("title", res.markNumber);
                    $('.ResMessagePojoMajor').text(res.messagePojo.major);
                    $('.ResMessagePojoMajor').prop("title", res.messagePojo.major);
                    let ResMessageFaceScr = 'http://192.168.137.108:8080/' + res.messagePojo.face.substring(2);
                    $('.ResMessageFace').prop("src", ResMessageFaceScr);
                    $('.navHPY').prop('src', ResMessageFaceScr);

                } else {
                    alert('账号或密码有误，登录失败！');
                }
            }, 'json')
        }
    })

    function clearCookie() {
        removeCookie("area");
        removeCookie("college");
        removeCookie("email");
        removeCookie("face");
        removeCookie("level");
        removeCookie("major");
        removeCookie("markNumber");
        removeCookie("sex");
        removeCookie("userName");
    }
    //#endregion

    //#region 鼠标悬停 | 点击 头像 出现二级导航  点击 二级导航的 li 再出现二级导航

    var count = 0; //0 没显示  1 表示已经显示
    $('body').on({
        click: function() {
            $(".message").find(".messageNotification").fadeOut(100);
            // $(".message").find(".messageNotification").css("display", 'none');
            $(".message").find(".iconfont").css("top", "0px");

            //二级导航出现
            // $(".hpSecond").css("display", "none");
            // $(".hpSecond").hide(200);
            $('.hpSecond').fadeOut();

            $(".hpSecond").find(".iconfont").css('color', '#000');
            $('.hpSecond').find('em').css('color', '#000');
            count = 1;
            // $(".hpSecondSecond").css("display", 'none');
            $(".hpSecondSecond").fadeOut(100);
            $(".hpSecondSecond").animate({
                right: 0
            })

        }
    })
    $(".headPortrait").on({
        click: function(e) {
            console.log(111);


            // console.log($(this).find(".hpSecond"));
            $(this).find(".hpSecond").css("display", "block");
            e.stopPropagation();

        }
    })
    $(".hpSecond>div").on({
        click: function(e) {
            e.stopPropagation();

            $(this).siblings().find(".iconfont").css('color', '#000');
            $(this).find(".iconfont").css('color', '#02a7f0');
            $(this).siblings().find("em").css('color', '#000');
            $(this).find('em').css('color', '#02a7f0');

            count = 0;
            if (count == 0) {
                count = 1;
                $(this).siblings().find(".hpSecondSecond").fadeOut(100);
                $(this).siblings().find(".hpSecondSecond").animate({
                    right: 0
                });
                // $(this).siblings().find(".hpSecondSecond").css("display", "none");


                $(this).find(".hpSecondSecond").css("display", "block");
                $(this).find(".hpSecondSecond").animate({
                    right: "465px"
                })
            } else {
                count = 0;
                $(this).find(".hpSecondSecond").fadeOut(200);
                $(this).find(".hpSecondSecond").animate({
                    right: 0
                })
            }
        }
    })
    $(".hpSecondSecond").on({
        click: function(e) {
            e.stopPropagation();
            count = 0;
            $(this).css("display", "block");

        }
    })

    //#endregion 

    //#region 消息通知

    //#region css效果
    $(".message").on({
        click: function(e) {
            e.stopPropagation();
            $('.message').find(".messageNotification").fadeIn();
            $('.message').find('.messageNotification').css('display', 'block');
            $(this).find(".iconfont").css("top", "-20px");
        },
        mouseover: function() {
            $(this).find(".iconfont").css("top", "-20px");
        },
        mouseout: function() {
            $(this).find(".iconfont").css("top", "0px");
        }
    })


    //去右边
    $('.message #hoverBox_fans').on({
        click: function() {
            console.log("right");
            $(this).siblings(".activeLine").addClass("toRight");
            $(this).siblings(".activeLine").removeClass("toLeft");
            $(this).css('fontWeight', '700');
            $(this).siblings('span').css("fontWeight", '400');
            // $('.hoverBox .title').html($(this).html())
            //发送请求
        }
    })

    //去左边
    $('.message #hoverBox_interest').on({
        click: function() {
            console.log("left");
            $(this).siblings(".activeLine").addClass("toLeft");
            $(this).siblings(".activeLine").removeClass("toRight");
            $(this).css('fontWeight', '700');
            $(this).siblings('span').css("fontWeight", '400');
            // $('.hoverBox .title').html($(this).html())
            //发送请求
        }
    })

    //#endregion

    //#region 交互

    //#endregion

    //#endregion

    //#region 我的关注

    var a = {
        "last": "无效参数",
        "next": "是否有下一页",
        "totalPage": "总页数",
        "nowPosition": "现在的页数",
        "dataList": [{
            "userName": "用户名",
            "userType": "用户类型", // student / teacher 要自己判断
            "sex": "性别",
            "collage": "院校",
            "major": "专业",
            "mutual": "是否相互关注"
        }],
        "page_SIZE": "页面大小"
    }

    //刚打开悬浮板，就发送

    //切换为我的回答

    //去右边
    $('#hoverBox_fans').click(function() {
        console.log("right");
        $(this).siblings(".activeLine").addClass("toRight");
        $(this).siblings(".activeLine").removeClass("toLeft");
        $(this).css('fontWeight', '700');
        $(this).siblings('span').css("fontWeight", '400');
        // $('.hoverBox .title').html($(this).html())
        //发送请求
    })

    //去左边
    $('#hoverBox_interest').click(function() {
        console.log("left");
        $(this).siblings(".activeLine").addClass("toLeft");
        $(this).siblings(".activeLine").removeClass("toRight");
        $(this).css('fontWeight', '700');
        $(this).siblings('span').css("fontWeight", '400');
        // $('.hoverBox .title').html($(this).html())
        //发送请求
    })

    //还没关注之前，点击后发送关注请求，并且成功后把状态变成关注，点亮
    //如果当前是已关注，title为取消关注

    // 点击关注按钮，并且是当前状态为turnON ，就发送请求发送关注，如果为turnOff就发送取消关注请求
    $('.hoverBox .contentBox_subscribe .item .subscribe').click(function() {
        if ($(this).attr("nextAction") == 'turnOn') {
            //发送关注请求
            $(this).find('svg path').css("fill", "#d6204b");
            $(this).attr({
                "nextAction": "turnOff",
                "title": "取消关注"
            });
        } else {
            $(this).find('svg path').css("fill", "#bfbfbf");
            $(this).attr({
                "nextAction": "turnOn",
                "title": "关注"
            });
        }
    })

    var page = 1; //可以写在list的属性中
    var num = 6;
    //用到节流防抖，先不做
    $('.itemList_box').scroll(debounce(getData, 300));

    //获取数据函数
    function getData() {
        //滚动条到顶部的高度
        var scrollTop = Math.ceil($(this).scrollTop());
        //窗口高度
        var curHeight = $(this).height();
        //整个文档高度
        var totalHeight = $('.itemList').height();
        //滚动条到底
        console.log("拖拽滚动条");
        if (scrollTop + curHeight > totalHeight) {
            page++;
            console.log(page)
            console.log("到达了底部")
                // getData();//获取数据的方法
                //console.log(123);
        }
    }

    //#endregion

    //#region 我的收藏 

    //#endregion

    //#region 我的问答

    //切换为我的回答
    //去右边
    $('#hoverBox_answer').click(function() {
        console.log("right");
        $(this).siblings(".activeLine").addClass("toRight");
        $(this).siblings(".activeLine").removeClass("toLeft");
        $(this).css('fontWeight', '700');
        $(this).siblings('span').css("fontWeight", '400');
        // $('.hoverBox .title').html($(this).html())
        //发送请求
    })

    //去左边
    $('#hoverBox_request').click(function() {
        console.log("left");
        $(this).siblings(".activeLine").addClass("toLeft");
        $(this).siblings(".activeLine").removeClass("toRight");
        $(this).css('fontWeight', '700');
        $(this).siblings('span').css("fontWeight", '400');
        // $('.hoverBox .title').html($(this).html())
        //发送请求
    })

    //#endregion


    //#endregion

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

        // rotateDivs[i].addEventListener("mouseenter", function(e) {
        //     console.log("over");
        //     e.stopPropagation();
        //     this.addEventListener("mousemove", function(e) {
        //         // console.log("move");
        //         var distance = e.pageX - this.parentNode.offsetLeft;
        //         var center = this.offsetWidth / 2;

        //         if (distance < center) {
        //             $(this).css({
        //                 transform: "rotateY(-30deg)"
        //             })
        //         } else {
        //             $(this).css({
        //                 transform: "rotateY(30deg)"
        //             })
        //         }
        //     })

        // })
        // rotateDivs[i].addEventListener("mouseout", function(e) {
        //     console.log("out");
        //     e.stopPropagation();
        //     $(this).css({
        //         transform: "rotateY(0)"
        //     })
        // })
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

        console.log($(document).scrollTop());
        //#region // 卷去页面 导航栏发生变化

        if ($(document).scrollTop() >= 433) {
            $(".nav .functionNav").show(200);
            $(".nav .search").css("left", "61%");

        } else {
            $(".nav .functionNav").hide(200);

            $(".nav .search").css("left", "50%");
        }

        //#endregion

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
                });
            })
        } else {
            $(".returnTop").hide(400);

        }
        //#endregion
    })


    //#endregion

    //#region 主要内容   

    //#region 主要内容 的高度

    var height = $('.indexQuizList').outerHeight(true) + 40;
    console.log(height);
    $('.maincontent').css('height', height);

    //#endregion

    //#region 点击 左侧边栏 跳转到页内相应分类 part
    $('.quizLeftSidar li').eq(0).find(".iconfont").css("color", "#02a7f0");
    $('.quizLeftSidar li').eq(0).find("span").css("color", "#02a7f0");

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

        }
    })

    //#endregion

    //#region 给每一个问题 加上一条 底线

    var activeLine = $(' <span class="active_line"></span>');
    $(".queY").append(activeLine);

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