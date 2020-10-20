



function fixed(){
    // console.log("头部固定");
    if($(this).scrollTop()>500){
        $('.head_search_outside').addClass("head_search_outside_fixed");
        $('.sideBox_fixed').addClass("sideBox_fixed_on");
        $('.sideBox_fixed').css("right","");
        $('.sideBox_fixed').css("left",$('.head_search').position().left+$('.head_search').width()-$('.sideBox_fixed').width()+"px");
        $('.sideBox_fixed .author_info_box').slideDown();
    }else{
        $('.head_search_outside').removeClass("head_search_outside_fixed");
        $('.sideBox_fixed').removeClass("sideBox_fixed_on");
        $('.sideBox_fixed').removeAttr("style");
        $('.sideBox_fixed').css("right",0);
        $('.sideBox_fixed .author_info_box').slideUp();
    }
}
$(window).bind("scroll",debounce(fixed,10,true));


// 写回答板块的打开的与关闭
$('.question_info_main .answer_btn').click(()=>{
    $('.textAnswer').slideDown();
    }
)
$('.textAnswer .slideUp').click(()=>{
    $('.textAnswer').slideUp();
    }
)


$('.textAnswer .answerTextArea').focus(function(){
    $(this).css({
        border:"1px solid #02A7F0",
        "box-shadow": "0 0 1px #02A7F0"
    });
})

//复制便利签文本
$('.note .copyText').click(function(){
    console.log($('.note .content textarea').select());
    document.execCommand("copy"); // 执行浏览器复制命令
})

$('.note .writeAnswer').click(function(){
   scrollUp();
   $('.textAnswer').slideDown();
})



