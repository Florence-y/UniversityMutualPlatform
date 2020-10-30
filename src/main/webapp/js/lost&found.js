 //图片加载完之后才增加瀑布流
        // $(".begin").click(function(){
        loadAllItem($(".item_containner"),320,30);
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
           "数码" : ["耳机","U盘","平板电脑","笔记本电脑","充电宝","数据线"],
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
            });
        })
        $(".select_box .column2 li").click(function(){
            $(".select_box .column2 li").removeClass("selected");
            $(this).addClass("selected");
        });


        //点击地点进行选择

        $(".areaPane .item").on("click",function(){
            $(".areaBox .areaText").html($(this).html());
            $(".areaPane").fadeOut();
        });
        $(".areaBox .area").on("mouseenter",function(){
            $(".areaPane").fadeIn();
        })
        $(".areaBox .area").on("mouseleave",function(){
            $(".areaPane").fadeOut();
        })







        

        




        



    


       
    //    $(".getHeight_btn").click(function(){
    //         var items =$(".item_containner").children();
    //         for(var i=0; i<items.length; i++){
    //             console.log($(items[i]).height());
    //         }
    //         // alert($(".item_containner .item").eq(0).height());
    //     })


