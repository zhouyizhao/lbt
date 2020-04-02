function Carousel () {
    var $slider = $('<div class="slider" id="slider"></div>'),
        $span = $('<span id="left" >&lt;</span><span id="right">&gt;</span>'),
        $ul = $('<ul class="nav" id="navs"></ul>'),
        $img ,$li;
    
    //默认配置：容器，轮播图个数，轮播图片地址，轮播速度（时间）
    var defineData = {
        boxName:"#box",
        carNum:5,
        imgUrl:["img/b1.png","img/b2.png","img/b3.png","img/b4.png","img/b5.png"],
        speed:2000
    };

    this.show = function(Data){
        $.extend(defineData,Data);
        var imgstr = '',listr = '';
        for(let i = 0;i<defineData.carNum+2;i++){
            if(i == 0){
                imgstr += '<div class="slide"><img src="'+defineData.imgUrl[defineData.carNum-1]+'" alt=""></div>';
            }else if(i == defineData.carNum+1){
                imgstr += '<div class="slide"><img src="'+defineData.imgUrl[0]+'" alt=""></div>';
            }else {
                imgstr += '<div class="slide"><img src="'+defineData.imgUrl[i-1]+'" alt=""></div>';
                listr +='<li id="'+i+'">'+i+'</li>';
            }
        }
        $img = $(imgstr);
        $li = $(listr);
        // console.log(imgstr);
        // console.log(listr);
        var $box = $(defineData.boxName);
        $slider.append($img);
        $ul.append($li);
        $box.append($slider);
        $box.append($span);
        $box.append($ul);
    
        var $left = $('#left'),
            $right = $('#right'),
            $liList = $('li'),
            timer = null,
            dotnum = 0,
            speed = defineData.speed,
            speeds = defineData.speed/2000;
        
        $liList[dotnum].className = "active";
        // console.log($slider[0].style);
        // console.log(typeof $slider[0].style.transition);
        
        //左右滑动
        function toLeft(){
            if(dotnum === 0){
                dotnum = defineData.carNum-1;
                $slider[0].style.transition ="left "+speeds+"s";
                $slider[0].style.left = "0px";
                setTimeout(function(){
                    $slider[0].style.transition ="left 0s";
                    $slider[0].style.left = (dotnum+1) * -1200+"px";
                },speed/2);
            }
            else{
                dotnum--; 
                $slider[0].style.transition ="left "+speeds+"s";
                $slider[0].style.left = (dotnum+1) * -1200+"px";
            }
            showDot (); 
        }
        function toRight(){
            if(dotnum === defineData.carNum-1){
                dotnum = 0;
                $slider[0].style.transition ="left "+speeds+"s";
                $slider[0].style.left = (defineData.carNum+1) * -1200+"px";
                setTimeout(function(){
                    $slider[0].style.transition ="left 0s";
                    $slider[0].style.left = (dotnum+1) * -1200+"px";
                },speed/2);
            }
            else{
                dotnum++;
                $slider[0].style.transition ="left "+speeds+"s";
                $slider[0].style.left = (dotnum+1) * -1200+"px";
            }
            showDot ();
        }
        //左右滑动 防抖
        function debounce(fun){
            let detimer;
            return function(){
                clearTimeout(detimer);
                detimer = setTimeout(()=>{
                    fun.call(this);
                },speed/2)
            }
        }
        // 自动播放
        function toPlay () {
            timer = setInterval(function () {
                toRight();
            },speed);
        }
        toPlay();
        // 左右箭头 点击
        $left.click(debounce(toLeft));
        $right.click(debounce(toRight));
        // 小圆点 样式
        function showDot () {
            for(var i = 0; i < $liList.length; i++){
                $liList[i].className = "";
            }
            $liList[dotnum].className = "active";
        }
        //小圆点 点击事件      
        function dotClick(){
            let num = this.id;
            // console.log(this.id);
            // console.log(this.id * -1200);
            clearInterval(timer);
            dotnum = num - 1;
            $slider[0].style.left=num * -1200+"px";
            showDot ();
        }
        $liList.click(debounce(dotClick));
        // 鼠标移入移出
        $box[0].onmouseenter = function () {
            clearInterval(timer);
            $span[0].style.opacity = 0.5;
            $span[1].style.opacity = 0.5;
        }
        $box[0].onmouseleave = function () {
            toPlay();
            $span[0].style.opacity = 0;
            $span[1].style.opacity = 0;
        }
    }
}
