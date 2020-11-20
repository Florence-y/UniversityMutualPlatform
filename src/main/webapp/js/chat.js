$(".chat_btn").on({
    click: function() {
        console.log(1);
        // var meObBj = {
        //     id: getCookie("markNumber")[2],
        //     face: 'http://192.168.137.112:8080' + getCookie('face')[2].substring(2)
        // };
        // console.log(getCookie("markNumber")[2]);
        // $(".platform_chat .targetName").text(oAuthor.userName);
        // var targetObj = {
        //     id: oAuthor.markNumber,
        //     face: oAuthor.face,
        //     name: oAuthor.userName
        // }

        // chat(meObBj, targetObj.callback);
    }

})

function chat(meOBj, targetObj, callback) {
    //首先判断是否浏览器支持websocket
    //点击发送
    let ws;
    var ulNode = document.getElementById("ulNode");
    var screen_inner = document.getElementById("screen_inner");
    if ('WebSocket' in window) {
        //测试一定要加上虚拟路径，如果后面有参数+参数一定要相同
        let markNumber = meOBj.id;
        let wantToSendMarkNumber = targetObj.id;
        ws = new WebSocket("ws://192.168.137.112:8080/WebSocket/" + markNumber + '/' + wantToSendMarkNumber);
    } else {
        displayTipPane("连接失败");
        return;
    }
    ws.onopen = function() {
            displayTipPane("连接成功");
        }
        //收到信息
    ws.onmessage = function(event) {
        //收到消息就将加小红点
        // $();
        //进行内容的添加
        // console.log('收到消息：' + event.data);

        addReceived(event.data);
        if (callback) {
            callback();
        }

    }
    ws.onerror = function() {
        displayTipPane("error");
    }
    $(".platform_chat .close_btn").click(() => {
        $(".platform_chat").hide(150);
        ws.close();
    })





    //单击事件发送数据
    $(".platform_chat input[type='button']").click(function() {
        var screen_inner = $(".platform_char .screen .inner");
        screen_inner.scrollTop = screen_inner.scrollHeight - screen_inner.clientHeight;
        let value = $(".platform_chat textarea").val();
        ws.send(value);
        addSend(value);
        $(".platform_chat textarea").val("");
    });
    //关闭页面的时候就关闭wesocket
    window.onbeforeunload = function() {
        ws.close();
    }


    function addReceived(data) {
        // console.log(data);
        var liNode = document.createElement("li");
        liNode.classList.add("target");
        liNode.innerHTML = '<img class="profile" src="' + targetObj.face + '"><span class="text">' + data + '</span>';
        ulNode.appendChild(liNode);
        screen_inner.scrollTop = screen_inner.scrollHeight - screen_inner.clientHeight;
    }

    function addSend(data) {
        // console.log(data);
        var liNode = document.createElement("li");
        liNode.classList.add("me");
        liNode.innerHTML = '<span class="text">' + data + '</span><img class="profile" src="' + meObj.face + '">';
        ulNode.appendChild(liNode);
        screen_inner.scrollTop = screen_inner.scrollHeight - screen_inner.clientHeight;
    }
}
// 拖动
$('.platform_chat').mousedown(function(e) {
    // e.pageX
    var positionDiv = $(this).offset();
    var distenceX = e.pageX - positionDiv.left;
    var distenceY = e.pageY - positionDiv.top;
    //displayTipPane(distenceX)
    // displayTipPane(positionDiv.left);
    console.log('鼠标拖动')
    $(document).mousemove(function(e) {
        // console.log('鼠标拖动')
        var x = e.pageX - distenceX;
        var y = e.pageY - distenceY; //鼠标与盒子的左上角x,y距离

        if (x < 0) {
            x = 0; //防止溢出窗口
        } else if (x > $(document).width() - $('.platform_chat').outerWidth(true)) {
            x = $(document).width() - $('.platform_chat').outerWidth(true);
        }
        if (y < 0) {
            y = 0; //防止溢出窗口
        } else if (y > $(document).height() - $('.platform_chat').outerHeight(true)) {
            y = $(document).height() - $('.platform_chat').outerHeight(true);
        }

        $('.platform_chat').css({
            'left': x + 'px',
            'top': y + 'px'
        });
    });
    //清除事件
    $(document).mouseup(function() {
        $(document).off('mousemove');
    });
});