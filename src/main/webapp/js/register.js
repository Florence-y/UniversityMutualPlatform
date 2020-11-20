//发送验证码 每60s发一次

//禁用 倒计时 disable属性

//验证码
var confirmCode="1" ;
var time = 0;
var timer = null;

var requestData = {
    email: "", //发送请求的邮箱
    requestType: "get"
}

var markNumber = null; //学号或教工号
var email = null; //注册成功后的最终邮箱
var userType = null; //用户类型。student / teacher


//清除原来的输入框的缓存
$('input[type=text]').val('');
//点击后开始发送请求，禁用按钮,开始定时器

//判断输入框是否为空
function isEmpty($obj, $errorMessage) {
    if ($obj.val() == '') {
        $obj.attr('placeholder', $errorMessage);
        $obj.addClass('error');
        return true;
    }
    return false;
}


//设置发送验证的按钮的样式
function setSendBtn() {
    //console.log("定时器");
    if (time == 0) {
        clearInterval(timer);
        $('.send_btn').removeAttr('disabled');
        $('.send_btn').removeClass('btn_disable');
        $('.send_btn').addClass('btn_available');
        $('.send_btn').val("发送验证码");
    } else {
        time--;
        $('.send_btn').val(time + "s后重发");
    }
}



//清空错误信息
function clearErrorMessage($obj, $tip) {
    $obj.attr('placeholder', $tip);
    $obj.removeClass('error');
}

//设置一些输入框样式
$('.email_input').on("focus",function () {
    
    clearErrorMessage($('.email_input'), '请输入校园邮箱');
});
$('.confirm_input').on("focus",function () {
    
    clearErrorMessage($('.confirm_input'), '请输入验证码');
});
$('.input_text_page1').bind('focus', function () {
    $(this).addClass('editing');
});
$('.input_text_page1').bind('blur', function () {
    $(this).removeClass('editing');
});

//身份展示
function statusDisplay() {
    $('.status header').fadeOut();
    $('.status .content').fadeIn();
}


//身份选择
$('.individual').bind("click", function () {
    $('.status').removeClass('status_display');
   
    $('.status header').fadeIn();
    $('.status .content').fadeOut();

    $('.status header').find('.text').html(
        $(this).find('.individual_inner').clone()
    );
    if ($(this).attr('id') == 'student') {
        $('.email_tail').html('m.gduf.edu.cn');
    } else {
        $('.email_tail').html('gduf.edu.cn');
    }
})

//身份切换
$('.alter').bind("click", function () {
    $('.status').addClass('status_display');
    statusDisplay();
})
//邮箱有效性验证 //不能为中文
function isEmailAvailable($errorMessage){
    var $obj = $(".email_input");
    var reg = /^m.*$/;
    var reg2 = /[\u4E00-\u9FFF]+/;//非中文
    if(reg2.test($obj.val())){
        $obj.attr('placeholder',$errorMessage);
        $obj.val("");
        $obj.addClass('error');
       
        return false;
    }
    //学生
    if(reg.test($('.email_tail').html())){
        var reg1 = /^(\d|\w){9}$/; //开头和结尾一定要做好
        if(!reg1.test($('.email_input').val())){
            $obj.val("");
            $obj.attr('placeholder',$errorMessage);
            $obj.addClass('error');
            return false;
        }
    }
    return true;
}

//判断用户名、邮箱是否存在
function dataIsExiste(field, value, errorMessage) {
     //设置同步请求
   
    var result = false;
    $.ajax({
        url : '../Servlet/IsExistInfoServlet',
       data : {
        field: field,
        value: value,
        requestTpye: "get",
        userType: userType,
       },
       
        success: function (res) {
            if (res.statusCode == 200) {
                set_displayMessage(errorMessage);
                result = true;
            } else {
                if (field == 'userName') {
                    $('.userName .success_icon').css("display", "block");
                }
            }
        }
    });
   
    return result;
}

function getUserType() {
    var reg = /^m/;
    if (reg.test($('.email_tail').html())) {
        return 'student';
    }
    return 'teacher';
}

