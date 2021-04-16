var isLogon;
//
var oAuthor; //文章的作者
//整篇文章的id
var questionId_local = getQueryVariable("id");
// var questionId_local = 'O9lweXUB3qqWTmFg4Gx-';

//登录者的学号

function sentenceIsLogon() {
    if (navigator.onLine && $.cookie("markNumber") != null && $.cookie("markNumber") != undefined &&
        $.cookie("userName") != null && $.cookie("userName") != undefined &&
        $.cookie("face") != undefined && $.cookie("face") != null) {
        isLogon = true;
        answerData["markNumber"] = $.cookie("markNumber");
    } else {
        isLogon = false;
    }
}



// console.log($.cookie("markNumber"));
$(window).on("load", () => {
    sentenceIsLogon(); //判断是否登录
    loadQuestion();
    getAnswer(1);
})

function fixed() {
  //侧边栏的固定
    
    if ($(this).scrollTop() > 500 ) {
        // $('.head_search_outside').addClass("head_search_outside_fixed");
        $('.sideBox_fixed').addClass("sideBox_fixed_on");
        $('.sideBox_fixed').css("right", "");
        // console.log($('.question_info_main').get(0).offsetLeft);
        // console.log($('.question_info_main').position().left );
        // console.log($('.question_info_main').width());
        // console.log($('.sideBox_fixed').width());
        $('.sideBox_fixed').css("left", $('.question_info_main').get(0).offsetLeft + $('.question_info_main').width() - $('.sideBox_fixed').width() + "px");
        
        if($(this).height()>900){
            $('.sideBox_fixed .author_info_box').slideDown();
        }

    } else {
        // $('.head_search_outside').removeClass("head_search_outside_fixed");
        $('.sideBox_fixed').removeClass("sideBox_fixed_on");
        $('.sideBox_fixed').removeAttr("style");
        $('.sideBox_fixed').css("right", 0);
        $('.sideBox_fixed .author_info_box').slideUp();
    }
}
$(window).bind("scroll", fixed);

// 写回答板块的打开的与关闭
$('.question_info_main .answer_btn').click(() => {

    if (isLogon) {
        $('.textAnswer').slideDown();
    } else {
        displayTipPane("请先完成登录");
    }
})
$('.textAnswer .slideUp').click(() => {
    $('.textAnswer').slideUp();
})

//复制便利签文本
$('.note .copyText').click(function() {
    $('.note .content textarea').select();
    document.execCommand("copy"); // 执行浏览器复制命令
})

//#region 淑仪添加 复制链接

$(".copyurlY").on({
    click: function() {
        // console.log(window.location.href);
        if (window.location.href.indexOf('?') == -1) {
            var url = window.location.href.substring(0, window.location.href.length - 10) + $(this).parents(".queY").find("a").attr("href");
        } else {
            var url = window.location.href;
        }
        // console.log(url);
        var input = $("<input  value='" + url + "'>");
        $(this).prepend(input);
        $(this).find("input").select();
        document.execCommand("copy");
        $(this).find('input').remove();
    }
})

//#endregion

$('.note .writeAnswer').click(function() {
    if (isLogon == false) {
      displayTipPane("请先完成登录！")
      return;
    }
    scrollUp();
    $('.textAnswer').slideDown();
    $('.textAnswer').find(".edit-div").eq(0).html($('.note .content textarea').val());
})

$(".modal_bg_img").on({
        click: function() {
            // console.log("点击了");
            $('.modal_bg_img').fadeOut(); // 其实就是css 的过渡+ display
            $('.modal_bg_img .modal').css({
                transform: 'translate(-50%,-50%) scale(0.7)'
            })
        }
    })
    //取消冒泡
$(".modal").on({
    click: function(e) {
        e.stopPropagation();
    }
})

//#endregion

// 窗口缩放
$(window).bind("resize", fixed);

//设置背景高度
$('#fadeinLogon').click(function() {
    $("input").val("");
    $(".logOn").siblings().fadeOut();
    $(".logOn").fadeIn();
    $('.modal_bg_logon').fadeIn();
    $('.modal_bg_logon .modal').css({
        transform: 'translate(-50%,-50%) scale(1)'
    })
})
$('.fadeout').click(function() {
        $('.modal_bg_logon').fadeOut(); // 其实就是css 的过渡+ display
        $('.modal_bg_logon .modal').css({
            transform: 'translate(-50%,-50%) scale(0.7)'
        })
    })
    //#endregion

// 评论区点击按钮添加图片,把图片显示到输入框中

//点击"+"相当于点击input[type=file]
$('.addImageBtn').click(() => {
        if (sendingImg) {
            displayTipPane("有图片正在上传中...");
        } else {
            $('.file_input').click();
        }
    })
    // 什么是否提取文字，不能在选择图片之后就提取，应该要最终再提取，最后遍历所有节点，遍历到图片后，断开
    //在本节点的下一个节点插入一个新的div,并且把光标给下一个div

$(".edit-div").keydown(function() {
    var arg = arguments;
    inputText.apply($(this), arg);
})

