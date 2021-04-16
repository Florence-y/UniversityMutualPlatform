 // 物品类型

 var foundLocation = "";
 var foundTime = "";
 var objectType = "";
 var objectDetailType = "";
 var imgs = [];  
 
 function getLocation_found(){
     foundLocation = $(".modal_bg_found .foundArea .value .text").html()+""+$(".modal_bg_found .foundArea .value .areaDetail").val();
 }

 $(".modal_bg_found .objClass_entrance").on("mouseenter",function(){
    $(this).find(".objClassPane").stop().fadeIn(200);
})
$(".modal_bg_found .objClass_entrance").on("mouseleave",function(){
    $(this).find(".objClassPane").stop().fadeOut(200);
})
$(".modal_bg_found .objClass .item").on("click",function(){
    // $(".areaBox .areaText").html($(this).html());
    // console.log("点击")
    $(this).parents(".objClassPane").stop().fadeIn(200);
    $(this).parents(".value").find(".text").html($(this).html())
    // 物品分类
    objectDetailType = $(this).html();
    objectType = $(this).parents(".row_objClass").find(".title_row").html();
});

 //月历的显示与隐藏
 $(".modal_bg_found .calendar_entrance").on("mouseenter",function(){
    $(this).find(".calendar").stop().fadeIn();
})
$(".modal_bg_found .calendar_entrance").on("mouseleave",function(){
    $(this).find(".calendar").stop().fadeOut();
})

//时间的填充
function getfoundTime(){
    if($('.modal_bg_found .yearNum').html()!="" && $('.modal_bg_found .yearNum').html()!=null && $('.modal_bg_found .yearNum').html()!=undefined){
        var month = $('.modal_bg_found .monthNum').html();
        var day = $('.modal_bg_found .dayNum').html();
        month = month.length>1 ? month : "0"+month;
        console.log(month);
        day = day.length>1 ? day : "0"+day;
        // console.log(day);
        foundTime = $('.modal_bg_found .yearNum').html()+"-"+month+"-"+day;
    }
}
// 加载图片
function getImgs_found(){
    var imgsArr = $(".modal_bg_found .imgBox").children();
    console.log(imgsArr);
    for(var i=0; i<imgsArr.length; i++){
        imgs[i] = $(imgsArr[i]).attr("remoteurl")
    }
    console.log(imgs);
}

//点击地点进行选择
$(".modal_bg_found .areaPane .item").on("click",function(){
    $(this).parents(".value").find(".text").html($(this).html());
    // console.log("点击")
    $(this).parents(".areaPane").fadeOut(200);
    $(this).parents(".value").find(".areaDetail").val("");
    $(this).parents(".value").find(".areaDetail").css("display","inline-block");
});
$(".modal_bg_found .area").on("mouseenter",function(){
    $(this).find(".areaPane").stop().fadeIn(200);
});
$(".modal_bg_found .area").on("mouseleave",function(){
    $(this).find(".areaPane").stop().fadeOut(200);
});

//读取图片文件 

$(".modal_bg_found .addPic .addBtn").on("click",function(){
    $(this).parents(".addPic").find("input").click();
})

$('.modal_bg_found .addPic input').change(readFile_found);
//读图片，添加到输入框中

