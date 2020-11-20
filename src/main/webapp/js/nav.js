window.onload = function() {

    //#region 清空搜索框内的内容 √

    $(".search .searchBar").val("");

    //#endregion
}



function setCookie(json, time) {
    for (var key in json) {
        // console.log(key);
        // console.log(json[key]);
        $.cookie(key, json[key], { expires: time });
        // console.log($.cookie(key));
    }
}
// function setCookie(json, day) {
//     var date = new Date(new Date().getTime() + day * 24 * 60 * 60 * 1000).toUTCString(); //转毫秒
//     for (var key in json) {
//         document.cookie = key + "=" + json[key] + ";expires=" + date;
//         console.log($.cookie("key"));
//     }
// }

function isHaveCookie() {
    console.log($.cookie("userName"));

    if ($.cookie("markNumber") != null && $.cookie("markNumber") != undefined &&
        $.cookie("userName") != null && $.cookie("userName") != undefined &&
        $.cookie("face") != undefined && $.cookie("face") != null) {
        return true;
    }
    return false;
}

var USERID;
var USERIMG;

function clearCookie() {
    $.removeCookie("area");
    $.removeCookie("college");
    $.removeCookie("email");
    $.removeCookie("face");
    $.removeCookie("id");
    $.removeCookie("level");
    $.removeCookie("major");
    $.removeCookie("password");
    $.removeCookie("markNumber");
    $.removeCookie("sex");
    $.removeCookie("userName");
}