function inputText(e) {
    var ev = e || window.event;
    var key = ev.keyCode || ev.charCode;
    if (key == 13) { //回车键
        if (ev.preventDefault) {
            ev.preventDefault();
        } else {
            ev.returnValue = false;
        }
        // console.log($(this));
        var otextDiv = $('<div class="textarea edit-div" type="text" contenteditable="true" id="edit-div"></div>');
        otextDiv.keydown(function() {
            var arg = arguments;
            inputText.apply($(this), arg);
        })
        $(this).after(otextDiv);
        otextDiv.focus();
    } //删除键
    if (key == 8 && ($(this).html() == "" || $(this).html() == "<br>")) {
        if ($(this).prev().attr("id") != "begin" && $(this).prev().attr("type") != "img") {
            $(this).prev().focus();
            $(this).remove();
        }
    }
}
//读取图片文件 
$('.file_input').change(readFile);
//读图片，添加到输入框中
var oinput = document.getElementById("file_input");
//解决的问题是：formdata对象应该是要
//编辑区div行的指针
//插入图片：现在就只能插入到输入框的最后
var sendingImg = false; // 判断是否正在发送图片，如果是就不能点击发表文章
function readFile() {
    var formdata = new FormData();
    if (!oinput['value'].match(/.jpg|.gif|.png|.jpeg|.bmp/i)) {　　 //判断上传文件格式
        return displayTipPane("图片格式有误！");
    }
    var reader = new FileReader();
    //因为每次表签设置了单文件读取，所以是file[0]
    reader.readAsDataURL(this.files[0]); //转成base64
    reader.fileName = this.files[0].name;
    // formdata.delete(0);//先删除，再添加
    formdata.append(0, this.files[0]); // formdata 的属性
    reader.onload = function(e) {
            var imgMsg = {
                    name: this.fileName, //获取文件名
                    base64: this.result //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
                }
                // console.log(imgMsg);
            var newImage = template("templateImage", imgMsg);
            var imgObj = $(newImage);
            //把新的图片添加到编辑区
            $(".answerTextArea").append(imgObj);
            // console.log(imgObj);
            var otextDiv = $('<div class="textarea edit-div" type="text" contenteditable="true" id="edit-div"></div>');
            //为一行添加图片
            otextDiv.keydown(function() {
                var arg = arguments;
                inputText.apply($(this), arg);
            })
            $(".answerTextArea").append(otextDiv);
            sendImage(formdata, imgObj); //发送图片
        }
        // }
}
//发送图片
function sendImage(formdata, imgObj) { //imgObj是jq对象
    sendingImg = true;
    $.ajax({
        url: '../Servlet/ReceiveFileServlet',
        type: 'post',
        data: formdata,
        dataType: 'json',
        processData: false, //用FormData传fd时需有这两项
        contentType: false,
        success: function(data) {
            imgObj.attr("remoteurl", data.message);
            sendingImg = false;
        },
        error: function(data) {
            imgObj.remove();
            sendingImg = false;
            displayTipPane("图片上传失败！已自动删除！")
        },
        timeout: function(data) {
            imgObj.remove();
            sendingImg = false;
            displayTipPane("图片上传超时！已自动删除！")
        }
    })
}
//动态添加回答的数据
var answerData = {
    "requestType": "get",
    "questionId": questionId_local, //回答的问题的id
    //回答者的学号,找cookie
    "answerContents": ""
}


var answerContents = new Array();

function addAnswerContentItem(order, type, content) {
    return JSON.stringify({
        "contentOrder": order,
        "contentType": type,
        "contentMain": content
    })
}
//加载文本和图片到answerContents
var emptyContent = true;

function loadAnswerContents() {
    //遍历一遍所有的节点
    //如果是图片就把remoteURL加入到anserContent中
    //如果是文本就把文本抽出来，继续向下遍历
    //直到为空
    var order = 1;
    var children = $(".answerTextArea").children(); //返回的是直接子类元素
    var j = 0;
    var text = "";
    for (var i = 0; i < children.length; i++) {
        // console.log("i=" + i);
        if (children[i].getAttribute("type") == "text") {
            // console.log(children[i].getAttribute("type"));
            if (children[i].innerHTML == "" || children[i].innerHTML == "<br>" || children[i].innerHTML == null || children[i].innerHTML == undefined || children[i].innerHTML == "null") {
                // console.log("空格不加");
                continue; //空格不加
                // if(text=="" || text ==null || text==undefined){
                //排除前面有文字，后面有空格的情况     
                // }
            }
            text += children[i].innerHTML;
            //如果一个当前节点为最后的节点，就把文本给添加起来
            answerContents[j++] = addAnswerContentItem(order++, "text", text);
            text = "";
            // console.log("添加了文本元素")
            emptyContent = false;

        } else if (children[i].getAttribute("type") == "img") {
            answerContents[j++] = addAnswerContentItem(order++, "img", children[i].getAttribute('remoteurl'));
            // console.log("添加了图片元素")
            emptyContent = false;
        } else {
            // console.log("什么也没添加！");
        }
    }

    // console.log(answerContents);
}
//发送整个文本
function sendAnswer() {
    //发布文本之前把文本和图片加起来
    if (sendingImg) {
        displayTipPane("有图片正在上传中!")
        return;
    }
    //准备发送
    loadAnswerContents();
    if (emptyContent) {
        displayTipPane("请输入内容！");
        return;
    }
    answerData["answerContents"] = answerContents;
    // console.log(answerData);
    $.ajax({
        url: "../Servlet/AnswerServlet",
        type: "post",
        dataType: 'json',
        data: JSON.stringify(answerData),
        success: function(res) {
            // console.log("返回结果:")
            // console.log(res);
            if (res.statusCode == 200) {
                //清空内容
                $(".answerArea .answerTextArea").html('<div class="begin" id="begin"></div><div class="textarea edit-div" type="text" contenteditable="true" id="edit-div"></div>');
                $(".edit-div").keydown(function() {
                    var arg = arguments;
                    inputText.apply($(this), arg);
                })
                emptyContent = true;
                //收起
                $(".answerArea .textAnswer").slideUp();
                displayTipPane("发布成功！");
                //加载最新内容
                loadMyNewAnswer(answerContents, res.id);
                //发送通知
                var data = {
                    "senderMarkNumber": $.cookie("markNumber"),
                    "receiverMarkNumber": oAuthor.markNumber,
                    "content": '回答了你的问题"' + $(".question_info_box .questionTitle").html() + '。"',
                    "additionContent": "额外内容 可以为空",
                    "type": "inf",
                    "senderName": $.cookie("userName"),
                    "isRead": false,
                    "senderFace": $.cookie("face"),
                    "requestType": "post"
                }
                sendInfo(data);

            } else {
                displayTipPane("发布失败！");
            }
            answerContents = new Array();
        },
        error: function(res) {
            displayTipPane("发送失败！请检查网络是否正常！")
        },
        timeout: function(res) {
            displayTipPane("发送超时！请检查网络是否正常！")
        }
    })
}
//点击发送按钮
$("#sendAnswerBtn").click(function() {
        sendAnswer();
    })
    //把用户刚发布的回答显示出来，这个其实是要后端再发相应的
