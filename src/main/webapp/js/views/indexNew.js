window.onload = function(e) {

    //#region 设置轮播图的父元素高度

    $(".rotationChartY .rc-picturesY").css("height", window.innerHeight + 'px');
    $(".rotationChartY .rc-picturesY>li").css("height", window.innerHeight + 'px');

    //#endregion

    //#region 设置 功能介绍部分的高度

    $(".functionPartY .fp-pictureY>li").css("height", window.innerHeight + 'px');

    //#endregion

    //#region 设置 页脚前part

    $(".beforeFooter").css("height", window.innerHeight - 60 + 'px');

    //#endregion

    //#region 导航栏的更多 是否出现

    if ($(document).scrollTop() > 80) {
        $('.showNavY .navmore').slideDown(200);
    } else {
        $('.showNavY .navmore').slideUp(200);
    }

    //#endregion    

    //#region 轮播图

    $('.rc-picturesY li').eq(0).animate({
        'left': '0',
        'transition': 'left 5s ease-in',
    });

    $('.rc-picturesY li').eq(0).css({
        'z-index': '11',
    });

    $('.rc-picturesY li').eq(1).css({
        'z-index': '10',
        'left': '-100%',
        'transition': 'none',
    });

    $('.rc-picturesY li').eq(2).css({
        'z-index': '10',
        'left': '0',
        'transition': 'none',
    });

    //#endregion

}

