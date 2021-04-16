
$(function () {
    //日期函数
    //思想 : 要有一个基准年 2000 1 1 星期六
    //然后计算当前年的 1月1日是星期几
    //再计算当前月的1日是什么是星期几
    //计算闰年
    function isLeapYear(year) {
        //4的倍数但不是100的倍数 或者400的倍数
        if ((year % 4) == 0 && (year % 100) != 0 || (year % 400) == 0) {
            return 1;
        }
        return 0;
    }
    //平年和闰年的月的天数
    let months = [[0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]];

    var base_year = 2000;
    var base_week = 6;
    var date = new Date();
    // console.log(date);
    var nowYear = date.getFullYear();
    // var 
    var nowMonth = date.getMonth() + 1;
    //获得月份二维数组
    function getCalendar(year, month) {
        var totalDay_year = 0;
        for (var i = base_year; i < year; i++) {
            totalDay_year += (365 + isLeapYear(i));
        }
        //计算当前年的1月1日的是星期几
        var year_first = (totalDay_year + base_week) % 7;
        // console.log(year_first);

        //计算当前月1号是星期几
        var totalDay_month = 0;
        for (var i = 1; i < month; i++) {
            totalDay_month += months[isLeapYear(year)][i];
        }
        var month_first = (totalDay_month + year_first) % 7;

        // console.log(month_first);
        //6行7列
        var calendar = [[], [], [], [], [], []];
        var nextPostion = 0;
        for (var i = 0; i < month_first; i++) {
            calendar[0][i] = "";
            nextPostion++;
        }
        //填日数
        for (var day = 1; day <= months[isLeapYear(year)][month]; day++) {
            //求出下一个填充的位置
            var row = Math.floor(nextPostion / 7);
            var column = nextPostion % 7;
            calendar[row][column] = day;
            nextPostion++;
        }
        return calendar;
    }

    function setCalendar(year, month,initial) {//设置展示样式
        var calendar = getCalendar(year, month);//日历数据
        var date_now = new Date();//用来判断是不是当前月
        var calendars;
        if(initial){
            calendars = $(".calendar");
        }else{
            calendars = $(this).parents(".calendar");
        }
        // console.log(calendars.length);
        //有3个日历，所以要填充3个日历
       
        for (var k = 0; k < calendars.length; k++) {
            var row = $(calendars[k]).find(".day");
            // console.log(row);
            var table = [];
            for (var i = 0; i < row.length; i++) {
                table[i] = $(row[i]).children();
            }
            for (var i = 0; i < 6; i++) {
                for (var j = 0; j < 7; j++) {
                    $(table[i][j]).removeClass("fill");
                    $(table[i][j]).removeClass("today");

                    $(table[i][j]).html("");
                    if (calendar[i][j] != "" && calendar[i][j] != null && calendar[i][j] != undefined) {
                        $(table[i][j]).addClass("fill");
                    }
                    $(table[i][j]).html(calendar[i][j]);
                    if (date_now.getFullYear() == year && (date_now.getMonth() + 1) == month && $(table[i][j]).html() == date_now.getDate()) {
                        $(table[i][j]).addClass("today");
                    }
                }
            }
            $(".calendar .day .fill").off("click");//清空上一次的事件绑定
            // 模态框的日历才能调用getTime方法
            $(".modal_bg_lost .calendar .day .fill").on("click", getTime);
            $(".modal_bg_found .calendar .day .fill").on("click", getTime);
            
        }
        //寻物启事才有调用时间筛选
        $(".timeSelect .calendar .day .fill").on("click", selectTime);//根据时间来筛选
    }
    //有3个月历，但是他们的操作应该是独立的
    $(".switch_btn_calendar .up").click(function () {
        //上一个月
        nowMonth--;
        if (nowMonth < 1) {
            nowMonth = 12;
            nowYear--;
        }
        //2000年为基准年,不能求它小于日历
        setYearMonth.call($(this));
        if (nowYear >= 2000) {
            setCalendar.call($(this),nowYear, nowMonth);
        }
    })
    $(".switch_btn_calendar .down").click(function () {
        //上一个月
        nowMonth++;
        if (nowMonth > 12) {
            nowMonth = 1;
            nowYear++;
        }
        setYearMonth.call($(this));
        //2000年为基准年,不能求它小于日历
        setCalendar.call($(this),nowYear, nowMonth);
        // $(".calendar .day .flil").click(getTime)
    })
    function setYearMonth(initial) {
        if(initial){
            $(".calendar").find(".year").html(nowYear);
            $(".calendar").find(".month").html(nowMonth);
        }else{
            $(this).parents(".calendar").find(".year").html(nowYear);
            $(this).parents(".calendar").find(".month").html(nowMonth);
        }
    }
    //设置月历的年和月
    //初始化3个月历
    setYearMonth(true);
    setCalendar(nowYear, nowMonth,true);

    //获取时间
    function getTime() {
        $(this).parents(".timeBox").find(".time_display").show();
        // console.log(nowYear+"年"+nowMonth+"月"+$(this).html()+"日");
        $(this).parents(".timeBox").find(".time_display .yearNum").html(nowYear);
        $(this).parents(".timeBox").find(".time_display .monthNum").html(nowMonth);
        $(this).parents(".timeBox").find(".time_display .dayNum").html($(this).html());
        $(this).parents(".calendar").fadeOut();
    }

   
    //动态添加
    // }
    
    //月历的显示与隐藏
    $(".calendar_entrance").on("mouseenter", function () {
        $(this).find(".calendar").stop().fadeIn();
    })
    $(".calendar_entrance").on("mouseleave", function () {
        $(this).find(".calendar").stop().fadeOut();
    })

    // $(".platform").on("change",function(){
        // loadAllItem($(".item_containner"),itemOuterWidth,30);
    // })

    //

    //根据一级导航选择二级导航

   
    $(".select_box .column1 li").click(function () {
        var key = $(this).find(".text").html();
        var values = goodsArr[key];
        $(".select_box .column1 li").removeClass("selected");
        $(this).addClass("selected");
        //展示二级导航
        $(".select_box .column2 ul").html("");
        for (var i = 0; i < values.length; i++) {
            $(".select_box .column2 ul").append("<li>" + values[i] + "</li>");
        }
        
    })
    $(".select_box .column2 li").click(function () {
        $(".select_box .column2 li").removeClass("selected");
        $(this).addClass("selected");
    });

    //点击地点进行选择
    $(".select_box .areaPane .item").on("click", function () {
        $(".select_box .areaBox .areaText").html($(this).html());
        if (display_modal == "lost") {
            lostLocation = $(this).html();
        } else {
            foundLocation = $(this).html();
        }
        selectGoods();
        $(".select_box .areaPane").fadeOut();
    });
    // $(".select_box .areaBox .area").on("mouseenter", function () {
    //     $(".select_box .areaPane").stop().fadeIn();
    // })
    // $(".select_box .areaBox .area").on("mouseleave", function () {
    //     $(".select_box .areaPane").stop().fadeOut();
    // })
    //根据这个id进行加载下一页
    var display_modal = "found";
    var scrollId = null;
    var objectType;
    var objectDetailType;
    var lostTime;
    var foundTime;
    var lostLocation;
    var foundLocation;
    var getInfWay = "all";
    var haveMore = true;
    var canLoading = true; //当前可加载，避免网络原因发出多次请求
    var modechanging = false;// 如果模式正式切换就导航栏滚动不起作用
    var itemOuterWidth = 320; //展示物品的实际宽度+边框+外边距
    var itemGap = 30;
     //初始化失物招领物品
     loadAllItem($(".item_containner"), itemOuterWidth, itemGap);
    
    // 首次加载，失物招领和寻物启事都是这个函数, 没有筛选
    //只用在首次加载，和模式切换
    loadGoods("found");
    function loadGoods(type) {
        canLoading = false; 
        haveMore = true;
        //清空
        scrollId = null;
        objectType = null;
        objectDetailType = null;
        lostTime = null;
        foundTime = null;
        lostLocation = null;
        foundLocation = null;
        modechanging = true;
        
        // console.log("加载更多！");
        $.ajax({
            url: "../Servlet/LostAndFoundServlet",
            type: "get",
            dataType: "json",
            data: {
                "type": type,
                "getInfWay": "all",
                "requestType": "get"
            },
            success: function (res) {
                haveMore = res.next;
                canLoading = true;
                scrollId = res.scrollId;
                modechanging = false;
                if (type == "lost") {//寻物启事
                    var dataList = transfromTime(res.dataList, "lostTime");
                    //把键名进行统一,时间已经在被转换的时间改名了
                    // time location describe name objectDetailType
                    for (var i = 0; i < dataList.length; i++) {
                      
                        if (dataList[i]["lostLocation"] != null && dataList[i]["lostLocation"] != undefined) {
                            dataList[i]["location"] = dataList[i]["lostLocation"];
                        } else {
                            dataList[i]["location"] = "未填写"
                        }
                        dataList[i]["describe"] = dataList[i]["lostDescribe"];
                        dataList[i]["name"] = dataList[i]["lostObjectName"];
                        dataList[i]["href"] = "lostAndFound-lost.html?id=" + dataList[i]["id"];
                    }

                    displayTipPane("已切换为寻物启事！")

                } else {
                    //失物招领
                    var dataList = transfromTime(res.dataList, "foundTime");
                    for (var i = 0; i < dataList.length; i++) {
                       
                        if (dataList[i]["foundLocation"] != null && dataList[i]["foundLocation"] != undefined) {
                            dataList[i]["location"] = dataList[i]["foundLocation"];
                        } else {
                            dataList[i]["location"] = "未填写"
                        }
                        dataList[i]["describe"] = dataList[i]["foundDescribe"];
                        dataList[i]["name"] = dataList[i]["foundObjectName"];
                        dataList[i]["href"] = "lostAndFound-found.html?id=" + dataList[i]["id"];
                    }
                    displayTipPane("已切换为失物招领！")
                }
                //展示返回的数据
                // $(".nav").animate({
                //     "height":initailHeight_nav+"px"},500);
                displayGoods_first(dataList);

            },
            error: function () {
                displayTipPane("加载物品失败了~")
            },
            timeout: function () {
                displayTipPane("加载超时了~");
            }
        })
    }

    //展示物品
    //动态添加的方法就是先把新生成的元素添加到容器中
    //然后再使用isImgLoad(function(){
    // console.log("图片加载完")
    //     loadItem(items,itemWidth,gap);
    // },".item_containner .item img")

    //无论是第一加载还是筛选都是用这个函数，
    //因为我们在开头的时候已经初始化过列数组
    var itemIndex = 0;//用于显示不同的颜色

    function displayGoods_first(arr) {
        // console.log(arr);
        //清空
        $(".platform .item_containner").html("");

        var items = [];//是dom对象, width itemOuterWidth
        for (var i = 0; i < arr.length; i++) {
            var oItem = $(template("templateGoodsItem", arr[i]));
            if (arr[i]["imgs"] != null && arr[i]["imgs"].length != 0) {
                //有图片就添加第一张图片
                // var reg = /(..\/)/
                var src = arr[i]["imgs"][0];
                // src = src.replace(reg.exec(src)[0],"http:192.168.137.105:8080//");
                
                oItem.find(".imgBox").append(' <img src="' + src + '" style="height:'+arr[i]["imgHeight"]+'px">');
                var prevHeight = arr[i]["imgHeight"];
                //瀑布流更明显
                if(prevHeight>400){
                    oItem.find(".imgBox").css("max-height","250px");
                }else if(prevHeight>380){
                    oItem.find(".imgBox").css("max-height","230px");
                }else if(prevHeight>360){
                    oItem.find(".imgBox").css("max-height","220px");
                }else if(prevHeight>330){
                    oItem.find(".imgBox").css("max-height","210px");
                }else{
                    oItem.find(".imgBox").css("max-height","190px");
                }
            }
            //先添加到容器中
            //然后再保存到items中
            $(".item_containner").append(oItem);
            addBgColor(oItem);
            items[i] = oItem;
        }
        loadAllItem($(".item_containner"), itemOuterWidth, itemGap);
    }

    // 加载更多使用
    function displayGoods(arr) {
        // console.log(arr);
        var items = [];//是dom对象, width itemOuterWidth
        for (var i = 0; i < arr.length; i++) {
            var oItem = $(template("templateGoodsItem", arr[i]));
            if (arr[i]["imgs"] != null && arr[i]["imgs"].length != 0) {
                //有图片就添加第一张图片
                // var reg = /(..\/)/
                var src = arr[i]["imgs"][0];
                // src = src.replace(reg.exec(src)[0],"http:192.168.137.105:8080//");
                oItem.find(".imgBox").append(' <img src="' + src + '" style="height:'+arr[i]["imgHeight"]+'px">');
                //瀑布流更明显
                var prevHeight = arr[i]["imgHeight"];
                if(prevHeight>400){
                    oItem.find(".imgBox").css("max-height","250px");
                }else if(prevHeight>380){
                    oItem.find(".imgBox").css("max-height","240px");
                }else if(prevHeight>360){
                    oItem.find(".imgBox").css("max-height","230px");
                }else if(prevHeight>300){
                    oItem.find(".imgBox").css("max-height","220px");
                }else{
                    oItem.find(".imgBox").css("max-height","210px");
                }
            }
            oItem.css("display", "none");
            //先添加到容器中
            //然后再保存到items中
            addBgColor(oItem);
            $(".item_containner").append(oItem);
            items[i] = oItem;
        }
        // isImgLoad(function () {
        //     // console.log("图片加载完");
        //     setTimeout(function () {
            loadItem(items, itemOuterWidth, itemGap);
        //     }, 300);
        // }, ".item_containner .item img")
    }
    //item添加背景色
    function addBgColor(oItem){
        switch(itemIndex){
            case 0:{
                oItem.css("backgroundColor","#94abea");
                break;
            }
            case 1:{
                oItem.css("backgroundColor","#ffd16f");
                break;
            }
            case 2:{
                oItem.css("backgroundColor","#88dee6");
                break;
            }
            case 3:{
                oItem.css("backgroundColor","#ffc5c5");
                break;
            }
            case 4:{
                oItem.css("backgroundColor","#ffb36f");
                break;
            }
        }
        itemIndex = (itemIndex+1)%5//5中背景色
    }
    //把时间戳转换成具体时间
    function transfromTime(arr, timeType) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][timeType] != null && arr[i][timeType] != undefined) {
                var date = new Date(arr[i][timeType]);
                arr[i]["time"] = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()//都统一为time
            } else {
                arr[i]["time"] = "未填写"
            }
        }
        return arr;
    }


    //模式切换
    $(".modalDisplayPane").on("click",function(){
        $(".item_containner").html("");
        //导航栏恢复
        $(".nav .displayRow").fadeIn(100);
        $(".nav").css("background-color","#028e9b")
        $(".nav .toolRow").css("margin-top","10px");
        $(".nav .toolRow .tool").removeClass("tool_slideDown");
        $(".modalDisplayPane").css("top","151px");
        $(".lostFoundBtn").css("top","151px");
        $(".refreshBtn").css("top","263px")
        if($(this).attr("nextAction")=="seeFoundGoods"){
             //先清空，再加载
            // console.log("查看失物招领");
            $(this).find(".name").html("招");
            $(this).attr("title","点击查看寻物启事");
            display_modal = "found";
            getInfWay = "all";
            // scrollId = null;loadGoods有写
            // modechanging = true;
            loadGoods("found");
            $(this).attr("nextAction","seeLostGoods");
        }else{
            //先清空，再加载
            // console.log("查看寻物启事");
            display_modal = "lost";
            getInfWay = "all";
            $(this).find(".name").html("寻");
            $(this).attr("title","点击查看失物招领")
            // scrollId = null;
            // modechanging = true; //loadGoods也有写
            $(this).attr("nextAction","seeFoundGoods");
            loadGoods("lost");
        }
    })


    $(".seeFoundGoods").on("click", function () {
        //先清空，再加载
        console.log("查看失物招领");
        $(this).removeClass(".seeFoundGoods");
        display_modal = "found";
        getInfWay = "all";
        scrollId = null;
        modechanging = true;
        $(".item_containner").html("");
        loadGoods("found");
        // 样式没有加
    });

    // 查看寻物启事
    $(".seeLostGoods").on("click", function () {
        //先清空，再加载
        console.log("查看失物招领");
        $(this).removeClass(".seeLostGoods");
        display_modal = "lost";
        getInfWay = "all";
        scrollId = null;
        modechanging = true;
        $(".item_containner").html("");
        loadGoods("lost");
        //样式没加
        
        // alert("模式切换")
        //导航栏样式还原
        // $(".nav").css("background-color","#028e9b");
        // window滚动函数关闭

      
        // $(".nav .toolRow .tool").removeClass("tool_slideDown");
        // // 导航栏高度变长
        // $(".modalDisplayPane").css("display","none");
        // $(".nav").animate({
        //     "height":"30%"
        // },500)
        //加载动画出现
        //模式面板消失

        //下拉完成后，发送请求
        // display_modal = "lost";
        // getInfWay = "all";
        // scrollId = null;
        
        // loadGoods("lost");

        // 模拟加载效果
        // setTimeout(()=>{
        //     $(".item_containner").html("");
        //     modechanging = false;
        //     // $(".nav").animate({
        //     //     "height":initailHeight_nav+"px"
        //     // },500);
        //     setTimeout(()=>{
        //         //去除行内样式
        //         $(".nav").css("height","auto")
        //     },600)
        // },3000)
        //请求成功后，导航栏高度还原，在回调函数中调用
        //模式面板出现
    });

    // 滚动加载更多
    $(window).on("scroll", debounce(function () {
        //滚动条到顶部的高度
        if(modechanging) return;
        var scrollTop = Math.ceil($(this).scrollTop());
        //窗口高度
        var curHeight = $(this).height();
        //整个文档高度
        var totalHeight = $(document).height();
        //滚动条到底
        if (scrollTop + curHeight >= (totalHeight - 80)) {
            if (haveMore) {
                if (canLoading) {
                    loadMoreGoods();
                }
            } else {
                displayTipPane("没有跟多物品了哦~")
            }
        }
    },500));

    function loadMoreGoods() {
        canLoading = false;
        if (display_modal == "lost") {
            var data = {
                "requestType": "get",
                "type": "lost",
                "getInfWay": getInfWay,
            };
            //动态添加筛选条件
            if (objectType != null && objectType != undefined && objectType != "") {
                data["objectType"] = objectType;
            }
            if (objectDetailType != null && objectDetailType != undefined && objectDetailType != "") {
                data["objectDetailType"] = objectDetailType;
            }
            if (lostTime != null && lostTime != undefined && lostTime != "") {
                data["lostTime"] = lostTime;
            }
            if (lostLocation != null && lostLocation != undefined && lostLocation != "") {
                data["lostLocation"] = lostLocation;
            }
            if (scrollId != null) {
                data["scrollId"] = scrollId;
            }

            $.ajax({
                url: "../Servlet/LostAndFoundServlet",
                type: "get",
                dataType: "json",
                data: data,
                success: function (res) {
                    canLoading = true;
                    scrollId = res.scrollId;
                    haveMore = res.next;
                    var dataList = transfromTime(res.dataList, "lostTime");
                    //把键名进行统一,时间已经在被转换的时间改名了
                    // time location describe name objectDetailType
                    for (var i = 0; i < dataList.length; i++) {
                        if (dataList[i]["lostLocation"] != null && dataList[i]["lostLocation"] != undefined) {
                            dataList[i]["location"] = dataList[i]["lostLocation"];
                        } else {
                            dataList[i]["location"] = "未填写"
                        }
                        dataList[i]["describe"] = dataList[i]["lostDescribe"];
                        dataList[i]["name"] = dataList[i]["lostObjectName"];
                        dataList[i]["href"] = "lostAndFound-lost.html?id=" + dataList[i]["id"];
                    }

                    displayGoods(dataList);
                }
            })
        } else {
            var data = {
                "requestType": "get",
                "type": "found",
                "getInfWay": getInfWay,
            };
            //动态添加筛选条件
            if (objectType != null && objectType != undefined && objectType != "") {
                data["objectType"] = objectType;
            }
            if (objectDetailType != null && objectDetailType != undefined && objectDetailType != "") {
                data["objectDetailType"] = objectDetailType;
            }
            if (foundTime != null && foundTime != undefined && foundTime != "") {
                data["foundTime"] = foundTime;
            }
            if (foundLocation != null && foundLocation != undefined && foundLocation != "") {
                data["foundLocation"] = foundLocation;
            }
            if (scrollId != null) {
                data["scrollId"] = scrollId;
            }
            $.ajax({
                url: "../Servlet/LostAndFoundServlet",
                type: "get",
                dataType: "json",
                data: data,
                success: function (res) {
                    canLoading = true;
                    scrollId = res.scrollId;
                    haveMore = res.next;
                    var dataList = transfromTime(res.dataList, "foundTime");
                    //把键名进行统一,时间已经在被转换的时间改名了
                    // time location describe name objectDetailType
                    for (var i = 0; i < dataList.length; i++) {
                        if (dataList[i]["foundLocation"] != null && dataList[i]["foundLocation"] != undefined) {
                            dataList[i]["location"] = dataList[i]["foundLocation"];
                        } else {
                            dataList[i]["location"] = "未填写"
                        }
                        dataList[i]["describe"] = dataList[i]["foundDescribe"];
                        dataList[i]["name"] = dataList[i]["foundObjectName"];
                        dataList[i]["href"] = "lostAndFound-found.html?id=" + dataList[i]["id"];
                    }
                    displayGoods(dataList);
                }
            })
        }
    }

    //筛选
     
   

      //点击一级导航栏,getInfWay = "explore"

    //一级分类筛选
    $(".objectList li").on("click", function () {
        objectType = $(this).find(".text").html();
        $(".objectSelect .toolText").html(objectType);
        $(".objectSelect").addClass("toolSelected");
        $(".objectSelectPane").stop().fadeOut(230);
        //二级筛选清空
        objectDetailType = null;
        $(".itemSelect").removeClass("toolSelected");
        $(".itemSelect .toolText").html("物品筛选");
        selectGoods();
    })
    // 二级物品分类
    $(".itemSelect .itemList .item").on("click", function () {
        objectDetailType = $(this).html();
        $(".itemSelect .toolText").html(objectDetailType);
        $(".itemSelect").addClass("toolSelected");
        $(".itemSelectPane").stop().fadeOut(230);
       
        selectGoods();
    })

    //点击地点筛选
    $(".locationSelectPane .locationList .item").on("click", function () {
        $(".locationSelect .toolText").html($(this).html());
        $(".locationSelect").addClass("toolSelected");
        if (display_modal == "lost") {
            lostLocation = $(this).html();
        } else {
            foundLocation = $(this).html();
        }

        $(".locationSelectPane").stop().fadeOut(230);
        selectGoods();
       
    });

    //时间筛选 ，在calendar中调用
    function selectTime() {
        //nowMonth已经加1
        var month = (""+nowMonth).length > 1 ? nowMonth : "0" + nowMonth;
        var day = $(this).html().length > 1 ? $(this).html() : "0" + $(this).html();
        if (display_modal == "lost") {
            lostTime = nowYear + '-' + month + '-' + day;
        } else {
            foundTime = nowYear + '-' + month + '-' + day;
        }
        var displayTime = nowYear+"-"+month+"-"+day;//展示在筛选栏上的文字
        $(".timeSelect .toolText").html(displayTime);
        $(".timeSelect").addClass("toolSelected");
        $(".timeSelectPane").stop().fadeOut(230);
        selectGoods();
    }
    // 重新筛选
    $(".reSelect").on("click",function(){
        //样式去除类名
        $(".nav .toolRow .tool").removeClass("toolSelected");
        $(".objectSelect .toolText").html("分类筛选");
        $(".itemSelect .toolText").html("物品筛选");
        $(".timeSelect .toolText").html("日期筛选");
        $(".locationSelect .toolText").html("地点筛选");
        // 逻辑部分可以直接调用模式切换函数
        loadGoods(display_modal);
    })
  

    //刷新
    $(".refreshBtn").on("click",function(){
        selectGoods();
    })

    //条件筛选函数
    function selectGoods() {
        canLoading = false;
        getInfWay = "explore";
        scrollId = null;
        //清空容器
        // $(".item_containner").html("");
        //加一个缓冲动态图
        if (display_modal == "lost") {
            var data = {
                "requestType": "get",
                "type": "lost",
                "getInfWay": getInfWay,
            };
            //动态添加筛选条件
            if (objectType != null && objectType != undefined && objectType != "") {
                data["objectType"] = objectType;
            }
            if (objectDetailType != null && objectDetailType != undefined && objectDetailType != "") {
                data["objectDetailType"] = objectDetailType;
            }
            if (lostTime != null && lostTime != undefined && lostTime != "") {
                data["lostTime"] = lostTime;
            }
            if (lostLocation != null && lostLocation != undefined && lostLocation != "") {
                data["lostLocation"] = lostLocation;
            }
            $.ajax({
                url: "../Servlet/LostAndFoundServlet",
                type: "get",
                dataType: "json",
                data: data,
                success: function (res) {
                    haveMore = res.next;
                    scrollId = res.scrollId;
                    var dataList = transfromTime(res.dataList, "lostTime");
                    //把键名进行统一,时间已经在被转换的时间改名了
                    // time location describe name objectDetailType
                    for (var i = 0; i < dataList.length; i++) {
                        if (dataList[i]["lostLocation"] != null && dataList[i]["lostLocation"] != undefined) {
                            dataList[i]["location"] = dataList[i]["lostLocation"];
                        } else {
                            dataList[i]["location"] = "未填写"
                        }
                        dataList[i]["describe"] = dataList[i]["lostDescribe"];
                        dataList[i]["name"] = dataList[i]["lostObjectName"];
                        dataList[i]["href"] = "lostAndFound-lost.html?id=" + dataList[i]["id"];
                    }
                    canLoading = true;
                    displayGoods_first(dataList);
                }
            })
        } else {
            var data = {
                "requestType": "get",
                "type": "found",
                "getInfWay": getInfWay,
            };
            //动态添加筛选条件
            if (objectType != null && objectType != undefined && objectType != "") {
                data["objectType"] = objectType;
            }
            if (objectDetailType != null && objectDetailType != undefined && objectDetailType != "") {
                data["objectDetailType"] = objectDetailType;
            }
            if (foundTime != null && foundTime != undefined && foundTime != "") {
                data["foundTime"] = foundTime;
            }
            if (foundLocation != null && foundLocation != undefined && foundLocation != "") {
                data["foundLocation"] = foundLocation;
            }
            $.ajax({
                url: "../Servlet/LostAndFoundServlet",
                type: "get",
                dataType: "json",
                data: data,
                success: function (res) {
                    scrollId = res.scrollId;
                    haveMore = res.next;
                    canLoading = true;
                    var dataList = transfromTime(res.dataList, "foundTime");
                    //把键名进行统一,时间已经在被转换的时间改名了
                    // time location describe name objectDetailType
                    for (var i = 0; i < dataList.length; i++) {
                        if (dataList[i]["foundLocation"] != null && dataList[i]["foundLocation"] != undefined) {
                            dataList[i]["location"] = dataList[i]["foundLocation"];
                        } else {
                            dataList[i]["location"] = "未填写"
                        }
                        dataList[i]["describe"] = dataList[i]["foundDescribe"];
                        dataList[i]["name"] = dataList[i]["foundObjectName"];
                        dataList[i]["href"] = "lostAndFound-found.html?id=" + dataList[i]["id"];
                    }
                    displayGoods_first(dataList);
                }
            })
        }
    }
    // 模式面板有提示字体改成切换按钮
   
    // 头部导航栏样式变化
    $(window).on("scroll",function(){
        if(modechanging) return;
        if($(this).scrollTop()>200){
            $(".nav .displayRow").fadeOut(100);
            $(".nav .toolRow").css("margin-top","0");
            $(".nav").css("background-color","rgba(255,255,255,0.8)")
            $(".nav .toolRow .tool").addClass("tool_slideDown");
            $(".modalDisplayPane").css("top","86px");
            $(".lostFoundBtn").css("top","86px");
            $(".refreshBtn").css("top","198px")
        }else{
            $(".nav .displayRow").fadeIn(100);
            $(".nav").css("background-color","#028e9b")
            $(".nav .toolRow").css("margin-top","10px");
            $(".nav .toolRow .tool").removeClass("tool_slideDown");
            $(".modalDisplayPane").css("top","151px");
            $(".lostFoundBtn").css("top","151px");
            $(".refreshBtn").css("top","263px")
        }
    })

    // 展示item 4-5的切换
    var platformWidth = $(".platform").css("width");  //flag的作用就是如果实现宽度不变不重新排版
    $(window).on("resize",debounce(function(){
        if($(".platform").css("width")=="1618px" && $(".platform").css("width")!=platformWidth){
            //展示5列
            loadAllItem($(".item_containner"), itemOuterWidth, itemGap);

            platformWidth = $(".platform").css("width");
        }else if(  $(".platform").css("width")=="1100px"  && $(".platform").css("width")!=platformWidth){
            //展示4列
            loadAllItem($(".item_containner"), itemOuterWidth, itemGap);
            platformWidth = $(".platform").css("width");
        }else if(  $(".platform").css("width")=="1300px"  && $(".platform").css("width")!=platformWidth){
            //展示4列
            loadAllItem($(".item_containner"), itemOuterWidth, itemGap);
            platformWidth = $(".platform").css("width");
        }
    },100))

     // 打开寻物启事的面板
     $(".lostBtn").on("click", function () {
        //  alert("打开面板")
        if(isHaveCookie()){ //函数写在了nav上
            $(".modal_bg_lost").fadeIn();
        }else{
            displayTipPane("你还没登录噢~");
        }  
    });

    //打开失物招领的面板
    $(".foundBtn").on("click",function(){
        // alert("打开面板")
        if(isHaveCookie()){
            $(".modal_bg_found").fadeIn();
        }else{
            displayTipPane("你还没登录噢~");
        }  
    });

    // 筛选面板的打开
    $(".nav .toolRow .toolBox .tool").on("mouseenter",function(){
        $(this).find(".selectPane").stop().fadeIn(230);  
    })
    $(".nav .toolRow .toolBox .tool").on("mouseleave",function(){
        $(this).find(".selectPane").stop().fadeOut(230);
    })
})



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




