function loadMyNewAnswer(answerContents, answerId) {
    var type = $.cookie("level") != null ? "学生" : "教师";
    var school_info = type == "学生" ? $.cookie("major") : $.cookie("college");
    var framObj = $("<div class='answerItem'></div>");
    // var reg = /(..\/)/;
    var src = $.cookie("face");
    // src = src.replace(reg.exec(src)[0], "..//");
    var date = new Date();

    var framData = {
            agreeCount: 0,
            commentCount: 0,
            userType: type,
            agree: "no_agree",
            time: date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate(),
            face: src,
            userName: $.cookie("userName"),
            schoolInfo: school_info
        }
        // console.log()
    framObj.append(template("template_answerItem", framData));
    //添加answerId
    framObj.attr("answerId", answerId);
    framObj.find(".seeComment").on("click", function() {
        seeComment.call($(this), 1); //需要更改为动态页数
    });
    //添加评论
    framObj.find(".comment_btn").on("click", function() {
            if (isLogon == false) {
                displayTipPane("请先完成登录！");
                return;
            }
            $(this).parents(".answerItem").find(".addComment").slideDown();
        })
        //查看评论
        // oItem.attr("answerId",arr[i].contents[0]["answerId"]);
    framObj.find(".seeComment").attr("loadingAbility", "true"); //有加载数据能力
    framObj.find(".commentList").attr("nextPage", 1);
    framObj.find(".seeComment").on("click", function() {
        seeComment.call($(this), 1); //初始化加载数据
    });
    framObj.find(".loadmore").click(loadMoreComment);


    //关闭对回答进行评论块
    framObj.find(".addComment .slideUp").click(function() {
        $(this).parents(".addComment").slideUp();
    })
    framObj.find(".commentList .slideUp").click(function() {
            $(this).parents(".commentList").slideUp();
        })
        //发布评论
    framObj.find(".addComment .sendBtn").click(function() {
            sendComment.call($(this));
        })
        //查看评论

    //点赞
    framObj.find(".like_btn .icon").attr("changing", "false");
    framObj.find(".like_btn .icon").click(function() {
        if (isLogon == false) {
            displayTipPane("请先完成登录！");
            return;
        }
        agreeAnswer.call($(this), $.cookie("markNumber"));
    });
    framObj.find(".like_btn").attr("status", "no_agree");

    //添加内容
    var contentTextArr = [];
    //转js对象
    for (var i = 0; i < answerContents.length; i++) {
        contentTextArr.push(JSON.parse(answerContents[i]));
    }
    var contentText = addAnswerContentText(contentTextArr);
    framObj.find(".contentText").append(contentText);
    $(".answerItem_List").prepend(framObj);
}
//
//一进入之后加载一些
var answerPage = 1;
var totalAnswerPage = 1;

// var answer_nowPostion = 1;
//获取回答，发送请求，获取相应，动态添加
function getAnswer(curPage) {
    // console.log("加载回答");
    var data1 = {
        requestType: "get",
        getAnswerType: "question",
        questionId: questionId_local, // 进入该页面后应该会有questionId
        // markNumber: $.cookie("markNumber"), // 用户者的学号
        currentPage: curPage //当前页面
    }
    if (isLogon) {
        data1["viewerMarkNumber"] = $.cookie("markNumber");
    }

    $.ajax({
        url: "../Servlet/AnswerServlet",
        dataType: "json",
        type: "get",
        data: data1,
        success: function(res) {
            //获取返回信息，进行渲染
            //调用
            if (curPage == 1) {
                $(".answerItem_List").html("");
            }
            displayAnswers(res.dataList, res.markNumber);
            if (res.next == false) {
                $(".answerItem_List").append('<div class="answerItem ending">已加载完全部回答</div>');
                //禁用加载更多回答
                isNoMoreAnswer = true;
            }
        },
        error: function(res) {
            displayTipPane("加载回答失败")
        }
    })
}
// 
function displayAnswers(arr, markNumber) {
    for (var i = 0; i < arr.length; i++) {
        //头部信息,需要student对象 
        //尾部，主要自己创建对象
        //点赞数字， 评论数字（没有），用户是否有点赞
        var oItem = $(" <div class='answerItem'></div>");
        var type = arr[i].student != null ? "学生" : "教师";
        var authorObj = arr[i].student != null ? arr[i].student : arr[i].teacher;
        var isAgree = arr[i].agree == true ? "agree" : "no_agree";
        var school_info = authorObj.major || authorObj.college;
        // var reg = /(..\/)/;
        var src = authorObj.face;
        // console.log(authorObj);
        // console.log("图片地址:"+src);
        // src = src.replace(reg.exec(src)[0], "..//");

        var contentObj = {
            agreeCount: arr[i].agreeCount,
            commentCount: arr[i].commentCount,
            userType: type,
            agree: isAgree,
            time: "2020/11/1",
            face: src,
            userName: authorObj.userName,
            schoolInfo: school_info
        }
        oItem.append(template("template_answerItem", contentObj))
            //添加answerId
            // console.log(arr[i].contents);
        if (arr[i].contents[0]) {
            oItem.attr("answerId", arr[i].contents[0]["answerId"]);
        }
        // oItem.attr("answerId",arr[i].contents[0]["answerId"]);
        oItem.find(".seeComment").attr("loadingAbility", "true"); //有加载数据能力
        oItem.find(".commentList").attr("nextPage", 1);
        oItem.find(".seeComment").on("click", function() {
            seeComment.call($(this), 1); //初始化加载数据
        });
        oItem.find(".comment_btn").on("click", function() {
                if (isLogon == false) {
                    displayTipPane("请先完成登录!");
                    return;
                }
                $(this).parents(".answerItem").find(".addComment").slideDown();
            })
            //关闭对回答进行评论块
        oItem.find(".addComment .slideUp").click(function() {
            $(this).parents(".addComment").slideUp();
        })
        oItem.find(".commentList .slideUp").click(function() {
                $(this).parents(".commentList").slideUp();
            })
            //发布评论
        oItem.find(".addComment .sendBtn").click(function() {
            sendComment.call($(this));
        })

        // 回答点赞
        //加载回答的时候 初始化自己是否有点赞
        //初始化changing = false
        //绑定函数 $('.answerItem .like_btn .icon').click();
        oItem.find(".like_btn .icon").attr("changing", "false");
        oItem.find(".like_btn .icon").click(function() {
            if (isLogon == false) {
                displayTipPane("请先完成登录！")
            }
            agreeAnswer.call($(this), markNumber);
        });
        // console.log("isAgree"+isAgree);
        oItem.find(".like_btn").attr("status", isAgree);
        var contentText = addAnswerContentText(arr[i].contents);
        oItem.find(".contentText").append(contentText);
        $(".answerItem_List").append(oItem);
        oItem.find(".loadmore").click(loadMoreComment);
    }
    //点击图片放大
    //  rebindSeeImage();
}
//  滑到底部加载更多回答
var isNoMoreAnswer = false;
$(window).on("scroll", debounce(function() {
    //滚动条到顶部的高度
    var scrollTop = Math.ceil($(this).scrollTop());
    //窗口高度
    var curHeight = $(this).height();
    //整个文档高度
    var totalHeight = $(document).height();
    //滚动条到底
    if (scrollTop + curHeight >= totalHeight) {
        //还要根据是否有下一页判断可进行发送请求
        if (isNoMoreAnswer) {
            displayTipPane("没有更多回答了哦！");
            return;
        }
        getAnswer(++answerPage);
        //console.log(123);
    }
}, 10, true));