//发送验证码的逻辑
//定时器做的工作，减少数字，显示数字，当time==0时，清除定时器，并且把按钮重新恢复，并改变内容
$('.send_btn').click(function () {

    if (time == 0 && !isEmpty($('.email_input'), "邮箱禁止为空！") && isEmailAvailable("邮箱有误！")) {
        requestData.email = $('.email_input').val() + "@" + $('.email_tail').html();
        userType = getUserType();
        if (!dataIsExiste('email', requestData.email, "该邮箱已被注册！")) {
        //    console.log(requestData.email);
            // console.log('发送验证码');
            $.get("../Servlet/VerifyCodeServlet",{
                email : requestData.email,
                requestType : "get"
            },function(res){
                confirmCode = res.message.toLowerCase();
            });
            time = 60;
            $('.send_btn').attr("disabled", "disabled");
            $('.send_btn').addClass('btn_disable');
            $('.send_btn').removeClass('btn_available');
            $('.confirm_input').val("");
            timer = setInterval(setSendBtn, 1000);
            $('.send_btn').val("60s后重发");
        }
    }
})


//输入判空
/**
 * 邮箱判空 输入的val()判断 ""
 * 非空则发送，否则就就显示邮箱不能为空在placeholder里设置，当输入后又把原来的placeholder换回来
 */
//下一步
//验证
//不能为空
//发送请求，获得后端返回验证码，进行匹配


/**角色选择 */
/**
 * 下拉 + 消失
 *      一开始是点击整个框就下拉,事件取消，==null
 * 第一次选好后
 *      把修改加上，并且当作为下一次下拉的唯一按钮
 *
 * 收起
 * 点击角色后，收起 + 消失
 *
 * 角色变成刚选定的
 */
//拿取本页的数据有:邮箱，身份，学号,
//身份时候获取？验证成功后获取

//身份:根据最后的邮箱后缀是否有以m.开头，不能根据选择来获取，因为用户可能会发送完邮箱后又修改身份


//  var temp_email = requestData.email.split('@');


//选择进入那一个注册页面的逻辑
function changeToNextPage(nextPage) {
    //本页缩小,左滑消失
    set_displayMessage("邮箱验证成功！");
    setTimeout(() => {
        $('.modal_bg').fadeOut();
        $('#form1').animate({
            left: "-400px",
        });
        $('#form1').fadeOut();
        $(nextPage).fadeIn();
    }, 1000)
    //下一页初始为缩小，然后一边右滑到中间，一边放大
    //还要根据不同的身份进行不同的拿取
}

//点击进入下一步注册逻辑
$(".next_btn").click(function () {
    if (!isEmpty($('.email_input'), "邮箱号码禁止为空") && !isEmpty($('.confirm_input'), "验证码禁止为空") && $('.confirm_input').val().toLowerCase() == confirmCode) {
        //拿取本页的数据有:邮箱，身份，学号,
        email = requestData.email; //不能再次获取
        var temp_email = requestData.email.split('@'); //把邮箱把号码和后缀分开
        markNumber = temp_email[0];
        var reg = new RegExp('^m');

        if (reg.test(temp_email[1])) {
            userType = 'student';//最终确定userType
            //自动填充
            $('#sNo input').val(markNumber);
            //换到学生注册面
            changeToNextPage('#form_student');
        } else {
            userType = 'teacher';
            //换到老师注册面
            changeToNextPage('#form_teacher');
        }
    } else {
        $('.confirm_input').val("");
        $('.confirm_input').attr('placeholder', '验证码错误！');
        $('.confirm_input').addClass('error');
    }
})


//注册的下一步操作*********************************************************


var major_target = 30;//专业的初始下拉高度
var $pwd_view = false;
var $pwd_confirm_view = false;


//输入框悬浮时激活线变长
$(".form .row .value input").on("focus",function(){
    $(this).parents(".row").find(".active_line").animate({
        width: "430px"
    },300)
})
$(".form .row .value input").on("blur",function(){
    $(this).parents(".row").find(".active_line").animate({
        width: "0px"
    },300)
})


//性别、校区的动画效果
function animationDisplay(obj, item1, item2) {
    //选项选择
    $(obj + ' .switch').click(function () {
        $(obj + ' .item').css({
            display: "none",
        })
        $(obj + ' ' + item2).css({
            left: "",
            right: "5px",
            textAlign: 'right'
        })
        $(this).fadeOut();
        $(obj + ' .item').fadeIn();
    })
    //点击选中
    $(obj + ' .item').bind("click", function () {
        $(obj + ' .switch').fadeIn();
        $(obj + ' .value').attr('data', $(this).find('.text').html())
    })
    //选择1
    $(obj + ' ' + item1).bind('click', function () {
        $(obj + ' ' + item2).fadeOut();
    })
    //选择2
    $(obj + ' ' + item2).bind('click', function () {
        $(obj + ' ' + item1).fadeOut();
        $(this).css({
            right: "",
            textAlign: "left"
        }).animate({
            left: "5px"
        })
    })
}

