$(function() {
    //#region //刷新页面 清空表单内容

    // $('.logonBody input').val("");

    //#endregion

    //#region 学号/密码 放缩

    // 点击表单 表单本身的提示语句span.tip 缩小上移
    $(".confirm input").on("focus", function() {
        $(this).siblings('.tip').animate({

            bottom: "90%"
        }, 100)
        $(this).siblings(".tip").css("color", "#000");
    })

    //表单失去光标 且表单内无值 表单提示语句span.tip回到原来状态 
    $(".confirm input").on("blur", function() {
        if ($(this).val() == '') {
            $(this).siblings(".tip").animate({
                
                bottom: "5%"
            }, 100)
        } else {
            var value = $(this).val();

        }

        $(this).siblings(".tip").css("color", "#555");
    })

    $(".fadein").on({
        click: function() {
            $(".tip").css({
               bottom:"5%"
            })
            $(".tip").css("color", "#555");
            $('.logonBody input').val("");
            $(".logonBody .modal_head b").html("用户登录")
        }
    })

    //必须为字母加数字且长度不小于8位
    function CheckPassWord(password) {
        var str = password;
        if (str == null || str.length != 9) {
            return false;
        }
        var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
        if (!reg1.test(str)) {
            return false;
        }
        return true;
    }
    //#endregion

    //#region 点击 超链接/按钮 转换页面+邮箱的后缀名

    //1.点击 登录页面的 忘记密码?.aForgetPas 登录页面.logOn 换成  忘记密码界面.forgetPas
    $(".aForgetPas").on("click", function() {
        $('.logonTitle').text("忘记密码");
        $(".chooseStudent").prop("checked", "true"); //点击 忘记密码 默认选择 学生 htmld就不用写了
        $(".logOn").fadeOut();
        $(".forgetPas").fadeIn();
    })

    //单选框 如果选择学生 后缀名 多了一个m. if教师 就少
    //切换的时候 清空原来表单有的数据
    // $(".chooseStudent").prop("checked");
    var chooseY = $(".chooseStudent").prop("checked") ? "student" : "teacher";
    $(".teacherOrStudent label").on("click", function() {
        console.log($(this));
        $(this).siblings().find("input").prop("checked", "false");
        $(this).find("input").prop("checked", "true");

        // $(".inEmail").val("");
        if ($(".chooseStudent").prop("checked")) {
            if (chooseY != "student") {
                $(".inEmail").val("");
            }
            chooseY = "student";
            $(".emailSuffix").text("m.gduf.edu.cn");
        } else {
            if (chooseY != "teacher") {
                $(".inEmail").val("");
            }
            chooseY = "teacher";
            $(".emailSuffix").text("gduf.edu.cn");

        }
    })

    //2.点击 忘记密码页面的 下一步.forgetPasNext 忘记密码页面.forgetPas 转换成 重置密码页面.resetPas 
    $(".forgetPasNext").on("click", function() {
        $('.logonTitle').text("重置密码");
        if ($('.inEmail').val() == "") {
            displayTipPane("邮箱不能为空");
        } else if ($('.verificationCode input').val() == "") {
            displayTipPane("验证码不能为空");
        } else {
            $(".forgetPas").fadeOut();
            $(".resetPas").fadeIn();
        }

    })

    //3.点击 忘记密码页面的 上一步.forgetPasLast 忘记密码页面.forgetPas 转换成 登录页面.logon 
    $(".forgetPasLast").on("click", function() {
        $('.logonTitle').text("登录");
        $(".forgetPas").fadeOut();
        $(".logOn").fadeIn();
    })

    //4.点击 重置密码页面的 确定.resetPasConfirm 模态框消失
    $(".resetPasConfirm").on("click", function() {
        $('.logonTitle').text("登录");
        $(".logOn").siblings().fadeOut();
        $(".logOn").fadeIn();
    })

    //#endregion

    //#region  点击模态框以外的地方 模态框消失
    $(".modal_bg_logon").on({
        click: function() {
            // console.log("点击了");
            $('.modal_bg_logon').fadeOut(); // 其实就是css 的过渡+ display
            $('.modal').css({
                transform: 'translate(-50%,-50%) scale(0.7)'
            })
        }
    })

    $(".modal").on({
        click: function(e) {
            e.stopPropagation();
        }
    })

    //#endregion

    //#region 用户名/密码 与后端交互
    // var option = 1;
    // $(".logOn h2").on("click", function() {
    //     //点击 学生/老师 相应模块 显示
    //     $(this).parent().addClass("logOnDisplay");
    //     $(this).parent().siblings().removeClass("logOnDisplay");

    //     //设置option 1/2 当前登录状态 1 学生 2 老师
    //     if ($(this).text() === "学生") {
    //         option = 1;
    //     } else if ($(this).text() === "教师") {
    //         option = 2;
    //     }
    // })

    // //点击登录按钮 
    // $('.btnLogon').click(function() {
    //     //得到接口传递的数据
    //     var pwd, account, type;
    //     if (option == 1) {
    //         pwd = $('#stu_pwd').val();
    //         account = $('#stu_account').val();
    //         type = "student"
    //     } else {
    //         pwd = $('#teacher_pwd').val();
    //         account = $('#teacher_account').val();
    //         type = "teacher"
    //     }

    //     //账号密码判空 / 正则
    //     if (pwd === "" || account === "") {
    //         displayTipPane('用户名/密码不能为空');
    //     } else {
    //         $.get('http://192.168.137.141:8080/Servlet/UserServlet', {
    //             password: pwd,
    //             loginValue: account,
    //             requestType: 'get',
    //             userType: type
    //         }, function(res) {
    //             if (res.statusCode == 200) {
    //                 // displayTipPane('登录成功');
    //                 clearCookie(); //清除cookie
    //                 setCookie(res.messagePojo, 30); //保存30天
    //                 // console.log(res)

    //                 //if登录成功 退出登录框 登录+注册 -> 消息+头像


    //                 $('.modal_bg').fadeOut(); // 其实就是css 的过渡+ display
    //                 $('.modal').css({
    //                     transform: 'translate(-50%,-50%) scale(0.7)'
    //                 })

    //                 $('.personal').hide(100);
    //                 $('.logonHeadPortrait').show(100);
    //                 console.log(res);

    //             } else {
    //                 displayTipPane('账号或密码有误，登录失败！');
    //             }
    //         }, 'json')
    //     }
    // })

    // function clearCookie() {
    //     removeCookie("area");
    //     removeCookie("college");
    //     removeCookie("email");
    //     removeCookie("face");
    //     removeCookie("level");
    //     removeCookie("major");
    //     removeCookie("markNumber");
    //     removeCookie("sex");
    //     removeCookie("userName");
    // }
    //#endregion

    //#region 邮箱验证


    // $('.sendVerificationCode').on({
    //     click: function() {
    //         if ($('.inEmail').val() == "") {
    //             displayTipPane("邮箱不能为空");
    //         } else {
    //             var emailLogonY = $(".inEmail").val() + "@" + $(".emailSuffix").text();
    //             console.log(emailLogonY);
    //             $.get('http://192.168.137.141:8080/Servlet/VerifyCodeServlet', {
    //                 email: emailLogonY,
    //                 requestType: "get"
    //             }, function(res) {
    //                 if (res.statusCode == 200) {
    //                     displayTipPane("验证码发送成功");
    //                     console.log(res);
    //                 } else {
    //                     console.log('错误');
    //                 }
    //             })
    //         }
    //     }
    // })



    //#endregion
})