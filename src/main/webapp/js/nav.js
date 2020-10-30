window.onload = function() {

    //#region 清空搜索框内的内容

    $(".search .searchBar").val("");

    //#endregion

}
var USERID;
var USERIMG;

function clearCookie() {
    removeCookie("area");
    removeCookie("college");
    removeCookie("email");
    removeCookie("face");
    removeCookie("id");
    removeCookie("level");
    removeCookie("major");
    removeCookie("password");
    removeCookie("markNumber");
    removeCookie("sex");
    removeCookie("userName");
}

$(function() {

    var count = 0; //头像那边的二级导航 ：0 没显示  1 表示已经显示

    $("body").on({
        click: function() {

            //#region 搜索框：searchContent不显示+ 清空里面的内容 +清空搜索框内容 

            $(this).parent().siblings(".searchContent").hide(200);
            $(".searchContent").find("li i").attr("class", "iconfont");
            $(".searchContent").find("li a").attr("href", "");
            $(".searchContent").find("li a").text("");
            $(".search").find(".searchBar").val("");

            //#endregion

            //#region 消息通知：不显示

            $(".message").find(".messageNotification").fadeOut(100);

            //#endregion

            //#region 头像那边的二级导航: 二级导航+二二级4导航:淡出 字体颜色: #000

            $('.hpSecond').fadeOut(100);
            $(".hpSecond").find(".iconfont").css('color', '#000');
            $('.hpSecond').find('em').css('color', '#000');
            $(".hpSecond").css("borderRadius", "22px");

            count = 1;
            $(".hpSecondSecond").fadeOut(50);
            $(".hpSecondSecond").animate({
                right: 0
            })

            //#endregion
        }
    })

    //#region 点击上面校区互通

    $('.campus-li').on({
        click: function() {
            $("body, html").stop().animate({
                scrollTop: "600px",
            });
        }
    })

    //#endregion

    //#region 搜索框  交互

    //#region  卷去页面 导航栏发生变化

    $(window).scroll(function() {

        if ($(document).scrollTop() >= 433) {
            $(".nav .functionNav").show(200);
            $(".nav .search").css("left", "61%");

        } else {
            $(".nav .functionNav").hide(200);

            $(".nav .search").css("left", "50%");
        }
    })

    //#endregion

    //#region 点击 + 得失焦点 + 防抖 

    $(".search").on({
        click: function(e) {
            e.stopPropagation();
        }
    })

    $(".nav").find(".searchBar").on({

        focus: function() {
            //搜索框获得焦点 bar/btn 的边框圆角 变化 + bar 的背景 变白 + 联想内容 显示
            $(".searchBar").css("borderRadius", "40px 0 0 0");
            $(".searchBtn").css("borderRadius", "0 40px 0 0");
            $(this).css("backgroundColor", "#fff");
            $(this).parent().siblings(".searchContent").show(200);
        },
        blur: function() {
            //搜索框失去焦点 bar/btn 的边框圆角 变会 + bar 的背景 变回半透明 + 联想内容 隐藏
            $(".searchBar").css("borderRadius", "40px 0 0 40px");
            $(".searchBtn").css("borderRadius", "0 40px 40px 0");
            $(this).css("backgroundColor", "rgba(255, 255, 255, 0.5)");
            $(this).parent().siblings(".searchContent").hide(200);

            //失去焦点 清空li的内容
            // $(this).parent().siblings(".searchContent").find("li").remove();

        },
        //#region 未防抖
        // keyup: function() {
        //     //键盘抬起事件 + val() 非空 发送请求 
        //     console.log($(this).val());
        //     if ($(this).val() != "") {
        //         $.get('http://localhost:8080/Servlet/MainPageServlet', {
        //             requestType: 'get',
        //             getType: "explore",
        //             exploreContent: $(this).val(),
        //         }, function(res) {
        //             console.log(res);
        //             for (var i = 0; i < res.dataList.length; i++) {
        //                 //判断是哪个篇 的 然后获取 创建iconfont
        //                 var icon;
        //                 if (res.dataList[i].questionType === "学习篇") {
        //                     icon = "iconxuexi";
        //                 } else if (res.dataList[i].questionType === "期末篇") {
        //                     icon = "iconkaoshi3";
        //                 } else if (res.dataList[i].questionType === "宿舍篇") {
        //                     icon = "iconsushe";
        //                 } else if (res.dataList[i].questionType === "食堂篇") {
        //                     icon = "iconshitang";
        //                 } else if (res.dataList[i].questionType === "考证篇") {
        //                     icon = "iconziyuan";
        //                 } else {
        //                     icon = "iconqita";
        //                 }

        //                 var url = 'html/questionPage.html?id=' + res.dataList[i].id;
        //                 $('.searchContent').find("li").eq(i).find('i').addClass(icon);
        //                 $('.searchContent').find("li").eq(i).find('a').attr("href", url);
        //                 $('.searchContent').find("li").eq(i).find('a').html(res.dataList[i].title);
        //                 // var li = $('<li><span><i class="iconfont ' + icon + ' "></i></span><a href=" ' + url + ' ">' + res.dataList[i].title + '</a></li>');
        //                 // $(".search .searchContent").prepend(li);
        //                 // $(".search .searchContent").find("li").eq(i).html(res.dataList[i].title);
        //             }

        //         }, 'json')
        //     } else {
        //         $(".searchContent").find("li i").attr("class", "iconfont");
        //         $(".searchContent").find("li a").attr("href", "");
        //         $(".searchContent").find("li a").text("");
        //     }

        // }


        //#endregion
    })

    //#region 节流
    $(".nav").find(".searchBar").bind("keyup", debounce(function() {
        //键盘抬起事件 + val() 非空 发送请求 
        console.log($(this).val());
        if ($(this).val() != "") {
            $.get('http://localhost:8080/Servlet/MainPageServlet', {
                requestType: 'get',
                getType: "explore",
                exploreContent: $(this).val(),
            }, function(res) {
                console.log(res);
                for (var i = 0; i < res.dataList.length; i++) {
                    //判断是哪个篇 的 然后获取 创建iconfont
                    var icon;
                    if (res.dataList[i].questionType === "学习篇") {
                        icon = "iconxuexi";
                    } else if (res.dataList[i].questionType === "期末篇") {
                        icon = "iconkaoshi3";
                    } else if (res.dataList[i].questionType === "宿舍篇") {
                        icon = "iconsushe";
                    } else if (res.dataList[i].questionType === "食堂篇") {
                        icon = "iconshitang";
                    } else if (res.dataList[i].questionType === "考证篇") {
                        icon = "iconziyuan";
                    } else {
                        icon = "iconqita";
                    }

                    var url = 'questionPage.html?id=' + res.dataList[i].id;
                    $('.searchContent').find("li").eq(i).find('i').addClass(icon);
                    $('.searchContent').find("li").eq(i).find('a').attr("href", url);
                    $('.searchContent').find("li").eq(i).find('a').html(res.dataList[i].title);
                    // var li = $('<li><span><i class="iconfont ' + icon + ' "></i></span><a href=" ' + url + ' ">' + res.dataList[i].title + '</a></li>');
                    // $(".search .searchContent").prepend(li);
                    // $(".search .searchContent").find("li").eq(i).html(res.dataList[i].title);
                }

            }, 'json')
        } else {
            $(".searchContent").find("li i").attr("class", "iconfont");
            $(".searchContent").find("li a").attr("href", "");
            $(".searchContent").find("li a").text("");
        }

    }, 250, true))

    //#endregion

    //#endregion

    //#endregion

    //#region  登录 + 获取 消息 关注 问答 收藏 退出登录

    //#region 点击登录button进入登录弹框 √

    $('.fadein').click(function() {
        $("input").val("");
        $(".logOn").siblings().fadeOut();
        $(".logOn").fadeIn();
        $(".modal_bg_logon").fadeIn(); //远安修改代码 解决类名冲突
        // $('.modal_bg').fadeIn();
        $('.modal').css({
            transform: 'translate(-50%,-50%) scale(1)'
        })
    })

    $('.fadeout').click(function() {
        $('.modal_bg_logon').fadeOut(); // 其实就是css 的过渡+ display
        $('.logonBody .logonYmadal').css({
            transform: 'translate(-50%,-50%) scale(0.7)'
        })

    })

    //#endregion

    //#region 用户名/密码 与后端交互 √

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

    //点击登录按钮 
    $('.btnLogon').click(function() {
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
            $.get('http://localhost:8080/Servlet/UserServlet', {
                password: pwd,
                loginValue: account,
                requestType: 'get',
                userType: type
            }, function(res) {
                if (res.statusCode == 200) {
                    // console.log(res.messagePojo)
                    // clearCookie(); //清除cookie
                    setCookie(res.messagePojo, 30); //保存30天

                    //if登录成功 退出登录框 登录+注册 -> 消息+头像

                    $('.modal_bg').fadeOut(); // 其实就是css 的过渡+ display
                    $('.modal').css({
                        transform: 'translate(-50%,-50%) scale(0.7)'
                    })

                    //#region 动态创建 头像下部分的内容

                    $('.personal').hide(100);
                    $('.logonHeadPortrait').show(100);
                    // console.log(res);
                    $('.ResUserName').text(res.userName);
                    $('.ResUserName').prop("title", res.userName);
                    $('.ResMarkNumber').text(res.markNumber);
                    $('.ResMarkNumber').prop("title", res.markNumber);
                    // console.log(res.markNumber);
                    USERID = res.markNumber;
                    $('.ResMessagePojoMajor').text(res.messagePojo.major);
                    $('.ResMessagePojoMajor').prop("title", res.messagePojo.major);
                    // if (res.messagePojo.face != null) {
                    let ResMessageFaceScr = 'http://localhost:8080' + res.messagePojo.face.substring(2);
                    $('.ResMessageFace').prop("src", ResMessageFaceScr);
                    $('.navHPY').prop('src', ResMessageFaceScr);
                    // } else {
                    //     let ResMessageFaceScr = "img/InitialPortrait.jpg";
                    //     $('.ResMessageFace').prop("src", ResMessageFaceScr);
                    //     $('.navHPY').prop('src', ResMessageFaceScr);
                    // }

                    //#endregion

                    sentenceIsLogon(); //问题页面判断是否登录

                } else {
                    alert('账号或密码有误，登录失败！');
                }
            }, 'json')
        }
    })

    //#endregion

    //#region 消息通知 √ 

    $(".message").on({
        click: function(e) {
            e.stopPropagation();
            $(".system").html("");
            $(".private").html("");

            // console.log(111);

            //#region 获取消息通知

            if (USERID != null) {
                $('.message').find(".messageNotification").fadeIn();
                $('.message').find('.messageNotification').css('display', 'block');

                $.get('http://localhost:8080/Servlet/InfServlet', {
                    currentPage: "1",
                    receiverMarkNumber: USERID,
                    order: "sendTime",
                    direction: "asc",
                    requestType: 'get',
                    type: "inf",
                }, function(res) {
                    // console.log(res);

                    //#region 动态创建  消息通知
                    for (var i = 0; i < res.dataList.length; i++) {

                        var item = $("<li class='item'></li>");
                        var src = 'http://localhost:8080' + res.dataList[i].senderFace.substring(2);
                        var img = $("<img src='" + src + "'>");
                        var svg = $("<svg class='info_point' class='icon' height='10' p-id='12380' t='1602330426902' version='1.1' viewBox='0 0 1024 1024' width='10' xmlns='https://www.w3.org/2000/svg'><path d='M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z' fill='#E6A23C' p-id='12381'></svg>");
                        var username = $("<span class='userName itemTitle' title='" + res.dataList[i].senderName + "'>" + res.dataList[i].senderName + "</span>");
                        var information = $("<span class='item_info' title='" + res.dataList[i].content + "'>" + res.dataList[i].content + "</span>");
                        var time = $("<span class='time'>" + res.dataList[i].timeUpToNow + "</span>");

                        $(".message .contentBox_information").find("ul").prepend(item);
                        $(".message .contentBox_information").find("ul").find(".item").eq(0).append(img);
                        $(".message .contentBox_information").find("ul").find(".item").eq(0).append(svg);
                        $(".message .contentBox_information").find("ul").find(".item").eq(0).append(username);
                        $(".message .contentBox_information").find("ul").find(".item").eq(0).append(information);
                        $(".message .contentBox_information").find("ul").find(".item").eq(0).append(time);

                    }


                    //#endregion
                    // console.log(res);

                }, 'json')
            } else {
                alert("您还为登录！");
            }

            //#endregion
        }
    })

    //#region 效果
    //去右边
    $('.message #hoverBox_fans').on({
        click: function() {
            console.log("right");
            $(this).siblings(".activeLine").addClass("toRight");
            $(this).siblings(".activeLine").removeClass("toLeft");
            $(this).css('fontWeight', '700');
            $(this).siblings('span').css("fontWeight", '400');
            $(".system").fadeOut();
            $(".private").fadeIn();
            // $('.hoverBox .title').html($(this).html())

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
            $(".private").fadeOut();
            $(".system").fadeIn();

            // $('.hoverBox .title').html($(this).html())

            //发送请求
        }
    })

    //#endregion

    //#endregion

    //#region 我的关注 √

    $(".attention").on({

        click: function() {

            //#region 获取我的关注 
            if (USERID != null) {
                //显示二级导航

                $.get('http://localhost:8080/Servlet/AttentionServlet', {
                    requestType: 'get',
                    majorMarkNumber: USERID,
                    attentionType: "major",
                    currentPage: "1",
                    direction: "asc",
                    order: "id",
                }, function(res) {
                    $(".attention .contentBox_subscribe").find("ul.myAttention").html("");
                    // console.log(res);

                    //#region 动态创建 我的关注
                    for (var i = 0; i < res.dataList.length; i++) {

                        var item = $("<li class='item'></li>");
                        var src = 'http://localhost:8080' + res.dataList[i].userFace.substring(2);
                        var aimg = $("<a class='img_link' href='#' title='进入主页'><img src='" + src + "'></a>");
                        var username = $("<span class='userName' title='" + res.dataList[i].userName + "'>" + res.dataList[i].userName + "</span>");
                        var statusSex = $("<span class='status'>身份</span> <div class='sex'></div>");
                        var on;
                        var schoolinfo = $("<span class='school_info' title='" + res.dataList[i].collage + "'>" + res.dataList[i].collage + "</span>");
                        var subscribe = $('<div class="subscribe " nextAction="turnOn " title="关注 "><svg class="do_subscribe " height="30 " p-id="3875 " t="1602172191268 " version="1.1 " viewBox="0 0 1024 1024 " width="30 " xmlns="http://www.w3.org/2000/svg "><path d="M513.536 239.104S441.856 87.04 280.064 87.04C102.912 87.04 10.24 235.52 10.24 384c0 246.784 503.296 552.96 503.296 552.96S1013.76 633.856 1013.76 384c0-151.552-95.744-296.96-266.752-296.96-170.496 0-233.472 152.064-233.472 152.064z " fill="#bfbfbf " p-id="3876 "></path></svg></div>');
                        var sendText = $('<div class="sendText " title="私信 "><svg class="icon " height="30 " p-id="4482 " t="1602172441453 " version="1.1 " viewBox="0 0 1024 1024 " width="30 " xmlns="http://www.w3.org/2000/svg "><path d="M935.724138 494.344828c0 204.8-188.910345 370.758621-423.724138 370.75862-67.089655 0-130.648276-14.124138-187.144828-38.841379-35.310345-14.124138-157.131034 60.027586-185.37931 38.841379-28.248276-21.186207 38.841379-141.241379 17.655172-167.724138C112.993103 639.117241 88.275862 568.496552 88.275862 494.344828 88.275862 289.544828 277.186207 123.586207 512 123.586207s423.724138 165.958621 423.724138 370.758621z m-605.572414 5.296551c0 14.124138 7.062069 26.482759 19.42069 33.544828s26.482759 7.062069 38.841379 0c12.358621-7.062069 19.42069-19.42069 19.42069-33.544828 0-14.124138-7.062069-26.482759-19.42069-33.544827-12.358621-7.062069-26.482759-7.062069-38.841379 0-12.358621 7.062069-19.42069 19.42069-19.42069 33.544827z m155.365517 0c0 14.124138 7.062069 26.482759 19.42069 33.544828 12.358621 7.062069 26.482759 7.062069 38.841379 0 12.358621-7.062069 19.42069-19.42069 19.42069-33.544828 0-14.124138-7.062069-26.482759-19.42069-33.544827-12.358621-7.062069-26.482759-7.062069-38.841379 0-12.358621 7.062069-19.42069 19.42069-19.42069 33.544827z m153.6 0c0 14.124138 7.062069 26.482759 19.42069 33.544828 12.358621 7.062069 26.482759 7.062069 38.841379 0 12.358621-7.062069 19.42069-19.42069 19.42069-33.544828 0-14.124138-7.062069-26.482759-19.42069-33.544827-12.358621-7.062069-26.482759-7.062069-38.841379 0-12.358621 7.062069-19.42069 19.42069-19.42069 33.544827z " fill="#bfbfbf " p-id="4483 "></path></svg></div>');

                        if (res.dataList[i].sex === '男') {
                            on = $("<svg class='male on' height='30' p-id='3642' t='1602171820438' version='1.1' viewBox='0 0 1024 1024' width='30' xmlns='http://www.w3.org/2000/svg'><path d='M262.144 419.84C194.56 270.336 286.72 106.496 407.552 18.432c-2.048 16.384-8.192 49.152-10.24 67.584 32.768-20.48 65.536-40.96 100.352-63.488 18.432 4.096 38.912 6.144 57.344 10.24 63.488 65.536 180.224 69.632 215.04 165.888 34.816 114.688-26.624 225.28-61.44 333.824-20.48 69.632-67.584 135.168-137.216 161.792-65.536 26.624-143.36 4.096-192.512-45.056-63.488-65.536-67.584-159.744-116.736-229.376zM358.4 307.2c-79.872 118.784-36.864 309.248 100.352 364.544 124.928 43.008 233.472-81.92 241.664-198.656 16.384-61.44-26.624-114.688-51.2-167.936-94.208 40.96-196.608 28.672-290.816 2.048z' fill='#17abe3' p-id='3643'></path> <path d='M133.12 788.48c61.44-59.392 147.456-81.92 227.328-102.4-4.096 118.784 20.48 245.76 114.688 325.632 12.288-88.064 20.48-178.176 18.432-268.288 12.288 0 38.912 0 51.2 2.048 0 88.064 12.288 174.08 30.72 258.048 71.68-88.064 110.592-200.704 88.064-313.344 71.68 26.624 151.552 43.008 212.992 90.112 47.104 45.056 51.2 116.736 63.488 176.128V1024H81.92v-96.256c8.192-49.152 14.336-102.4 51.2-139.264z' fill='#17abe3' p-id='3644'></path> </svg>");
                        } else {
                            on = $("<svg class='female on' height='30' p-id='3272' t='1602171713920' version='1.1' viewBox='0 0 1024 1024' width='30' xmlns='http://www.w3.org/2000/svg'><path d='M373.793 306.073a373.53 373.53 0 0 0 283.884-6.724 373.53 373.53 0 0 1 41.089 185.272c-8.965 128.495-118.783 228.601-233.83 188.26s-158.378-259.978-91.143-366.808zM695.03 701.27a705.227 705.227 0 0 0 144.183 46.318c86.66 20.918 153.895 173.318 149.413 275.666H32.386s0-224.119 113.553-261.472a1114.617 1114.617 0 0 0 185.272-64.994s-11.206 241.3 114.3 233.83c40.342 0 67.983-93.383 67.983-93.383s50.053 93.383 91.889 93.383c79.935 0 88.9-198.718 89.647-229.348zM196.74 530.192a84.418 84.418 0 0 0 19.423 100.106C258 669.145 379.77 656.445 379.77 656.445a149.412 149.412 0 0 1-48.56 40.342l182.284 117.288L692.79 699.028c-50.8-27.64-28.388-44.077-28.388-44.077a313.02 313.02 0 0 0 134.47-4.482c74.707-25.4 34.366-127.748 34.366-127.748 49.306-5.23 24.653-61.259-11.953-104.589S763.013 196.255 704.742 86.437C656.93 7.995 530.677 0.524 504.53 0.524a194.236 194.236 0 0 0-158.377 63.5C281.906 132.007 251.276 299.35 243.06 350.15S168.35 481.633 168.35 499.562s28.39 30.63 28.39 30.63z' fill='#e8989a' p-id='3273'></path></svg>");

                        }

                        $(".attention .contentBox_subscribe").find("ul.myAttention").prepend(item);
                        $(".attention .contentBox_subscribe").find("ul.myAttention").find(".item").eq(0).append(aimg);
                        $(".attention .contentBox_subscribe").find("ul.myAttention").find(".item").eq(0).append(username);
                        $(".attention .contentBox_subscribe").find("ul.myAttention").find(".item").eq(0).append(statusSex);
                        $(".attention .contentBox_subscribe").find("ul.myAttention").find(".item").eq(0).find(".sex").append(on);
                        $(".attention .contentBox_subscribe").find("ul.myAttention").find(".item").eq(0).append(schoolinfo);
                        $(".attention .contentBox_subscribe").find("ul.myAttention").find(".item").eq(0).append(subscribe);
                        $(".attention .contentBox_subscribe").find("ul.myAttention").find(".item").eq(0).append(sendText);

                    }



                    //#endregion


                }, 'json')

                //还没关注之前，点击后发送关注请求，并且成功后把状态变成关注，点亮
                //如果当前是已关注，title为取消关注

                // 点击关注按钮，并且是当前状态为turnON ，就发送请求发送关注，如果为turnOff就发送取消关注请求
                $('.hoverBox .contentBox_subscribe .item .subscribe').click(function() {
                    if ($(this).attr("nextAction") === 'turnOn') {
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

            } else {
                alert("您还未登录！");
            }
            //#endregion

            //#region 获取关注我的 头像 用户民

            if (USERID != null) {

                $.get('http://localhost:8080/Servlet/AttentionServlet', {
                    requestType: 'get',
                    attentionType: "pass",
                    passMarkNumber: USERID,
                    currentPage: "1",
                    direction: "asc",
                    order: "id",
                }, function(res) {
                    $(".attention .contentBox_subscribe").find("ul.attentionMe").html("");

                    // console.log(res);

                    //#region 动态创建 关注我的
                    for (var i = 0; i < res.dataList.length; i++) {

                        var item = $("<li class='item'></li>");
                        var src = 'http://localhost:8080' + res.dataList[i].userFace.substring(2);
                        var aimg = $("<a class='img_link' href='#' title='进入主页'><img src='" + src + "'></a>");
                        var username = $("<span class='userName' title='" + res.dataList[i].userName + "'>" + res.dataList[i].userName + "</span>");
                        var statusSex = $("<span class='status'>身份</span> <div class='sex'></div>");
                        var on;
                        var schoolinfo = $("<span class='school_info' title='" + res.dataList[i].collage + "'>" + res.dataList[i].collage + "</span>");
                        var subscribe = $('<div class="subscribe " nextAction="turnOn " title="关注 "><svg class="do_subscribe " height="30 " p-id="3875 " t="1602172191268 " version="1.1 " viewBox="0 0 1024 1024 " width="30 " xmlns="http://www.w3.org/2000/svg "><path d="M513.536 239.104S441.856 87.04 280.064 87.04C102.912 87.04 10.24 235.52 10.24 384c0 246.784 503.296 552.96 503.296 552.96S1013.76 633.856 1013.76 384c0-151.552-95.744-296.96-266.752-296.96-170.496 0-233.472 152.064-233.472 152.064z " fill="#bfbfbf " p-id="3876 "></path></svg></div>');
                        var sendText = $('<div class="sendText " title="私信 "><svg class="icon " height="30 " p-id="4482 " t="1602172441453 " version="1.1 " viewBox="0 0 1024 1024 " width="30 " xmlns="http://www.w3.org/2000/svg "><path d="M935.724138 494.344828c0 204.8-188.910345 370.758621-423.724138 370.75862-67.089655 0-130.648276-14.124138-187.144828-38.841379-35.310345-14.124138-157.131034 60.027586-185.37931 38.841379-28.248276-21.186207 38.841379-141.241379 17.655172-167.724138C112.993103 639.117241 88.275862 568.496552 88.275862 494.344828 88.275862 289.544828 277.186207 123.586207 512 123.586207s423.724138 165.958621 423.724138 370.758621z m-605.572414 5.296551c0 14.124138 7.062069 26.482759 19.42069 33.544828s26.482759 7.062069 38.841379 0c12.358621-7.062069 19.42069-19.42069 19.42069-33.544828 0-14.124138-7.062069-26.482759-19.42069-33.544827-12.358621-7.062069-26.482759-7.062069-38.841379 0-12.358621 7.062069-19.42069 19.42069-19.42069 33.544827z m155.365517 0c0 14.124138 7.062069 26.482759 19.42069 33.544828 12.358621 7.062069 26.482759 7.062069 38.841379 0 12.358621-7.062069 19.42069-19.42069 19.42069-33.544828 0-14.124138-7.062069-26.482759-19.42069-33.544827-12.358621-7.062069-26.482759-7.062069-38.841379 0-12.358621 7.062069-19.42069 19.42069-19.42069 33.544827z m153.6 0c0 14.124138 7.062069 26.482759 19.42069 33.544828 12.358621 7.062069 26.482759 7.062069 38.841379 0 12.358621-7.062069 19.42069-19.42069 19.42069-33.544828 0-14.124138-7.062069-26.482759-19.42069-33.544827-12.358621-7.062069-26.482759-7.062069-38.841379 0-12.358621 7.062069-19.42069 19.42069-19.42069 33.544827z " fill="#bfbfbf " p-id="4483 "></path></svg></div>');

                        if (res.dataList[i].sex === '男') {
                            on = $("<svg class='male on' height='30' p-id='3642' t='1602171820438' version='1.1' viewBox='0 0 1024 1024' width='30' xmlns='http://www.w3.org/2000/svg'><path d='M262.144 419.84C194.56 270.336 286.72 106.496 407.552 18.432c-2.048 16.384-8.192 49.152-10.24 67.584 32.768-20.48 65.536-40.96 100.352-63.488 18.432 4.096 38.912 6.144 57.344 10.24 63.488 65.536 180.224 69.632 215.04 165.888 34.816 114.688-26.624 225.28-61.44 333.824-20.48 69.632-67.584 135.168-137.216 161.792-65.536 26.624-143.36 4.096-192.512-45.056-63.488-65.536-67.584-159.744-116.736-229.376zM358.4 307.2c-79.872 118.784-36.864 309.248 100.352 364.544 124.928 43.008 233.472-81.92 241.664-198.656 16.384-61.44-26.624-114.688-51.2-167.936-94.208 40.96-196.608 28.672-290.816 2.048z' fill='#17abe3' p-id='3643'></path> <path d='M133.12 788.48c61.44-59.392 147.456-81.92 227.328-102.4-4.096 118.784 20.48 245.76 114.688 325.632 12.288-88.064 20.48-178.176 18.432-268.288 12.288 0 38.912 0 51.2 2.048 0 88.064 12.288 174.08 30.72 258.048 71.68-88.064 110.592-200.704 88.064-313.344 71.68 26.624 151.552 43.008 212.992 90.112 47.104 45.056 51.2 116.736 63.488 176.128V1024H81.92v-96.256c8.192-49.152 14.336-102.4 51.2-139.264z' fill='#17abe3' p-id='3644'></path> </svg>");
                        } else {
                            on = $("<svg class='female on' height='30' p-id='3272' t='1602171713920' version='1.1' viewBox='0 0 1024 1024' width='30' xmlns='http://www.w3.org/2000/svg'><path d='M373.793 306.073a373.53 373.53 0 0 0 283.884-6.724 373.53 373.53 0 0 1 41.089 185.272c-8.965 128.495-118.783 228.601-233.83 188.26s-158.378-259.978-91.143-366.808zM695.03 701.27a705.227 705.227 0 0 0 144.183 46.318c86.66 20.918 153.895 173.318 149.413 275.666H32.386s0-224.119 113.553-261.472a1114.617 1114.617 0 0 0 185.272-64.994s-11.206 241.3 114.3 233.83c40.342 0 67.983-93.383 67.983-93.383s50.053 93.383 91.889 93.383c79.935 0 88.9-198.718 89.647-229.348zM196.74 530.192a84.418 84.418 0 0 0 19.423 100.106C258 669.145 379.77 656.445 379.77 656.445a149.412 149.412 0 0 1-48.56 40.342l182.284 117.288L692.79 699.028c-50.8-27.64-28.388-44.077-28.388-44.077a313.02 313.02 0 0 0 134.47-4.482c74.707-25.4 34.366-127.748 34.366-127.748 49.306-5.23 24.653-61.259-11.953-104.589S763.013 196.255 704.742 86.437C656.93 7.995 530.677 0.524 504.53 0.524a194.236 194.236 0 0 0-158.377 63.5C281.906 132.007 251.276 299.35 243.06 350.15S168.35 481.633 168.35 499.562s28.39 30.63 28.39 30.63z' fill='#e8989a' p-id='3273'></path></svg>");

                        }

                        $(".attention .contentBox_subscribe").find("ul.attentionMe").prepend(item);
                        $(".attention .contentBox_subscribe").find("ul.attentionMe").find(".item").eq(0).append(aimg);
                        $(".attention .contentBox_subscribe").find("ul.attentionMe").find(".item").eq(0).append(username);
                        $(".attention .contentBox_subscribe").find("ul.attentionMe").find(".item").eq(0).append(statusSex);
                        $(".attention .contentBox_subscribe").find("ul.attentionMe").find(".item").eq(0).find(".sex").append(on);
                        $(".attention .contentBox_subscribe").find("ul.attentionMe").find(".item").eq(0).append(schoolinfo);
                        $(".attention .contentBox_subscribe").find("ul.attentionMe").find(".item").eq(0).append(subscribe);
                        $(".attention .contentBox_subscribe").find("ul.attentionMe").find(".item").eq(0).append(sendText);

                    }
                    //#endregion

                }, 'json')
            } else {

                alert("您还未登录！");
            }
            //#endregion

        }
    })

    //#region 效果

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

    //#region 切换为我的回答

    //去右边
    $('#hoverBox_fans').click(function() {
        console.log("right");
        $(this).siblings(".activeLine").addClass("toRight");
        $(this).siblings(".activeLine").removeClass("toLeft");
        $(this).css('fontWeight', '700');
        $(this).siblings('span').css("fontWeight", '400');
        $(".myAttention").fadeOut();
        $(".attentionMe").fadeIn();
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
        $(".myAttention").fadeIn();
        $(".attentionMe").fadeOut();
        // $('.hoverBox .title').html($(this).html())
        //发送请求
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
        // console.log("拖拽滚动条");
        if (scrollTop + curHeight > totalHeight) {
            page++;
            // console.log(page)
            // console.log("到达了底部")
            // getData();//获取数据的方法
            //console.log(123);
        }
    }
    //#endregion

    //#endregion

    //#endregion

    //#region 我的收藏 × 

    $(".myCollY").on({
        click: function() {
            //先清空上次请求创建的信息
            $(".myCollY .contentBox_collection").find("ul.mycollection").html("");

            if (USERID != null) {
                //显示二级导航
                // var count = 0;
                // if (count == 0) {
                //     count = 1;
                //     $(this).siblings().find(".hpSecondSecond").fadeOut(100);
                //     $(this).siblings().find(".hpSecondSecond").animate({
                //         right: 0
                //     });

                //     // $(this).siblings().find(".hpSecondSecond").css("display", "none");
                //     $(this).find(".hpSecondSecond").css("display", "block");
                //     $(this).find(".hpSecondSecond").animate({
                //         right: "465px"
                //     })
                // } else {
                //     count = 0;
                //     $(this).find(".hpSecondSecond").fadeOut(200);
                //     $(this).find(".hpSecondSecond").animate({
                //         right: 0
                //     })
                // }
            } else {
                alert("您还未登录！");
            }

        }
    })

    //#endregion

    //#region 我的问答 √

    //#region 切换为我的回答

    $('#hoverBox_answer').click(function() { //去右边
        console.log("right");
        $(this).siblings(".activeLine").addClass("toRight");
        $(this).siblings(".activeLine").removeClass("toLeft");
        $(this).css('fontWeight', '700');
        $(this).siblings('span').css("fontWeight", '400');
        $(".myCue").fadeOut();
        $(".myAns").fadeIn();
        // $('.hoverBox .title').html($(this).html())
        //发送请求
    })

    $('#hoverBox_request').click(function() { //去左边
        console.log("left");
        $(this).siblings(".activeLine").addClass("toLeft");
        $(this).siblings(".activeLine").removeClass("toRight");
        $(this).css('fontWeight', '700');
        $(this).siblings('span').css("fontWeight", '400');
        $(".myAns").fadeOut();
        $(".myCue").fadeIn();
        // $('.hoverBox .title').html($(this).html())
        //发送请求
    })

    //#endregion

    $(".myQAY").on({
        click: function() {
            if (USERID != null) {

                //#region 获取我的提问 √

                // var next = true;
                // while (next) {

                $.get('http://localhost:8080/Servlet/MainPageServlet', {
                    requestType: 'get',
                    getType: "special",
                    authorMarkNumber: USERID,
                }, function(res) {
                    $(".myCue").html("");
                    // console.log("我的提问");
                    // console.log(res);
                    // next = res.next;

                    //#region 动态创建 我的提问

                    for (var i = 0; i < res.dataList.length; i++) {
                        var li = $('<li class="item"></li>');
                        // var contenturl = 'html/questionPage.html?id=' + data.id;
                        var a = $('<a href="questionPage.html?id="' + res.dataList[i].id + '></a>');
                        var title = $("<div class='problem_title' title='" + res.dataList[i].title + "'>" + res.dataList[i].title + "</div>");
                        var remark = $("<div class='problem_remark_answer' title='" + res.dataList[i].contents[0].contentMain + "'>" + res.dataList[i].contents[0].contentMain + "</div>")

                        var time = $("<div class='time_box'><span class='time'>" + res.dataList[i].timeUpToNow + "</span></div>")

                        $(".contentBox_request").find(".myCue").prepend(li);
                        $(".contentBox_request").find(".myCue").find("li").eq(0).append(a);
                        $(".contentBox_request").find(".myCue").find("li").eq(0).find("a").append(title);
                        $(".contentBox_request").find(".myCue").find("li").eq(0).find("a").append(remark);
                        $(".contentBox_request").find(".myCue").find("li").eq(0).find("a").append(time);

                    }

                    //#endregion

                }, 'json')

                // }
                //#endregion

                //#region 获取我的问题 √

                $.get('http://localhost:8080/Servlet/AnswerServlet', {
                    requestType: 'get',
                    getAnswerType: "individual",
                    markNumber: USERID,
                    currentPage: "1",
                }, function(res) {
                    // console.log(res);
                    $(".myAns").html("");
                    //#region 动态创建 我的回答

                    for (var i = 0; i < res.dataList.length; i++) {
                        var li = $('<li class="item"></li>');
                        // var contenturl = 'html/questionPage.html?id=' + data.id;
                        var a = $('<a href="questionPage.html?id="' + res.dataList[i].questionId + '></a>');
                        var title = $("<div class='problem_title'>" + res.dataList[i].title + "</div>");
                        var remark = $("<div class='problem_remark_answer'></div>");

                        var time = $("<div class='time_box'><span class='time'>" + res.dataList[i].timeUpToNow + "</span></div>");
                        $(".contentBox_request").find(".myAns").prepend(li);
                        $(".contentBox_request").find(".myAns").find("li").eq(0).append(a);
                        $(".contentBox_request").find(".myAns").find("li").eq(0).find("a").append(title);
                        $(".contentBox_request").find(".myAns").find("li").eq(0).find("a").append(remark);
                        $(".contentBox_request").find(".myAns").find("li").eq(0).find(".problem_remark_answer").html(res.dataList[i].contents[0].contentMain);
                        $(".contentBox_request").find(".myAns").find("li").eq(0).find(".problem_remark_answer").attr("title", $(".contentBox_request").find(".myAns").find("li").eq(0).find(".problem_remark_answer").text());
                        $(".contentBox_request").find(".myAns").find("li").eq(0).find("a").append(time);

                    }

                    //#endregion

                }, 'json')

                //#endregion

            } else {
                alert("您还未登录！");
            }
        }
    })

    //#endregion

    //#endregion

    //#region 鼠标悬停 | 点击 头像 出现二级导航  点击 二级导航的 li 再出现二级导航

    $(".headPortrait").on({
        click: function(e) {
            count = 1;
            e.stopPropagation();
            //出现二级导航 二二级导航消失
            $(".hpSecond").css("borderRadius", "22px");

            $(".hpSecondSecond").fadeOut(50);
            $(".hpSecondSecond").animate({
                right: 0
            })
            $(this).find(".hpSecond").css("display", "block");

        }
    })

    $(".hpSecond>div").on({
        click: function(e) {
            //出现二二级导航：字体icon变蓝 + 二级导航的边框变
            e.stopPropagation();

            $(this).siblings().find(".iconfont").css('color', '#000');
            $(this).find(".iconfont").css('color', '#02a7f0');
            $(this).siblings().find("em").css('color', '#000');
            $(this).find('em').css('color', '#02a7f0');
            // $(".hpSecond").css("borderRadius", "0 22px 22px 0");
            $(this).find(".hpSecondSecond .hoverBox").css("borderRadius", " 22px 0 0 22px");

            if (USERID != null) {
                count = 0;
                if (count == 0) {
                    $(".hpSecond").css("borderRadius", "0 22px 22px 0");

                    count = 1;
                    $(this).siblings().find(".hpSecondSecond").fadeOut(100);
                    $(this).siblings().find(".hpSecondSecond").animate({
                        right: 0,
                    });

                    // $(this).siblings().find(".hpSecondSecond").css("display", "none");

                    $(this).find(".hpSecondSecond").css("display", "block");
                    $(this).find(".hpSecondSecond").animate({
                        right: "465px",
                    })

                } else {
                    count = 0;
                    $(this).find(".hpSecondSecond").fadeOut(200);
                    $(this).find(".hpSecondSecond").animate({
                        right: 0,
                    })
                    $(".hpSecond").css("borderRadius", "22px");

                }
            } else {
                alert("您还未登录");
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

    //#region 退出登录

    $(".exitLogonY").on({
        click: function() {
            USERID = null;
            $(".personal").show(100);
            $(".logonHeadPortrait").hide(100);
            $(".system").html("");
            $(".private").html("");
            $(".myAttention").html("");
            $(".attentionMe").html("");
            $(".myCue").html("");
            $(".myAns").html("");
            $(".mycollection").html("");
            clearCookie();
            sentenceIsLogon(); //问题页面判断是否登录
        }
    })

    //#endregion

})

// #region  远安增加代码，实现加载判断是否最近登录过
$(window).on("load", function() {    
    console.log("加载用户信息");
    if (getCookie("markNumber") != null && getCookie("markNumber") != undefined && getCookie("userName") != null && getCookie("userName") != undefined && getCookie("face") != undefined && getCookie("face") != null) {         // alert("加载用户信息")
                
        $('.modal_bg').fadeOut();  // 其实就是css 的过渡+ display
                
        $('.modal').css({
            transform: 'translate(-50%,-50%) scale(0.7)'
        });        
        $('.personal').hide(100);
        $('.logonHeadPortrait').show(100);         // console.log(res);
                
        $('.ResUserName').text(getCookie("userName")[2]);
        $('.ResUserName').prop("title", getCookie("userName")[2]);
        $('.ResMarkNumber').text(getCookie("markNumber")[2]);
        $('.ResMarkNumber').prop("title", getCookie("markNumber")[2]);         // console.log(res.markNumber);
                
        USERID = getCookie("markNumber")[2];
        $('.ResMessagePojoMajor').text(getCookie("major")[2]);
        $('.ResMessagePojoMajor').prop("title", getCookie("major")[2]);         // if (res.messagePojo.face != null) {
                
        let ResMessageFaceScr = 'http://localhost:8080' + getCookie("face")[2].substring(2);
        $('.ResMessageFace').prop("src", ResMessageFaceScr);
        $('.navHPY').prop('src', ResMessageFaceScr);
    } else {
        $('.personal').show(100);    
    }    
})

//#endregion