function addAnswerContentText(contentArr) {
    var contentText = "";
    // console.log(contentArr);
    for (var j = 0; j < contentArr.length; j++) {
        if (contentArr[j]["contentType"] == "text") {
            //添加p
            // console.log( arr[i].contents[j]);
            contentText += "<p>" + contentArr[j]["contentMain"] + "</p>";
        } else {
            //添加图片
            // console.log( arr[i].contents[j]);
            // var reg = /(..\/)/;
            var src = contentArr[j]["contentMain"];
            // src = src.replace(reg.exec(src)[0], "..//");
            // console.log(src);
            contentText += "<img class='' src='" + src + "'/>";
        }
    }
    return contentText;
}
//获取某个回答的评论
//点击查看评论按钮触发
//打开面板,第一次点击时加载一页的内容
//收起后，再点击只是打开面板
function seeComment(nextPage) {
    // $(this).parents(".answerItem").find(".commentList .contentBox").html("");
    var obj = $(this);
    //this是查看评论按钮
    $(this).parents(".answerItem").find(".commentList").slideDown();
    // console.log("$(this).loadingAbility="+$(this).attr("loadingAbility"));
    if ($(this).attr("loadingAbility") == "true") { //请求第一页代表初始化
        // console.log("初始化评论条")
        $.ajax({
            url: "../Servlet/CommentServlet",
            data: {
                requestType: "get",
                getType: "answer",
                answerId: $(this).parents(".answerItem").attr("answerid"),
                // answerId : 1,
                currentPage: nextPage
            },
            type: "get",
            dataType: "json",
            success: function(res) {
                console.log("评论")
                console.log(res);
                console.log(res.nowPosition);
                console.log(res.totalPage);
                displayComment.call(obj, res.dataList);
                if (!res.next) {
                    //加载更多消失
                    console.log("替换")
                    obj.parents(".answerItem").find(".commentList .loadmore").fadeOut();
                    obj.parents(".answerItem").find(".commentList .contentBox").append('<div class="ending_comment">已加载完全部评论</div>');
                    //加载完全部评论展示
                }
                obj.attr("loadingAbility", "false");
            }
        })
    }
}

//只是把返回的数据进行展示
function displayComment(dataList) {
    for (var i = 0; i < dataList.length; i++) {
        var item = dataList[i];
        data = item.student != null ? item.student : item.teacher;
        // var reg = /(..\/)/;
        // data.face = data.face.replace(reg.exec(data.face)[0], "..//");
        // console.log(data.face);
        data.content = item.content;
        var commentItem = template("template_commentItem", data);
        $(this).parents(".answerItem").find(".commentList .contentBox").append(commentItem);
        //$(this)查看评论按钮
    }
}
//加载更多评论，加载的更旧的评论

function loadMoreComment() {
    // console.log("加载更多评论")
    var obj = $(this);
    var commentList = $(this).parents(".commentList");
    // console.log("commentList.attr(nextPage)");
    // console.log(commentList.attr("nextPage"));
    var nextPage = parseInt(commentList.attr("nextPage")) + 1;
    commentList.attr("nextPage", nextPage);
    // console.log(nextPage);
    $.ajax({
        url: "../Servlet/CommentServlet",
        data: {
            requestType: "get",
            getType: "answer",
            answerId: $(this).parents(".answerItem").attr("answerid"),
            // answerId : 1,
            currentPage: nextPage
        },
        type: "get",
        dataType: "json",
        success: function(res) {
            displayComment.call(obj, res.dataList);
            if (!res.next) {
                //加载更多消失
                // console.log("替换")
                obj.parents(".answerItem").find(".commentList .loadmore").fadeOut();
                obj.parents(".answerItem").find(".commentList .contentBox").append('<div class="ending_comment">已加载完全部评论</div>');
                //加载完全部评论展示
            }
        }
    })
}
//重新绑定图片放大事件
function rebindSeeImage() {
    $(".fadein_img").off("click");
    $(".modal_bg_img .fadeout").off("click");
    $('.fadein_img').on("click", function() {
        $('.modal_bg_img').fadeIn();
        $('.modal_bg_img .modal').css({
            transform: 'translate(-50%,-50%) scale(1)'
        })
        $('.modal_bg_img .modal').find(".modal_content img").attr("src", $(this).attr("src"));
    })

    $('.modal_bg_img .fadeout').on("click", function() {
        $('.modal_bg_img').fadeOut(); // 其实就是css 的过渡+ display
        $('.modal_bg_img .modal').css({
            transform: 'translate(-50%,-50%) scale(0.7)'
        })
    })
}
//点击查看评论
//发布评论
function sendComment() {
    //获取内容
    var text = $(this).parents(".addComment").find(".textBox").val();
    if (text == "" || text == undefined || text == null) {
        displayTipPane("评论不能为空！");
        return;
    }
    var answerItem = $(this).parents(".answerItem");
    var data_1 = {
        requestType: "post",
        answerId: answerItem.attr("answerid"),
        markNumber: $.cookie("markNumber"),
        content: text
    };
    var obj = $(this); //this指发表评论的按钮
    //判断敏感词

    $.ajax({
        url: "../Servlet/SensitiveWordServlet",
        data: JSON.stringify({
            "textArr": [
                text
            ]
        }),
        type: "post",
        success: function(res) {
            if (res.statusCode == 500) {
                displayTipPane("内容" + res.message + "请修改后再发送！");
            } else {
                data_1.content = res[0];
                send();
            }
        }
    })

    // 发送评论
    function send() {
        $.ajax({
            url: "../Servlet/CommentServlet",
            type: "post",
            data: JSON.stringify(data_1),
            dataType: "json",
            success: function(res) {
                // console.log("结果：")
                // console.log(res);
                if (res.statusCode == 200) {
                    answerItem.find(".addComment .textBox").val("");
                    answerItem.find(".addComment").slideUp();
                    if (answerItem.find(".seeComment").attr("loadingAbility") == "true") {
                        seeComment.call(answerItem.find(".seeComment"), 1); //针对没有加载过评论就评论的
                    } else {
                        loadMyNewComment.call(obj, text);
                    }
                    answerItem.find(".commentList").slideDown();
                    //发送通知
                    if (res.statusCode == 200) {
                        obj.parents(".like_btn").attr("status", "agree");
                        obj.parents(".like_btn").addClass("agree");
                        obj.parents(".like_btn").removeClass("no_agree");
                        var oAgreeCount = obj.parents(".like_btn").find(".num");
                        oAgreeCount.html(parseInt(oAgreeCount.html()) + 1);
                        obj.attr("changing", "false");
                        var data = {
                            "senderMarkNumber": $.cookie("markNumber"),
                            "receiverMarkNumber": obj.parents(".answerItem").attr("answerId"),
                            "content": '评论了你对"' + $(".question_info_box .questionTitle").html() + '"的回答',
                            "additionContent": "额外内容 可以为空",
                            "type": "inf",
                            "senderName": $.cookie("userName"),
                            "isRead": false,
                            "senderFace": $.cookie("face"),
                            "requestType": "post"
                        }
                        sendInfo(data);
                    }
                } else {
                    displayTipPane("评论失败！");
                }
            }
        })
    }

    function loadMyNewComment(text) {
        var src = $.cookie("face");
        // var reg = /(..\/)/;
        // src = src.replace(reg.exec(src)[0], "../");
        var data = {
            content: text,
            face: src,
            userName: $.cookie("userName")
        }
        var comment = template("template_commentItem", data);
        $(this).parents(".answerItem").find(".commentList .contentBox").prepend(comment);
        var oCommentCount = $(this).parents(".answerItem").find(".seeComment .num");
        oCommentCount.html(parseInt(oCommentCount.html()) + 1);
    }
}
// 问题点赞
$('.question_info_main .like_btn .icon').attr("changing", "false"); // 是否状态发生改变，防止多次点击，由于网络原因计数出错
$('.question_info_main .like_btn .icon').click(function() {
        //当前点击状态
        if (!isLogon) {
            displayTipPane("请先完成登录");
            return;
        }
        if ($(this).attr("changing") == "true") {
            return;
        }
        $(this).attr("changing", "true");
        var status = $(this).parents(".like_btn").attr("status");
        var obj = $(this);
        if (status == "agree") { //再次点击为取消点赞
            $.ajax({
                url: "../Servlet/AgreeServlet",
                type: "get",
                dataType: "json",
                data: {
                    requestType: "delete",
                    agreeType: "question",
                    markNumber: $.cookie("markNumber"),
                    questionId: questionId_local //先写这个
                },
                success: function(res) {
                    console.log(res);
                    obj.parents(".like_btn").attr("status", "no_agree");
                    obj.parents(".like_btn").addClass("no_agree");
                    obj.parents(".like_btn").removeClass("agree");
                    var oAgreeCount = obj.parents(".like_btn").find(".num");
                    oAgreeCount.html(parseInt(oAgreeCount.html()) - 1);
                    obj.attr("changing", "false");

                }
            })
        } else if (status == "no_agree") {
            $.ajax({
                url: "../Servlet/AgreeServlet",
                type: "post",
                dataType: "json",
                data: JSON.stringify({
                    requestType: "post",
                    agreeType: "question",
                    markNumber: $.cookie("markNumber"),
                    questionId: questionId_local //先写这个
                }),
                success: function(res) {
                    if (res.statusCode == 200) {
                        obj.parents(".like_btn").attr("status", "agree");
                        obj.parents(".like_btn").addClass("agree");
                        obj.parents(".like_btn").removeClass("no_agree");
                        var oAgreeCount = obj.parents(".like_btn").find(".num");
                        oAgreeCount.html(parseInt(oAgreeCount.html()) + 1);
                        obj.attr("changing", "false");
                        var data = {
                            "senderMarkNumber": $.cookie("markNumber"),
                            "receiverMarkNumber": oAuthor.markNumber,
                            "content": '点赞了你的问题"' + $(".question_info_box .questionTitle").html() + '"',
                            "additionContent": "额外内容 可以为空",
                            "type": "inf",
                            "senderName": $.cookie("userName"),
                            "isRead": false,
                            "senderFace": $.cookie("face"),
                            "requestType": "post"
                        }
                        sendInfo(data);
                    }
                }
            })
        }
    })
    // 回答点赞
    //加载回答的时候 初始化自己是否有点赞
    //初始化changing = false
    //绑定函数 $('.answerItem .like_btn .icon').click();
    //  $('.answerItem .like_btn .icon').click();
    //回答点赞函数
