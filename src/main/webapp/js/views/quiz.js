$(function() {

    $(".quizModal_bg").on({
        click: function() {
            // console.log("点击了");
            $('.quizModal_bg').fadeOut(); // 其实就是css 的过渡+ display
            $('.quizModal').css({
                transform: 'translate(-50%,-50%) scale(0.7)'
            })
        }
    })
    $(".quizModal").on({
        click: function(e) {
            e.stopPropagation();
        }
    })

    //设置背景高度
    $('.cueY').click(function() {
        // $(".quizModal").siblings().fadeOut();
        // $(".quizModal").fadeIn();
        if(isHaveCookie()){
            $('.quizModal_bg').fadeIn();
            $('.fadeinQuiz').find(".iconfont").css("top", "-10px");
            // $('.modal').fadeIn();
            $('.quizModal').css({
                transform: 'translate(-50%,-50%) scale(1)'
            })
        }else{
            displayTipPane("你还没登录噢~");
        }
        
    })
    $('.fadeout').click(function() {
        $('.quizModal_bg').fadeOut(); // 其实就是css 的过渡+ display
        $('.quizModal').css({
            transform: 'translate(-50%,-50%) scale(1)'
        })
    })



    //#region 文本域字数限制
    $(".quizModal_bg_askQuestion textarea").on("keyup", function() {
        var nowNum = $(this).val().length;
        $(this).siblings("span").find(".nowNum").text(nowNum);
        var maxNum = $(this).siblings("span").find(".maxNum").text();
        if (nowNum > maxNum) {
            $(this).css("title", "字数不能超过" + maxNum + "个");
            $(this).siblings("span").find(".nowNum").text(maxNum);
            // console.log(nowNum);
            $(this).val($(this).val().substring(0, maxNum));
            $(this).css("readonly", "readonly");
        }
    })

    //#endregion

    //#region 鼠标悬停在标签 上 背景颜色改变 且出现删除按钮
    $(".nodeBoard>span").on({
        mouseover: function() {
            $(this).css("backgroundColor", "rgba(0, 0, 0, 0.1)");
            $(this).find("i").show();
        },
        mouseout: function() {
            $(this).css("backgroundColor", "#fff");
            $(this).find("i").hide();

        }
    })

    $(".addLabel .nodeBoard>span").on({
        mouseover: function() {
            $(this).css("backgroundColor", "rgba(0, 0, 0, 0.1)");
        },
        mouseout: function() {
            $(this).css("backgroundColor", "#fff");
        }
    })

    //#endregion
    // var label_count = 0;
    //#region 标签删除 添加
    $(".removeLabel").on("click", function() {
        // console.log("删除标签");
        // --label_count;
        // console.log(label_count);
        $(this).parent().hide(300);
    })


    //#endregion

    //#region 删除图片  不行

    // $(".insertPicture").on('mouseover', '.removePicture', function(e) {
    //     console.log(e)
    //         // $(this).parent('.add_params_tr').remove(); 
    //     $(this).find(".removePicture").stop().show(200);
    // })
    // $(".insertPicture").on('mouseout', '.removePicture', function(e) {
    //     console.log(e)
    //         // $(this).parent('.add_params_tr').remove(); 
    //     $(this).find(".removePicture").stop().hide(200);
    // })

    // $(".picture").on({
    //     mouseover: function() {
    //         console.log(1);
    //         // $(this).css("backgrounColor", "rgba(0,0,0,0.2)");
    //         $(this).find(".removePicture").stop().show(200);
    //         // $(this).css("width", "500px");
    //     },
    //     mouseout: function() {
    //         // $(this).css("width", "100px")
    //         $(this).find(".removePicture").stop().hide(200);
    //     }
    // })

    // $(".removePicture").on({
    //     click: function() {
    //         $(this).parents(".picture").remove();
    //     }
    // })
    //#endregion

    //打开文章列表
    $(".quizModal_bg_askQuestion .questionType svg").click(function() {
        $('.quizModal_bg_askQuestion .questionType .list').slideDown();
    })
    $('.quizModal_bg_askQuestion .questionType .list').mouseleave(function() {
        $(this).slideUp();
    })
    $('.quizModal_bg_askQuestion .questionType .list li').click(function() {
            $('.quizModal_bg_askQuestion .questionType .cur_val').attr("value", $(this).html());
            $('.quizModal_bg_askQuestion .questionType .cur_val').html($(this).html());
            $('.quizModal_bg_askQuestion .questionType .list').slideUp();
        })
        //根据输入的问题自动生成标签
    $(".quizModal_bg_askQuestion .mainQuestion textarea").on("blur", getKeyword);

    //发送请求获取关键词，拿到关键词后把他们添加到标签栏上
    function getKeyword() {
        // console.log("获取关键字")
        $.ajax({
            url: "../Servlet/AnalyzeKeyWordServlet",
            type: 'get',
            data: {
                requestType: "get",
                keyWord: $(this).val()
            },
            success: function(arr) {
                console.log(arr);
                displayLabels(arr); //返回的列表
            }
        })
    }

    function displayLabels(labels) {
        console.log($('.quizModal_bg_askQuestion .label .nodeBoard'));
        $('.quizModal_bg_askQuestion .label .nodeBoard').html("");
        for (var i = 0; i < labels.length && i < 5; i++) {
            // ++label_count;
            // console.log(label_count);
            console.log(i);
            $('.quizModal_bg_askQuestion .label .nodeBoard').append('<span><div class="text">' + labels[i] + '</div><i class="removeLabel">&times;</i></span>');
        }
        rebindLabel.call($(this));
    }
    //自行添加标签

    $(".quizModal_bg_askQuestion .addLabel .add_btn").click(function() {
        //添加标签
        var text = $(".quizModal_bg_askQuestion .addLabel input").val();

        if (text != '' && text != null && text != undefined) {
            // if (label_count >= 5) {
            //     displayTipPane("最多添加5条标签");
            //     return;
            // }

            $('.quizModal_bg_askQuestion .label .nodeBoard').append('<span><div class="text">' + text + '</div><i class="removeLabel">&times;</i></span>')
        }
        $(".quizModal_bg_askQuestion .addLabel input").val("");
        rebindLabel.call($(this)); //绑定标签事件

    })


    //bug
    function rebindLabel() {
        //#region 鼠标悬停在标签 上 背景颜色改变 且出现删除按钮
        $(".nodeBoard>span").on({
                mouseover: function() {
                    $(this).css("backgroundColor", "rgba(0, 0, 0, 0.1)");
                    $(this).find("i").show();
                },
                mouseout: function() {
                    $(this).css("backgroundColor", "#fff");
                    $(this).find("i").hide();

                }
            })
            //#region 标签删除 添加
        $(".removeLabel").on("click", function() {
            // console.log("删除标签");
            // label_count--;
            // console.log(label_count);
            $(this).parent().hide(300);
        })
    }

    var sendingImg = false;
    //#region 插入图片 + 删除图片
    // var pictureNum = 0;
    $(".insertP").on({
        change: function(e) {
            if (sendingImg) {
                displayTipPane("有图片还在上传中...");
                return;
            }
            //创建 div>i  img
            var formdata = new FormData();
            var div = $("<div class='picture'><i class='removePicture'>&times;</i></div>")
            var img = $("<img>");
            //div>i+img
            $(div).prepend(img);
            //获取input file 的图片的img src
            var url = window.URL || window.webkitURL || window.mozURL;
            var obj = e.currentTarget.files[0]; //图片资源对象
            formdata.append(0, obj);
            var imgSrc = url.createObjectURL(obj);
            $(img).attr("src", imgSrc);
            //在.insertPicture中添加.picture
            $(this).parents(".insertPicture").find(".picture_containner").append(div);
            sendImage(formdata, $(img)); //发送图片
            if ($(".picture").length > 2) {
                $(this).parent().hide();
            }
            //×出现与消失
            $(".picture").on({
                mouseover: function() {
                    $(this).find(".removePicture").stop().show(200);
                },
                mouseout: function() {
                    $(this).find(".removePicture").stop().hide(200);
                }
            })

            //删除图片 
            $(".removePicture").on({
                click: function() {
                    // console.log($(".picture").length);
                    if ($(".picture").length <= 3) {
                        // $(".insertP").show();
                        $(".insertP").parent().show();
                    }
                    $(this).parent().remove();
                }
            })
        }
    })

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
                imgObj.attr("remoteURL", data.message);
                sendingImg = false;
            },
            error: function() {
                imgObj.remove();
                sendingImg = false;
                displayTipPane("上传失败！已自动删除原图片！");
            },
            timeout: function() {
                imgObj.remove();
                sendingImg = false;
                displayTipPane("上传超时！已自动删除原图片！");
            }

        })
    }

    function addContentItem(order, type, content) {
        return {
            "contentOrder": order,
            "contentType": type,
            "contentMain": content
        }
    }
    //发送提问
    function sendQuestion() {
        if (sendingImg) {
            displayTipPane("有图片正在上传中！");
            return;
        }
        var title = $(".quizModal_bg_askQuestion .mainQuestion textarea").val();

        var type = $(".quizModal_bg_askQuestion .questionType .cur_val").attr("value");
        //判空
        if (title == "" || title == null || title == undefined) {
            displayTipPane("问题标题不能为空!");
            return;
        }
        var textContent = $(".quizModal_bg_askQuestion .questionNote textarea").val();
        if (textContent == "" || textContent == null || textContent == undefined) {
            displayTipPane("问题不能备注为空!");
            return;
        }
        var contents = [];
        var contents_order = 1;
        //添加文字
        contents[0] = addContentItem(1, "text", textContent);
        //添加图片
        var imgArr = $(".quizModal_bg_askQuestion .insertPicture .picture_containner").children();
        // console.log(imgArr);
        // console.log("imgArr.length:"+imgArr.length);
        for (var i = 0; i < imgArr.length; i++) {
            // console.log($(imgArr[i]).find("img"))
            var url = $(imgArr[i]).find("img").attr("remoteurl");
            // console.log("url=" + url);
            contents[i + 1] = addContentItem(++contents_order, "img", url);
        }
        // console.log(contents);

        var labels = [];
        var oLabels = $(".quizModal_bg_askQuestion .nodeBoard").children();
        if (oLabels.length == 0) {
            displayTipPane("请至少选择一个标签");
            return;
        }
        for (var i = 0; i < oLabels.length; i++) {
            labels[i] = $(oLabels[i]).find(".text").html();
        }

        if (type == "null") {
            displayTipPane("请选择文章类型！");
            return;
        }
        var anonymity = $(".quizModal_bg_askQuestion .anonymity").attr("anonymity") == "true" ? true : false;
        //判断敏感词
        $.ajax({
            url: "../Servlet/SensitiveWordServlet",
            data: JSON.stringify({
                "textArr": [
                    textContent
                ]
            }),
            type: "post",
            success: function(res) {
                if (res.statusCode == 500) {
                    displayTipPane("内容" + res.message + "请修改后再发送！");
                } else {
                    contents[0].contentMain = res[0];
                    send();
                }
            }
        })

        function send() {
            //获取内容
            //发送内容
            // console.log(anonymity);
            $.ajax({
                url: "../Servlet/QuestionServlet",
                type: "post",
                dataType: "json",
                data: JSON.stringify({
                    "requestType": "post",
                    "title": title,
                    "tag": labels,
                    "questionType": type,
                    "authorMarkNumber": $.cookie("markNumber"),
                    "contents": contents,
                    "anonymity": anonymity
                }),
                success: function(res) {
                    displayTipPane("发布成功！");
                    $(".quizModal_bg_askQuestion").fadeOut();
                    //清空title,detail

                    $(".quizModal_bg_askQuestion .mainQuestion textarea").val("");
                    $(".quizModal_bg_askQuestion .questionNote textarea").val("");
                    //清空图片
                    $(".quizModal_bg_askQuestion .picture_containner").html("");
                    $(".quizModal_bg_askQuestion .insertPicture .file").css("display", "block");

                    //清空标签
                    $(".quizModal_bg_askQuestion .nodeBoard").html("");
                    //清空自行输入标签
                    $(".quizModal_bg_askQuestion .addLabel input").val("");


                    //清空计数器
                    $(".quizModal_bg_askQuestion .nowNum").html("0");


                    //清除问题类型
                    $(".quizModal_bg_askQuestion .questionType .cur_val").attr("value", "null");

                    $(".quizModal_bg_askQuestion .questionType .cur_val").html("请选文章类型");

                    //清除匿名
                    $(".quizModal_bg_askQuestion .anonymity").attr("anonymity", 'false');
                    $(".quizModal_bg_askQuestion .anonymity").css("display", "none");

                    //     console.log("结果：")
                    console.log(res);

                    //#region 渲染主页 √
                    $(".queY").remove();
                    window.onload();
                    // $.get('http://192.168.137.105:8080/Servlet/MainPageServlet', {
                    //     requestType: 'get',
                    //     getType: "init",
                    // }, function(res) {
                    //     console.log(res);
                    //     for (var i = 0; i < res.length; i++) {
                    //         //记住每个分类的 scrollid 
                    //         mainScrollid[i] = res[i].scrollId;
                    //         LoadNextPage[i] = res[i].next;

                    //         // var quizlist;
                    //         if (res.additionContent === "学习篇" || i == 0) {
                    //             inmaincontent(res, ".studyPartY", i);
                    //         } else if (res.additionContent === "期末篇" || i == 1) {
                    //             inmaincontent(res, ".endOfTermPartY", i);
                    //         } else if (res.additionContent === "宿舍篇" || i == 2) {
                    //             inmaincontent(res, ".dormitoryPartY", i);
                    //         } else if (res.additionContent === "食堂篇" || i == 3) {
                    //             inmaincontent(res, ".canteenPartY", i);
                    //         } else if (res.additionContent === "考证篇" || i == 4) {
                    //             inmaincontent(res, ".textualResearchPartY", i);
                    //         } else {
                    //             inmaincontent(res, '.otherY', i);
                    //         }
                    //     }


                    // }, 'json')

                    // console.log(mainScrollid);

                    //#endregion

                }
            })

        }

    }



    $(".quizModal_bg_askQuestion .anonymity .btn").click(function() {
        if ($(this).parent().attr("anonymity") == 'false') {
            $(this).parent().attr("anonymity", 'true');
            $(this).find("svg").css("display", "block");
        } else {
            $(this).parent().attr("anonymity", 'false');
            $(this).find("svg").css("display", "none");
        }
    })

    $(".quizModal_bg_askQuestion .publish").click(sendQuestion);
})