$(function(){
    $(".nav .searchBox").on("mouseenter",function(){
        $(this).css({
            "backgroundColor":"rgba(255,255,255,0.9)"
        })
        var width = $(this).find("input").attr("target_width");
        $(this).find("input").css("width",width);
        $(this).find("button").css({
            "backgroundColor":"#fff",
            "color":"#028e9b"
        })
    })
})


