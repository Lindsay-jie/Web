window.addEventListener('load', function () {
    // 1.鼠标经过轮播图模块，左右按钮显示，离开隐藏左右按钮   
    var btnLeft = document.querySelector('.left');
    var btnRight = document.querySelector('.right');
    var wrap = document.querySelector('.wrap');
    // 2.鼠标不经过轮播图也会自动播放图片,鼠标经过就停止自动播放
    // 自动播放的功能类似于右侧按钮
    // 设置一个定时器
    var timer = null;
    //鼠标经过显示
    wrap.addEventListener('mouseenter', function () {
        btnLeft.style.display = 'block';
        btnRight.style.display = 'block';
        clearInterval(timer);
        // 清除定时器变量
        timer = null;
    });
    //鼠标离开隐藏
    wrap.addEventListener('mouseleave', function () {
        btnLeft.style.display = 'none';
        btnRight.style.display = 'none';
        timer = setInterval(function () {
            // 手动调用点击事件
            btnRight.click();
        }, 2000);
    });

    // 2.动态生成小圆圈，跟图片的张数一样
    var ul = document.querySelector('.circle');
    var imgList = document.querySelector('.img-list');
    // console.log(imgs.length);
    var num = 0;//当前图片的下标
    for (var i = 0; i < imgList.children.length; i++) {
        var li = document.createElement('li');
        // 记录当前小圆圈的属性
        li.setAttribute('index', i);
        ul.appendChild(li);
        //点击了当前的小圆圈就显示颜色，否则不显示
        li.addEventListener('click', function () {
            //干掉所有人
            for (var i = 0; i < ul.children.length; i++) {
                ul.children[i].className = '';
            }
            //留下自己
            this.className = 'active';

            // 3.点击小圆圈图片滚动，实际上滚动的是装图片的盒子
            // 核心算法：小圆圈的索引号*图片的宽度就是盒子移动的距离
            var index = this.getAttribute('index');
            num = index;
            // console.log(index);

            var target = index * imgList.offsetWidth;
            animate(imgList, -target);
        })
    }
    ul.children[0].className = 'active';
    // 克隆第一张图片
    var firstImg = imgList.children[0].cloneNode(true);
    // 这里有一个问题，如果使用Imgs数组，那最后一个Img就获取不到，因为获取元素的代码在上面
    // 因此修改上面的代码，直接使用imgList
    imgList.appendChild(firstImg);
    // 4.点击右侧按钮一次，图片往左播放一张

    var flag = true;
    // 这里使用节流阀，防止按钮过快，图片滑动过快
    // 只有当上一个函数动画内容执行完毕，才会去执行下一个动画函数，让事件无法连续触发
    // 核心思路：利用回调函数，添加一个变量来控制，锁住函数和解锁函数
    btnRight.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == imgList.children.length - 1) {
                imgList.style.left = 0;
                num = 0;
            }
            num++;
            // console.log(num);
            // console.log(lastLeft);
            // console.log(num);
            //num = num % imgs.length;
            var step = num * imgList.offsetWidth;
            animate(imgList, -step,function(){
                flag = true;
            });
            //同时小圆圈也要变
            //干掉所有人
            for (var i = 0; i < ul.children.length; i++) {
                ul.children[i].className = '';
            }
            // 留下自己
            // 如果是最后一张新加的图片，那么视觉上第一个小圆圈要变亮
            if (num == imgList.children.length - 1) {
                ul.children[0].className = 'active';
            } else {
                ul.children[num].className = 'active';
            }
            // 这里有Bug,点击小圆圈之后再去点击按钮没有按照预想的来，因为num值没有和Index值联系起来
            // 所以在获取了index值之后，num值也是一样的
        }

    })
    // 5.同理设置左边按钮
    btnLeft.addEventListener('click', function () {
        if(flag){
            flag = false;
            if (num == 0) {
                num = imgList.children.length - 1;
                // 先来到（重复的第一张）
                // 下面num--之后就是最后一张（index=4）,调用之后移动的步长就是index=4的盒子移动的距离
                imgList.style.left = -num * imgList.offsetWidth + 'px';
            }
            num--;
            // console.log(num);
            //num = num % imgs.length;
            var step = num * imgList.offsetWidth;
            animate(imgList, -step,function(){
                flag = true;
            });
            //同时小圆圈也要变
            //干掉所有人
            for (var i = 0; i < ul.children.length; i++) {
                ul.children[i].className = '';
            }
            // 留下自己
            // 如果是最后一张新加的图片，那么视觉上第一个小圆圈要变亮
            if (num == imgList.children.length - 1) {
                ul.children[0].className = 'active';
            } else {
                ul.children[num].className = 'active';
            }
        }

    })

    // 6.鼠标经过，轮播图模块自动播放停止，也就是清除定时器，在上面有过鼠标经过事件的设置，在上面代码中
})



