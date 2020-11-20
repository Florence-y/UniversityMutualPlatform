

    // 登录成功和自动登录后会进行自动与服务器进行连接
    var lockReconnect = false;//避免重复连接
    var myMarkNumber = "191543214";//要获取cookie
    var wantToSendMarkNumber = "123456789";//随便写一个，目的是与服务进行连接
    var url = "ws://192.168.137.105:8080/WebSocket";
    var wsUrl //点击某一个私信后重新修改
    var ws;
    var tt;
    var ulNode = document.getElementById("ulNode");
    var screen_inner = document.getElementById("screen_inner");
    

    $(".logon1").on("click",logon1);
    $(".logon2").on("click",logon2);


    //模拟登录成功和自动登录
    function logon1(){
        $.cookie("markNumber","191543214");
        $.cookie("face","../img/use1 (1).jpg");
        $.cookie("userName","冯某某");
        displayTipPane("登录用户1")
        initialWebSocket();//首次与服务器进行连接
        
    }
    function logon2(){
        $.cookie("markNumber","191541227");
        console.log($.cookie("markNumber"));
        $.cookie("face","../img/use1 (2).jpg");
        $.cookie("userName","吴某某");
        displayTipPane("登录用户2");
        initialWebSocket();//首次与服务器进行连接
    }

    // 退出登录
    $(".logOut").on("click",function(){
        $.removeCookie("markNumber");
        $.removeCookie("face");
        $.removeCookie("userName");
        ws.close();
        $(".platform_chat").fadeOut();
        displayTipPane("退出登录!WebSocket断开连接!");
    })

    var lastTarget = null;
    // 开始聊天,点击私信进行连接
    $(".chatBtn").on("click",function(){
        wantToSendMarkNumber = $(this).attr("target");
        wsUrl  = url+'/'+myMarkNumber+'/'+wantToSendMarkNumber; 
        //重新连接WebSocket

        //用户名
        $(".platform_chat .targetName").text($(this).attr("targetName"));
        if(lastTarget!=null && lastTarget!=$(this).attr("target")){
           ulNode.innerHTML("");
        }
        lastTarget = $(this).attr("targetName");
        
        $(".platform_chat").fadeIn();

        //这次的webSocket是有发送目标的
        createWebSocket1();
    });

    //历史记录
    function loadHistoryInfo(target){//获取与某一个人的具体历史信息，target的对方的markNumber
        //遍历，添加
    }

    // 消息发送
    //文本的发送，回车键或者点击发送按钮进行发送
    //表情是点击某一个表情，发送一个表情图片地址,表情需要限制尺寸大小
    //图片需要上传图片，上传完后发送的还是图片的地址


    // 文本发送
    function getTextInfo(){
        //判空处理
        var reg = /^\s*$/
        if(reg.test($(".platform_chat textarea").val())){
            displayTipPane("输入文本不能为空！")
            $(".platform_chat textarea").val("");
            return null;
        }
        var date = new Date();
        var sendTime = date.getTime();
        var textInfo = {
            "senderMarkNumebr":myMarkNumber,
            "senderFace":$.cookie("face"),
            "senderName":$.cookie("userName"),
            "contentType":"text",
            "sendTime": ""+sendTime,
            "content":$(".platform_chat textarea").val()
        }
        $(".platform_chat textarea").val("");
        return textInfo;
    }


    function sendText(){
        var textInfo = getTextInfo();
        if(textInfo!=null){//非空
            addSend(textInfo);
            ws.send(JSON.stringify(textInfo));//发送json对象
        }
    }


    // 点击发送按钮
    $(".platform_chat input[type='button']").on("click",function(){
        sendText();
        // displayTipPane("发送文本")
    })

    //回车键发送
    $(".platform_chat textarea").on("keydown",function(e){
        if(e.keyCode==13 || e.keyCode==108){
            sendText();
        }
    })
    
    // 添加接受的消息函数
    function addReceived(data) {
        // displayTipPane(data);
        //判断data类型 img | text
        data = JSON.parse(data);
        console.log(data);
        var liNode = document.createElement("li");
        liNode.classList.add("target");
        if(data.contentType=="text"){
            liNode.innerHTML = '<span class="text">' + data.content + '</span><img class="profile" src="' +data.senderFace + '">';
        }else if(data.contentType=="face"){//表情,大小有限制

        }else if(data.contentType=="img"){//图片，大小有限制，但是比表情大一点

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

        if(data.contentType=="text"){
            liNode.innerHTML = '<span class="text">' + data.content + '</span><img class="profile" src="' +data.senderFace + '">';
        }else if(data.contentType=="face"){//表情,大小有限制
        }else if(data.contentType=="img"){//图片，大小有限制，但是比表情大一点

        }
        ulNode.appendChild(liNode);
        screen_inner.scrollTop = screen_inner.scrollHeight - screen_inner.clientHeight;
    }
   
    //登录成功和自动登录时使用
    function initialWebSocket(){
        myMarkNumber = $.cookie("markNumber");
        wantToSendMarkNumber = "123456789";
        wsUrl  = url+'/'+myMarkNumber+'/'+wantToSendMarkNumber;
        createWebSocket1();
    }

     //点击其他聊天后也要调用，重新连接websocket
    function createWebSocket() {
     
      try {
        ws = new WebSocket(wsUrl);
        init();
      } catch(e) {
        displayTipPane('catch');
        reconnect();
      }
        
    }
    function init() {
      ws.onclose = function () {
        displayTipPane('链接关闭');
        reconnect();
      };
      ws.onerror = function() {
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
       
        //消息的展示,不是心跳验证码,就小红点出现，用户发送过来的数据也开始动态添加
        addReceived(event.data);
        if(event.data!="#1#"){
            addReceived(event.data);
        }
        heartCheck.start();
      }
      //发送消息
    }
    function reconnect() {
      if(lockReconnect) {
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
      start: function(){
        // displayTipPane('start');
        var self = this;
        this.timeoutObj && clearTimeout(this.timeoutObj);
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
        this.timeoutObj = setTimeout(function(){
          //这里发送一个心跳，后端收到后，返回一个心跳消息，
        //   displayTipPane('55555');
          ws.send("123456789");//如果是后端还在线，就会触发onmessage事件
         //3s不返回消息就会关闭webSocket，否则就会关闭该定时器继续进行心跳检测
          self.serverTimeoutObj = setTimeout(function() {
            // displayTipPane(111);
            // displayTipPane(ws);
            ws.close();
            // createWebSocket();
          }, self.timeout);

        }, this.timeout)
      }
    }


    function createWebSocket1(){
        ws = new WebSocket(wsUrl);
        ws.onclose = function(){
            displayTipPane("关闭聊天连接");
        }
        ws.onerror = function(){
            displayTipPane("连接异常")
        }
        ws.onmessage= function(){
            addReceived();
        }
        ws.onopen = function(){
            displayTipPane("连接成功")
        }
    }

    // 创建一个webSocket与服务器进行连接

   

    
      
    


// 关闭聊天面板
    $('.close_btn').click(function() {
        $(".platform_chat").fadeOut(200);
    })


    
