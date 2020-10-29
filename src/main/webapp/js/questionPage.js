var isLogon;
//
var oAuthor;
//整篇文章的id
var questionId_local = getQueryVariable("id");

loadQuestion();
// console.log(getCookie("markNumber"));
$(window).on("load", () => {
    console.log("加载成功")
    if (getCookie("markNumber") != null) {
        isLogon = true;
        console.log('设置了cookie');
    } else {
        isLogon = false;
    }
})

function fixed() {
    // console.log("头部固定");
    if ($(this).scrollTop() > 500) {
        $('.head_search_outside').addClass("head_search_outside_fixed");
        $('.sideBox_fixed').addClass("sideBox_fixed_on");
        $('.sideBox_fixed').css("right", "");
        $('.sideBox_fixed').css("left", $('.head_search').position().left + $('.head_search').width() - $('.sideBox_fixed').width() + "px");
        $('.sideBox_fixed .author_info_box').slideDown();
    } else {
        $('.head_search_outside').removeClass("head_search_outside_fixed");
        $('.sideBox_fixed').removeClass("sideBox_fixed_on");
        $('.sideBox_fixed').removeAttr("style");
        $('.sideBox_fixed').css("right", 0);
        $('.sideBox_fixed .author_info_box').slideUp();
    }
}
$(window).bind("scroll", debounce(fixed, 10, true));

// 写回答板块的打开的与关闭
$('.question_info_main .answer_btn').click(() => {

    if (isLogon) {
        $('.textAnswer').slideDown();
    } else {
        alert("请先登录！")
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

$('.note .writeAnswer').click(function() {
    scrollUp();
    $('.textAnswer').slideDown();
})

//点击图片放大
// $('.fadein_img').on("click",function() {
//     $('.modal_bg_img').fadeIn();
//     $('.modal_bg_img .modal').css({
//         transform: 'translate(-50%,-50%) scale(1)'
//     })
//     $('.modal_bg_img .modal').find(".modal_content img").attr("src",$(this).attr("src"));
// })

// $('.modal_bg_img .fadeout').on("click",function() {
//     $('.modal_bg_img').fadeOut(); // 其实就是css 的过渡+ display
//     $('.modal_bg_img .modal').css({
//         transform: 'translate(-50%,-50%) scale(0.7)'
//     })
// })
//#region  点击模态框以外的地方 模态框消失
//设置背景高度

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
$(window).bind("resize", () => {
    if ($(this).scrollTop() > 500) {
        $('.sideBox_fixed').css("left", $('.head_search').position().left + $('.head_search').width() - $('.sideBox_fixed').width() + "px");
    }
})

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
            alert("有图片正在上传中！")
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
        return alert("上传的图片格式不正确，请重新选择");
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
            console.log(imgObj);
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
        url: 'http://192.168.137.103:8080/Servlet/ReceiveFileServlet',
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
            alert("图片上传失败！已自动删除！")
        },
        timeout: function(data) {
            imgObj.remove();
            sendingImg = false;
            alert("图片上传超时！已自动删除！")
        }
    })
}
//动态添加回答的数据
var answerData = {
    "requestType": "get",
    "questionId": questionId_local, //回答的问题的id
    "markNumber": getCookie("markNumber")[2], //回答者的学号,找cookie
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
    console.log("children=");
    // console.log(children);
    var j = 0;
    var text = "";
    console.log(children)
    console.log("children.length=" + children.length);
    for (var i = 0; i < children.length; i++) {
        console.log("i=" + i);
        if (children[i].getAttribute("type") == "text") {
            console.log(children[i].getAttribute("type"));
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
        alert("有图片正在上传中!")
        return;
    }
    //准备发送
    loadAnswerContents();
    if (emptyContent) {
        alert("请输入内容！");
        return;
    }
    answerData["answerContents"] = answerContents;
    // console.log(answerData);
    $.ajax({
        url: "http://192.168.137.103:8080/Servlet/AnswerServlet",
        type: "post",
        dataType: 'json',
        data: JSON.stringify(answerData),
        success: function(res) {
            console.log("返回结果:")
            console.log(res);
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
                alert("发布成功！");
                //加载最新内容
                loadMyNewAnswer(answerContents, res.id);
                //发送通知
                var data = {
                    "senderMarkNumber": getCookie("markNumber")[2],
                    "receiverMarkNumber": oAuthor.markNumber,
                    "content": '回答了你的问题"' + $(".question_info_box .questionTitle").html() + '。"',
                    "additionContent": "额外内容 可以为空",
                    "type": "inf",
                    "senderName": getCookie("userName")[2],
                    "isRead": false,
                    "senderFace": getCookie("face")[2],
                    "requestType": "post"
                }
                sendInfo(data);

            } else {
                alert("发布失败！");
            }
            answerContents = new Array();
        },
        error: function(res) {
            alert("发送失败！请检查网络是否正常！")
        },
        timeout: function(res) {
            alert("发送超时！请检查网络是否正常！")
        }
    })
}
//点击发送按钮
$("#sendAnswerBtn").click(function() {
        sendAnswer();
    })
    //把用户刚发布的回答显示出来，这个其实是要后端再发相应的