$(function() {

    //头像那边的二级导航 ：0 没显示  1 表示已经显示

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

            // $(".message").find(".messageNotification").fadeOut(100);

            //#endregion

            //#region 头像那边的二级导航: 二级导航+二二级4导航:淡出 字体颜色: #666

            // $('.hpSecond').fadeOut(100);

            // $(".hpSecond_general").css("borderRadius", "22px");


            // $(".hpSecondSecond").fadeOut(50);
            // $(".hpSecondSecond").animate({
            //     right: 0
            // })

            //#endregion
        }
    })

    //#region 点击上面校区互通 √

    $('.campus-li').on({
        click: function() {
            $("body, html").stop().animate({
                scrollTop: "600px",
            });
        }
    })

    //#endregion

    //#region 搜索框 √

    //#region  卷去页面 导航栏发生变化 √

    // $(window).scroll(function() {

    //     if ($(document).scrollTop() >= 433) {
    //         $(".nav .functionNav").show(200);
    //         $(".nav .search").css("left", "61%");

    //     } else {
    //         $(".nav .functionNav").hide(200);

    //         $(".nav .search").css("left", "50%");
    //     }
    // })

    //#endregion

    //#region 点击 + 得失焦点 + 节流 √ 

    $(".search").on({
        click: function(e) {
            e.stopPropagation();
        }
    })

    $(".nav").find(".searchBar").on({

        focus: function() {
            //搜索框获得焦点 bar/btn 的边框圆角 变化 + bar 的背景 变白 + 联想内容 显示
            // $(".searchBar").css("borderRadius", "40px 0 0 0");
            // $(".searchBtn").css("borderRadius", "0 40px 0 0");
            // $(this).css("backgroundColor", "#fff");
            // $(this).parent().siblings(".searchContent").show(200);
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

        //#endregion
    })

    //#region 节流
    $(".nav").find(".searchBar").bind("keyup", debounce(function() {
        //键盘抬起事件 + val() 非空 发送请求 
        // console.log($(this).val());
        if ($(this).val() != null || $(this).val() != "") {
            //搜索框获得焦点 bar/btn 的边框圆角 变化 + bar 的背景 变白 + 联想内容 显示
            $(".searchBar").css("borderRadius", "16px 0 0 0");
            $(".searchBtn").css("borderRadius", "0 16px 0 0");
            $(this).css("backgroundColor", "#fff");
            $(this).parent().siblings(".searchContent").show(200);
        } else {
            $(".searchBar").css("borderRadius", "40px 0 0 40px");
            $(".searchBtn").css("borderRadius", "0 40px 40px 0");
            $(this).css("backgroundColor", "rgba(255, 255, 255, 0.5)");
            $(this).parent().siblings(".searchContent").hide(200);
        }
        if ($(this).val() != "") {
            $.get('../Servlet/MainPageServlet', {
                requestType: 'get',
                getType: "explore",
                exploreContent: $(this).val(),
            }, function(res) {
                // console.log(res);
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

    //#region  登录 + 获取 消息 关注 问答 收藏 + 退出登录

    //#region 点击登录button进入登录弹框 √

    $('.personal .fadein').click(function() {
        // $("input").val("");
        $(".logOn").siblings().fadeOut();
        $(".logOn").fadeIn();
        $(".modal_bg_logon").fadeIn(); //远安修改代码 解决类名冲突
        // $('.modal_bg').fadeIn();
        $('.modal').css({
            transform: 'translate(-50%,-50%) scale(1)'
        })
    })


    // 登录面板
    $('.modal_bg_logon .fadeout').click(function() {
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
            displayTipPane('用户名/密码不能为空');
        } else {
            $.get('../Servlet/UserServlet', {
                password: pwd,
                loginValue: account,
                requestType: 'get',
                userType: type
            }, function(res) {
                if (res.statusCode == 200) {

                    // console.log(res.messagePojo)
                    // clearCookie(); //清除cookie
                    setCookie(res.messagePojo, 10); //保存30天

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
                    let ResMessageFaceScr = res.messagePojo.face;
                    $('.ResMessageFace').prop("src", ResMessageFaceScr);
                    $('.navHPY').prop('src', ResMessageFaceScr);
                    // } else {
                    //     let ResMessageFaceScr = "img/InitialPortrait.jpg";
                    //     $('.ResMessageFace').prop("src", ResMessageFaceScr);
                    //     $('.navHPY').prop('src', ResMessageFaceScr);
                    // }

                    //#endregion
                    //#region 生成websocket对象
                    initialWebSocket();
                   

                    //#endregion

                } else {
                    displayTipPane('账号或密码有误，登录失败！');
                }
            }, 'json')
        }
    })

    //#endregion

    //#region 消息通知 √ 

    // 逻辑上有混乱，应该是打开的时候只发送动态通知的请求，并且只有第一次会有请求，
    //当切换到私信通知的时候才发送获取私信的请求，并且显示的item应该是一个用户不是显示发送过来的具体新消息


    var message_openFirst = true;
    $(".message").on({
        mouseenter: function(e) {
            e.stopPropagation();

            // console.log(111);

            if (USERID != null) {
                $('.message').find(".messageNotification").stop().fadeIn();
                // $('.message').find('.messageNotification').css('display', 'block');

                //#region 获取动态通知

                if (message_openFirst) {
                    message_openFirst = false;
                    $.get('../Servlet/InfServlet', {
                            currentPage: "1",
                            receiverMarkNumber: USERID,
                            order: "sendTime",
                            direction: "desc",
                            requestType: 'get',
                            type: "inf",
                        }, function(res) {
                            $(".system").html("");
                            // console.log(res);
                            //#region 动态创建  消息通知
                            for (var i = res.dataList.length - 1; i > 0; i--) {

                                var item = $("<li class='item'></li>");
                                var src = res.dataList[i].senderFace;
                                var img = $("<img src='" + src + "'>");
                                var svg = $("<svg class='info_point' class='icon' height='10' p-id='12380' t='1602330426902' version='1.1' viewBox='0 0 1024 1024' width='10' xmlns='https://www.w3.org/2000/svg'><path d='M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z' fill='#E6A23C' p-id='12381'></svg>");
                                var username = $("<span class='userName itemTitle' title='" + res.dataList[i].senderName + "'>" + res.dataList[i].senderName + "</span>");
                                var information = $("<span class='item_info' title='" + res.dataList[i].content + "'>" + res.dataList[i].content + "</span>");
                                var time = $("<span class='time'>" + res.dataList[i].timeUpToNow + "</span>");

                                $(".message .contentBox_information").find(".system").prepend(item);
                                $(".message .contentBox_information").find(".system").find(".item").eq(0).append(img);
                                $(".message .contentBox_information").find(".system").find(".item").eq(0).append(svg);
                                $(".message .contentBox_information").find(".system").find(".item").eq(0).append(username);
                                $(".message .contentBox_information").find(".system").find(".item").eq(0).append(information);
                                $(".message .contentBox_information").find(".system").find(".item").eq(0).append(time);

                            }


                          

                        }, 'json')
                        //#region 聊天
                }
                
            } else {
                displayTipPane("你还没登录噢~");
            }
        }
    })
    $(".message").on({
            mouseleave: function(e) {
                e.stopPropagation();
                $('.message').find(".messageNotification").stop().fadeOut();
            }
        })
        //#region 效果

    // 消息同学
    //去右边，私信
    $('.message #hoverBox_privateMessage').on({
        click: function() {
            // console.log("right");
            $(this).siblings(".activeLine").addClass("toRight");
            $(this).siblings(".activeLine").removeClass("toLeft");
            $(this).css('fontWeight', '700');
            $(this).siblings('span').css("fontWeight", '400');
            $(".system").fadeOut();
            $(".private").fadeIn();
            // $('.hoverBox .title').html($(this).html())
            //#region 获取私信通知
            var send = new Array();
            var pindex;
            var isRead = true;
            $.get('../Servlet/InfServlet', {
                currentPage: "1",
                receiverMarkNumber: USERID,
                order: "sendTime",
                direction: "desc",
                requestType: 'get',
                type: "chat",
            }, function(res) {
                $(".private").html("");
                // console.log(res);

                //#region 动态创建  消息私信
                pindex = 0;

                // for (var total = res.totalPage.length - 1; total > 0; total--) {

                for (var i = res.dataList.length - 1; i > 0; i--) {
                    var src = res.dataList[i].senderFace;
                    var item = $("<li class='item chatBtn' target='"+res.dataList[i].senderMarkNumber+"' targetName='"+res.dataList[i].senderName+"' data-pindex='" + pindex + "'></li>");
                    var img = $("<img src='" + src + "'>");
                    var svg = $("<svg class='info_point' class='icon' height='10' p-id='12380' t='1602330426902' version='1.1' viewBox='0 0 1024 1024' width='10' xmlns='https://www.w3.org/2000/svg'><path d='M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z' fill='#E6A23C' p-id='12381'></svg>");
                    var username = $("<span class='userName itemTitle' title='" + res.dataList[i].senderName + "'>" + res.dataList[i].senderName + "</span>");
                    var information = $("<span class='item_info' title='" + res.dataList[i].content + "'>" + res.dataList[i].content + "</span>");
                    var time = $("<span class='time'>" + res.dataList[i].timeUpToNow + "</span>");
                    $(".message .contentBox_information").find(".private").prepend(item);
                    $(".message .contentBox_information").find(".private").find(".item").eq(0).append(img);
                    $(".message .contentBox_information").find(".private").find(".item").eq(0).append(svg);
                    $(".message .contentBox_information").find(".private").find(".item").eq(0).append(username);
                    $(".message .contentBox_information").find(".private").find(".item").eq(0).append(information);
                    $(".message .contentBox_information").find(".private").find(".item").eq(0).append(time);

                    send[pindex] = {
                        'senderMarkNumber': res.dataList[i].senderMarkNumber,
                        'senderFace': res.dataList[i].senderFace,
                        'senderName': res.dataList[i].senderName,
                    }

                    // if (res.dataList[i].isRead == 0) {
                    //     isRead = false;
                    // }
                    pindex++;
                }

                // $(".icondian").css("diaplay", "block");
                // }
                //#endregion

                // console.log(send);


                //加载完item后绑定点击打开聊天面板事件
                $(".chatBtn").off("click");
                $(".chatBtn").on("click", function () {
                    wantToSendMarkNumber = $(this).attr("target");
                    wsUrl = url + '/' + myMarkNumber + '/' + wantToSendMarkNumber;
                    //重新连接WebSocket
                  
                    //用户名
                    $(".platform_chat .targetName").text($(this).attr("targetName"));
                    if (lastTarget != null && lastTarget != $(this).attr("target")) {
                      ulNode.innerHTML = "";
                    }
                    lastTarget = $(this).attr("targetName");
                  
                    $(".platform_chat").fadeIn();
                  
                    //这次的webSocket是有发送目标的
                    createWebSocket1();
                  });
            }, 'json')

            //#endregion

        }
    })

    //去左边,动态
    $('.message #hoverBox_dynamicMessage').on({
        click: function() {
            // console.log("left");
            $(this).siblings(".activeLine").addClass("toLeft");
            $(this).siblings(".activeLine").removeClass("toRight");
            $(this).css('fontWeight', '700');
            $(this).siblings('span').css("fontWeight", '400');
            $(".private").fadeOut();
            $(".system").fadeIn();
            // $('.hoverBox .title').html($(this).html())
            $.get('../Servlet/InfServlet', {
                currentPage: "1",
                receiverMarkNumber: USERID,
                order: "sendTime",
                direction: "desc",
                requestType: 'get',
                type: "inf",
            }, function(res) {
                $(".system").html("");
                // console.log(res);

                // 动态创建  消息通知
                for (var i = res.dataList.length - 1; i > 0; i--) {

                    var item = $("<li class='item'></li>");
                    var src = res.dataList[i].senderFace;
                    var img = $("<img src='" + src + "'>");
                    var svg = $("<svg class='info_point' class='icon' height='10' p-id='12380' t='1602330426902' version='1.1' viewBox='0 0 1024 1024' width='10' xmlns='https://www.w3.org/2000/svg'><path d='M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z' fill='#E6A23C' p-id='12381'></svg>");
                    var username = $("<span class='userName itemTitle' title='" + res.dataList[i].senderName + "'>" + res.dataList[i].senderName + "</span>");
                    var information = $("<span class='item_info' title='" + res.dataList[i].content + "'>" + res.dataList[i].content + "</span>");
                    var time = $("<span class='time'>" + res.dataList[i].timeUpToNow + "</span>");

                    $(".message .contentBox_information").find(".system").prepend(item);
                    $(".message .contentBox_information").find(".system").find(".item").eq(0).append(img);
                    $(".message .contentBox_information").find(".system").find(".item").eq(0).append(svg);
                    $(".message .contentBox_information").find(".system").find(".item").eq(0).append(username);
                    $(".message .contentBox_information").find(".system").find(".item").eq(0).append(information);
                    $(".message .contentBox_information").find(".system").find(".item").eq(0).append(time);
                }
            })
        }
    })

    //#endregion

    //#endregion

    //#region 我的关注 √

    $(".attention").on({

        click: function() {
            //#region 获取我的关注 √ 
            if (USERID != null) {
                //显示二级导航

                $.get('../Servlet/AttentionServlet', {
                    requestType: 'get',
                    majorMarkNumber: USERID,
                    attentionType: "major",
                    currentPage: "1",
                    direction: "asc",
                    order: "id",
                }, function(res) {
                    $(".myAttention").html("");
                    // console.log(res);

                    //#region 动态创建 我的关注
                    for (var i = 0; i < res.dataList.length; i++) {

                        //    console.log(res.dataList[i]);
                        var json = {
                            userFace: res.dataList[i].userFace,
                            userName: res.dataList[i].userName,
                            action: "turnOff",
                            isSubscribe: "subscribe_on"
                        }
                        if (res.dataList[i].userType == "student") {
                            json["status"] = "学生";
                            json["school_info"] = res.dataList[i].major;
                        } else {
                            json["status"] = "老师";
                            json["school_info"] = res.dataList[i].collage;
                        }
                        var item = template("attentionItem_template", json);
                        $(".myAttention").append(item);
                    }
                    //#endregion

                    //还没关注之前，点击后发送关注请求，并且成功后把状态变成关注，点亮
                    //如果当前是已关注，title为取消关注

                    // 点击关注按钮，并且是当前状态为turnON ，就发送请求发送关注，如果为turnOff就发送取消关注请求

                    $('.hoverBox .contentBox_subscribe .item .subscribe').click(function() {
                        if ($(this).attr("nextAction") === 'turnOn') {
                            //发送关注请求
                            $(this).find('svg path').css("fill", "#ff7800");
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

                }, 'json')
            } else {
                displayTipPane("您还未登录！");
            }
            //#endregion

            //#region 获取关注我的 √ 

            if (USERID != null) {

                $.get('../Servlet/AttentionServlet', {
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
                        // console.log(res.dataList[i]);
                        var json = {
                            userFace: res.dataList[i].userFace,
                            userName: res.dataList[i].userName,
                            action: "turnOn",
                            isSubscribe: "subscribe_off"
                        }
                        if (res.dataList[i].userType == "student") {
                            json["status"] = "学生";
                            json["school_info"] = res.dataList[i].major;
                        } else {
                            json["status"] = "老师";
                            json["school_info"] = res.dataList[i].collage;
                        }
                        var item = template("attentionItem_template", json);
                        $("ul.attentionMe").append(item);
                    }
                    //#endregion
                }, 'json')
            } else {
                displayTipPane("您还未登录！");
            }
            //#endregion
        }
    })


    // 我的关注
    //去右边
    $('#hoverBox_fans').click(function() {
        // console.log("right");
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
        // console.log("left");
        $(this).siblings(".activeLine").addClass("toLeft");
        $(this).siblings(".activeLine").removeClass("toRight");
        $(this).css('fontWeight', '700');
        $(this).siblings('span').css("fontWeight", '400');
        $(".myAttention").fadeIn();
        $(".attentionMe").fadeOut();
        // $('.hoverBox .title').html($(this).html())
        //发送请求
    })

    //#region 效果

    //刚打开悬浮板，就发送

    //#region 切换为我的回答

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
                displayTipPane("您还未登录！");
            }

        }
    })

    //#endregion

    //#region 我的问答 √

    //#region 切换为我的回答

    $('#hoverBox_answer').click(function() { //去右边
        // console.log("right");
        $(this).siblings(".activeLine").addClass("toRight");
        $(this).siblings(".activeLine").removeClass("toLeft");
        $(this).css('fontWeight', '600');
        $(this).siblings('span').css("fontWeight", '400');
        $(".myCue").fadeOut();
        $(".myAns").fadeIn();
        // $('.hoverBox .title').html($(this).html())
        //发送请求
    })

    $('#hoverBox_request').click(function() { //去左边
        // console.log("left");
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

                $.get('../Servlet/MainPageServlet', {
                    requestType: 'get',
                    getType: "special",
                    authorMarkNumber: USERID,
                }, function(res) {
                    $(".myCue").html("");

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

                $.get('../Servlet/AnswerServlet', {
                    requestType: 'get',
                    getAnswerType: "individual",
                    markNumber: USERID,
                    currentPage: "1",
                }, function(res) {
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
                displayTipPane("您还未登录！");
            }
        }
    })

    //#endregion

    //#endregion

    //#region 鼠标悬停 | 点击 头像 出现二级导航  点击 二级导航的 li 再出现二级导航

    // $(".headPortrait").on({
    //     click: function(e) {
    //         count = 1;
    //         e.stopPropagation();
    //         //出现二级导航 二二级导航消失
    //         $(".hpSecond").css("borderRadius", "22px");
    //         $(".hpSecondSecond").fadeOut(50);
    //         $(".hpSecondSecond").animate({
    //             right: 0
    //         })
    //         $(this).find(".hpSecond").css("display", "block");

    //     }
    // })

    // 二级面板的位置动态给变
    $(window).on("resize", function() {
        // console.log($(".hpSecond").css("width"));
        $(".hpSecondSecond").css("right", $(".hpSecond").css("width"))
    })

    $(".hpSecond .secondPane_entrance").on({
        click: function(e) {
            //出现二二级导航：字体icon变蓝 + 二级导航的边框变
            e.stopPropagation();
            $(this).siblings().find(".iconfont").css('color', '#666');
            $(this).find(".iconfont").css('color', '#028e9b');
            $(this).siblings().find("em").css('color', '#666');
            $(this).find('em').css('color', '#028e9b');
            //根据target自定义属性名再通过类名来获取对应的二级面板


            var secondPane = $("." + $(this).attr("target"));
            if (secondPane == null || secondPane == undefined) {
                return;
            }
            var generalPane = $(this).parents(".hpSecond_general");
            // $(".hpSecond").css("borderRadius", "0 22px 22px 0");
            //打开二级面板的左边圆角
            //每次打开之前恢复原来状态
            $(".hpSecondSecond").fadeOut(); //全部的二级面板
            $(".hpSecondSecond").animate({
                right: "0"
            }, 100);

            secondPane.css("borderRadius", "22px");
            generalPane.css("borderRadius", "22px");
            generalPane.css("border-left-color", "#5ec4cd")

            if (generalPane.attr("nowSecondPane") == "null") {
                generalPane.attr("nowSecondPane", $(this).attr("target"));
            }
            if (generalPane.attr("status") == "open") {
                //初始化
                //点击原来按钮
                if (generalPane.attr("nowSecondPane") == $(this).attr("target")) {
                    generalPane.attr("status", "close");
                    // console.log("收起")
                    return;
                } else { //点击别的按钮
                    generalPane.attr("nowSecondPane", $(this).attr("target"));
                }

            }
            generalPane.attr("status", "open");
            if (USERID != null) {
                //count是实现点击一次按钮打开二级面板，再次点击就关闭
                // 原面板的右边圆角
                secondPane.css("borderRadius", "22px 0 0 22px");
                generalPane.css("borderRadius", "0 22px 22px 0");
                generalPane.css("border-left-color", "#fff");
                // 所有的二级面板消失
                // $(this).siblings().find(".hpSecondSecond").css("display", "none");
                secondPane.css("display", "block");
                // 不能写死，应该获取个人中心面板的宽度
                var right = $(".hpSecond_general").outerWidth();
                secondPane.animate({
                    right: right + "px",
                }, 300);
            } else {
                displayTipPane("您还未登录");
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

    //#region 退出登录 √

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
            closeWebSocket();
            //问题页面判断是否登录
        }
    })

    //#endregion

})

// #region  远安增加代码，实现加载判断是否最近登录过
$(window).on("load", function() {    
    // console.log("加载用户信息");
    if ($.cookie("markNumber") != null && $.cookie("markNumber") != undefined && $.cookie("userName") != null && $.cookie("userName") != undefined && $.cookie("face") != undefined && $.cookie("face") != null) {         // displayTipPane("加载用户信息")
                
        $('.modal_bg').fadeOut();  // 其实就是css 的过渡+ display
                
        $('.modal').css({
            transform: 'translate(-50%,-50%) scale(0.7)'
        });        
        $('.personal').hide(100);
        $('.logonHeadPortrait').show(100);         // console.log(res);
                
        $('.ResUserName').text($.cookie("userName"));
        $('.ResUserName').prop("title", $.cookie("userName"));
        $('.ResMarkNumber').text($.cookie("markNumber"));
        $('.ResMarkNumber').prop("title", $.cookie("markNumber"));         // console.log(res.markNumber);
                
        USERID = $.cookie("markNumber");
        $('.ResMessagePojoMajor').text($.cookie("major"));
        $('.ResMessagePojoMajor').prop("title", $.cookie("major"));         // if (res.messagePojo.face != null) {
                
        let ResMessageFaceScr = $.cookie("face");
        $('.ResMessageFace').prop("src", ResMessageFaceScr);
        $('.navHPY').prop('src', ResMessageFaceScr);
        initialWebSocket();
    } else {
        $('.personal').show(100);    
    }    
})

//#endregion


var myMarkNumber = "191543214";//要获取cookie
var wantToSendMarkNumber = "123456789";//随便写一个，目的是与服务进行连接
var url = "ws://192.168.137.105:8080/WebSocket";
var wsUrl //点击某一个私信后重新修改
var ws;
var tt;
var ulNode = document.getElementById("ulNode");
var screen_inner = document.getElementById("screen_inner");

// initialWebSocket();//首次与服务器进行连接

// 退出登录调用
function closeWebSocket() {
  ws.close();
  $(".platform_chat").fadeOut();
}

var lastTarget = null;
// 开始聊天,点击私信进行连接
$(".chatBtn").on("click", function () {
  wantToSendMarkNumber = $(this).attr("target");
  wsUrl = url + '/' + myMarkNumber + '/' + wantToSendMarkNumber;
  //重新连接WebSocket

  //用户名
  $(".platform_chat .targetName").text($(this).attr("targetName"));
  if (lastTarget != null && lastTarget != $(this).attr("target")) {
    ulNode.innerHTML = "";
  }
  lastTarget = $(this).attr("targetName");

  $(".platform_chat").fadeIn();

  //这次的webSocket是有发送目标的
  createWebSocket1();
});

//历史记录
function loadHistoryInfo(target) {//获取与某一个人的具体历史信息，target的对方的markNumber
  //遍历，添加
}

// 消息发送
//文本的发送，回车键或者点击发送按钮进行发送
//表情是点击某一个表情，发送一个表情图片地址,表情需要限制尺寸大小
//图片需要上传图片，上传完后发送的还是图片的地址


// 文本发送
function getTextInfo() {
  //判空处理
  var reg = /^\s*$/
  if (reg.test($(".platform_chat textarea").val())) {
    displayTipPane("输入文本不能为空！")
    $(".platform_chat textarea").val("");
    return null;
  }
  var date = new Date();
  var sendTime = date.getTime();
  var textInfo = {
    "senderMarkNumber": myMarkNumber,
    "senderFace": $.cookie("face"),
    "senderName": $.cookie("userName"),
    "contentType": "text",
    "sendTime": "" + sendTime,
    "content": $(".platform_chat textarea").val()
  }
  $(".platform_chat textarea").val("");
  return textInfo;
}

function sendText() {
  var textInfo = getTextInfo();
  if (textInfo != null) {//非空
    addSend(textInfo);
    ws.send(JSON.stringify(textInfo));//发送json对象
  }
}

// 点击发送按钮
$(".platform_chat input[type='button']").on("click", function () {
  sendText();
  $(".platform_chat textarea").val("")
  // displayTipPane("发送文本")
})

//回车键发送
$(".platform_chat textarea").on("keydown", function (e) {

  if (e.keyCode == 13 || e.keyCode == 108) {
    sendText();
    e.preventDefault()
    $(".platform_chat textarea").val("")
  }
})




//表情发送, 鼠标点击某一个表情时触发函数
function setFaceEventListener() {
  var date = new Date();
  var sendTime = date.getTime();
  var faceInfo = {
    "senderMarkNumber": myMarkNumber,
    "senderFace": $.cookie("face"),
    "senderName": $.cookie("userName"),
    "contentType": "face",
    "sendTime": "" + sendTime,
    "content": $(this).attr("src")
  }

  addSend(faceInfo);
  ws.send(JSON.stringify(faceInfo));
}


//图片发送
//上传图片
//成功后发送消息


//读取图片文件 

$('.platform_chat .picture').click(() => {
  if (sendingImg) {
    displayTipPane("有图片正在上传中...");
  } else {
    $('#sendImgBtn').click();
  }
})
$('#sendImgBtn').change(readFile_chat);
//读图片，添加到输入框中
var oinput = document.getElementById("sendImgBtn");

//读取文件
function readFile_chat() {
  var formdata = new FormData();
  if (!oinput['value'].match(/.jpg|.gif|.png|.jpeg|.bmp/i)) {　　 //判断上传文件格式
    return displayTipPane("图片格式有误！");
  }

  formdata.append(0, this.files[0]); // formdata 的属性
  //成功后上传图片
  sendImage_chat(formdata);
}

var sendingImg = false;
function sendImage_chat(formdata) {
  sendingImg = true;
  $.ajax({
    url: 'http://192.168.137.105:8080/Servlet/ReceiveFileServlet',
    type: 'post',
    data: formdata,
    dataType: 'json',
    processData: false, //用FormData传fd时需有这两项
    contentType: false,
    success: function (data) {
      sendingImg = false;
      // imgObj.attr("src", data.message);
      //图片上传成功后拿取返回的url
      sendImg_chatContent(data.message);
    },
    error: function (data) {
      sendingImg = false;
      displayTipPane("图片上传失败！")
    },
    timeout: function (data) {
      sendingImg = false;
      displayTipPane("图片上传超时！")
    }
  })
}


//发送图片信息
function sendImg_chatContent(url) {
  var date = new Date();
  var sendTime = date.getTime();
  var imgInfo = {
    "senderMarkNumber": myMarkNumber,
    "senderFace": $.cookie("face"),
    "senderName": $.cookie("userName"),
    "contentType": "img",
    "sendTime": "" + sendTime,
    "content": url
  }
  addSend(imgInfo);
  ws.send(JSON.stringify(imgInfo));
}

// img是css查询条件
function isImgLoad(callback, img) {
  $(img).each(function () {
    if (this.height === 0) {
      isLoad = false;
      return false;
    }
  });
  if (isLoad) {
    clearTimeout(t_img);
    callback();
  } else {
    isLoad = true;
    t_img = setTimeout(function () {
      isImgLoad(callback);
    }, 100)
  }
}

// 添加接受的消息函数
function addReceived(data) {
  // displayTipPane(data);
  //判断data类型 img | text
  // console.log(data);
  data = JSON.parse(data);
  // console.log(data);

  var liNode = document.createElement("li");
  liNode.classList.add("target");
  if (data.contentType == "text") {
    liNode.innerHTML = '<img class="profile" src="' + data.senderFace + '"><span class="text">' + data.content + '</span>';
  } else if (data.contentType == "face") {//表情,大小有限制
    liNode.innerHTML = '<img class="profile" src="' + data.senderFace + '"><span class="text"><img src="' + data.content + '" height="28px"></span>';
  } else if (data.contentType == "img") {//图片，大小有限制，但是比表情大一点
    // data.content = "http://192.168.137.105:8080"+data.content.substring(2);
    liNode.innerHTML = '<img class="profile" src="' + data.senderFace + '"><span class="text"><img  src="' + data.content + '" style="max-width:130px; margin:5px;border-radius:4px;cursor:zoom-in;cursor:-webkit-zoom-in" class="fadein_img"></span>';
    ulNode.appendChild(liNode);
    // var oImg = liNode.getElementsByTagName("img")[0];
    rebindSeeImage();
    isImgLoad(function () {
      screen_inner.scrollTop = screen_inner.scrollHeight - screen_inner.clientHeight;
    }, liNode.getElementsByTagName("img"));
    return;
  }
  ulNode.appendChild(liNode);
  screen_inner.scrollTop = screen_inner.scrollHeight - screen_inner.clientHeight;
}
//添加发送的出去的消息
function addSend(data) {
  // displayTipPane(data);
  //判断data类型 img | text
  var liNode = document.createElement("li");
  liNode.classList.add("me");

  if (data.contentType == "text") {
    liNode.innerHTML = '<span class="text">' + data.content + '</span><img class="profile" src="' + data.senderFace + '">';
  } else if (data.contentType == "face") {//表情,大小有限制
    liNode.innerHTML = '<span class="text"><img src="' + data.content + '" height="28px"></span><img class="profile" src="' + data.senderFace + '">';

  } else if (data.contentType == "img") {//图片，大小有限制，但是比表情大一点

    data.content = "http://192.168.137.105:8080" + data.content.substring(2);
    liNode.innerHTML = '<span class="text"><img  src="' + data.content + '" style="max-width:130px; border-radius:4px; margin:5px;cursor:zoom-in;cursor:zoom-in;cursor:-webkit-zoom-in" class="fadein_img"></span><img class="profile" src="' + data.senderFace + '">';
    ulNode.appendChild(liNode);
    //添加事件
    // var oImg = liNode.getElementsByTagName("img")[0];
    // $(oImg).on('click',rebindSeeImage);
    rebindSeeImage();
    isImgLoad(function () {
      screen_inner.scrollTop = screen_inner.scrollHeight - screen_inner.clientHeight;
    }, liNode.getElementsByTagName("img"));
    return;

  }
  ulNode.appendChild(liNode);
  screen_inner.scrollTop = screen_inner.scrollHeight - screen_inner.clientHeight;


}

//登录成功和自动登录时使用
function initialWebSocket() {
  myMarkNumber = $.cookie("markNumber");
  wantToSendMarkNumber = "123456789";
  wsUrl = url + '/' + myMarkNumber + '/' + wantToSendMarkNumber;
  createWebSocket1();
}

//点击其他聊天后也要调用，重新连接websocket
function createWebSocket() {

  try {
    ws = new WebSocket(wsUrl);
    init();
  } catch (e) {
    displayTipPane('catch');
    reconnect();
  }

}
function init() {
  ws.onclose = function () {
    displayTipPane('链接关闭');
    reconnect();
  };
  ws.onerror = function () {
    displayTipPane('发生异常了');
    reconnect();
  };
  ws.onopen = function () {
    //心跳检测重置
    displayTipPane("webSocket连接成功");
    heartCheck.start();
  };
  ws.onmessage = function (event) {
    //拿到任何消息都说明当前连接是正常的
    console.log(event)
    //消息的展示,不是心跳验证码,就小红点出现，用户发送过来的数据也开始动态添加
    addReceived(event.data);
    // if(event.data!="#1#"){
    //     addReceived(event.data);
    // }
    heartCheck.start();
  }
  //发送消息
}
function reconnect() {
  if (lockReconnect) {
    return;
  };
  lockReconnect = true;
  //没连接上会一直重连，设置延迟避免请求过多
  tt && clearTimeout(tt);
  tt = setTimeout(function () {
    createWebSocket(wsUrl);//重新连接，递归
    lockReconnect = false;
  }, 4000);
}
//心跳检测
var heartCheck = {
  timeout: 3000,
  timeoutObj: null,
  serverTimeoutObj: null,
  start: function () {
    // displayTipPane('start');
    var self = this;
    this.timeoutObj && clearTimeout(this.timeoutObj);
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
    this.timeoutObj = setTimeout(function () {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //   displayTipPane('55555');
      ws.send("123456789");//如果是后端还在线，就会触发onmessage事件
      //3s不返回消息就会关闭webSocket，否则就会关闭该定时器继续进行心跳检测
      self.serverTimeoutObj = setTimeout(function () {
        // displayTipPane(111);
        // displayTipPane(ws);
        ws.close();
        // createWebSocket();
      }, self.timeout);

    }, this.timeout)
  }
}


function createWebSocket1() {
  ws = new WebSocket(wsUrl);
  ws.onclose = function () {
    displayTipPane("关闭聊天连接");
  }
  ws.onerror = function () {
    displayTipPane("连接异常")
  }
  ws.onmessage = function (event) {
    addReceived(event.data);
  }
  ws.onopen = function () {
    displayTipPane("连接成功")
  }
}

// 创建一个webSocket与服务器进行连接
// 制作表情面板

function addFace() {
  for (var i = 1; i <= 25; i++) {
    var oImg = $('<img src="../emoji/' + i + '.png">');
    $(".facePane").append(oImg);
    oImg.on("click", setFaceEventListener);
  }
}
addFace();

//面板的打开与关闭  

$(".platform_chat .face").on("click", function (e) {
  e.stopPropagation()
  $(".facePane").fadeIn(230);
  $(".facePane").css("display", "flex");

})
$('body').on("click", function () {
  $(".facePane").fadeOut(230);
})


// 关闭聊天面板
$('.close_btn').click(function () {
  $(".platform_chat").fadeOut(200);
})
