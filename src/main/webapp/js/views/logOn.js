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
})