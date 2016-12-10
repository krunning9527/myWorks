$(function(){


//wrap-banner的图片轮播效果
	var oBanner=$('.banner-links');
	var indexB=0;
	oBanner.eq(0).find('img').width($('html,body').width())
	oBanner.find('div').eq(0).css('display','block')
	oBanner.find('span').eq(0).css({'background':'#333','color':'white'})
	function dis(){
		if(indexB>=4){
				indexB=0;

			}
		if(indexB==3){
			oBanner.find('span').eq(0).css({'background':'#333','color':'white'});
				$(oBanner).find('span').eq(0).siblings('span').css({'background':'#fff','color':'#000'})
		}else{
			$(oBanner).find('span').eq(indexB+1).css({'background':'#333','color':'white'});
			$(oBanner).find('span').eq(indexB+1).siblings('span').css({'background':'#fff','color':'#000'})
		}
			
			$(oBanner).find('div').eq(indexB).animate({'opacity':1,'display':'block'},1500,function(){
				
			}).siblings('div').animate({'opacity':0,'display':'none'},500,function(){
				;
			});
			
				
	}
	var bannerTimer=setInterval(function(){
		dis()
		indexB++
	},3000)
	oBanner.find('span').hover(
		function(){
			clearInterval(bannerTimer);
			indexB=$(this).index()-1;
			dis()
		},
		function(){
			bannerTimer=setInterval(function(){
				dis();
				indexB++;
			},3000)
		}
	)
	
	
//wrap-introduce部分的公司logo翻动效果
	var $links=$('#intr-list li a');
	$($links).hover(function(){
		console.log(this)
		var str=$(this).find('img').attr('src').replace('.jpg','-.jpg');
		$(this).find('img').attr('src',str)
	},function(){
		var str=$(this).find('img').attr('src').replace('-.jpg','.jpg');
		$(this).find('img').attr('src',str)
		
	})
	
	var $h3=$('.intr-top-right >ul >li >h3');
	$($h3).mouseenter(
		function(){
			$(this).css({'color':'red','border-bottom-color':'red'})
			$(this).siblings().css('display','block');
			$(this).parent().siblings().find('div').css('display','none');
			$(this).parent().siblings().find('h3').css({'color':'black','border-bottom-color':'#ccc'})
		}
		)
	
	
//新品上市图片轮播   渐隐渐现
	var $lis=$('.intr-title')
//	console.log($lis)
	var $uls=$('.introduce .intro-btm>ul').find('ul')
	function imgChange(){
		
		$lis.eq(indexLi).css({'background':'url(../img/index/bg-3.png) no-repeat left 2px','line-height':'24px','color':'white'});
		$lis.eq(indexLi).siblings().animate({'opacity':1},1000).parent().siblings().find('ul').animate({'opacity':0},200)
		$lis.eq(indexLi).parent().siblings().find('a').css({'background':'none','line-height':'12px','color':'black'})
		indexLi++;
//		console.log(indexLi);
		if(indexLi>=5){
			indexLi=0
		}
	}
	$lis.hover(
		function(){
			clearInterval(timerLi);
			$(this).css({'background':'url(../img/index/bg-3.png) no-repeat left 2px','line-height':'24px','color':'white'});
			$(this).siblings().animate({'opacity':1},500).parent().siblings().find('ul').animate({'opacity':0},100)
			
			$(this).parent().siblings().find('a').css({'background':'none','line-height':'12px','color':'black'});
		},
		function(){

			indexLi=$(this).parent().index();
			timerLi=setInterval(function(){imgChange()},2000)
		}
	
	)

	
	$uls.hover(function(){

		clearInterval(timerLi);
		$(this).siblings().css({'background':'url(../img/index/bg-3.png) no-repeat left 2px','line-height':'24px','color':'white'});
		$(this).parent().siblings().find('a').css({'background':'none','line-height':'12px','color':'black'})
	},
		function(){

			
			indexLi=$(this).parent().index();
			
			timerLi=setInterval(function(){imgChange()},2000)
			
		}
	)
	
	var indexLi=0;
	timerLi=setInterval(function(){
		imgChange()
	},2000)
	
	
//#wrap-fold开关效果--------------------
$('.fold-no').click(function(){
	$('.fold').animate({
		'width':'100%',
		'height':70,
//		'display':'block'
		
	},500
	)
	$('.fold-no').animate({
		'width':0,
		'height':0
	},300)
	}
)
$('.link-unfold').click(function(){
	
			$('.fold').animate({
				'width':0,
				'height':0,
		//		'display':'block'
				
			},500
			)
	$('.fold-no').animate({
		'width':124,
		'height':40
	},300)
})


$('.search-fold .btn').click(function(){
	window.open('../html/goodList.html')
})

//wrap-slogo的下拉效果
$(window).scroll(
	
	function(){
		var sTop=$(document).scrollTop();
		var iTop=$('#wrap-banner').offset().top+$('#wrap-banner').outerHeight();
		if(sTop>=iTop){
			$('#wrap-sLogo').show();
		}else{
			$('#wrap-sLogo').hide()
		}
	}
)

$('.sLogo .btn').click(function(){
	window.open('../html/goodList.html')
})


//wrap-float浮动购物车的效果
$(window).height();


$('#wrap-float').css('top',$(window).height()/2-$('#wrap-float').height()/2);

$(window).resize(function(){
	
	$('#wrap-float').css('top',$(window).height()/2-$('#wrap-float').height()/2)
	
})
$('#wrap-float').hover(
	function(){
		$('#wrap-float').animate({'right':0},100)
	},
	function(){
		$('#wrap-float').animate({'right':-30},100)
	}
)


$('#wrap-float a').hover(
	function(){
		$(this).css('background-position-x',-78);
		
	},
	function(){
		$(this).css('background-position-x',0)
	}
)

$(window).scroll(function(){
	console.log($(document).scrollTop())
	console.log($('#wrap-introduce').offset().top)
	
	if($(document).scrollTop()>=$('#wrap-introduce').offset().top){
		$('#wrap-float').show();
	}else{
		$('#wrap-float').hide()
	}
})

$('#wrap-float .float-5').click(function(e){

	e.preventDefault()
	
	
	$('html body').animate({'scrollTop':0},1000,function(){console.log(1)})

	return false;
	
})


$('#wrap-float .float-1').click(function(){

	window.open('../html/cart.html')

	return false;
	
})

$('#wrap-float .float-2').click(function(){

	window.open('../html/work.html')

	return false;
	
})

$('#wrap-float .float-3').click(function(){

	window.open('../html/work.html')

	return false;
	
})

$('#wrap-float .float-4').click(function(){

	window.open('../html/work.html')

	return false;
	
})

})