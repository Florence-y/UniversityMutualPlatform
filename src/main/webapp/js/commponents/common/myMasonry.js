var colum_count;//当前容器宽度下能分的列数
var originPosition_x;
var itemWidth;//item的宽度加+间距
var totalNum;//容器中的总数
var columHeight;
//获取父容器的宽度
//获取子元素的宽度
//第一次加载、和父容器的宽度改变后要重新布局
//需要一个数组来记录当前列的高度
// gap是两个元素之间的距离
//这个是重新展示所有Item的
function loadAllItem(parentBox,itemWidth,gap){
    //计算列数
    var items = parentBox.children(".item");
    // console.log(items);
    totalNum = 0;//容器中的总数
    // itemWidth = $(items[0]).width()+gap*2;
    colum_count =  Math.floor(parentBox.width()/(itemWidth));
    columHeight = new Array(colum_count);
    columHeight.fill(0)
    originPosition_x = (parentBox.width()-colum_count*itemWidth)/2;
    if(items.length==0){ //没有元素就不展示了
        return;
    }
 
   //动态添加的方法就是先把新生成的元素添加到容器中
   //然后再使用isImgLoad(function(){
        // console.log("图片加载完")
    //     loadItem(items,itemWidth,gap);
    // },".item_containner .item img")

    // isImgLoad(function(){
        // console.log("图片加载完")
        // setTimeout(function(){
            loadItem(items,itemWidth,gap);
        // },300)

    // },".item_containner .item img")
}

function loadItem(itemArr,itemWidth,gap){
    //摆放传入的元素
    //如果是第一行就直接从左往右摆放，并且记录每一列加入元素后的高度
    //遍历数组添加元素
    //itemArr是一个字符串数组，是整个标签
    for(var i=0; i<itemArr.length; i++){
        var item = $(itemArr[i]);
        // parentBox.append(item);//添加到容器中
        item.show();
        item.css({
            "top" : Math.max.apply(null,columHeight)+"px"
        })
        //
       
        //定位元素
        if(totalNum<colum_count){
            item.animate({
                "left" : originPosition_x+gap+(itemWidth*totalNum)+"px",
                "top" : gap+"px"
            });
        //    setTimeout(()=>{
            columHeight[totalNum] = item.outerHeight() +gap;//记录高度
  
           
           
        }else{
            var minHeight = Math.min.apply(null,columHeight);//寻找最小高度
            var minHeight_colum = columHeight.indexOf(minHeight);//寻找下标
            // console.log(minHeight);
            item.animate({
                "left" : originPosition_x+gap+(itemWidth*minHeight_colum)+"px",
                "top" : columHeight[minHeight_colum]+gap+"px"
            });
            // setTimeout(()=>{
                columHeight[minHeight_colum] +=item.outerHeight()+gap;
            // },100)
        }
        
        totalNum++;
    }
}


//判断图片是否加载完
var t_img;
var isLoad = true;


//有图片才会判断，无图片的不作判断,callback是加载成功后的函数，img是类名
function isImgLoad(callback,img){
    $(img).each(function(){
        if(this.height===0){
            isLoad = false;
            return false;
        }
    });
    if(isLoad){
        clearTimeout(t_img);
        callback();
    }else{
        isLoad = true;
        t_img = setTimeout(function(){
            isImgLoad(callback);
        },100)
    }
}