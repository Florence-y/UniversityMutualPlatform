$(function() {
    //#region //刷新页面 清空表单内容
    $('.madal_bg_logon input').val("");
    //#endregion

    //#region 学号/密码 放缩
    // 点击表单 表单本身的提示语句span.tip 缩小上移
    $(".confirm input").on("focus", function() {
        $(this).siblings('.tip').animate({
            // color: "#000",  为什么这里放颜色不行
            fontSize: "14px",
            top: "-12px",
        }, 100)
        $(this).siblings(".tip").css("color", "#000");
        // console.log($(this).children(".tip").css("color"));
    })

    //表单失去焦点 判断表单内容是否正确
    //表单失去光标 且表单内无值 表单提示语句span.tip回到原来状态 
    $(".confirm input").on("blur", function() {
        if ($(this).val() == '') {
            $(this).siblings(".tip").animate({
                // color: "#ccc",
                fontSize: "18px",
                top: "6px",
            }, 100)
        } else {
            var value = $(this).val();

        }

        $(this).siblings(".tip").css("color", "#555");
    })

    $(".fadein").on({
        click: function() {
            $(".tip").css({
                fontSize: "18px",
                top: "6px",
            })
            $(".tip").css("color", "#555");
        }
    })

    function CheckPassWord(password) { //必须为字母加数字且长度不小于8位
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
        $(".logOn").fadeOut();
        $(".forgetPas").fadeIn();
    })

    //单选框 如果选择学生 后缀名 多了一个m. if教师 就少
    $(".teacherOrStudent input").on("click", function() {
        if ($(".chooseStudent").prop("checked")) {
            $(".emailSuffix").text("m.gduf.edu.cn");
        } else {
            $(".emailSuffix").text("gduf.edu.cn");

        }
    })

    //2.点击 忘记密码页面的 下一步.forgetPasNext 忘记密码页面.forgetPas 转换成 重置密码页面.resetPas 
    $(".forgetPasNext").on("click", function() {
        $(".forgetPas").fadeOut();
        $(".resetPas").fadeIn();
    })

    //3.点击 忘记密码页面的 下一步.forgetPasNext 忘记密码页面.forgetPas 转换成 重置密码页面.resetPas 
    $(".forgetPasLast").on("click", function() {
        $(".forgetPas").fadeOut();
        $(".logOn").fadeIn();

    })

    //4.点击 重置密码页面的 确定.resetPasConfirm 模态框消失
    $(".resetPasConfirm").on("click", function() {
        $(".logOn").siblings().fadeOut();
        $(".logOn").fadeIn();
    })

    //#endregion

    //#region  点击模态框以外的地方 模态框消失
    $(".modal_bg").on({
        click: function() {
            // console.log("点击了");
            $('.modal_bg').fadeOut(); // 其实就是css 的过渡+ display
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
                $.get('http://192.168.137.141:8080/Servlet/UserServlet', {
                    password: pwd,
                    loginValue: account,
                    requestType: 'get',
                    userType: type
                }, function(res) {
                    if (res.statusCode == 200) {
                        alert('登录成功');
                        clearCookie();//清除cookie
                        setCookie(res.messagePojo,30);//保存30天
                        //设置用户信息
                        //允许用户进行互动操作
                        // sendMessage(res.messagePojo);
                    } else {
                        alert('账号或密码有误，登录失败！');
                    }
                }, 'json')
            }
        })
        //#endregion
    
    // function sendMessage(message){
    //     $.ajax({
    //         url : "http://192.168.137.141:8080/Servlet/GetTestDataServletYuanan",
    //         data : {
    //            message: message,
    //            requestType : "get"
    //         },
    //         type : "get",
    //         success : function(res){
    //             console.log(res);
    //         }
    //     })
    // }

    function clearCookie(){
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

    //#region 邮箱验证
    // $(".sendVerificationCode").on({
    //     click: function() {
    //         console.log(1);
    //         var email = $(".inEmail").val();
    //         var vercode;
    //         $.post('http://192.168.137.105:8080/Servlet/VerifyCodeServlet', JSON.stringify({
    //             email: email,
    //             requestType: 'post',
    //         }), function(res) {
    //             if (res.status == 200) {
    //                 vercode = res.message
    //             } else {
    //                 console.log(res);
    //             }
    //         }, 'json')
    //     }
    // })

    //#endregion


})