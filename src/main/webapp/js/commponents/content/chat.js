

// 登录成功和自动登录后会进行自动与服务器进行连接


//每个页面都写一个


$(".logon1").on("click", logon1);
$(".logon2").on("click", logon2);



//模拟登录成功和自动登录
function logon1() {
  $.cookie("markNumber", "191543214", { expires: 1 });
  $.cookie("face", "../img/use1 (1).jpg", { expires: 1 });
  $.cookie("userName", "冯某某", { expires: 1 });
  setCookie("markNumber", "191543214")
  var json = {
    "markNumber": "191543214",
    "face": "../img/use1 (1).jpg",
    "userName": "冯某某"
  }
  setCookie(json, 1);
  displayTipPane("登录用户1")
  initialWebSocket();//首次与服务器进行连接

}
function logon2() {
  $.cookie("markNumber", "191541227", { expires: 1 });
  // console.log($.cookie("markNumber"));
  $.cookie("face", "../img/use1 (2).jpg", { expires: 1 });
  $.cookie("userName", "吴某某", { expires: 1 });

  displayTipPane("登录用户2");
  initialWebSocket();//首次与服务器进行连接
}

// 退出登录
$(".logOut").on("click", function () {
  $.removeCookie("markNumber");
  $.removeCookie("face");
  $.removeCookie("userName");
  ws.close();
  $(".platform_chat").fadeOut();
  // displayTipPane("退出登录!WebSocket断开连接!");
})



//聊天
var lockReconnect = false;//避免重复连接
var myMarkNumber = "191543214";//要获取cookie
var wantToSendMarkNumber = "123456789";//随便写一个，目的是与服务进行连接
var url = "ws://192.168.137.105:8080/WebSocket";
var wsUrl //点击某一个私信后重新修改
var ws;
var tt;
var ulNode = document.getElementById("ulNode");
var screen_inner = document.getElementById("screen_inner");

// initialWebSocket();//首次与服务器进行连接

// 退出登录调用
function closeWebSocket() {
  ws.close();
  $(".platform_chat").fadeOut();
}

var lastTarget = null;
// 开始聊天,点击私信进行连接
$(".chatBtn").on("click", function () {
  wantToSendMarkNumber = $(this).attr("target");
  wsUrl = url + '/' + myMarkNumber + '/' + wantToSendMarkNumber;
  //重新连接WebSocket

  //用户名
  $(".platform_chat .targetName").text($(this).attr("targetName"));
  if (lastTarget != null && lastTarget != $(this).attr("target")) {
    ulNode.innerHTML = "";
  }
  lastTarget = $(this).attr("targetName");

  $(".platform_chat").fadeIn();

  //这次的webSocket是有发送目标的
  createWebSocket1();
});

//历史记录
function loadHistoryInfo(target) {//获取与某一个人的具体历史信息，target的对方的markNumber
  //遍历，添加
}

// 消息发送
//文本的发送，回车键或者点击发送按钮进行发送
//表情是点击某一个表情，发送一个表情图片地址,表情需要限制尺寸大小
//图片需要上传图片，上传完后发送的还是图片的地址


// 文本发送
function getTextInfo() {
  //判空处理
  var reg = /^\s*$/
  if (reg.test($(".platform_chat textarea").val())) {
    displayTipPane("输入文本不能为空！")
    $(".platform_chat textarea").val("");
    return null;
  }
  var date = new Date();
  var sendTime = date.getTime();
  var textInfo = {
    "senderMarkNumber": myMarkNumber,
    "senderFace": $.cookie("face"),
    "senderName": $.cookie("userName"),
    "contentType": "text",
    "sendTime": "" + sendTime,
    "content": $(".platform_chat textarea").val()
  }
  $(".platform_chat textarea").val("");
  return textInfo;
}

function sendText() {
  var textInfo = getTextInfo();
  if (textInfo != null) {//非空
    addSend(textInfo);
    ws.send(JSON.stringify(textInfo));//发送json对象
  }
}

// 点击发送按钮
$(".platform_chat input[type='button']").on("click", function () {
  sendText();
  $(".platform_chat textarea").val("")
  // displayTipPane("发送文本")
})