function agreeAnswer(markNumber_2) {
    //当前点击状态
    if (isLogon == false) {
        displayTipPane("请先登录！");
        return;
    }
    if ($(this).attr("changing") == "true") {
        return;
    }
    $(this).attr("changing", "true");
    var status = $(this).parents(".like_btn").attr("status");
    var obj = $(this);
    // console.log($(this));
    if (status == "agree") { //再次点击为取消点赞
        $.ajax({
            url: "../Servlet/AgreeServlet",
            type: "get",
            dataType: "json",
            data: {
                requestType: "delete",
                agreeType: "answer",
                markNumber: $.cookie("markNumber"),
                answerId: $(this).parents(".answerItem").attr("answerId")
            },
            success: function(res) {
                console.log(res);
                obj.parents(".like_btn").attr("status", "no_agree");
                obj.addClass("no_agree");
                obj.removeClass("agree");
                var oAgreeCount = obj.parents(".like_btn").find(".num");
                oAgreeCount.html(parseInt(oAgreeCount.html()) - 1);
                obj.attr("changing", "false");
            }
        })
    } else if (status == "no_agree") {
        //点赞
        $.ajax({
            url: "../Servlet/AgreeServlet",
            type: "post",
            dataType: "json",
            data: JSON.stringify({
                requestType: "post",
                agreeType: "answer",
                markNumber: $.cookie("markNumber"),
                answerId: $(this).parents(".answerItem").attr("answerId") //先写这个
            }),
            success: function(res) {
                console.log("markNumber" + markNumber_2);
                if (res.statusCode == 200) {
                    obj.parents(".like_btn").attr("status", "agree");
                    obj.addClass("agree");
                    obj.removeClass("no_agree");
                    var oAgreeCount = obj.parents(".like_btn").find(".num");
                    oAgreeCount.html(parseInt(oAgreeCount.html()) + 1);
                    obj.attr("changing", "false");
                    var data = {
                        "senderMarkNumber": $.cookie("markNumber"),
                        "receiverMarkNumber": markNumber_2,
                        "content": '点赞了你对"' + $(".question_info_box .questionTitle").html() + '"的回答',
                        "additionContent": "额外内容 可以为空",
                        "type": "inf",
                        "senderName": $.cookie("userName"),
                        "isRead": false,
                        "senderFace": $.cookie("face"),
                        "requestType": "post"
                    }
                    sendInfo(data);
                }
            }
        })
    }
}
//加载问题
//要用jsp
//关注作者
function subscribeAuthor() {
    $.ajax({
        url: "../Servlet/AttentionServlet",
        type: "post",
        dataType: 'json',
        data: JSON.stringify({
            "majorMarkNumber": $.cookie("markNumber"),
            "passMarkNumber": oAuthor.markNumber,
            "requestType": "post"
        }),
        success: function(res) {
            if (res.statusCode == 200) {
                $(".author_info_box .subscribe_btn").addClass("subscribe");
                $(".author_info_box .subscribe_btn").removeClass("no_subscribe");
                $(".author_info_box .subscribe_btn").attr("status", "subscribe");
                $(".author_info_box .subscribe_btn").html("已关注");
                var data = {
                    "senderMarkNumber": $.cookie("markNumber"),
                    "receiverMarkNumber": oAuthor.markNumber,
                    "content": "关注了你",
                    "additionContent": "额外内容 可以为空",
                    "type": "inf",
                    "senderName": $.cookie("userName"),
                    "isRead": false,
                    "senderFace": $.cookie("face"),
                    "requestType": "post"
                };
                sendInfo(data);
            }
        }
    })
}

