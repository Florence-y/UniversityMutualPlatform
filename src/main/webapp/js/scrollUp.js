function scrollUp() {

    var htmlBox = document.documentElement;
    this.timer = setInterval(function () {

        console.log("执行了函数");
        if (htmlBox.scrollTop > 2000) {
            htmlBox.scrollTop -= 200;
        } else if (htmlBox.scrollTop > 1000) {
            htmlBox.scrollTop -= 100;
        } else if (htmlBox.scrollTop > 800) {
            htmlBox.scrollTop -= 80;
        } else if (htmlBox.scrollTop > 600) {
            htmlBox.scrollTop -= 80;
        } else if (htmlBox.scrollTop > 400) {
            htmlBox.scrollTop -= 60;
        } else if (htmlBox.scrollTop > 200) {
            htmlBox.scrollTop -= 40;
        } else if (htmlBox.scrollTop > 100) {
            htmlBox.scrollTop -= 20;
        } else if (htmlBox.scrollTop > 50) {
            htmlBox.scrollTop -= 5;
        } else {
            htmlBox.scrollTop = 0;
            clearInterval(this.timer);
        }
    }, 2)
}