function displayTipPane(text) {
    $('.tipPane').html(text);
    $(".tipPane").fadeIn(100);
    // displayTipPane("展示面板")
    setTimeout(() => {
        $(".tipPane").fadeOut(100);
    }, 1300)
}