function cancelSubscribeAuthor() {

    $.ajax({
        url: "../Servlet/AttentionServlet",
        type: "get",
        dataType: "json",
        data: {
            requestType: "delete",
            majorMarkNumber: $.cookie("markNumber"),
            passMarkNumber: oAuthor.markNumber
        },
        success: function(res) {
            if (res.statusCode == 200) {
                $(".author_info_box .subscribe_btn").removeClass("subscribe");
                $(".author_info_box .subscribe_btn").addClass("no_subscribe");
                $(".author_info_box .subscribe_btn").attr("status", "no_subscribe");
                $(".author_info_box .subscribe_btn").html("关注");
                var data = {
                    "senderMarkNumber": $.cookie("markNumber"),
                    "receiverMarkNumber": oAuthor.markNumber,
                    "content": "取消对你的关注。",
                    "additionContent": "额外内容 可以为空",
                    "type": "inf",
                    "senderName": $.cookie("userName"),
                    "isRead": false,
                    "senderFace": $.cookie("face"),
                    "requestType": "post"
                };
                sendInfo(data);
            }
        }
    })
}
$(".author_info_box .subscribe_btn").click(function() {
    if (isLogon == false) {
        displayTipPane("请先完成登录!");
        return;
    }
    if ($(".author_info_box .subscribe_btn").attr("status") == "subscribe") {
        cancelSubscribeAuthor();

    } else if ($(".author_info_box .subscribe_btn").attr("status") == "no_subscribe") {
        subscribeAuthor();
    } else {
        displayTipPane("作者匿名，关注已禁用！")
    }
})

//获取键和获取值
function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

function loadQuestion() {
    var data1 = {
        requestType: "get",
        questionId: questionId_local, //需要jsp来获取请求
    }
    if (isLogon) {
        data1["viewerMarkNumber"] = $.cookie("markNumber");
    }
    $.ajax({
        url: "../Servlet/QuestionServlet",
        type: 'get',
        dataType: 'json',
        data: data1,
        success: function(res) {
            console.log(res);
            setQuestionMain(res);
            setAuthorInfo(res);
        }
    })
}
//渲染问题

function setQuestionMain(data) {
    //title
    $('.question_info_main .questionTitle').html(data.title);
    //labels
    for (var i = 0; i < data.tag.length; i++) {
        $('.question_info_main .questionLabel').append('<span class="label"  >' + data.tag[i] + '</span>');
    }
    //detail
    $('.question_info_main .questionDetail').html(data.contents[0]["contentMain"]);
    //img
    for (var i = 1; i < data.contents.length; i++) {
        // var reg = /(..\/)/;
        var src = data.contents[i]['contentMain'];
        // console.log(authorObj);
        // console.log("图片地址:"+src);
        // src = src.replace(reg.exec(src)[0], "../");
        $('.question_info_main .questionImage').append('<img title="点击放大" class="fadein fadein_img" src="' + src + '">');

        //点击图片放大
        $('.fadein_img').on("click", function() {
            $('.modal_bg_img').fadeIn();
            $('.modal_bg_img .modal').css({
                transform: 'translate(-50%,-50%) scale(1)'
            })
            $('.modal_bg_img .modal').find(".modal_content img").attr("src", $(this).attr("src"));
        })

        $('.modal_bg_img .fadeout').on("click", function() {
                $('.modal_bg_img').fadeOut(); // 其实就是css 的过渡+ display
                $('.modal_bg_img .modal').css({
                    transform: 'translate(-50%,-50%) scale(0.7)'
                })
            })
            //点赞数
            //收藏数     
    }

    //是否点赞
    if (data.agree) {
        $('.question_info_main .like_btn').attr("status", "agree");
        $('.question_info_main .like_btn').addClass("agree");

    } else {
        $('.question_info_main .like_btn').attr("status", "no_agree");
        $('.question_info_main .like_btn').addClass("no_agree");
    }
    //点赞数目
    $('.question_info_main .like_btn .num').html(data.agreeCount);
}

// 渲染作者
function setAuthorInfo(data) {
    //是否关注作者
    //判断作者是否匿名
    //头像默认 用户名改匿名
    var src;

    if (data.userType == "student") {
        oAuthor = data.student;
        $(".author_info_box .userType").html("学生");
        $(".author_info_box .schoolInfo").html(oAuthor.major);

        //私信设置target和targetName
        $(".author_info_box .chatBtn").attr("target",oAuthor.markNumber);
        $(".author_info_box .chatBtn").attr("targetName",oAuthor.userName);
    } else {
        oAuthor = data.teacher;
        $(".author_info_box .userType").html("老师");
        $(".author_info_box .schoolInfo").html(oAuthor.college);
         //私信设置target和targetName
        $(".author_info_box .chatBtn").attr("target",oAuthor.markNumber);
        $(".author_info_box .chatBtn").attr("targetName",oAuthor.userName);
    }

    if (data.anonymity) {
        src = "../img/defaultStudentFace.jpg"
        $(".author_info_box .userName").html("匿名");
    } else {
        src = oAuthor.face;
        $(".author_info_box .userName").html(oAuthor.userName);
    }
    // var reg = /(..\/)/;
    // src = src.replace(reg.exec(src)[0], "..//");
    $('.author_info_box .profile img').attr("src", src);

    //关注和私信禁用
    if (data.anonymity) {
        $(".author_info_box .subscribe_btn").html("禁用");
        $(".author_info_box .subscribe_btn").attr("status", "forbidden");
        $(".author_info_box .subscribe_btn").addClass("forbidden");
    } else {
        if (data.attentionAuthor) {
            console.log("已关注作者")
            $(".author_info_box .subscribe_btn").attr("status", "subscribe");
            $(".author_info_box .subscribe_btn").addClass("subscribe");
            $(".author_info_box .subscribe_btn").html("已关注");
        } else {
            $(".author_info_box .subscribe_btn").attr("status", "no_subscribe");
            $(".author_info_box .subscribe_btn").addClass("no_subscribe");
            $(".author_info_box .subscribe_btn").html("关注");
        }
    }
}
//复制问题链接
$('.copyLink_btn').click(function() {
    let query = window.location.href;
    //window.location.href
    // displayTipPane(query);
    // displayTipPane("复制成功！");
    var oInput = $("#copyURL");
    // console.log(oInput);
    oInput.val(query);
    oInput.select();
    document.execCommand("copy"); // 执行浏览器复制命令
})

