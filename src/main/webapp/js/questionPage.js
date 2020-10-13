
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


// 窗口缩放
$(window).bind("resize",()=>{
    if($(this).scrollTop()>500){
        $('.sideBox_fixed').css("left",$('.head_search').position().left+$('.head_search').width()-$('.sideBox_fixed').width()+"px");
    }
    
})



