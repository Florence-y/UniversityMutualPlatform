//重新绑定图片放大事件，给具体的图片进行进行click事件绑定
function rebindSeeImage() {
  $(".fadein_img").off("click");
  $(".modal_bg_img .fadeout").off("click");
  $('.fadein_img').on("click", function () {
    $('.modal_bg_img').fadeIn();
    $('.modal_bg_img .modal').css({
      transform: 'translate(-50%,-50%) scale(1)'
    })
    $('.modal_bg_img .modal').find(".modal_content img").attr("src", $(this).attr("src"));
  })
  $('.modal_bg_img .fadeout').on("click", function () {
    $('.modal_bg_img').fadeOut(); // 其实就是css 的过渡+ display
    $('.modal_bg_img .modal').css({
      transform: 'translate(-50%,-50%) scale(0.7)'
    })
  })
}