function loadMyNewAnswer(answerContents, answerId) {
    var type = getCookie("level") != null ? "学生" : "教师";
    var school_info = type == "学生" ? getCookie("major")[2] : getCookie("college")[2];
    var framObj = $("<div class='answerItem'></div>");
    var reg = /(..\/)/;
    var src = getCookie("face")[2];
    src = src.replace(reg.exec(src)[0], "http://192.168.137.103:8080//");
    var framData = {
            agreeCount: 0,
            commentCount: 0,
            userType: type,
            agree: "no_agree",
            time: "2020/10/17",
            face: src,
            userName: getCookie("userName")[2],
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
        agreeAnswer.call($(this), getCookie("markNumber")[2]);
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
getAnswer(1);
// var answer_nowPostiont = 1;
//获取回答，发送请求，获取相应，动态添加
function getAnswer(curPage) {
    console.log("加载回答");

    $.ajax({
        url: "http://192.168.137.103:8080/Servlet/AnswerServlet",
        dataType: "json",
        type: "get",
        data: {
            requestType: "get",
            getAnswerType: "question",
            questionId: questionId_local, // 进入该页面后应该会有questionId
            viewerMarkNumber: getCookie("markNumber")[2],
            markNumber: getCookie("markNumber")[2], // 用户者的学号
            currentPage: curPage //当前页面
        },

        success: function(res) {
            //获取返回信息，进行渲染
            //调用
            console.log("问题是")
            console.log(res);
            console.log(res.dataList);
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
            alert("加载回答失败")
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
        var reg = /(..\/)/;
        var src = authorObj.face;
        // console.log(authorObj);
        // console.log("图片地址:"+src);
        src = src.replace(reg.exec(src)[0], "http://192.168.137.103:8080//");

        var contentObj = {
            agreeCount: arr[i].agreeCount,
            commentCount: arr[i].commentCount,
            userType: type,
            agree: isAgree,
            time: "2020/10/17",
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
            alert("没有更多回答了哦！");
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
            var reg = /(..\/)/;
            var src = contentArr[j]["contentMain"];
            src = src.replace(reg.exec(src)[0], "http://192.168.137.103:8080//");
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
            url: "http://192.168.137.103:8080/Servlet/CommentServlet",
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
        var reg = /(..\/)/;
        data.face = data.face.replace(reg.exec(data.face)[0], "http://192.168.137.103:8080//");
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
        url: "http://192.168.137.103:8080/Servlet/CommentServlet",
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
        alert("评论不能为空！");
        return;
    }
    var answerItem = $(this).parents(".answerItem");
    var data_1 = {
        requestType: "post",
        answerId: answerItem.attr("answerid"),
        markNumber: getCookie("markNumber")[2],
        content: text
    };
    var obj = $(this); //this指发表评论的按钮
    //判断敏感词

    $.ajax({
        url: "http://192.168.137.103:8080//Servlet/SensitiveWordServlet",
        data: JSON.stringify({
            "textArr": [
                text
            ]
        }),
        type: "post",
        success: function(res) {
            if (res.statusCode == 500) {
                alert("内容" + res.message + "请修改后再发送！");
            } else {
                data_1.content = res[0];
                send();
            }
        }
    })

    // 发送评论
    function send() {
        $.ajax({
            url: "http://192.168.137.103:8080/Servlet/CommentServlet",
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
                            "senderMarkNumber": getCookie("markNumber")[2],
                            "receiverMarkNumber": obj.parents(".answerItem").attr("answerId"),
                            "content": '评论了你对"' + $(".question_info_box .questionTitle").html() + '"的回答',
                            "additionContent": "额外内容 可以为空",
                            "type": "inf",
                            "senderName": getCookie("userName")[2],
                            "isRead": false,
                            "senderFace": getCookie("face")[2],
                            "requestType": "post"
                        }
                        sendInfo(data);
                    }
                } else {
                    alert("评论失败！");
                }
            }
        })
    }

    function loadMyNewComment(text) {
        var src = getCookie("face")[2];
        var reg = /(..\/)/;
        src = src.replace(reg.exec(src)[0], "http://192.168.137.103:8080//");
        var data = {
            content: text,
            face: src,
            userName: getCookie("userName")[2]
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
        if ($(this).attr("changing") == "true") {
            return;
        }
        $(this).attr("changing", "true");
        var status = $(this).parents(".like_btn").attr("status");
        var obj = $(this);
        if (status == "agree") { //再次点击为取消点赞
            $.ajax({
                url: "http://192.168.137.103:8080/Servlet/AgreeServlet",
                type: "get",
                dataType: "json",
                data: {
                    requestType: "delete",
                    agreeType: "question",
                    markNumber: getCookie("markNumber")[2],
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
                url: "http://192.168.137.103:8080/Servlet/AgreeServlet",
                type: "post",
                dataType: "json",
                data: JSON.stringify({
                    requestType: "post",
                    agreeType: "question",
                    markNumber: getCookie("markNumber")[2],
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
                            "senderMarkNumber": getCookie("markNumber")[2],
                            "receiverMarkNumber": oAuthor.markNumber,
                            "content": '点赞了你的问题"' + $(".question_info_box .questionTitle").html() + '"',
                            "additionContent": "额外内容 可以为空",
                            "type": "inf",
                            "senderName": getCookie("userName")[2],
                            "isRead": false,
                            "senderFace": getCookie("face")[2],
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
    if ($(this).attr("changing") == "true") {
        return;
    }
    $(this).attr("changing", "true");
    var status = $(this).parents(".like_btn").attr("status");
    var obj = $(this);
    // console.log($(this));
    if (status == "agree") { //再次点击为取消点赞
        $.ajax({
            url: "http://192.168.137.103:8080/Servlet/AgreeServlet",
            type: "get",
            dataType: "json",
            data: {
                requestType: "delete",
                agreeType: "answer",
                markNumber: getCookie("markNumber")[2],
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
            url: "http://192.168.137.103:8080/Servlet/AgreeServlet",
            type: "post",
            dataType: "json",
            data: JSON.stringify({
                requestType: "post",
                agreeType: "answer",
                markNumber: getCookie("markNumber")[2],
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
                        "senderMarkNumber": getCookie("markNumber")[2],
                        "receiverMarkNumber": markNumber_2,
                        "content": '点赞了你对"' + $(".question_info_box .questionTitle").html() + '"的回答',
                        "additionContent": "额外内容 可以为空",
                        "type": "inf",
                        "senderName": getCookie("userName")[2],
                        "isRead": false,
                        "senderFace": getCookie("face")[2],
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
        url: "http://192.168.137.103:8080/Servlet/AttentionServlet",
        type: "post",
        dataType: 'json',
        data: JSON.stringify({
            "majorMarkNumber": getCookie("markNumber")[2],
            "passMarkNumber": "191541227",
            "requestType": "post"
        }),
        success: function(res) {
            if (res.statusCode == 200) {
                $(".author_info_box .subscribe_btn").addClass("subscribe");
                $(".author_info_box .subscribe_btn").removeClass("no_subscribe");
                $(".author_info_box .subscribe_btn").attr("status", "subscribe");
                $(".author_info_box .subscribe_btn").html("已关注");
                var data = {
                    "senderMarkNumber": getCookie("markNumber")[2],
                    "receiverMarkNumber": oAuthor.markNumber,
                    "content": "关注了你",
                    "additionContent": "额外内容 可以为空",
                    "type": "inf",
                    "senderName": getCookie("userName")[2],
                    "isRead": false,
                    "senderFace": getCookie("face")[2],
                    "requestType": "post"
                };
                sendInfo(data);
            }
        }
    })
}

function cancelSubscribeAuthor() {

    $.ajax({
        url: "http://192.168.137.103:8080/Servlet/AttentionServlet",
        type: "get",
        dataType: "json",
        data: {
            requestType: "delete",
            majorMarkNumber: getCookie("markNumber")[2],
            passMarkNumber: "191541227"
        },
        success: function(res) {
            if (res.statusCode == 200) {
                $(".author_info_box .subscribe_btn").removeClass("subscribe");
                $(".author_info_box .subscribe_btn").addClass("no_subscribe");
                $(".author_info_box .subscribe_btn").attr("status", "no_subscribe");
                $(".author_info_box .subscribe_btn").html("关注");
                var data = {
                    "senderMarkNumber": getCookie("markNumber")[2],
                    "receiverMarkNumber": oAuthor.markNumber,
                    "content": "取消对你的关注。",
                    "additionContent": "额外内容 可以为空",
                    "type": "inf",
                    "senderName": getCookie("userName")[2],
                    "isRead": false,
                    "senderFace": getCookie("face")[2],
                    "requestType": "post"
                };
                sendInfo(data);
            }
        }
    })
}
$(".author_info_box .subscribe_btn").click(function() {
    if ($(".author_info_box .subscribe_btn").attr("status") == "subscribe") {
        cancelSubscribeAuthor();

    } else if ($(".author_info_box .subscribe_btn").attr("status") == "no_subscribe") {
        subscribeAuthor();
    } else {
        alert("作者匿名，关注已禁用！")
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
    $.ajax({
        url: "http://192.168.137.103:8080//Servlet/QuestionServlet",
        type: 'get',
        dataType: 'json',
        data: {
            requestType: "get",
            questionId: questionId_local, //需要jsp来获取请求
            ViewerMarkNumber: getCookie("markNumber")[2]
        },
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
        var reg = /(..\/)/;
        var src = data.contents[i]['contentMain'];
        // console.log(authorObj);
        // console.log("图片地址:"+src);
        src = src.replace(reg.exec(src)[0], "http://192.168.137.103:8080//");
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

function setAuthorInfo(data) {
    //是否关注作者
    //判断作者是否匿名
    //头像默认 用户名改匿名
    var src;

    if (data.userType == "student") {
        oAuthor = data.student;
        $(".author_info_box .userType").html("学生");
        $(".author_info_box .schoolInfo").html(oAuthor.major);
    } else {
        oAuthor = data.teacher;
        $(".author_info_box .userType").html("老师");
        $(".author_info_box .schoolInfo").html(oAuthor.college);
    }

    if (data.anonymity) {
        src = "../img/defaultStudentFace.jpg"
        $(".author_info_box .userName").html("匿名");
    } else {
        src = oAuthor.face;
        $(".author_info_box .userName").html(oAuthor.userName);
    }
    var reg = /(..\/)/;
    src = src.replace(reg.exec(src)[0], "http://192.168.137.103:8080//");
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
    let query = window.location.search.substring(1);
    //window.location.href
    $('.note .content textarea').select(query);
    document.execCommand("copy"); // 执行浏览器复制命令
})

//敏感词
//回答和评论都有判断
//发送通知
function sendInfo(data) {
    // console.log("发送了通知！")
    $.ajax({
        url: "http://192.168.137.103:8080/Servlet/InfServlet",
        type: "post",
        data: JSON.stringify(data),
        success: function(res) {
            console.log("通知成功！");
        }
    })
}
// var data = {
//     "senderMarkNumber": getCookie("markNumber")[2],
//     "receiverMarkNumber": "",
//     "content": "关注了你",
//     "additionContent": "额外内容 可以为空",
//     "type": "inf",
//     "senderName": getCookie("userName")[2],
//     "isRead": false,
//     "senderFace": getCookie("face")[2],
//     "requestType": "post"
// }