$(function() {

    //#region 文本域字数限制
    $("textarea").on("keyup", function() {
        var nowNum = $(this).val().length;
        $(this).siblings("span").find(".nowNum").text(nowNum);
        var maxNum = $(this).siblings("span").find(".maxNum").text();
        if (nowNum > maxNum) {
            $(this).css("title", "字数不能超过" + maxNum + "个");
            $(this).siblings("span").find(".nowNum").text(maxNum);
            console.log(nowNum);
            $(this).val($(this).val().substring(0, maxNum));
            $(this).css("readonly", "readonly");
        }
    })

    //#endregion

    //#region 鼠标悬停在标签 上 背景颜色改变 且出现删除按钮
    $(".nodeBoard span").on({
        mouseover: function() {
            $(this).css("backgroundColor", "rgba(0, 0, 0, 0.1)");
            $(this).find("i").show();
        },
        mouseout: function() {
            $(this).css("backgroundColor", "#fff");
            $(this).find("i").hide();

        }
    })

    $(".addLabel span").on({
        mouseover: function() {
            $(this).css("backgroundColor", "rgba(0, 0, 0, 0.1)");
        },
        mouseout: function() {
            $(this).css("backgroundColor", "#fff");
        }
    })

    //#endregion

    //#region 标签删除 添加
    $(".removeLabel").on({
        click: function() {
            $(this).parent().hide(300);
        }
    })
    $(".addLabel .add").on({
        click: function() {

        }
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

    //#region 插入图片 + 删除图片
    // var pictureNum = 0;
    $(".insertP").on({
        change: function(e) {
            //创建 div>i  img
            var div = $("<div class='picture'><i class='removePicture'>&times;</i></div>")
            var img = $("<img>");
            //div>i+img
            $(div).prepend(img);
            //获取input file 的图片的img src
            var url = window.URL || window.webkitURL || window.mozURL;
            var obj = e.currentTarget.files[0];
            var imgSrc = url.createObjectURL(obj);
            // console.log(imgSrc);
            //给 img先添加属性 src 
            $(img).attr("src", imgSrc);

            //在.insertPicture中添加.picture
            $(this).parents(".insertPicture").prepend(div);

            //图片++  if>=3张图片 就把.insertP 隐藏
            // pictureNum++;
            // console.log(pictureNum);
            // console.log($(".picture").length);
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
                        if ($(".picture").length < 3) {

                            // $(".insertP").show();
                            $(".insertP").parent().show();
                        }
                        $(this).parent().remove();
                    }
                    //     $(this).parent().animate({
                    //         $(this).remove();
                    //    },300)
            })
        }
    })

    //#endregion




})