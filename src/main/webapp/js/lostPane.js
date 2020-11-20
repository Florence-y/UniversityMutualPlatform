 // 物品类型

 var lostLocation = "";
 var lostTime = "";
 var objectType = "";
 var objectDetailType = "";
 var imgs = [];  //保存的是图片的地址
 
 
 function getLocation_lost(){
     lostLocation = $(".modal_bg_lost .lostArea .value .text").html()+""+$(".modal_bg_lost .lostArea .value .areaDetail").val();
 }

 $(".modal_bg_lost .objClass_entrance").on("mouseenter",function(){
    $(this).find(".objClassPane").stop().fadeIn(200);
})
$(".modal_bg_lost .objClass_entrance").on("mouseleave",function(){
    $(this).find(".objClassPane").stop().fadeOut(200);
})
$(".modal_bg_lost .objClass .item").on("click",function(){
    // $(".areaBox .areaText").html($(this).html());
    // console.log("点击")
    $(this).parents(".objClassPane").stop().fadeOut(200);
    $(this).parents(".value").find(".text").html($(this).html())
    // 物品分类
    objectDetailType = $(this).html();
    objectType = $(this).parents(".row_objClass").find(".title_row").html();
});

 //月历的显示与隐藏
 $(".modal_bg_lost .calendar_entrance").on("mouseenter",function(){
    $(this).find(".calendar").stop().fadeIn();
})
$(".modal_bg_lost .calendar_entrance").on("mouseleave",function(){
    $(this).find(".calendar").stop().fadeOut();
})

//时间的填充
function getLostTime(){
    if($('.modal_bg_lost .yearNum').html()!="" && $('.modal_bg_lost .yearNum').html()!=null && $('.modal_bg_lost .yearNum').html()!=undefined){
        var month = $('.modal_bg_lost .monthNum').html();
        var day = $('.modal_bg_lost .dayNum').html();
        month = month.length>1 ? month : "0"+month;
        day = day.length>1 ? day : "0"+day;
        lostTime = $('.modal_bg_lost .yearNum').html()+"-"+month+"-"+day;
    }
}
// 加载图片
function getImgs_lost(){
    var imgsArr = $(".modal_bg_lost .imgBox").children();
    for(var i=0; i<imgsArr.length; i++){
        imgs[i] = $(imgsArr[i]).attr("remoteurl")
    }
}

//点击地点进行选择
$(".modal_bg_lost .areaPane .item").on("click",function(){
    $(this).parents(".value").find(".text").html($(this).html());
    // console.log("点击")
    $(this).parents(".areaPane").fadeOut(200);
    $(this).parents(".value").find(".areaDetail").val("");
    $(this).parents(".value").find(".areaDetail").css("display","inline-block");
});
$(".modal_bg_lost .area").on("mouseenter",function(){
    $(this).find(".areaPane").stop().fadeIn(200);
});
$(".modal_bg_lost .area").on("mouseleave",function(){
    $(this).find(".areaPane").stop().fadeOut(200);
});

//读取图片文件 

$(".modal_bg_lost .addPic .addBtn").on("click",function(){
    $(this).parents(".addPic").find("input").click();
})
$('.modal_bg_lost .addPic input').change(readFile);
//读图片，添加到输入框中

