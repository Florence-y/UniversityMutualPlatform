//然后计算当前年的 1月1日是星期几
//再计算当前月的1日是什么是星期几
//计算闰年
function isLeapYear(year) {
  //4的倍数但不是100的倍数 或者400的倍数
  if ((year % 4) == 0 && (year % 100) != 0 || (year % 400) == 0) {
    return 1;
  }
  return 0;
}
//平年和闰年的月的天数
let months = [[0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
[0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]];

var base_year = 2000;
var base_week = 6;

function getCalendar(year, month) {

  var totalDay_year = 0;
  for (var i = base_year; i < year; i++) {
    totalDay_year += (365 + isLeapYear(i));
  }
  //计算当前年的1月1日的是星期几
  var year_first = (totalDay_year + base_week) % 7;
  // console.log(year_first);

  //计算当前月1号是星期几
  var totalDay_month = 0;
  for (var i = 1; i < month; i++) {
    totalDay_month += months[isLeapYear(year)][i];
  }
  var month_first = (totalDay_month + year_first) % 7;

  // console.log(month_first);
  //6行7列
  var calendar = [[], [], [], [], [], []];
  var nextPostion = 0;
  for (var i = 0; i < month_first; i++) {
    calendar[0][i] = "";
    nextPostion++;
  }
  //填日数
  for (var day = 1; day <= months[isLeapYear(year)][month]; day++) {
    //求出下一个填充的位置
    var row = Math.floor(nextPostion / 7);
    var column = nextPostion % 7;
    calendar[row][column] = day;
    nextPostion++;
  }
  return calendar;
}
function setCalendar(year, month) {//设置展示样式
  var calendar = getCalendar(year, month);//日历数据
  var date_now = new Date();//用来判断是不是当前月
  var row = $("table .day");
  var table = [];
  for (var i = 0; i < row.length; i++) {
    table[i] = $(row[i]).children();
  }
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 7; j++) {
      $(table[i][j]).removeClass("fill");
      $(table[i][j]).removeClass("today");

      $(table[i][j]).html("");
      if (calendar[i][j] != "" && calendar[i][j] != null && calendar[i][j] != undefined) {
        $(table[i][j]).addClass("fill");
      }

      $(table[i][j]).html(calendar[i][j]);
      if (date_now.getFullYear() == year && (date_now.getMonth() + 1) == month && $(table[i][j]).html() == date_now.getDate()) {
        $(table[i][j]).addClass("today");
      }
    }
  }


  $(".calendar .day .fill").off("click");

  $(".calendar .day .fill").on("click", getTime);
  //标出当天
  //判断展示的年月是否和实际的年月相同


  // if(date_now.getFullYear()==year && (date_now.getMonth()+1)==month){
  //     console.log("相同")
  //     for(var i=0; i<6; i++){
  //         for(var j=0; j<7; j++){

  //         }
  //     }
  // }
  // console.log(table);
}
var date = new Date();
// console.log(date);
var nowYear = date.getFullYear();
// var 
var nowMonth = date.getMonth() + 1;
setYearMonth();

function setYearMonth() {
  $(".calendar").find(".year").html(nowYear);
  $(".calendar").find(".month").html(nowMonth);
}
// console.log(nowYear);
// console.log(nowMonth);


setCalendar(nowYear, nowMonth);

$(".switch_btn_calendar .up").click(function () {
  //上一个月
  nowMonth--;
  if (nowMonth < 1) {
    nowMonth = 12;
    nowYear--;
  }
  //2000年为基准年,不能求它小于日历
  setYearMonth();
  if (nowYear >= 2000) {
    setCalendar(nowYear, nowMonth);
  }
})
$(".switch_btn_calendar .down").click(function () {
  //上一个月
  nowMonth++;
  if (nowMonth > 12) {
    nowMonth = 1;
    nowYear++;
  }
  setYearMonth();
  //2000年为基准年,不能求它小于日历
  setCalendar(nowYear, nowMonth);

  // $(".calendar .day .flil").click(getTime)
})


//获取时间



function getTime() {
  // console.log(nowYear+"年"+nowMonth+"月"+$(this).html()+"日");
  $(".timeBox .time_display .yearNum").html(nowYear);
  $(".timeBox .time_display .monthNum").html(nowMonth);
  $(".timeBox .time_display .dayNum").html($(this).html());
  $(".calendar").fadeOut();
}