//回车键发送
$(".platform_chat textarea").on("keydown", function (e) {

  if (e.keyCode == 13 || e.keyCode == 108) {
    sendText();
    e.preventDefault()
    $(".platform_chat textarea").val("")
  }
})




//表情发送, 鼠标点击某一个表情时触发函数
function setFaceEventListener() {
  var date = new Date();
  var sendTime = date.getTime();
  var faceInfo = {
    "senderMarkNumber": myMarkNumber,
    "senderFace": $.cookie("face"),
    "senderName": $.cookie("userName"),
    "contentType": "face",
    "sendTime": "" + sendTime,
    "content": $(this).attr("src")
  }

  addSend(faceInfo);
  ws.send(JSON.stringify(faceInfo));
}


//图片发送
//上传图片
//成功后发送消息


//读取图片文件 

$('.platform_chat .picture').click(() => {
  if (sendingImg) {
    displayTipPane("有图片正在上传中...");
  } else {
    $('#sendImgBtn').click();
  }
})
$('#sendImgBtn').change(readFile_chat);
//读图片，添加到输入框中
var oinput = document.getElementById("sendImgBtn");

//读取文件
function readFile_chat() {
  var formdata = new FormData();
  if (!oinput['value'].match(/.jpg|.gif|.png|.jpeg|.bmp/i)) {　　 //判断上传文件格式
    return displayTipPane("图片格式有误！");
  }

  formdata.append(0, this.files[0]); // formdata 的属性
  //成功后上传图片
  sendImage_chat(formdata);
}

var sendingImg = false;
function sendImage_chat(formdata) {
  sendingImg = true;
  $.ajax({
    url: 'http://192.168.137.105:8080/Servlet/ReceiveFileServlet',
    type: 'post',
    data: formdata,
    dataType: 'json',
    processData: false, //用FormData传fd时需有这两项
    contentType: false,
    success: function (data) {
      sendingImg = false;
      // imgObj.attr("src", data.message);
      //图片上传成功后拿取返回的url
      sendImg_chatContent(data.message);
    },
    error: function (data) {
      sendingImg = false;
      displayTipPane("图片上传失败！")
    },
    timeout: function (data) {
      sendingImg = false;
      displayTipPane("图片上传超时！")
    }
  })
}


//发送图片信息
function sendImg_chatContent(url) {
  var date = new Date();
  var sendTime = date.getTime();
  var imgInfo = {
    "senderMarkNumber": myMarkNumber,
    "senderFace": $.cookie("face"),
    "senderName": $.cookie("userName"),
    "contentType": "img",
    "sendTime": "" + sendTime,
    "content": url
  }
  addSend(imgInfo);
  ws.send(JSON.stringify(imgInfo));
}

// img是css查询条件
function isImgLoad(callback, img) {
  $(img).each(function () {
    if (this.height === 0) {
      isLoad = false;
      return false;
    }
  });
  if (isLoad) {
    clearTimeout(t_img);
    callback();
  } else {
    isLoad = true;
    t_img = setTimeout(function () {
      isImgLoad(callback);
    }, 100)
  }
}