//点击图片放大
    $('.fadein_img').on("click",function() {
        $('.modal_bg_img').fadeIn();
        $('.modal_bg_img .modal').css({
            transform: 'translate(-50%,-50%) scale(1)'
        })
        $('.modal_bg_img .modal').find(".modal_content img").attr("src",$(this).attr("src"));
    })

    $('.modal_bg_img .fadeout').on("click",function() {
        $('.modal_bg_img').fadeOut(); // 其实就是css 的过渡+ display
        $('.modal_bg_img .modal').css({
            transform: 'translate(-50%,-50%) scale(0.7)'
        })
    })
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
$(window).bind("resize",()=>{
    if($(this).scrollTop()>500){
        $('.sideBox_fixed').css("left",$('.head_search').position().left+$('.head_search').width()-$('.sideBox_fixed').width()+"px");
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
    $('.addImageBtn').click(()=>{
        if(sendingImg){
            alert("有图片正在上传中！")
        }
        $('.file_input').click();
    })
    // 什么是否提取文字，不能在选择图片之后就提取，应该要最终再提取，最后遍历所有节点，遍历到图片后，断开
    //在本节点的下一个节点插入一个新的div,并且把光标给下一个div
    
    $(".edit-div").keydown (function(){
        var arg = arguments;
        inputText.apply($(this),arg);
    })
    function inputText(e){
        var ev = e || window.event;
        var key = ev.keyCode || ev.charCode;
        if(key == 13) {//回车键
            if(ev.preventDefault) {
                ev.preventDefault();
            } else {
                ev.returnValue = false;
            }
            // console.log($(this));
            var otextDiv = $('<div class="textarea edit-div" type="text" contenteditable="true" id="edit-div"></div>');
            otextDiv.keydown(function(){
                var arg = arguments;
                inputText.apply($(this),arg);
            })
            $(this).after(otextDiv);
            otextDiv.focus();
        }//删除键
        if(key==8 && ($(this).html()=="" || $(this).html()=="<br>")){
            if($(this).prev().attr("id")!="begin" && $(this).prev().attr("type")!="img"){
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
    var sendingImg = false;// 判断是否正在发送图片，如果是就不能点击发表文章
    function readFile(){
        var formdata = new FormData();
            if (!oinput['value'].match(/.jpg|.gif|.png|.jpeg|.bmp/i)){　　//判断上传文件格式
                return alert("上传的图片格式不正确，请重新选择");
            }
            var reader = new FileReader();
            //因为每次表签设置了单文件读取，所以是file[0]
            reader.readAsDataURL(this.files[0]);  //转成base64
            reader.fileName = this.files[0].name;
            // formdata.delete(0);//先删除，再添加
            formdata.append(0,this.files[0]);// formdata 的属性
            reader.onload = function(e){
                var imgMsg = {
                    name : this.fileName,//获取文件名
                    base64 : this.result   //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
                }
                // console.log(imgMsg);
                var newImage = template("templateImage",imgMsg);
                var imgObj = $(newImage);
                //把新的图片添加到编辑区
                $(".answerTextArea").append(imgObj);
                console.log(imgObj);
                var otextDiv = $('<div class="textarea edit-div" type="text" contenteditable="true" id="edit-div"></div>');
                //为一行添加图片
                otextDiv.keydown(function(){
                    var arg = arguments;
                    inputText.apply($(this),arg);
                })
                $(".answerTextArea").append(otextDiv);
                sendImage(formdata,imgObj);//发送图片
            }
        // }
    }
    //发送图片
    function sendImage(formdata,imgObj){//imgObj是jq对象
        sendingImg = true;
        $.ajax({
            url : 'http://192.168.137.141:8080/Servlet/ReceiveFileServlet',
            type : 'post',
            data : formdata,
            dataType: 'json',
            processData: false,//   用FormData传fd时需有这两项
            contentType: false,
            success : function(data){
                imgObj.attr("remoteURL",data.message);
                sendingImg = false;
            }
        })
    }
    //动态添加回答的数据
    var answerData = {
        "requestType":"get",
        "questionId":"123",//回答的问题的id
        "markNumber":getCookie("markNumber")[2],//回答者的学号,找cookie
        "answerContents":""
    }
    var answerContents = new Array();
    function addAnswerContentItem(order,type,content){
        return JSON.stringify({
            "contentOrder" : order,
            "contentType" : type,
            "contentMain" : content
        })
    }
    //加载文本和图片到answerContents

    var emptyContent = true;
    function loadAnswerContents(){
        //遍历一遍所有的节点
        //如果是图片就把remoteURL加入到anserContent中
        //如果是文本就把文本抽出来，继续向下遍历
        //直到为空
        var order = 1;
        var children = $(".answerTextArea").find("*");
        var j = 0;
        var text = "";
        for(var i=0; i<children.length; i++){
            console.log(children[i].getAttribute("type"));
            if(children[i].getAttribute("type")=="text"){
                if(children[i].innerHTML=="" || children[i].innerHTML=="<br>"|| children[i].innerHTML==null || children[i].innerHTML==undefined || children[i].innerHTML=="null"){
                    continue;
                }
                text +=children[i].innerHTML;
                //如果一个当前节点为最后的节点，就把文本给添加起来
                if(i+1==children.length || children[i+1].getAttribute("type")=='img'){
                    answerContents[j++]=addAnswerContentItem(order++,"text",text);
                    text = "";
                    console.log("添加了文本元素")
                    emptyContent  = false;
                }

            }else if(children[i].getAttribute("type")=="img"){
                answerContents[j++]=addAnswerContentItem(order++,"img",children[i].getAttribute('remoteURL'));
                console.log("添加了图片元素")
                emptyContent  = false;
            }else{

            }
        }
        console.log(answerContents);
    }
    //发送整个文本
    function sendAnswer(){
       //发布文本之前把文本和图片加起来
       if(sendingImg){
            alert("有图片正在上传中!")
            return;
       }
       //准备发送
        loadAnswerContents();
        if(emptyContent){
            alert("请输入内容！");
            return;
        }
        answerData["answerContents"] = answerContents;
        console.log(answerData);
        $.ajax({
            url : "http://192.168.137.141:8080/Servlet/AnswerServlet",
            type : "post",
            dataType : 'json',
            data : JSON.stringify(answerData),
            success : function(res){
                if(res.statusCode==200){
                    //清空内容
                    $(".answerArea .answerTextArea").html('<div class="begin" id="begin"></div><div class="textarea edit-div" type="text" contenteditable="true" id="edit-div"></div>');
                    $(".edit-div").keydown (function(){
                        var arg = arguments;
                        inputText.apply($(this),arg);
                    })
                    emptyContent = true;
                    //收起
                    $(".answerArea .textAnswer").slideUp();
                    alert("发布成功！");
                    //加载最新内容
                    loadMyNewAnswer(answerContents,res.id);
                }else{
                    alert("发布失败！");
                }
                answerContents = new Array();
            }
        })
    }
    //点击发送按钮
    $("#sendAnswerBtn").click(function(){
        sendAnswer();
    })
    //把用户刚发布的回答显示出来，这个其实是要后端再发相应的
    function loadMyNewAnswer(answerContents,answerId){
        var type = getCookie("level")!=null ? "学生" : "教师";
        var school_info = type=="学生" ? getCookie("major")[2] : getCookie("college")[2];
        var framObj = $("<div class='answerItem'></div>");
        var reg = /(..\/)/;
        var src = getCookie("face")[2];
        src = src.replace(reg.exec(src)[0],"http://192.168.137.141:8080//");
        var framData = {
            agreeCount : 0,
            commentCount : 0,
            userType :type,
            agree : "no_agree",
            time : "2020/10/17",
            face :src,
            userName : getCookie("userName")[2],
            schoolInfo : school_info
        }
        // console.log()
        framObj.append(template("template_answerItem",framData));
         //添加answerId
         framObj.attr("answerId",answerId);
         framObj.find(".seeComment").on("click",function(){
             seeComment.call($(this),1);//需要更改为动态页数
         });
         framObj.find(".comment_btn").on("click",function(){
             $(this).parents(".answerItem").find(".addComment").slideDown();
         })
         //关闭对回答进行评论块
         framObj.find(".addComment .slideUp").click(function(){
             $(this).parents(".addComment").slideUp();
         })
         framObj.find(".commentList .slideUp").click(function(){
             $(this).parents(".commentList").slideUp();
         })
         //发布评论
         framObj.find(".addComment .sendBtn").click(function(){
             sendComment.call($(this));
         })
        //添加内容
        var contentTextArr = [];
        //转js对象
        for(var i=0; i<answerContents.length; i++){
            contentTextArr.push(JSON.parse(answerContents[i]));
        }
        var contentText =  addAnswerContentText(contentTextArr);
        framObj.find(".contentText").append(contentText);
        $(".answerItem_List").prepend(framObj);
    }
    //
    //一进入之后加载一些
    getAnswer(1);
    // var answer_nowPostiont = 1;
    //获取回答，发送请求，获取相应，动态添加
    function getAnswer(curPage){
        $.ajax({
            url : "http://192.168.137.141:8080/Servlet/AnswerServlet",
            dataType : "json",
            data : {
                requestType :"get",
                getAnswerType : "question",
                questionId : "123",// 进入该页面后应该会有questionId
                viewerMarkNumber : getCookie("markNumber")[2],// 用户者的学号
                currentPage :curPage//当前页面
            },
            type : "get",
            success : function(res){
                //获取返回信息，进行渲染
                //调用
                // console.log(res.dataList);
                displayAnswers(res.dataList);
            }
        })
    }
    // 
    function displayAnswers(arr){
        for(var i=0; i<arr.length; i++){
            //头部信息,需要student对象 
            //尾部，主要自己创建对象
            //点赞数字， 评论数字（没有），用户是否有点赞
            var oItem = $(" <div class='answerItem'></div>");
            var type = arr[i].student != null ? "学生" : "教师";
            var authorObj = arr[i].student!= null ? arr[i].student : arr[i].teacher;
            var isAgree = arr[i].agree == true ? "agree" : "no_agree";
            var school_info = authorObj.major || authorObj.college;
            var reg = /(..\/)/;
            var src  = authorObj.face;
            // console.log(authorObj);
            // console.log("图片地址:"+src);
            src = src.replace(reg.exec(src)[0],"http://192.168.137.141:8080//");
            
            var contentObj = {
                agreeCount : arr[i].agreeCount,
                commentCount : arr[i].commentCount,
                userType : type,
                agree : isAgree,
                time : "2020/10/17",
                face : src,
                userName : authorObj.userName,
                schoolInfo : school_info
            }
            oItem.append(template("template_answerItem",contentObj))
            //添加answerId
            // console.log(arr[i].contents);
            if(arr[i].contents[0]){
                oItem.attr("answerId",arr[i].contents[0]["answerId"]);
            }
            // oItem.attr("answerId",arr[i].contents[0]["answerId"]);
            oItem.find(".seeComment").on("click",function(){
                seeComment.call($(this),1);//需要更改为动态页数
            });
            oItem.find(".comment_btn").on("click",function(){
                $(this).parents(".answerItem").find(".addComment").slideDown();
            })

            //关闭对回答进行评论块
            oItem.find(".addComment .slideUp").click(function(){
                $(this).parents(".addComment").slideUp();
            })
            oItem.find(".commentList .slideUp").click(function(){
                $(this).parents(".commentList").slideUp();
            })

            //发布评论
            oItem.find(".addComment .sendBtn").click(function(){
                sendComment.call($(this));
            })
            // console.log(oItem.find(".contentText"));
            //主要内容拼接
            //需要content对象
            // console.log(arr[i]);
            var contentText= addAnswerContentText(arr[i].contents);
            oItem.find(".contentText").append(contentText);
            $(".answerItem_List").append(oItem);
        }
         //点击图片放大
         rebindSeeImage();
        // console.log(arr);
    }

    function addAnswerContentText(contentArr){
        var contentText= "";
        // console.log(contentArr);
        for(var j=0; j<contentArr.length; j++){
            if(contentArr[j]["contentType"]=="text"){
                //添加p
                // console.log( arr[i].contents[j]);
                contentText +="<p>"+contentArr[j]["contentMain"]+"</p>";
            }else{
                //添加图片
                // console.log( arr[i].contents[j]);
                var reg = /(..\/)/;
                var src  = contentArr[j]["contentMain"];
                src = src.replace(reg.exec(src)[0],"http://192.168.137.141:8080//");
                // console.log(src);
                contentText +="<img class='fadein fadein_img' src='"+src+"'/>";
            }
        }
        return contentText;
    }

    //获取某个回答的评论
    //点击查看评论的时候触发请求
    function seeComment(nextPage){
        var obj = $(this);
        $(this).parents(".answerItem").find(".commentList").slideDown();
        $.ajax({
            url : "http://192.168.137.141:8080/Servlet/CommentServlet",
            data : {
                requestType : "get",
                getType : "answer",
                answerId : this.parents(".answerItem").attr("answerid"),
                // answerId : 1,
                currentPage : nextPage
            },
            type : "get",
            dataType : "json",
            success : function(res){
                // console.log(res.dataList);//内容区
                // console.log(res.dataList);
                displayComment.call(obj,res.dataList);
            }
        })
    }

    function displayComment(dataList){
        for(var i=0; i<dataList.length; i++){
            var item = dataList[i];
            data = item.student != null ? item.student : item.teacher;
            var reg = /(..\/)/;
            data.face = data.face.replace(reg.exec(data.face)[0],"http://192.168.137.141:8080//");
            // console.log(data.face);
            data.content = item.content;
            var commentItem = template("template_commentItem",data);
            $(this).parents(".answerItem").find(".commentList .contentBox").append(commentItem);
            //$(this)查看评论按钮
        }
    }

    //重新绑定图片放大事件
    function rebindSeeImage(){
        $(".fadein_img").off("click");
        $(".modal_bg_img .fadeout").off("click");
        $('.fadein_img').on("click",function() {
            $('.modal_bg_img').fadeIn();
            $('.modal_bg_img .modal').css({
                transform: 'translate(-50%,-50%) scale(1)'
            })
            $('.modal_bg_img .modal').find(".modal_content img").attr("src",$(this).attr("src"));
        })

        $('.modal_bg_img .fadeout').on("click",function() {
            $('.modal_bg_img').fadeOut(); // 其实就是css 的过渡+ display
            $('.modal_bg_img .modal').css({
                transform: 'translate(-50%,-50%) scale(0.7)'
            })
        })
    }
    
    // //关闭对回答进行评论块
    // $(".answerItem .addComment .slideUp").click(function(){
    //     $(this).parents(".addComment").slideUp();
    // })
    // //打开对回答进行评论块

    // $(".answerItem .question_answer_toolBar .comment_btn").click(function(){
    //     $(this).parents(".answerItem").find(".addComment").slideDown();
    // })

    // //关闭所有对回答的评论
    // $(".answerItem .commentList .slideUp").click(function(){
    //     $(this).parents(".commentList").slideUp();
    // })
    //  //打开所有对回答的评论
    // $(".answerItem .question_answer_toolBar .seeComment").click(function(){
    //     $(this).parents(".answerItem").find(".commentList").slideDown();
    // })


    //点击查看评论

    //发布评论

    function sendComment(){
        //获取内容
        var text = $(this).parents(".addComment").find(".textBox").val();
        var answerItem = $(this).parents(".answerItem");
        var data_1 = {
            requestType : "post",
            answerId : answerItem.attr("answerid"),
            markNumber : getCookie("markNumber")[2],
            content : text
        };
        var obj = $(this);
        // 发送评论
        $.ajax({
            url : "http://192.168.137.141:8080/Servlet/CommentServlet",
            type : "post",
            data : JSON.stringify(data_1),
            dataType : "json",
            success : function(res){
               if(res.statusCode==200){
                    answerItem.find(".addComment .textBox").val("");
                   answerItem.find(".addComment").slideUp();
                   alert("评论成功！");
                   //评论成功后，评论数+1,并且动态添加到评论区上，

                    loadMyNewComment.call(obj,text);

               }else{
                   alert("评论失败！");
               }
            }
        })

        function loadMyNewComment(text){
            
            var src = getCookie("face")[2];
            var reg = /(..\/)/;
            src = data.face.replace(reg.exec(src)[0],"http://192.168.137.141:8080//");
            var data = {
                content : text,
                face : src,
                userName : getCookie("userName")[2]
            }
            var comment = template("template_commentItem",data);
            $(this).parents(".answerItem").find(".commentList").prepend(comment);
            var oCommentCount =  $(this).parents(".answerItem").find(".seeComment");
            oCommentCount.html(parseInt(oCommentCount.html())+1);
        }
        // console.log({
        //     requestType : "post",
        //     answerId : answerItem.attr("answerid"),
        //     markNumber : getCookie("markNumber")[2],
        //     content : text
        // })
        //清空评论区
        //更新评论条
    }




    












   






    




























