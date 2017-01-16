'use strict';
$(function(){

	// 轮播图
	function resize(){
		// 获取屏幕宽度
		var WindowWidth = $(window).width();
		// 判断屏幕属于大还是小
		var isSmallScreen = WindowWidth < 768;
		// 根据大小为界面上的轮播图设置背景
		$("#main_ad > .carousel-inner > .item").each(function(i, item) {		//i第几次遍历 item遍历的名字
			var $item = $(item);	//因为拿到的是dom对象 需要转换成jQuery对象
			var imgSrc = $item.data(isSmallScreen ? 'image-xs' : 'image-lg');
			// 设置背景图片
			$item.css('backgroundImage','url("'+imgSrc+'")');
			// 因为需要小图时可以等比例缩放 所以小图使用img方式
			if(isSmallScreen){
				$item.html('<img src="'+imgSrc+'" alt="" />')
			}else{
				$(item).empty();
			}
		});		
	}
	$(window).on('resize',resize).trigger('resize');
	// 轮播图结束

	// 控制标签页的标签宽度（tab选项卡横向滚动条）
	var $ulContainer = $(".nav-tabs");
	// 获取所有子元素的宽度和
	var width = 30;	//因为ul前面有一个padding-left:20px所以最后一个li元素会掉下来，所以width初始化宽度要比20大所以是30px
	// 遍历子元素
	$ulContainer.children().each(function(index,element){
		// console.log(element.clientWidth);
		width += element.clientWidth; //此时Width是所有li的和
	});
	// 判断当前ul是否超出屏幕宽度，如果超出就显示横向滚动条
	if(width > $(window).width())
		// 设置UL的宽为li之和
		$ulContainer.css('width',width)
		.parent().css('overflow-x','scroll');	//ul添加横向滚动条
	// 横向滚动条结束

	// 新闻列表中给蓝色a注册点击事件
	var $newTitle = $('.news-title');
	$("#news .nav-pills a").on('click',function(){
		// 获取当前点击的元素
		var $this = $(this);
		// 获取对应的titile值
		var title = $this.data('title');
		// 将title设置到相应的位置
		$newTitle.text(title);
	});
	// 注册点击事件结束

	//左右滑动控制轮播图	
	//1.先获取手指在轮播图上的一个滑动方向（左右）	
	//比较大小
	//1-1.获取轮播图容器
	var $carousels = $('.carousel');
	var startX, endX;
	var offset = 50;
	//2.注册滑动事件
	$carousels.on('touchstart',function(e){//点击的坐标都在e里面，所以要传参
		//手指触摸开始时记录手指所在x坐标
		startX = e.originalEvent.touches[0].clientX;
	});
	$carousels.on('touchmove',function(e){
		//变量重复赋值
		endX = e.originalEvent.touches[0].clientX;
	});
	$carousels.on('touchend',function(e){
		//结束触摸一瞬间记录手指所在x坐标
		//控制精度 获取每次运动的距离，当大于一定值时认为有方向变化
		var distance = Math.abs(endX - startX);
		if(distance > offset){
			//有方向变换
			//2.根据获得到的方向来选择上一张或下一张
			$(this).carousel(startX > endX ? 'next' : 'prev');
		}
	});
	// 互动控制轮播图结束
	// 
	// 小屏幕时点击导航中一个菜单 汉堡菜单自动折叠隐藏
	$('.navbar-collapse a').click(function(){
		$('.navbar-collapse').collapse('hide');
	});


});