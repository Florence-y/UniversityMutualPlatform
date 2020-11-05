
$(function(){

    //日期函数
    //思想 : 要有一个基准年 2000 1 1 星期六
        //然后计算当前年的 1月1日是星期几
        //再计算当前月的1日是什么是星期几
        //计算闰年
        function isLeapYear(year){
            //4的倍数但不是100的倍数 或者400的倍数
            if((year%4)==0 && (year%100)!=0 || (year%400)==0){
                return 1;
            }
            return 0;
        }
        //平年和闰年的月的天数
        let months = [[0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	                [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]];

        var base_year = 2000;
        var base_week = 6;

        function getCalendar(year,month){
            
            var totalDay_year =0;
            for(var i=base_year; i<year; i++){
                totalDay_year +=(365+isLeapYear(i));
            }
            //计算当前年的1月1日的是星期几
            var year_first = (totalDay_year+base_week)%7;
            // console.log(year_first);

            //计算当前月1号是星期几
            var totalDay_month = 0;
            for(var i=1; i<month; i++){
                totalDay_month +=months[isLeapYear(year)][i];
            }
            var month_first = (totalDay_month+year_first)%7;

            // console.log(month_first);
            //6行7列
            var calendar = [[],[],[],[],[],[]];
            var nextPostion = 0;
            for(var i=0; i<month_first; i++){
                calendar[0][i]= "";
                nextPostion++;
            }
            //填日数
            for(var day=1; day<=months[isLeapYear(year)][month]; day++){
                //求出下一个填充的位置
                var row = Math.floor(nextPostion/7);
                var column = nextPostion%7;
                calendar[row][column] = day;
                nextPostion++;
            }
            return calendar;
        }
        function setCalendar(year,month){//设置展示样式
            var calendar = getCalendar(year,month);//日历数据
            var date_now = new Date();//用来判断是不是当前月
            var calendars = $(".calendar");
           console.log(calendars.length);
            for(var k=0; k<calendars.length; k++){

                var row = $(calendars[k]).find(".day");
                console.log(row);
                var table = [];
                for(var i=0; i<row.length; i++){
                    table[i] = $(row[i]).children();
                }
                for(var i=0;i<6; i++){
                    for(var j=0; j<7; j++){
                        $(table[i][j]).removeClass("fill");
                        $(table[i][j]).removeClass("today");
                       
                        $(table[i][j]).html("");
                        if(calendar[i][j]!="" && calendar[i][j]!=null && calendar[i][j]!=undefined){
                            $(table[i][j]).addClass("fill");
                        }
                        $(table[i][j]).html(calendar[i][j]);
                        if(date_now.getFullYear()==year && (date_now.getMonth()+1)==month && $(table[i][j]).html()==date_now.getDate()){
                            $(table[i][j]).addClass("today");
                        }
                    }
                }
                $(".calendar .day .fill").off("click");
                $(".calendar .day .fill").on("click",getTime);
            }
            $(".select_box .calendar .day .fill").on("click",selectTime);//根据时间来筛选
        }

        var date = new Date();
        // console.log(date);
        var nowYear = date.getFullYear();
        // var 
        var nowMonth = date.getMonth()+1;
        //设置当前年月
        setYearMonth();
        
        function setYearMonth(){
            $(".calendar").find(".year").html(nowYear);
            $(".calendar").find(".month").html(nowMonth);
        }
        // console.log(nowYear);
        // console.log(nowMonth);
       

        setCalendar(nowYear,nowMonth);

        $(".switch_btn_calendar .up").click(function(){
            //上一个月
            nowMonth--;
            if(nowMonth<1){
                nowMonth=12;
                nowYear--;
            }
            //2000年为基准年,不能求它小于日历
            setYearMonth();
            if(nowYear>=2000){
                setCalendar(nowYear,nowMonth);
            }
        })
        $(".switch_btn_calendar .down").click(function(){
            //上一个月
            nowMonth++;
            if(nowMonth>12){
                nowMonth=1;
                nowYear++;
            }
            setYearMonth();
            //2000年为基准年,不能求它小于日历
            setCalendar(nowYear,nowMonth);
            // $(".calendar .day .flil").click(getTime)
        })
        //获取时间
        function getTime(){
            $(this).parents(".timeBox").find(".time_display").show();
            // console.log(nowYear+"年"+nowMonth+"月"+$(this).html()+"日");
            $(this).parents(".timeBox").find(".time_display .yearNum").html(nowYear);
            $(this).parents(".timeBox").find(".time_display .monthNum").html(nowMonth);
            $(this).parents(".timeBox").find(".time_display .dayNum").html($(this).html());
            $(this).parents(".calendar").fadeOut();
        }





    //图片加载完之后才增加瀑布流
        // $(".begin").click(function(){

        //初始化
            loadAllItem($(".item_containner"),320,30);

        //动态添加



            // })
    
            //筛选框的变宽、变窄
            $(".select_box .switch_btn").on("click",function(){
                if($(".select_box").attr("status")=="open"){//关闭
                    $(".select_box").animate({
                        width: "100px"
                    })
                    $(".platfrom").animate("width","1680px");
                    $(".select_box .column2").hide();
                    $(".select_box .column3").hide();
                    $(".select_box .column1").css("border-right","none");
                    $(".select_box .column1 li").css("text-indent","0px");
                    $(".select_box .column1 .icon").fadeOut(150);
                    $(".select_box .column1").animate({"width" : "80px"});
                    $(this).css({
                        "right" : "-35px",
                        "border-top-left-radius" : "0px",
                        "border-bottom-left-radius" : "0px",
                        "border-top-right-radius" : "8px",
                        "border-bottom-right-radius" : "8px",
                    })
                    $(".platform").animate({"width":"1680px"},function(){
                        loadAllItem($(".item_containner"),320,30);
                    })
                    $(".select_box").attr("status","close");
                    $(".switch_btn").html('<svg t="1603732466989" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2217" width="32" height="32"><path d="M745.65898437 533.84433594l-416.32822265 416.32822265c-6.66298828 6.66298828-15.86689453 10.78330078-26.03408203 10.78330079-20.33349609 0-36.81738281-16.48388672-36.81738282-36.81738282 0-10.1671875 4.12119141-19.37109375 10.78330079-26.03408203l394.49355468-394.49355469-381.82675781-381.89707031c-6.07763672-6.2859375-9.82265625-14.86054687-9.82265625-24.30878906 0-19.32539062 15.66650391-34.99189453 34.99189453-34.99189453 9.44912109 0 18.02285156 3.74501953 24.31845703 9.83144531l395.88398438 395.88398437c4.78740234 4.87265625 8.14042969 11.16914062 9.36738281 18.1959961-0.759375-4.89814453 0.29003906-5.52919922 0.99052734-4.47978516 6.64277344 6.65859375 10.75078125 15.8484375 10.75078125 25.99892578 0 10.14960938-4.10800781 19.34033203-10.75166015 25.99892578z" fill="#ffffff" p-id="2218"></path></svg>')
                }else{
                    $(".select_box").animate({
                        width: "360px"
                    });
                    $(".select_box .column1 .icon").fadeIn();
                    $(".select_box .column1 li").css("text-indent","40px");
                    $(".select_box .column1").css("border-right","1px solid #777");
                    $(".select_box .column1").css("width","120px");
                    $(".select_box .column2").show();
                    $(".select_box .column3").show();
                    $(".select_box").attr("status","open");
                    $(this).css({
                        "right" : "0px",
                        "border-top-left-radius" : "8px",
                        "border-bottom-left-radius" : "8px",
                        "border-top-right-radius" : "0px",
                        "border-bottom-right-radius" : "0px",
                    })
                    $(".platform").animate({
                        "width":"1350px"
                    },function(){
                        loadAllItem($(".item_containner"),320,30);
                    })
                    $(".switch_btn").html('<svg t="1603731060183" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18943" width="32" height="32"><path d="M278.34101563 490.15566406l416.32822265-416.32822265c6.66298828-6.66298828 15.86689453-10.78330078 26.03408203-10.78330079 20.33349609 0 36.81738281 16.48388672 36.81738282 36.81738282 0 10.1671875-4.12119141 19.37109375-10.78330079 26.03408203l-394.49355468 394.49355469 381.82675781 381.89707031c6.07763672 6.2859375 9.82265625 14.86054687 9.82265625 24.30878906 0 19.32539062-15.66650391 34.99189453-34.99189453 34.99189453-9.44912109 0-18.02285156-3.74501953-24.31845703-9.83144531l-395.88398438-395.88398438c-4.78740234-4.87265625-8.14042969-11.16914062-9.36738281-18.19599609 0.759375 4.89814453-0.29003906 5.52919922-0.99052734 4.47978516-6.64277344-6.65859375-10.75078125-15.8484375-10.75078125-25.99892578 0-10.14960938 4.10800781-19.34033203 10.75166015-25.99892578z" fill="#ffffff" p-id="18944"></path></svg>')
                }
            })
    
            //月历的显示与隐藏
            $(".calendar_entrance").on("mouseenter",function(){
                $(".calendar").fadeIn();
            })
            $(".calendar_entrance").on("mouseleave",function(){
                $(".calendar").fadeOut();
            })
    
            // $(".platform").on("change",function(){
            //     loadAllItem($(".item_containner"),320,30);
            // })
    
            //
    
            //根据一级导航选择二级导航
    
            var goodsArr = {
               "证件": ["身份证","校园卡","学生证","银行卡"],
               "饰品": ["手表","项链","手环","手链","耳环"],
               "数码" : ["耳机","U盘","平板电脑","笔记本电脑","手机","充电宝","数据线"],
                "用品": ["教材","书本","文件夹","雨伞","水杯","钥匙","眼镜","帽子","钱包"],
                "其他" : ["其他"]
            }
    
            $(".select_box .column1 li").click(function(){
                var key =  $(this).find(".text").html();
                var values = goodsArr[key];
                $(".select_box .column1 li").removeClass("selected");
                $(this).addClass("selected");
                //展示二级导航
                $(".select_box .column2 ul").html("");
                for(var i=0; i<values.length; i++){
                    $(".select_box .column2 ul").append("<li>"+values[i]+"</li>");
                }
                $(".select_box .column2 li").click(function(){
                    $(".select_box .column2 li").removeClass("selected");
                    $(this).addClass("selected");
                    objectDetailType = $(this).html();//添加筛选值
                    //触发筛选函数
                    selectGoods();
                });
            })
            $(".select_box .column2 li").click(function(){
                $(".select_box .column2 li").removeClass("selected");
                $(this).addClass("selected");
            });
       
            //点击地点进行选择
            $(".select_box .areaPane .item").on("click",function(){
                $(".select_box .areaBox .areaText").html($(this).html());
                if(display_modal=="lost"){
                    lostLocation = $(this).html();
                }else{
                    foundLocation = $(this).html();
                }
                selectGoods();
                $(".select_box .areaPane").fadeOut();
            });
            $(".select_box .areaBox .area").on("mouseenter",function(){
                $(".select_box .areaPane").fadeIn();
            })
            $(".select_box .areaBox .area").on("mouseleave",function(){
                $(".select_box .areaPane").fadeOut();
            })
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
        var canLoading = true;
        // 首次加载，失物招领和寻物启事都是这个函数, 没有筛选
        //只用在首次加载，和模式切换
        loadGoods("found");
        function loadGoods(type){
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
            $.ajax({
                url : "http://192.168.137.101:8080//Servlet/LostAndFoundServlet",
                type : "get",
                dataType : "json",
                data : {
                    "type" : type,
                    "getInfWay" : "all",
                    "requestType" : "get"
                },
                success : function(res){
                    haveMore = res.next;
                    canLoading = true;
                    scrollId = res.scrollId;
                    if(type=="lost"){//寻物启事
                        var dataList = transfromTime(res.dataList,"lostTime");
                        //把键名进行统一,时间已经在被转换的时间改名了
                        // time location describe name objectDetailType
                        for(var i=0;i<dataList.length; i++){
                            if(dataList[i]["lostLocation"]!=null && dataList[i]["lostLocation"]!=undefined){
                                dataList[i]["location"] = dataList[i]["lostLocation"];
                            }else{
                                dataList[i]["location"] = "未填写"
                            }
                            dataList[i]["describe"] = dataList[i]["lostDescribe"];
                            dataList[i]["name"] = dataList[i]["lostObjectName"];
                            dataList[i]["href"] = "lostAndFound-lost.html?id="+dataList[i]["id"];
                        }
                        
                    }else{
                        //失物招领
                        var dataList = transfromTime(res.dataList,"foundTime");
                        for(var i=0;i<dataList.length; i++){
                            if(dataList[i]["lostLocation"]!=null && dataList[i]["foundLocation"]!=undefined){
                                dataList[i]["location"] = dataList[i]["foundLocation"];
                            }else{
                                dataList[i]["location"] = "未填写"
                            }
                            dataList[i]["describe"] = dataList[i]["foundDescribe"];
                            dataList[i]["name"] = dataList[i]["foundObjectName"];
                            dataList[i]["href"] = "lostAndFound-found.html?id="+dataList[i]["id"];
                        }
                    }
                    //展示返回的数据
                    displayGoods_first(dataList);
                },
                error : function(){
                    displayTipPane("加载物品失败了~")
                },
                timeout : function(){
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

        //无论是第一加载还是后续的加载更多都是用这个函数，
        //因为我们在开头的时候已经初始化过列数组
        function displayGoods_first(arr){
            console.log(arr);
            var items = [];//是dom对象, width 320
            for(var i=0; i<arr.length; i++){
                var oItem = $(template("templateGoodsItem",arr[i]));
                if(arr[i]["imgs"]!=null && arr[i]["imgs"].length!=0){
                    //有图片就添加第一张图片
                    var reg = /(..\/)/
                    var src= arr[i]["imgs"][0];
                    src = src.replace(reg.exec(src)[0],"http:192.168.137.101:8080//");
                    oItem.find(".imgBox").append(' <img src="'+src+'">');
                }
                //先添加到容器中
                //然后再保存到items中
                $(".item_containner").append(oItem);
                items[i] = oItem;       
            }
            loadAllItem($(".item_containner"),320,30);  
        }
        function displayGoods(arr){
            console.log(arr);
            var items = [];//是dom对象, width 320
            for(var i=0; i<arr.length; i++){
                var oItem = $(template("templateGoodsItem",arr[i]));
                if(arr[i]["imgs"]!=null && arr[i]["imgs"].length!=0){
                    //有图片就添加第一张图片
                    var reg = /(..\/)/
                    var src= arr[i][0];
                    src = src.replace(reg.exec(src)[0],"http:192.168.137.101:8080//");
                    oItem.find(".imgBox").append(' <img src="'+src+'">');
                    
                }
                //先添加到容器中
                //然后再保存到items中
                $(".item_containner").append(oItem);
                items[i] = oItem;       
            }
            isImgLoad(function(){
                console.log("图片加载完");
                loadItem(items,320,30);
            },".item_containner .item img")
        }
        //把时间戳转换成具体时间
        function transfromTime(arr,timeType){
            for(var i=0; i<arr.length; i++){
                if(arr[i][timeType]!=null && arr[i][timeType]!=undefined){
                    var date = new Date(arr[i][timeType]);
                    arr[i]["time"] = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日"//都统一为time
                }else{
                    arr[i]["time"] = "未填写"
                }
            }
            return arr;
        }
        //点击模式切换
        //加载失物招领

        $(".findMaster").on("click",function(){
            //先清空，再加载
            display_modal = "found";
            getInfWay = "all";
            scrollId = null;
            $(".item_containner").html("");
            loadGoods("found");
        });
        $(".findGoods").on("click",function(){
            //先清空，再加载
            display_modal = "lost";
            getInfWay = "all";
            scrollId = null;
            $(".item_containner").html("");
            loadGoods("lost");
        });
        // 滚动加载更多
        $(window).on("scroll", debounce(function() {
            //滚动条到顶部的高度
            var scrollTop = Math.ceil($(this).scrollTop());
            //窗口高度
            var curHeight = $(this).height();
            //整个文档高度
            var totalHeight = $(document).height();
            //滚动条到底
            if (scrollTop + curHeight >= totalHeight) {
                if(haveMore){
                    console.log("加载更多")
                    if(canLoading){
                        loadMoreGoods();
                    }
                }else{
                    displayTipPane("没有跟多物品了哦~")
                }
            }
        }, 10, true));

        function loadMoreGoods(){
            canLoading = false;
            if(display_modal=="lost"){
                var data = {
                    "requestType" : "get",
                    "type" : "lost",
                    "getInfWay" : getInfWay,
                };
                //动态添加筛选条件
                if(objectType!=null && objectType!=undefined && objectType!=""){
                    data["objectType"] = objectType;
                }
                if(objectDetailType!=null && objectDetailType!=undefined && objectDetailType!=""){
                    data["objectDetailType"] = objectDetailType;
                }
                if(lostTime!=null && lostTime!=undefined && lostTime!=""){
                    data["lostTime"] = lostTime;
                }
                if(lostLocation!=null && lostLocation!=undefined && lostLocation!=""){
                    data["lostLocation"] = lostLocation;
                }
                if(scrollId!=null){
                    data["scrollId"] = scrollId;
                }
            
                $.ajax({
                    url :"http://192.168.137.101:8080//Servlet/LostAndFoundServlet",
                    type : "get",
                    dataType : "json",
                    data : data,
                    success : function(res){
                        canLoading = true;
                        scrollId = res.scrollId;
                        haveMore = res.next;
                        var dataList = transfromTime(res.dataList,"lostTime");
                        //把键名进行统一,时间已经在被转换的时间改名了
                        // time location describe name objectDetailType
                        for(var i=0;i<dataList.length; i++){
                            if(dataList[i]["lostLocation"]!=null && dataList[i]["lostLocation"]!=undefined){
                                dataList[i]["location"] = dataList[i]["lostLocation"];
                            }else{
                                dataList[i]["location"] = "未填写"
                            }
                            dataList[i]["describe"] = dataList[i]["lostDescribe"];
                            dataList[i]["name"] = dataList[i]["lostObjectName"];
                            dataList[i]["href"] = "lostAndFound-lost.html?id="+dataList[i]["id"];
                        }
                        
                        displayGoods(dataList);
                    }
                })
            }else{
                var data = {
                    "requestType" : "get",
                    "type" : "lost",
                    "getInfWay" : getInfWay,
                };
                //动态添加筛选条件
                if(objectType!=null && objectType!=undefined && objectType!=""){
                    data["objectType"] = objectType;
                }
                if(objectDetailType!=null && objectDetailType!=undefined && objectDetailType!=""){
                    data["objectDetailType"] = objectDetailType;
                }
                if(foundTime!=null && foundTime!=undefined && foundTime!=""){
                    data["foundTime"] = foundTime;
                }
                if(foundLocation!=null && foundLocation!=undefined && foundLocation!=""){
                    data["foundLocation"] = foundLocation;
                }
                if(scrollId!=null){
                    data["scrollId"] = scrollId;
                }
                $.ajax({
                    url :"http://192.168.137.101:8080//Servlet/LostAndFoundServlet",
                    type : "get",
                    dataType : "json",
                    data : data,
                    success : function(res){
                        canLoading = true;
                        scrollId = res.scrollId;
                        haveMore = res.next;
                        var dataList = transfromTime(res.dataList,"foundTime");
                        //把键名进行统一,时间已经在被转换的时间改名了
                        // time location describe name objectDetailType
                        for(var i=0;i<dataList.length; i++){
                            if(dataList[i]["foundLocation"]!=null && dataList[i]["foundLocation"]!=undefined){
                                dataList[i]["location"] = dataList[i]["foundLocation"];
                            }else{
                                dataList[i]["location"] = "未填写"
                            }
                            dataList[i]["describe"] = dataList[i]["foundDescribe"];
                            dataList[i]["name"] = dataList[i]["foundObjectName"];
                            dataList[i]["href"] = "foundAndFound-found.html?id="+dataList[i]["id"];
                        }
                        displayGoods(dataList);
                    }
                })
            }
        }




        //筛选
        //点击一级导航栏,二级分类清空 ,getInfWay = "explore"

        $(".select_box .column1 li").on("click",function(){
            objectType = $(this).find(".text").html();
            objectDetailType = null;
            selectGoods();
        })
    //要加到动态添加column2 li中

     //时间筛选 ，在calendar中调用
    function selectTime(){
        console.log("筛选时间");
        //nowMonth已经加1
        var month = nowMonth.length>1 ? nowMonth : "0"+nowMonth;
        var day = $(this).html().length>1 ? $(this).html() : "0"+$(this).html();
        if(display_modal=="lost"){
            lostTime = nowYear+'-'+month+'-'+day;
        }else{
            foundTime = nowYear+'-'+month+'-'+day;
        }
        selectGoods();
    }
    
   
    //地点筛选

    







        function selectGoods(){
            canLoading = false;
            getInfWay= "explore";
            scrollId = null;
            //清空容器
            $(".item_containner").html("");
            if(display_modal=="lost"){
                var data = {
                    "requestType" : "get",
                    "type" : "lost",
                    "getInfWay" : getInfWay,
                };
                //动态添加筛选条件
                if(objectType!=null && objectType!=undefined && objectType!=""){
                    data["objectType"] = objectType;
                }
                if(objectDetailType!=null && objectDetailType!=undefined && objectDetailType!=""){
                    data["objectDetailType"] = objectDetailType;
                }
                if(lostTime!=null && lostTime!=undefined && lostTime!=""){
                    data["lostTime"] = lostTime;
                }
                if(lostLocation!=null && lostLocation!=undefined && lostLocation!=""){
                    data["lostLocation"] = lostLocation;
                }
            
                $.ajax({
                    url :"http://192.168.137.101:8080//Servlet/LostAndFoundServlet",
                    type : "get",
                    dataType : "json",
                    data : data,
                    success : function(res){
                        haveMore = res.next;
                        scrollId = res.scrollId;
                        var dataList = transfromTime(res.dataList,"lostTime");
                        //把键名进行统一,时间已经在被转换的时间改名了
                        // time location describe name objectDetailType
                        for(var i=0;i<dataList.length; i++){
                            if(dataList[i]["lostLocation"]!=null && dataList[i]["lostLocation"]!=undefined){
                                dataList[i]["location"] = dataList[i]["lostLocation"];
                            }else{
                                dataList[i]["location"] = "未填写"
                            }
                            dataList[i]["describe"] = dataList[i]["lostDescribe"];
                            dataList[i]["name"] = dataList[i]["lostObjectName"];
                            dataList[i]["href"] = "lostAndFound-lost.html?id="+dataList[i]["id"];
                        }
                        canLoading = true;
                        displayGoods_first(dataList);
                    }
                })
            }else{
                var data = {
                    "requestType" : "get",
                    "type" : "lost",
                    "getInfWay" : getInfWay,
                };
                //动态添加筛选条件
                if(objectType!=null && objectType!=undefined && objectType!=""){
                    data["objectType"] = objectType;
                }
                if(objectDetailType!=null && objectDetailType!=undefined && objectDetailType!=""){
                    data["objectDetailType"] = objectDetailType;
                }
                if(foundTime!=null && foundTime!=undefined && foundTime!=""){
                    data["foundTime"] = foundTime;
                }
                if(foundLocation!=null && foundLocation!=undefined && foundLocation!=""){
                    data["foundLocation"] = foundLocation;
                }
                $.ajax({
                    url :"http://192.168.137.101:8080//Servlet/LostAndFoundServlet",
                    type : "get",
                    dataType : "json",
                    data : data,
                    success : function(res){
                        scrollId = res.scrollId;
                        haveMore = res.next;
                        canLoading = true;
                        var dataList = transfromTime(res.dataList,"foundTime");
                        //把键名进行统一,时间已经在被转换的时间改名了
                        // time location describe name objectDetailType
                        for(var i=0;i<dataList.length; i++){
                            if(dataList[i]["foundLocation"]!=null && dataList[i]["foundLocation"]!=undefined){
                                dataList[i]["location"] = dataList[i]["foundLocation"];
                            }else{
                                dataList[i]["location"] = "未填写"
                            }
                            dataList[i]["describe"] = dataList[i]["foundDescribe"];
                            dataList[i]["name"] = dataList[i]["foundObjectName"];
                            dataList[i]["href"] = "foundAndFound-found.html?id="+dataList[i]["id"];
                        }
                        displayGoods_first(dataList);
                    }
                })
            }
        }


        // 
        $(".lost-li").on("click",function(){
            $(".modal_bg_lost").fadeIn();
        })










})



    










        

        




        



    


       
    //    $(".getHeight_btn").click(function(){
    //         var items =$(".item_containner").children();
    //         for(var i=0; i<items.length; i++){
    //             console.log($(items[i]).height());
    //         }
    //         // alert($(".item_containner .item").eq(0).height());
    //     })


