// $(".chat_btn").on({
//     click: function() {
//         console.log(1);
//         // var meObBj = {
//         //     id: getCookie("markNumber")[2],
//         //     face: 'http://192.168.137.112:8080' + getCookie('face')[2].substring(2)
//         // };
//         // console.log(getCookie("markNumber")[2]);
//         // $(".platform_chat .targetName").text(oAuthor.userName);
//         // var targetObj = {
//         //     id: oAuthor.markNumber,
//         //     face: oAuthor.face,
//         //     name: oAuthor.userName
//         // }

//         // chat(meObBj, targetObj.callback);
//     }

// })

// function chat(meOBj, targetObj, callback) {
//     //首先判断是否浏览器支持websocket
//     //点击发送
//     let ws;
//     var ulNode = document.getElementById("ulNode");
//     var screen_inner = document.getElementById("screen_inner");
//     if ('WebSocket' in window) {
//         //测试一定要加上虚拟路径，如果后面有参数+参数一定要相同
//         let markNumber = meOBj.id;
//         let wantToSendMarkNumber = targetObj.id;
//         ws = new WebSocket("ws://192.168.137.112:8080/WebSocket/" + markNumber + '/' + wantToSendMarkNumber);
//     } else {
//         displayTipPane("连接失败");
//         return;
//     }
//     ws.onopen = function() {
//             displayTipPane("连接成功");
//         }
//         //收到信息
//     ws.onmessage = function(event) {
//         //收到消息就将加小红点
//         // $();
//         //进行内容的添加
//         // console.log('收到消息：' + event.data);

//         addReceived(event.data);
//         if (callback) {
//             callback();
//         }

//     }
//     ws.onerror = function() {
//         displayTipPane("error");
//     }
//     $(".platform_chat .close_btn").click(() => {
//         $(".platform_chat").hide(150);
//         ws.close();
//     })





//     //单击事件发送数据
//     $(".platform_chat input[type='button']").click(function() {
//         var screen_inner = $(".platform_char .screen .inner");
//         screen_inner.scrollTop = screen_inner.scrollHeight - screen_inner.clientHeight;
//         let value = $(".platform_chat textarea").val();
//         ws.send(value);
//         addSend(value);
//         $(".platform_chat textarea").val("");
//     });
//     //关闭页面的时候就关闭wesocket
//     window.onbeforeunload = function() {
//         ws.close();
//     }


//     function addReceived(data) {
//         // console.log(data);
//         var liNode = document.createElement("li");
//         liNode.classList.add("target");
//         liNode.innerHTML = '<img class="profile" src="' + targetObj.face + '"><span class="text">' + data + '</span>';
//         ulNode.appendChild(liNode);
//         screen_inner.scrollTop = screen_inner.scrollHeight - screen_inner.clientHeight;
//     }

//     function addSend(data) {
//         // console.log(data);
//         var liNode = document.createElement("li");
//         liNode.classList.add("me");
//         liNode.innerHTML = '<span class="text">' + data + '</span><img class="profile" src="' + meObj.face + '">';
//         ulNode.appendChild(liNode);
//         screen_inner.scrollTop = screen_inner.scrollHeight - screen_inner.clientHeight;
//     }
// }
// // 拖动
// $('.platform_chat').mousedown(function(e) {
//     // e.pageX
//     var positionDiv = $(this).offset();
//     var distenceX = e.pageX - positionDiv.left;
//     var distenceY = e.pageY - positionDiv.top;
//     //displayTipPane(distenceX)
//     // displayTipPane(positionDiv.left);
//     console.log('鼠标拖动')
//     $(document).mousemove(function(e) {
//         // console.log('鼠标拖动')
//         var x = e.pageX - distenceX;
//         var y = e.pageY - distenceY; //鼠标与盒子的左上角x,y距离

//         if (x < 0) {
//             x = 0; //防止溢出窗口
//         } else if (x > $(document).width() - $('.platform_chat').outerWidth(true)) {
//             x = $(document).width() - $('.platform_chat').outerWidth(true);
//         }
//         if (y < 0) {
//             y = 0; //防止溢出窗口
//         } else if (y > $(document).height() - $('.platform_chat').outerHeight(true)) {
//             y = $(document).height() - $('.platform_chat').outerHeight(true);
//         }

//         $('.platform_chat').css({
//             'left': x + 'px',
//             'top': y + 'px'
//         });
//     });
//     //清除事件
//     $(document).mouseup(function() {
//         $(document).off('mousemove');
//     });
// });