$(function() {

    //#region  body

    $('body').on({

    })

    //#endregion

    //#region 悬停导航栏更多 出现导航栏 + 导航栏

    $('.showNavY').on({
        mouseover: function() {
            $('.indexNavY').stop().animate({
                top: $(document).scrollTop(),
            }, 500);

            $('.indexNavY').on({
                mouseleave: function() {
                    // console.log('out');
                    $('.indexNavY').stop().animate({
                        top: 0,
                    }, 500);
                }
            })
        },
    })

    $('.schoolA ').on({
        click: function() {
            $("body, html").stop().animate({
                scrollTop: $('.inschoolNewsY').offset().top + 'px',
            }, 1500);
        }
    })

    //#endregion

    //#region 页面卷去事件

    $(window).scroll(function(e) {

        //#region 导航栏的更多 出现/不出现
        // console.log($('.rotationChartY').offset().top + $('.rotationChartY').outerHeight(true));
        if ($(document).scrollTop() > 80) {
            $('.showNavY .navmore').slideDown(400);

        } else {
            $('.showNavY .navmore').slideUp(400);
        }
        //#endregion
    })

    //#endregion

    //#region 滚轮事件 

    var index = parseInt($(document).scrollTop() / window.innerHeight);
    // let part = document.querySelectorAll(".fp-pictureY>li");
    console.log(part);
    window.addEventListener("wheel", function(e) {
        let evt = e || window.event;
        evt.preventDefault();
       
        if (evt.deltaY > 0 || evt.wheelDelta > 0) {
            if (index >= 4) {
                // console.log($('body').outerHeight(true) / window.innerHeight);
                index = 4;
            } else {
                index++;
            }
            // console.info("向下滚动");

        } else if (evt.deltaY < 0 || evt.wheelDelta < 0) {
            if (index <= 0) {
                index = 0;
            } else {
                index--;
            }
            // console.info("向上滚动");
        }
        // console.log(index);
        $('body, html').stop().animate({
            scrollTop: window.innerHeight * index + 'px',
        }, 500)




        // console.log(evt,index);

        // console.info(index, evt.type, evt.deltaX, evt.deltaY, evt.deltaZ);
    }, { passive: false });

    //#endregion

    //#region 轮播图 左右拖动

    var rcindex = 0;
    var rcleftindex = 1;
    var rcrightindex = 2;

    var rcnext = function() {
        rcnextp();
        var temp = rcindex;
        rcindex = rcleftindex;
        rcleftindex = rcrightindex;
        rcrightindex = temp;
        rcnextp();
    }

    var rcback = function() {
        rcbackp();
        var temp = rcindex;
        rcindex = rcrightindex;
        rcrightindex = rcleftindex;
        rcleftindex = temp;

        rcbackp();
    }


    var rcnextp = function() {

        $('.rc-picturesY li').eq(rcindex).animate({
            'left': '0',
            'transition': 'left 5s ease-in',
        });

        $('.rc-picturesY li').eq(rcindex).css({
            'z-index': '11',
        });

        $('.rc-picturesY li').eq(rcleftindex).css({
            'z-index': '10',
            'left': '-100%',
            'transition': 'none',
        });

        $('.rc-picturesY li').eq(rcrightindex).css({
            'z-index': '10',
            'left': '0',
            'transition': 'none',
        });

    }


    var rcbackp = function() {
        $('.rc-picturesY li').eq(rcindex).animate({
            'left': '0',
            'transition': 'right 5s ease-in',
        });

        $('.rc-picturesY li').eq(rcindex).css({
            'z-index': '11',
        });

        $('.rc-picturesY li').eq(rcleftindex).css({
            'left': '0',
            'z-index': '10',
            'transition': 'none',
        });

        $('.rc-picturesY li').eq(rcrightindex).css({
            'z-index': '10',
            'left': '100%',
            'transition': 'none',
        });
    }

    var time = 0;
    var rctimer;
    rctimer = setInterval(function() {
        time++;
        if (time == 50) {
            time = 0;
            rcnext();
        }
    }, 100)


    $('.rc-back').on({
        click: function() {
            // clearInterval(rctimer);
            time = 0;
            rcback();
        }
    });

    $('.rc-next').on({
        click: function() {
            // clearInterval(rctimer);
            time = 0;
            rcnext();
        }
    })

    $('.rotationChartY').on({
        mouseenter: function() {
            $('.rc-back').show(500);
            $('.rc-next').show(500);
            clearInterval(rctimer);
            time = 0;
        },
        mouseover: function() {
            $('.rc-back').show(500);
            $('.rc-next').show(500);
            clearInterval(rctimer);
            time = 0;
        },
        mouseleave: function() {
            clearInterval(rctimer);
            rctimer = setInterval(function() {
                time++;
                if (time == 50) {
                    time = 0;
                    rcnext();
                }
            }, 100)
            $('.rc-back').hide(500);
            $('.rc-next').hide(500);
        },

    })

    //#endregion

    //#region 功能介绍部分 进入页面出现动画效果

    //#region 校区互通

    $('.campusInterworkY').on({
        mouseenter: function() {

        },
        mouseover: function() {

        },
        mouseleave: function() {

        }
    })

    //#endregion

    //#region 失物招领

    $('.lostFoundY').on({
        mouseenter: function() {
            $('.inlaf').css({
                opacity: 1,
                bottom: 0
            });
            $('.lf-img').css({
                opacity: 1,
                bottom: 0
            });
            $('.lf-h2').css({
                opacity: 1,
                top: 0,
            });
            $('.lf-p').css({
                opacity: 1,
                top: 0
            })
            $(window).scroll(function() {
                $('.inlaf').css({
                    opacity: 0,
                    bottom: '-20%'
                });
                $('.lf-img').css({
                    opacity: 0,
                    bottom: '-20%'
                });
                $('.lf-h2').css({
                    opacity: 0,
                    top: '-20%',
                });
                $('.lf-p').css({
                    opacity: 0,
                    top: '-20%'
                })
            })
        },
        mouseover: function() {
            $('.inlaf').css({
                opacity: 1,
                bottom: 0
            });
            $('.lf-img').css({
                opacity: 1,
                bottom: 0
            });
            $('.lf-h2').css({
                opacity: 1,
                top: 0,
            });
            $('.lf-p').css({
                opacity: 1,
                top: 0
            })
            $(window).scroll(function() {
                $('.inlaf').css({
                    opacity: 0,
                    bottom: '-20%'
                });
                $('.lf-img').css({
                    opacity: 0,
                    bottom: '-20%'
                });
                $('.lf-h2').css({
                    opacity: 0,
                    top: '-20%',
                });
                $('.lf-p').css({
                    opacity: 0,
                    top: '-20%'
                })
            })
        },

    })

    //#endregion

    //#region 校内通知

    $('.inschoolNewsY').on({
        mouseenter: function() {
            $('.deansOffice').css('top', 0);
            $('.youthLeagueCommittee').css('bottom', 0);
            $('.studentAffairsOffice').css('top', 0);
            $('.other').css('bottom', 0);
            $(window).scroll(function() {
                $('.deansOffice').css('top', '-150%');
                $('.youthLeagueCommittee').css('bottom', '-150%');
                $('.studentAffairsOffice').css('top', '-150%');
                $('.other').css('bottom', '-150%');
            })
        },
        mouseover: function() {
            $('.deansOffice').css('top', 0);
            $('.youthLeagueCommittee').css('bottom', 0);
            $('.studentAffairsOffice').css('top', 0);
            $('.other').css('bottom', 0);
            $(window).scroll(function() {
                $('.deansOffice').css('top', '-150%');
                $('.youthLeagueCommittee').css('bottom', '-150%');
                $('.studentAffairsOffice').css('top', '-150%');
                $('.other').css('bottom', '-150%');
            })
        },
    })

    //#endregion

    //#region 页脚前面

    $('.beforeFooter').on({
        mouseenter: function() {
            $('.footerImg').animate({
                'left': 0,
            }, 500);
            $('.footerDl').animate({
                'right': 0
            }, 500);
        },
        mouseover: function() {
            $('.footerImg').animate({
                'left': 0,
            }, 500);
            $('.footerDl').animate({
                'right': 0
            }, 500);

        },
    })

    //#endregion

    //#endregion

    //#region 学校新闻 √

    //#region 点击换一批 新闻页面 换一批


    $(".changeTheBatchNews").on({

        click: function() {

            var indexCur = parseInt($(this).siblings("ul").find(".displayNewsDiv").attr("data-part"));
            console.log(indexCur);
            console.log(indexCur <= $(this).siblings("ul").find(".NewsDiv").length);
            if (indexCur < $(this).siblings("ul").find(".NewsDiv").length - 1) {
                indexCur++;
                $(this).siblings("ul").find(".NewsDiv").eq(indexCur).addClass("displayNewsDiv");
                $(this).siblings("ul").find(".NewsDiv").eq(indexCur).siblings().removeClass("displayNewsDiv");
            } else {

                indexCur = 0;
                $(this).siblings("ul").find(".NewsDiv").eq(0).addClass("displayNewsDiv");
                $(this).siblings("ul").find(".NewsDiv").eq(0).siblings().removeClass("displayNewsDiv");
            }
        }
    })

    //#endregion

    //#region 添加title
    var Anews = document.querySelector(".schoolNews").querySelectorAll("a");
    var sourceNews = document.querySelector(".schoolNews").querySelectorAll("i");
    for (var i = 0; i < Anews.length; i++) {
        Anews[i].title = Anews[i].innerText;
    }
    for (var i = 0; i < sourceNews.length; i++) {
        sourceNews[i].title = sourceNews[i].innerText;
    }

    //#endregion

    //#endregion

    //#region 页脚 

    //#region 二级导航

    $('.wechat').on({
        mouseenter: function() {
            $('.ewm').stop().show(200);
        },
        mouseover: function() {
            $('.ewm').stop().show(200);
        },
        mouseleave: function() {
            $('.ewm').stop().hide(200);
        },
    })

    //#endregion

    //#endregion

})