//敏感词
//回答和评论都有判断
//发送通知
function sendInfo(data) {
    // console.log("发送了通知！")
    $.ajax({
        url: "../Servlet/InfServlet",
        type: "post",
        data: JSON.stringify(data),
        success: function(res) {
            // console.log("通知成功！");
        }
    })
}


//#endregion


//聊天
// var lockReconnect = false;//避免重复连接
// var myMarkNumber = "191543214";//要获取cookie
// var wantToSendMarkNumber = "123456789";//随便写一个，目的是与服务进行连接
// var url = "ws://192.168.137.105:8080/WebSocket";
// var wsUrl //点击某一个私信后重新修改
// var ws;
// var tt;
// var ulNode = document.getElementById("ulNode");
// var screen_inner = document.getElementById("screen_inner");

// // initialWebSocket();//首次与服务器进行连接

// // 退出登录调用
// function closeWebSocket() {
//   ws.close();
//   $(".platform_chat").fadeOut();
// }

// var lastTarget = null;
// // 开始聊天,点击私信进行连接
// $(".chatBtn").on("click", function () {
//   wantToSendMarkNumber = $(this).attr("target");
//   wsUrl = url + '/' + myMarkNumber + '/' + wantToSendMarkNumber;
//   //重新连接WebSocket

//   //用户名
//   $(".platform_chat .targetName").text($(this).attr("targetName"));
//   if (lastTarget != null && lastTarget != $(this).attr("target")) {
//     ulNode.innerHTML = "";
//   }
//   lastTarget = $(this).attr("targetName");

//   $(".platform_chat").fadeIn();

//   //这次的webSocket是有发送目标的
//   createWebSocket1();
// });

// //历史记录
// function loadHistoryInfo(target) {//获取与某一个人的具体历史信息，target的对方的markNumber
//   //遍历，添加
// }

// // 消息发送
// //文本的发送，回车键或者点击发送按钮进行发送
// //表情是点击某一个表情，发送一个表情图片地址,表情需要限制尺寸大小
// //图片需要上传图片，上传完后发送的还是图片的地址


// // 文本发送
// function getTextInfo() {
//   //判空处理
//   var reg = /^\s*$/
//   if (reg.test($(".platform_chat textarea").val())) {
//     displayTipPane("输入文本不能为空！")
//     $(".platform_chat textarea").val("");
//     return null;
//   }
//   var date = new Date();
//   var sendTime = date.getTime();
//   var textInfo = {
//     "senderMarkNumber": myMarkNumber,
//     "senderFace": $.cookie("face"),
//     "senderName": $.cookie("userName"),
//     "contentType": "text",
//     "sendTime": "" + sendTime,
//     "content": $(".platform_chat textarea").val()
//   }
//   $(".platform_chat textarea").val("");
//   return textInfo;
// }

// function sendText() {
//   var textInfo = getTextInfo();
//   if (textInfo != null) {//非空
//     addSend(textInfo);
//     ws.send(JSON.stringify(textInfo));//发送json对象
//   }
// }

// // 点击发送按钮
// $(".platform_chat input[type='button']").on("click", function () {
//   sendText();
//   $(".platform_chat textarea").val("")
//   // displayTipPane("发送文本")
// })

// //回车键发送
// $(".platform_chat textarea").on("keydown", function (e) {

//   if (e.keyCode == 13 || e.keyCode == 108) {
//     sendText();
//     e.preventDefault()
//     $(".platform_chat textarea").val("")
//   }
// })




// //表情发送, 鼠标点击某一个表情时触发函数
// function setFaceEventListener() {
//   var date = new Date();
//   var sendTime = date.getTime();
//   var faceInfo = {
//     "senderMarkNumber": myMarkNumber,
//     "senderFace": $.cookie("face"),
//     "senderName": $.cookie("userName"),
//     "contentType": "face",
//     "sendTime": "" + sendTime,
//     "content": $(this).attr("src")
//   }

//   addSend(faceInfo);
//   ws.send(JSON.stringify(faceInfo));
// }


// //图片发送
// //上传图片
// //成功后发送消息


// //读取图片文件 

// $('.platform_chat .picture').click(() => {
//   if (sendingImg) {
//     displayTipPane("有图片正在上传中...");
//   } else {
//     $('#sendImgBtn').click();
//   }
// })
// $('#sendImgBtn').change(readFile_chat);
// //读图片，添加到输入框中
// var oinput = document.getElementById("sendImgBtn");

// //读取文件
// function readFile_chat() {
//   var formdata = new FormData();
//   if (!oinput['value'].match(/.jpg|.gif|.png|.jpeg|.bmp/i)) {　　 //判断上传文件格式
//     return displayTipPane("图片格式有误！");
//   }

//   formdata.append(0, this.files[0]); // formdata 的属性
//   //成功后上传图片
//   sendImage_chat(formdata);
// }

// var sendingImg = false;
// function sendImage_chat(formdata) {
//   sendingImg = true;
//   $.ajax({
//     url: 'http://192.168.137.105:8080/Servlet/ReceiveFileServlet',
//     type: 'post',
//     data: formdata,
//     dataType: 'json',
//     processData: false, //用FormData传fd时需有这两项
//     contentType: false,
//     success: function (data) {
//       sendingImg = false;
//       // imgObj.attr("src", data.message);
//       //图片上传成功后拿取返回的url
//       sendImg_chatContent(data.message);
//     },
//     error: function (data) {
//       sendingImg = false;
//       displayTipPane("图片上传失败！")
//     },
//     timeout: function (data) {
//       sendingImg = false;
//       displayTipPane("图片上传超时！")
//     }
//   })
// }


// //发送图片信息
// function sendImg_chatContent(url) {
//   var date = new Date();
//   var sendTime = date.getTime();
//   var imgInfo = {
//     "senderMarkNumber": myMarkNumber,
//     "senderFace": $.cookie("face"),
//     "senderName": $.cookie("userName"),
//     "contentType": "img",
//     "sendTime": "" + sendTime,
//     "content": url
//   }
//   addSend(imgInfo);
//   ws.send(JSON.stringify(imgInfo));
// }

// // img是css查询条件
// function isImgLoad(callback, img) {
//   $(img).each(function () {
//     if (this.height === 0) {
//       isLoad = false;
//       return false;
//     }
//   });
//   if (isLoad) {
//     clearTimeout(t_img);
//     callback();
//   } else {
//     isLoad = true;
//     t_img = setTimeout(function () {
//       isImgLoad(callback);
//     }, 100)
//   }
// }