animationDisplay('.sex', '.male', '.female');
animationDisplay('.campus', '.headquarter', '.Zhaoqing');

//下拉展示栏动画
function animationSlide(obj, target) {
    $(obj + " .list").click(function (event) {
        var event = event || $(window).event;
        var target = event.target || event.srcElement;
        if (target.nodeName.toLowerCase() == 'li') {
            $(this).fadeOut();
            $(obj + ' .choice').attr("data", target.textContent);
            $(obj + ' .choice .cur_val').html(target.textContent);
            if (obj == '.college') {
                fillMajorContent(target.textContent);
            }
        }
    })
    $(obj + " .choice").mouseleave(function () {
        $(obj + ' .list').fadeOut();
    })
    $(obj + " .choice").click(display)

    function display() {
        $(obj + ' .list').css({
            "display": 'block',
            "height": "0"
        }).animate({
            height: target + 'px'
        })
    }
}

//专业的下拉动画展示
function animationSlide_major(obj) {
    $(obj + " .list").click(function (event) {
        var event = event || $(window).event;
        var target = event.target || event.srcElement;
        if (target.nodeName.toLowerCase() == 'li') {
            $(this).fadeOut();
            $(obj + ' .choice').attr("data", target.textContent);
            $(obj + ' .choice .cur_val').html(target.textContent);
            if (obj == '.college') {
                fillMajorContent(target.textContent);
            }
        }
    })
    $(obj + " .choice").mouseleave(function () {
        $(obj + ' .list').fadeOut();
    })
    //点击内容框进行展示
    $(obj + " .choice").click(display)

    function display() {
        $(obj + ' .list').css({
            "display": 'block',
            "height": "0"
        }).animate({
            height: major_target + 'px'
        })
    }
}

animationSlide('#grade', 120);//高度固定
animationSlide('.college', 240);
animationSlide_major('.major');//高度变化
animationSlide("#degree", 120);
//不同的专业，高度不一样

//专业信息

//根据不同学院填充不同的专业
function fillMajorContent(key) {
    var majors = data_major[key];
    $('.major .cur_val').html(majors[0]);
    $('.major .value').attr('data', majors[0]);
    $('.major .list').empty();//删除子元素
    if (majors.length <= 8) {//最多8个 30为高
        major_target = 30 * majors.length; //major_target是全局变量，通过学院的选择进行动态变化
    } else {
        major_target = 30 * 8;
    }
    for (var i = 0; i < majors.length; i++) {
        $('.major .list').append('<li>' + majors[i] + '</li>');
    }
}


//不同学院对应的不同专业数据
var data_major = {
    "金融与投资学院": ["金融学专业", "金融工程专业", "投资学专业", "财政学专业"],
    "会计学院": ["会计学专业", "财政管理学专业", "审计学专业"],
    "保险学院": ["保险学专业", '精算学专业', '精算学FRM实验班'],
    "经济贸易学院": ['金融科技', '经济与金融', '国际商务', '国际经济与贸易', '经济学'],
    '信用管理学院': ['信用管理', '资产评估'],
    "工商管理学院": ['酒店管理', '人力资源管理', '物流管理', '工商管理', '市场营销'],
    '互联网金融与信息工程学院': ["信息管理与信息系统", '计算机科学与技术', '电子商务', '软件工程', '互联网金融', '数据科学与大数据技术'],
    '外国语言与文化学院': ['英语专业', '商务英语专业', '翻译专业'],
    '法学院': ['法学', '电子商务及法律'],
    '财经与新媒体学院': ['汉语言文学', '网络与新媒体', '文化产业管理'],
    '金融数学与统计学院': ['金融数学', '经济统计学', '应用统计学', '信息与计算科学', '数学与应用数学'],
    '公共管理学院': ['劳动关系专业', '劳动与社会保障专业', '社会工作专业', '公共事业管理专业', '应用心理学专业', '行政管理专业'],
    '创业教育学院': ['投资学'],
    '继续教育学院': ['继续教育学院'],
    '国际教育学院': ['国际教育学院']
}


//密码可视化
$('.pwd svg').click(function () {
    viewChange.call($(this), $pwd_view);
    $pwd_view = $pwd_view == false ? true : false;
})
$('.pwd_confirm svg').click(function () {
    viewChange.call($(this), $pwd_confirm_view);
    $pwd_confirm_view = $pwd_confirm_view == false ? true : false;
})