//解决的问题是：formdata对象应该是要
//编辑区div行的指针
//插入图片：现在就只能插入到输入框的最后
var sendingImg = false; // 判断是否正在发送图片，如果是就不能点击发表文章
function readFile_found() {
    var formdata = new FormData();
    if (!$(this).val().match(/.jpg|.gif|.png|.jpeg|.bmp/i)) {　　 //判断上传文件格式
        return displayTipPane("图片格式有误！");
    }
    var reader = new FileReader();
    //因为每次表签设置了单文件读取，所以是file[0]
    reader.readAsDataURL(this.files[0]); //转成base64
    reader.fileName = this.files[0].name;
    // formdata.delete(0);//先删除，再添加
    formdata.append(0, this.files[0]); // formdata 的属性
    reader.onload = function (e) {
        var imgMsg = {
            name: this.fileName, //获取文件名
            base64: this.result //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
        }
        // console.log(imgMsg);
        var newImage = template("templateAddImage", imgMsg);
        // console.log(newImage)
        var imgObj = $(newImage);
        $(".imgPrevLoad img").attr("src",this.result);
        isImgLoad(function(){
            imgObj.attr("prevLoadHeight",parseInt($(".imgPrevLoad img").height()));
        },".imgPrevLoad img")

        //把新的图片添加到编辑区
        // console.log( $(this).parents(".addPic").find(".imgBox"));
        $(".modal_bg_found .imgBox").append(imgObj);
        sendImage_found(formdata, imgObj); //发送图片
    }
    // }
}
//发送图片
function sendImage_found(formdata, imgObj) { //imgObj是jq对象
    sendingImg = true;
    $.ajax({
        url: '../Servlet/ReceiveFileServlet',
        type: 'post',
        data: formdata,
        dataType: 'json',
        processData: false, //用FormData传fd时需有这两项
        contentType: false,
        success: function (data) {
            imgObj.attr("remoteurl", data.message);//把远程url地址写在remoteurl上
            sendingImg = false;
        },
        error: function (data) {
            imgObj.remove();
            sendingImg = false;
            displayTipPane("图片上传失败！已自动删除！")
        },
        timeout: function (data) {
            imgObj.remove();
            sendingImg = false;
            displayTipPane("图片上传超时！已自动删除！")
        }
    })
}

// 一键发布
function submite_found(){
    // 判空
    //物品名称
    // if($('.modal_bg_found .objName .value').val())
   
    if(!valueIsEmpty($('.modal_bg_found .objName .value').val(),"把物品名称填上吧~")&&
        !valueIsEmpty($('.modal_bg_found .objClass .value .text').html(),"物品类别还没选哦~")&&
        !valueIsEmpty($('.modal_bg_found .objDetail .value_box').val(),"把物品描述清楚一点吧~")&&
        !valueIsEmpty($(".modal_bg_found .contact .value").val(),"填上联系方式更方便失主联系您噢~")){
       
        var data = {
            "requestType": "post",
            "type": "found",
            "contact": $(".modal_bg_found .contact .value").val(),
            "authorMarkNumber": $.cookie("markNumber"),
            "objectDetailType":objectDetailType,
            "objectType": objectType,
            "foundDescribe": $('.modal_bg_found .objDetail .value_box').val(),
            "foundObjectName": $('.modal_bg_found .objName .value').val(),
        };
        getfoundTime();
    
        if(foundTime!=""){
            data["foundTime"] = foundTime;
        }
        getLocation_found();
        if(foundLocation!=""){
            data["foundLocation"] = foundLocation;
        }
        getImgs_found();
        console.log(imgs);
        if(imgs.length!=0){
            data["imgs"] = imgs;
            var imgsArr = $(".modal_bg_found .imgBox").children();
            data["imgHeight"] = $(imgsArr[0]).attr("prevLoadHeight");
        }
        // console.log(data);
        $.ajax({
            url : "../Servlet/LostAndFoundServlet",
            type : "post",
            dataType : "json",
            data : JSON.stringify(data),
            success : function(res){
                displayTipPane("发布成功！");

                $(".modal_bg_found").fadeOut();
                clearModalFound();
            },
            timeout : function(res){
                displayTipPane("发布超时！");
            },
            error : function(res){
                displayTipPane("发布失败！");
            }
        })
    }
}

function clearModalFound(){
    //物品名称
    $('.modal_bg_found .objName .value').val("");
    //类型
    $('.modal_bg_found .objClass .value .text').html("");
    objectType = "";
    objectDetailType = "";
    //时间


    $(".modal_bg_found .foundTime  .time_display").css("display","none");
    foundTime = "";
    //地点
    $(".modal_bg_found .foundArea .text").html("");
    $(".modal_bg_found .foundArea .areaDetail").val("");
    $(".modal_bg_found .foundArea .areaDetail").css("display","none");
    foundLocation = "";

    // 详情
    $('.modal_bg_found .objDetail .value_box').val("");
    //图片
    $(".modal_bg_found .addPic .imgBox").html("");
    //联系方式
    $(".modal_bg_found .contact .value").val("");
    //奖励
    $(".modal_bg_found .award .value_box").val("");
}
// 一键发布
$(".modal_bg_found .sendBtn").on("click",submite_found);
//关闭面板

$(".modal_bg_found .fadeout_foundModal").on("click",function(){
    $(".modal_bg_found").fadeOut();
})
//可以重用
