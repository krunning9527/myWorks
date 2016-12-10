$(function() {
	
//




//点击韩都衣舍logo进入网站首页,

$('.gotoIndex').click(function(){
	window.open('index.html')
})



//从cookie种获取购物车商品,,读取页面的时候便检查是否登录状态-
var sCookie=$.cookie('detail');
var countNum=0;
var countPrice=0;
var lCookie=$.cookie('login');
console.log($.cookie('login'));
//console.log($.cookie('isLogin'))
if(lCookie==undefined||lCookie==''||JSON.parse(lCookie).type==false){
	alert('您的账号未登录！无法进入购物车，跳入登录！');
		window.open('login.html','_self')
	

	
}else{

	
				if(sCookie==undefined||sCookie==''){
						$('<h1>').text('您的购物车没有任何产品！');
					}else{

						var aCookie=JSON.parse(sCookie)

					var data=aCookie.data;
					$.each(data, function() {
						countNum+=parseInt(this.num);
						
						console.log(countNum)
				
						sHref="../html/goodDetail.html"+this.href;
				
						var $Li=$('<li>');
						var infoDiv=$('<div>').addClass('info');
						var infoStr='<a href='+sHref+'><img src='+this.img+'></a><div><p><a href='+sHref+'>'+this.title+'</a></p><p>'+
						'<span>颜色：</span><span class=color>'+this.color+'</span><span>尺码：</span><span class=size>'+this.size+
						'</span></p></div>';
						$(infoDiv).html(infoStr).appendTo($Li);
						
						var priceDiv=$('<div>').addClass('price');
						var priceStr='<del>￥'+this.oldPrice+'</del><br><span>￥'+this.newPrice+'</span>';
						$(priceDiv).html(priceStr).appendTo($Li);
						
						
						var numDiv=$('<div>').addClass('num');
						var numStr='<span class=minus>-</span><input type=text value='+this.num+'><span class=plus>+</span>';
						$(numDiv).html(numStr).appendTo($Li);
						
						
						$('<div>').addClass('unit').html('￥'+parseInt(this.newPrice)*parseInt(this.num)).appendTo($Li)
						
						var handleStr='<span>移入收藏夹</span><br><span class=delete>删除</span>'
						$('<div>').addClass('handle').html(handleStr).appendTo($Li);
						
					
						var intrDiv=$('<div>').addClass('intro');
						var intrStr='<a href=#><span>'+this.intro+'</span></a>';
						$(intrDiv).html(intrStr).appendTo($Li)
				
						
						$($Li).appendTo('.goodList ul')
					});
				}
	
	
	
}



//删除购物车的商品-------------------------------
	$('.delete').click(function() {

			
			console.log($(this).closest('li').index())
			console.log(aCookie.data)
			
			var index=$(this).closest('li').index()
			
			$.each(aCookie.data, function() {
				
			});
			
			var sData=aCookie.data.splice(index,1)
			
			var newObj={'name':'detail','data':aCookie.data}
		
//			console.log(newObj)
			
			$.cookie('detail',JSON.stringify(newObj),{expires:70,path:'/'})
			
			$(this).closest('li').remove();
		})
//设置小计价格和-------与小计数量和-----------------------------------------
var countCash=0;

$.each($('.unit'), function() {
	countCash+=parseInt($(this).text().replace('￥',''));
});



$('.count-num b').text(countNum)
$('.count-price').text('￥'+countCash)
$('.countCash').text('￥'+countCash)
///---------------------------------------
//动态计算价格与数量---------------------------

function newCount(){
//	$('.count-num b').text($(this).val());
	var newCountNum=0;
	var newCountCash=0;
	var currentSprice=0;
	
	$.each($('.goodList li .num input'), function() {
		console.log($(this).val())
		newCountNum+=parseInt($(this).val());
		var nSprice=$(this).parent().siblings('.price').find('span').text();
		var nUnit=$(this).parent().siblings('.unit').text()

		nSprice=nSprice.replace('￥','');

		currentSprice=parseInt(nSprice);
		newCountCash+=parseInt($(this).val())*currentSprice;
		
	});

	$(this).parent().siblings('.unit').text(parseInt($(this).parent().find('input').val())*parseInt($(this).parent().siblings('.price').find('span').text().replace('￥','')))
	$('.count-num b').text(newCountNum)
	$('.count-price').text('￥'+newCountCash)
	$('.countCash').text('￥'+newCountCash)
	
}



$('.goodList li .num input').change(newCount);



//数量增加减少事件----------------------------------
	$('.minus').click(function() {
		var num = parseInt($(this).siblings('input').val())
		if(num <= 0) {
			$(this).siblings('input').val(0)
		} else {
			$(this).siblings('input').val(num - 1)
		}
		
		var unitP=$(this).parent().siblings('.price').find('span').text().replace('￥','')
		
		console.log(unitP)
		
		$(this).parent().siblings('.unit').text(parseInt($(this).siblings('input').val()*parseInt(unitP)))
		
		newCount()
	})

	$('.plus').click(function() {
		var num = parseInt($(this).siblings('input').val())
		if(num >= 100) {
			$(this).siblings('input').val(100)
		} else {
			$(this).siblings('input').val(num + 1)
		}
		
		var unitP=$(this).parent().siblings('.price').find('span').text().replace('￥','')
		
		console.log(unitP)
		
		$(this).parent().siblings('.unit').text(parseInt($(this).siblings('input').val()*parseInt(unitP)))
		
		newCount()
	})


//$('.price span')
//设置收藏产品列表的宽度-----------------------------------

	$.each($('.cart-commend .goodShow ul'), function() {
		var ulWidth = 0;
		$.each($(this).find('li'), function() {
			ulWidth += $(this).width();
			ulWidth += parseInt($(this).css('margin-right'))
		});

		$(this).width(ulWidth)
	});


//最近浏览过的商品与收藏的商品信息,以及相关列表ul的切换隐藏------------------------
	var $span = $('.cart-commend .tite p span')
	$span.click(function() {
		$(this).css({
			'color': '#8a8a8a',
			'background': 'white'
		}).siblings().css({
			'color': 'white',
			'background': '#8a8a8a'
		})
		var index = $(this).index();
		$('.goodShow ul').css('left', 0)
		$('.goodShow ul').eq(index).show().siblings('ul').hide();

	})

//左右箭头，切换下一页----------------------------------------

	$('.pageUp').click( function(){

		var maxLeft = 0;
		$.each($('.goodShow ul'), function() {
			var attrP = $(this).css('display')
			if(attrP == 'block') {
				maxLeft = $(this).width();
			}

		});

		var c = parseInt(maxLeft / 1120)

		var ulLeft = parseInt($('.goodShow ul').css('left'));

		if(ulLeft <= -1120 * c) {
			$('.goodShow ul').css('left', -1120 * c)
		} else {
			ulLeft -= 1120
			$('.goodShow ul').animate({
				'left': ulLeft
			}, 500)
		}

	})

	$('.pageDown').click(function() {
		var ulLeft = parseInt($('.goodShow ul').css('left'));

		if(ulLeft >= 0) {
			$('.goodShow ul').css('left', 0)
		} else {
			ulLeft += 1120;
			$('.goodShow ul').animate({
				'left': ulLeft
			}, 500)
		}

	})

//	结算点击事件-------------------------------------

	var $btn = $('.cart-goods .button').find('a');
	$btn.eq(0).hover(function() {
			$(this).css('background', 'url(../img/carts/cart_img.png) no-repeat -152px -747px')
		},
		function() {
			$(this).css('background', 'url(../img/carts/cart_img.png) no-repeat -16px -747px')
		}
	)

	$btn.eq(1).hover(function() {
			$(this).css('background', 'url(../img/carts/cart_img.png) no-repeat -188px -361px')
				//	return false;
		},
		function() {
			$(this).css('background', 'url(../img/carts/cart_img.png) no-repeat -16px -361px')

		}
	)

})