//解决的问题是：formdata对象应该是要
//编辑区div行的指针
//插入图片：现在就只能插入到输入框的最后
var sendingImg = false; // 判断是否正在发送图片，如果是就不能点击发表文章
function readFile() {
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

    $(".modal_bg_lost .imgBox").append(imgObj);
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


// 输入物品名称后进行模糊查询

$('.modal_bg_lost .objName .value').on("input",debounce(function(){
    searchFound($(this).val());
},500))

// 根据物品名称进行拾品展示
function searchFound(content){
    $.ajax({
        url : "../Servlet/LostAndFoundExploreServlet",
        type : "get",
        dataType : "json",
        data : {
            requestType :'get',
            type :'found',
            exploreContent : content
        },
        success : function(res){
            // console.log(res);
            var dataList = res.dataList;
            $(".modal_bg_lost .search_display").fadeOut();
            if(dataList.length!=0 && dataList!=null && dataList!=undefined){
                $(".modal_bg_lost .search_display ul").html("");//清除之前记录
                $(".modal_bg_lost .search_display").fadeIn();
               
                displayFound(dataList)
            } 
        }
    })
}

// 匹配面板消失，取消冒泡
$(".modal_bg_lost").on("click",function(){
    $(this).find(".search_display").fadeOut();
})
$(".modal_bg_lost .search_display").on("click",function(e){
    e.stopPropagation();
    e.cancelBubble = true;
})
$('.modal_bg_lost .objName .value').on("click",function(e){
    e.stopPropagation();
    e.cancelBubble = true;
})


// 加载更多没写
function displayFound(dataList){
    // 现在是先全部有图片
    // var reg = /(..\/)/
    for(var i=0; i<dataList.length; i++){
        var data = {
            "id" : dataList[i].id,
            "foundObjectName" : dataList[i].foundObjectName,
            "objectDetailType" : dataList[i].objectDetailType,
            "foundDescribe" : dataList[i].foundDescribe
        }
        if(dataList[i].imgs.length!=0){
            var url = dataList[i].imgs[0];
            // url = url.replace(reg.exec(url)[0],"../");
            data["img"] = url;
        }
        var item = template("templateFoundItem",data);
        $(".modal_bg_lost .search_display ul").append(item); 
    }
    $(".modal_bg_lost .search_display ul").find("em").removeAttr("style");
    $(".modal_bg_lost .search_display ul").find("em").css("font-weight","700")
}

function valueIsEmpty(value,tip){
    if(value=="" || value==null || value==undefined){
        displayTipPane(tip);
        return true;
    }
    return false;
}

function submite_lost(){
    // 判空
    //物品名称
    // if($('.modal_bg_lost .objName .value').val())
   
    if(!valueIsEmpty($('.modal_bg_lost .objName .value').val(),"把物品名称填上吧~")&&
        !valueIsEmpty($('.modal_bg_lost .objClass .value .text').html(),"物品类别还没选哦~")&&
        !valueIsEmpty($('.modal_bg_lost .objDetail .value_box').val(),"把物品描述清楚一点吧~")&&
        !valueIsEmpty($(".modal_bg_lost .contact .value").val(),"没有联系方式，拾主怎么联系你呢？")){
       
        var data = {
            "requestType": "post",
            "type": "lost",
            "contact": $(".modal_bg_lost .contact .value").val(),
            "authorMarkNumber": $.cookie("markNumber"),
            "objectDetailType":objectDetailType,
            "objectType": objectType,
            "lostDescribe": $('.modal_bg_lost .objDetail .value_box').val(),
            "lostObjectName": $('.modal_bg_lost .objName .value').val(),
        };
        getLostTime();
    
        if(lostTime!=""){
            data["lostTime"] = lostTime;
        }
        getLocation_lost();
        if(lostLocation!=""){
            data["lostLocation"] = lostLocation;
        }
        getImgs_lost();
        if(imgs.length!=0){
            data["imgs"] = imgs;
            var imgsArr = $(".modal_bg_lost .imgBox").children();
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

                $(".modal_bg_lost").fadeOut();
                clearModalLost();
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

function clearModalLost(){
    //物品名称
    $('.modal_bg_lost .objName .value').val("");
    //类型
    $('.modal_bg_lost .objClass .value .text').html("");
    objectType = "";
    objectDetailType = "";

    //时间


    $(".modal_bg_lost .lostTime  .time_display").css("display","none");
    lostTime = "";
    //地点
    $(".modal_bg_lost .lostArea .text").html("");
    $(".modal_bg_lost .lostArea .areaDetail").val("");
    $(".modal_bg_lost .lostArea .areaDetail").css("display","none");
    lostLocation = "";

    // 详情
    $('.modal_bg_lost .objDetail .value_box').val("");
    //图片
    $(".modal_bg_lost .addPic .imgBox").html("");
    //联系方式
    $(".modal_bg_lost .contact .value").val("");
    //奖励
    $(".modal_bg_lost .award .value_box").val("");
}
// 一键发布
$(".modal_bg_lost .sendBtn").on("click",submite_lost);
//关闭面板

$(".modal_bg_lost .fadeout_lostModal").on("click",function(){
    $(".modal_bg_lost").fadeOut();
})