// $("body").on({
//     click: function() {
//         $(".platform_chat").fadeOut(200);
//     }
// })



// $('.sendText_btn').on({
//     click: function(e) {
        // console.log(22);
        // e.stopPropagation();
        // $(".platform_chat").fadeIn(200);

        // $(".platform_chat").on({
        //     click: function(e) {
        //         e.stopPropagation();
        //         $(".platform_chat").css("display", "block");
        //     }
        // })


    // 登录成功和自动登录后会进行自动与服务器进行连接
    var lockReconnect = false;//避免重复连接
    var myMarkNumber = "19"
    var wsUrl = "ws://192.168.137.105:8080/WebSocket/";
    var ws;
    var tt;
    function createWebSocket() {
      try {
        ws = new WebSocket(wsUrl);
        init();
      } catch(e) {
        // console.log('catch');
        reconnect(wsUrl);
      }
    }
    function init() {
      ws.onclose = function () {
        // console.log('链接关闭');
        reconnect(wsUrl);
      };
      ws.onerror = function() {
        // console.log('发生异常了');
        reconnect(wsUrl);
      };
      ws.onopen = function () {
        //心跳检测重置
        heartCheck.start();
      };
      ws.onmessage = function (event) {
        //拿到任何消息都说明当前连接是正常的
        // console.log('接收到消息');
        //消息的展示
        heartCheck.start();
      }
      //发送消息
    }
    function reconnect(url) {
      if(lockReconnect) {
        return;
      };
      lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      tt && clearTimeout(tt);
      tt = setTimeout(function () {
        createWebSocket(url);//重新连接，递归
        lockReconnect = false;
      }, 4000);
    }
    //心跳检测
    var heartCheck = {
      timeout: 3000,
      timeoutObj: null,
      serverTimeoutObj: null,
      start: function(){
        // console.log('start');
        var self = this;
        this.timeoutObj && clearTimeout(this.timeoutObj);
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
        this.timeoutObj = setTimeout(function(){
          //这里发送一个心跳，后端收到后，返回一个心跳消息，
        //   console.log('55555');
          ws.send("123456789");//如果是后端还在线，就会触发onmessage事件
          self.serverTimeoutObj = setTimeout(function() {
            // console.log(111);
            // console.log(ws);
            ws.close();
            // createWebSocket();
          }, self.timeout);

        }, this.timeout)
      }
    }

    // 创建一个webSocket与服务器进行连接
    createWebSocket(wsUrl);


        var meObj = {
            id: "191543214",
            face: '../img/use1 (1).jpg'
        };
        // console.log($.cookie("markNumber"));
        $(".platform_chat .targetName").text(oAuthor.userName);
        var targetObj = {
            id: "",
            face: '',
            name: oAuthor.userName
        }
        // console.log(targetObj);
        chat(meObj, targetObj);
    



$('.close_btn').click(function() {
    $(".platform_chat").fadeOut(200);
})


function chat(meObj, targetObj, callback) {
    //首先判断是否浏览器支持websocket
    //每次打开新的聊天对象，就要进行重新连接
    let ws;
    var ulNode = document.getElementById("ulNode");
    var screen_inner = document.getElementById("screen_inner");
    if ('WebSocket' in window) {
        //测试一定要加上虚拟路径，如果后面有参数+参数一定要相同
        let markNumber = meObj.id;
        let wantToSendMarkNumber = targetObj.id;
        ws = new WebSocket("ws://192.168.137.105:8080/WebSocket/" + markNumber+'/'+wantToSendMarkNumber);
    } else {
        // displayTipPane("连接失败");
        return;
    }
    ws.onopen = function() {
            // displayTipPane("连接成功");
        }
        //收到信息,不论是谁的消息，只要是服务器有发送消息给你就会进行触发onMessage事件
    ws.onmessage = function(event) {
        $(".icondian").css("display", "block");
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
        // ws.close();
    })





    //单击事件发送数据
    $(".platform_chat input[type='button']").off("click");
    $(".platform_chat input[type='button']").on("click", function() {
        var screen_inner = $(".platform_char .screen .inner");
        screen_inner.scrollTop = screen_inner.scrollHeight - screen_inner.clientHeight;
        let value = $(".platform_chat textarea").val();
        if (value == undefined || value == null || value == "") {
            return;
        }
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