// // 添加接受的消息函数
// function addReceived(data) {
//   // displayTipPane(data);
//   //判断data类型 img | text
//   // console.log(data);
//   data = JSON.parse(data);
//   // console.log(data);

//   var liNode = document.createElement("li");
//   liNode.classList.add("target");
//   if (data.contentType == "text") {
//     liNode.innerHTML = '<img class="profile" src="' + data.senderFace + '"><span class="text">' + data.content + '</span>';
//   } else if (data.contentType == "face") {//表情,大小有限制
//     liNode.innerHTML = '<img class="profile" src="' + data.senderFace + '"><span class="text"><img src="' + data.content + '" height="28px"></span>';
//   } else if (data.contentType == "img") {//图片，大小有限制，但是比表情大一点
//     // data.content = "http://192.168.137.105:8080"+data.content.substring(2);
//     liNode.innerHTML = '<img class="profile" src="' + data.senderFace + '"><span class="text"><img  src="' + data.content + '" style="max-width:130px; margin:5px;border-radius:4px;cursor:zoom-in;cursor:-webkit-zoom-in" class="fadein_img"></span>';
//     ulNode.appendChild(liNode);
//     // var oImg = liNode.getElementsByTagName("img")[0];
//     rebindSeeImage();
//     isImgLoad(function () {
//       screen_inner.scrollTop = screen_inner.scrollHeight - screen_inner.clientHeight;
//     }, liNode.getElementsByTagName("img"));
//     return;
//   }
//   ulNode.appendChild(liNode);
//   screen_inner.scrollTop = screen_inner.scrollHeight - screen_inner.clientHeight;
// }
// //添加发送的出去的消息
// function addSend(data) {
//   // displayTipPane(data);
//   //判断data类型 img | text
//   var liNode = document.createElement("li");
//   liNode.classList.add("me");

//   if (data.contentType == "text") {
//     liNode.innerHTML = '<span class="text">' + data.content + '</span><img class="profile" src="' + data.senderFace + '">';
//   } else if (data.contentType == "face") {//表情,大小有限制
//     liNode.innerHTML = '<span class="text"><img src="' + data.content + '" height="28px"></span><img class="profile" src="' + data.senderFace + '">';

//   } else if (data.contentType == "img") {//图片，大小有限制，但是比表情大一点

//     data.content = "http://192.168.137.105:8080" + data.content.substring(2);
//     liNode.innerHTML = '<span class="text"><img  src="' + data.content + '" style="max-width:130px; border-radius:4px; margin:5px;cursor:zoom-in;cursor:zoom-in;cursor:-webkit-zoom-in" class="fadein_img"></span><img class="profile" src="' + data.senderFace + '">';
//     ulNode.appendChild(liNode);
//     //添加事件
//     // var oImg = liNode.getElementsByTagName("img")[0];
//     // $(oImg).on('click',rebindSeeImage);
//     rebindSeeImage();
//     isImgLoad(function () {
//       screen_inner.scrollTop = screen_inner.scrollHeight - screen_inner.clientHeight;
//     }, liNode.getElementsByTagName("img"));
//     return;

//   }
//   ulNode.appendChild(liNode);
//   screen_inner.scrollTop = screen_inner.scrollHeight - screen_inner.clientHeight;
// }

// //登录成功和自动登录时使用
// function initialWebSocket() {
//   myMarkNumber = $.cookie("markNumber");
//   wantToSendMarkNumber = "123456789";
//   wsUrl = url + '/' + myMarkNumber + '/' + wantToSendMarkNumber;
//   createWebSocket1();
// }

// //点击其他聊天后也要调用，重新连接websocket
// // function createWebSocket() {

// //   try {
// //     ws = new WebSocket(wsUrl);
// //     init();
// //   } catch (e) {
// //     displayTipPane('catch');
// //     reconnect();
// //   }

// // }
// // function init() {
// //   ws.onclose = function () {
// //     displayTipPane('链接关闭');
// //     reconnect();
// //   };
// //   ws.onerror = function () {
// //     displayTipPane('发生异常了');
// //     reconnect();
// //   };
// //   ws.onopen = function () {
// //     //心跳检测重置
// //     displayTipPane("webSocket连接成功");
// //     heartCheck.start();
// //   };
// //   ws.onmessage = function (event) {
// //     //拿到任何消息都说明当前连接是正常的
// //     console.log(event)
// //     //消息的展示,不是心跳验证码,就小红点出现，用户发送过来的数据也开始动态添加
// //     addReceived(event.data);
// //     // if(event.data!="#1#"){
// //     //     addReceived(event.data);
// //     // }
// //     heartCheck.start();
// //   }
// //   //发送消息
// // }
// // function reconnect() {
// //   if (lockReconnect) {
// //     return;
// //   };
// //   lockReconnect = true;
// //   //没连接上会一直重连，设置延迟避免请求过多
// //   tt && clearTimeout(tt);
// //   tt = setTimeout(function () {
// //     createWebSocket(wsUrl);//重新连接，递归
// //     lockReconnect = false;
//   }, 4000);
// }
// //心跳检测
// var heartCheck = {
//   timeout: 3000,
//   timeoutObj: null,
//   serverTimeoutObj: null,
//   start: function () {
//     // displayTipPane('start');
//     var self = this;
//     this.timeoutObj && clearTimeout(this.timeoutObj);
//     this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
//     this.timeoutObj = setTimeout(function () {
//       //这里发送一个心跳，后端收到后，返回一个心跳消息，
//       //   displayTipPane('55555');
//       ws.send("123456789");//如果是后端还在线，就会触发onmessage事件
//       //3s不返回消息就会关闭webSocket，否则就会关闭该定时器继续进行心跳检测
//       self.serverTimeoutObj = setTimeout(function () {
//         // displayTipPane(111);
//         // displayTipPane(ws);
//         ws.close();
//         // createWebSocket();
//       }, self.timeout);

//     }, this.timeout)
//   }
// }


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



//面板的打开与关闭  
//nav有写
// $(".platform_chat .face").on("click", function (e) {
//   e.stopPropagation()
//   $(".facePane").fadeIn(230);
//   $(".facePane").css("display", "flex");

// })
// $('body').on("click", function () {
//   $(".facePane").fadeOut(230);
// })


// // 关闭聊天面板
// $('.close_btn').click(function () {
//   $(".platform_chat").fadeOut(200);
// })



//聊天
var lockReconnect = false;//避免重复连接
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
$('.platform_chat .close_btn').click(function () {
  $(".platform_chat").fadeOut(200);
})