// 添加接受的消息函数
function addReceived(data) {
  // displayTipPane(data);
  //判断data类型 img | text
  // console.log(data);
  data = JSON.parse(data);
  // console.log(data);

  var liNode = document.createElement("li");
  liNode.classList.add("target");
  if (data.contentType == "text") {
    liNode.innerHTML = '<img class="profile" src="' + data.senderFace + '"><span class="text">' + data.content + '</span>';
  } else if (data.contentType == "face") {//表情,大小有限制
    liNode.innerHTML = '<img class="profile" src="' + data.senderFace + '"><span class="text"><img src="' + data.content + '" height="28px"></span>';
  } else if (data.contentType == "img") {//图片，大小有限制，但是比表情大一点
    // data.content = "http://192.168.137.105:8080"+data.content.substring(2);
    liNode.innerHTML = '<img class="profile" src="' + data.senderFace + '"><span class="text"><img  src="' + data.content + '" style="max-width:130px; margin:5px;border-radius:4px;cursor:zoom-in;cursor:-webkit-zoom-in" class="fadein_img"></span>';
    ulNode.appendChild(liNode);
    // var oImg = liNode.getElementsByTagName("img")[0];
    rebindSeeImage();
    isImgLoad(function () {
      screen_inner.scrollTop = screen_inner.scrollHeight - screen_inner.clientHeight;
    }, liNode.getElementsByTagName("img"));
    return;
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

  if (data.contentType == "text") {
    liNode.innerHTML = '<span class="text">' + data.content + '</span><img class="profile" src="' + data.senderFace + '">';
  } else if (data.contentType == "face") {//表情,大小有限制
    liNode.innerHTML = '<span class="text"><img src="' + data.content + '" height="28px"></span><img class="profile" src="' + data.senderFace + '">';

  } else if (data.contentType == "img") {//图片，大小有限制，但是比表情大一点

    data.content = "http://192.168.137.105:8080" + data.content.substring(2);
    liNode.innerHTML = '<span class="text"><img  src="' + data.content + '" style="max-width:130px; border-radius:4px; margin:5px;cursor:zoom-in;cursor:zoom-in;cursor:-webkit-zoom-in" class="fadein_img"></span><img class="profile" src="' + data.senderFace + '">';
    ulNode.appendChild(liNode);
    //添加事件
    // var oImg = liNode.getElementsByTagName("img")[0];
    // $(oImg).on('click',rebindSeeImage);
    rebindSeeImage();
    isImgLoad(function () {
      screen_inner.scrollTop = screen_inner.scrollHeight - screen_inner.clientHeight;
    }, liNode.getElementsByTagName("img"));
    return;

  }
  ulNode.appendChild(liNode);
  screen_inner.scrollTop = screen_inner.scrollHeight - screen_inner.clientHeight;


}

//登录成功和自动登录时使用
function initialWebSocket() {
  myMarkNumber = $.cookie("markNumber");
  wantToSendMarkNumber = "123456789";
  wsUrl = url + '/' + myMarkNumber + '/' + wantToSendMarkNumber;
  createWebSocket1();
}

//点击其他聊天后也要调用，重新连接websocket
function createWebSocket() {

  try {
    ws = new WebSocket(wsUrl);
    init();
  } catch (e) {
    displayTipPane('catch');
    reconnect();
  }

}
function init() {
  ws.onclose = function () {
    displayTipPane('链接关闭');
    reconnect();
  };
  ws.onerror = function () {
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
    console.log(event)
    //消息的展示,不是心跳验证码,就小红点出现，用户发送过来的数据也开始动态添加
    addReceived(event.data);
    // if(event.data!="#1#"){
    //     addReceived(event.data);
    // }
    heartCheck.start();
  }
  //发送消息
}
function reconnect() {
  if (lockReconnect) {
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
  start: function () {
    // displayTipPane('start');
    var self = this;
    this.timeoutObj && clearTimeout(this.timeoutObj);
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
    this.timeoutObj = setTimeout(function () {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //   displayTipPane('55555');
      ws.send("123456789");//如果是后端还在线，就会触发onmessage事件
      //3s不返回消息就会关闭webSocket，否则就会关闭该定时器继续进行心跳检测
      self.serverTimeoutObj = setTimeout(function () {
        // displayTipPane(111);
        // displayTipPane(ws);
        ws.close();
        // createWebSocket();
      }, self.timeout);

    }, this.timeout)
  }
}


function createWebSocket1() {
  ws = new WebSocket(wsUrl);
  ws.onclose = function () {
    displayTipPane("关闭聊天连接");
  }
  ws.onerror = function () {
    displayTipPane("连接异常")
  }
  ws.onmessage = function (event) {
    addReceived(event.data);
  }
  ws.onopen = function () {
    displayTipPane("连接成功")
  }
}

// 创建一个webSocket与服务器进行连接
// 制作表情面板

function addFace() {
  for (var i = 1; i <= 25; i++) {
    var oImg = $('<img src="../emoji/' + i + '.png">');
    $(".facePane").append(oImg);
    oImg.on("click", setFaceEventListener);
  }
}
addFace();

//面板的打开与关闭  

$(".platform_chat .face").on("click", function (e) {
  e.stopPropagation()
  $(".facePane").fadeIn(230);
  $(".facePane").css("display", "flex");

})
$('body').on("click", function () {
  $(".facePane").fadeOut(230);
})


// 关闭聊天面板
$('.close_btn').click(function () {
  $(".platform_chat").fadeOut(200);
})