function viewChange(view) {
    if (view == false) {
        $(this).parent().find('input').attr({
            "type": "text",
            "readonly": "readonly"
        });
        $(this).html('<path d="M938.122 577.92c-16.128-55.68-51.584-106.122-100.8-147.2l74.88-100.48a24.064 24.064 0 0 0-38.464-28.8L798.72 402.24a489.92 489.92 0 0 0-147.84-63.808l36.096-104.32a24 24 0 0 0-45.248-15.744L603.52 328.512a581.12 581.12 0 0 0-91.392-7.488 590.08 590.08 0 0 0-83.84 6.272l-37.824-109.44a23.936 23.936 0 1 0-45.312 15.744l35.712 103.04a497.984 497.984 0 0 0-148.48 61.76l-72.128-96.64a24.064 24.064 0 0 0-38.528 28.8L193.28 426.24c-52.16 42.122-89.792 94.4-106.688 152.192l1.408 0.384-1.024 0.32c42.88 146.56 219.328 247.424 426.048 247.872 207.104-0.384 383.872-101.696 426.24-248.768l-1.152-0.384z m-424.96 201.088c-185.472 0.384-337.28-90.122-376.064-200.704 39.488-111.616 191.232-209.792 375.104-209.28 185.28-0.512 338.122 98.368 376.384 210.88-39.808 109.888-190.976 199.488-375.488 199.04z m1.856-342.08a140.096 140.096 0 1 0-0.064 280.128 140.096 140.096 0 0 0 0-280.128z m0 232.192a92.224 92.224 0 0 1-92.16-92.16 92.224 92.224 0 0 1 92.16-92.032 92.224 92.224 0 0 1 92.096 92.096 92.288 92.288 0 0 1-92.16 92.096z" p-id="7158" fill="#999999"></path>')

    } else {
        $(this).parent().find('input').attr("type", "password");
        $(this).parent().find('input').removeAttr('readonly');
        $(this).html('<path d="M814.08 541.83936l-65.37216-77.63968a327.2704 327.2704 0 0 0 61.29664-85.8122c4.096-8.192 0-20.45952-8.192-28.63104-8.15104-4.096-20.41856 0-28.59008 8.192-49.02912 102.15424-151.20384 163.45088-261.5296 163.45088-110.36672 0-212.52096-61.29664-261.57056-159.37536-4.096-12.26752-16.34304-16.34304-28.61056-8.192-8.17152 4.096-12.24704 16.36352-8.17152 24.53504 16.34304 32.68608 36.78208 57.22122 61.29664 81.73568l-65.37216 77.63968c-8.192 8.192-4.096 20.43904 4.096 28.61056 4.07552 4.096 8.15104 4.096 12.24704 4.096 4.096 0 12.24704-4.096 16.34304-8.192l61.29664-73.54368c20.43904 16.34304 40.87808 28.61056 65.39264 40.8576l-32.68608 94.0032c-4.096 12.26752 0 20.43904 12.24704 24.51456h8.192c8.15104 0 16.32256-4.096 20.41856-12.24704l32.68608-94.0032c24.53504 12.26752 53.12512 16.34304 81.73568 20.43904v94.0032c0 12.24704 8.192 20.41856 20.43904 20.41856 12.26752 0 20.43904-8.17152 20.43904-20.43904v-94.0032c28.61056 0 57.20064-8.15104 85.8122-16.32256l32.70656 89.9072c4.096 8.17152 12.24704 12.24704 20.41856 12.24704h8.192c12.24704-4.096 16.34304-16.34304 12.24704-24.51456l-32.68608-94.0032c24.51456-12.24704 44.9536-24.51456 65.39264-40.8576l65.37216 77.63968c4.096 4.096 8.192 8.192 16.34304 8.192 4.096 0 8.192 0 12.288-4.096 0-8.192 4.07552-20.43904-4.096-28.61056z" fill="#999999" p-id="6650"></path>')
    }
}


//密码相同
function pwdIsSame(pwd, pwd2) {
    return (pwd === pwd2)
}

//密码格式错误
function pwdIsVailable(pwd) {
    //6-16非空字符，区分大小写

    var reg = new RegExp('^.{6,16}$');
    //有个bug
    return (reg.test(pwd));
}

//设置错误信息
function set_displayMessage(message, duration) {
    $('.modal_content').html(message);
    $('.modal_bg').fadeIn();
    setTimeout(() => {
        $('.modal_bg').fadeOut();
    }, duration || 1200)//默认2s
}

//设置成成功信息


//判断用户名是否合法: 1-15位非空格字符
function userNameIsAvailable(userName) {
    var reg = /^\S{1,15}$/;
    return reg.test(userName);
}

//用户名合法性判断
$('.userName input').blur(function () {
    $('.userName .success_icon').css("display", "none");
    if (!userNameIsAvailable($(this).val())) {
        set_displayMessage('用户名格式有误！');
    } else {
        dataIsExiste('userName', $(this).val(), '该用户名已存在！');
    }
})

//模态框关闭
$('.fadeOut').click(function () {
    $('.modal_bg').fadeOut();
})

//数据提交
$('.submit_btn').click(() => {
    //学号是自动填充，但是教工号用户自己写的，根据userType来进行选择，
    //学号或教工号，待定。。
    if (userType == 'teacher') {
        //教工号判空
        if ($('#markNumber_teacher input').val() == '') {
            set_displayMessage("请填写您的教工号！");
            return;
        }
        markNumber = $('#markNumber_teacher input').val();
        //用户名判空
        if ($('.userName input').eq(1).val() == '') {
            set_displayMessage('请输入您的用户名！');
            return;
        }

        //性别判空
        if ($('.sex .value').eq(1).attr('data') == '') {
            set_displayMessage('请选择您的性别！');
            return;
        }
        //学院判空
        if ($('.college .value').eq(1).attr('data') == '') {
            set_displayMessage('请选择您所属的学院！');
            return;
        }

    } else {
        //学生
        //用户名判空
        if ($('.userName input').eq(0).val() == '') {
            set_displayMessage('请输入您的用户名！');
            return;
        }
        //性别判空
        if ($('.sex .value').eq(0).attr('data') == '') {
            set_displayMessage('请选择您的性别！');
            return;
        }

        //年级判空
        if ($('#grade .value').attr('data') == '') {
            set_displayMessage('请选择您所在年级！');
            return;
        }

        //学院判空
        if ($('.college .value').eq(0).attr('data') == '') {
            set_displayMessage('请选择您所属的学院！');
            return;
        }
        //专业判空
        if ($('.major .value').attr('data') == '') {
            set_displayMessage('请选择您的专业！');
            return;
        }
    }


    //校区判空
    if ($('.campus .value').eq(0).attr('data') + $('.campus .value').eq(1).attr('data') == '') {
        set_displayMessage('请选择您现所属的校区！');
        return;
    }

    //密码判空
    if ($('.pwd input').eq(0).val() + $('.pwd input').eq(1).val() == '') {
        set_displayMessage('密码禁止为空！');
        return;
    }

    //密码有效性判断
    if (!pwdIsVailable($('.pwd input').eq(1).val() + $('.pwd input').eq(0).val())) {
        set_displayMessage('密码格式错误！');
        return;
    }
    //确认密码判空
    if ($('.pwd_confirm input').eq(0).val() + $('.pwd_confirm input').eq(1).val() == '') {
        set_displayMessage('请输入确认密码！');
        return;
    }

    //密码一致判断
    if (!pwdIsSame($('.pwd input').eq(0).val() + $('.pwd input').eq(1).val(), $('.pwd_confirm input').eq(0).val() + $('.pwd_confirm input').eq(1).val())) {
        set_displayMessage('密码前后不一致！');
        return;
    }

    var formData = {
        "markNumber": markNumber,
        "password": $('.pwd input').eq(0).val() + $('.pwd input').eq(1).val(),
        "userType": userType,
        "email": email,
        "level": $('#grade .value').attr('data'),
        "college": $('.college .value').attr('data'),
        "major": $('.major .value').attr('data'),
        "requestType": "post",
        "sex": $('.sex .value').attr('data'),
        "userName": $('.userName input').eq(0).val() + $('.userName input').eq(1).val(),
        "area": $('.campus .value').attr('data'),
        "graduatedUniversity": $('#graduatedUniversity input').val(),
        "degree": $('#degree .value').attr('data')
    }
    $.post('../Servlet/UserServlet', JSON.stringify(formData), function (res) {

        set_displayMessage('注册成功！正跳转到首页...');
        //跳转。。。
        setTimeout(()=>{
            window.open("../index.html")
        },1500);
    }, 'json');
})




      



       
     
     

