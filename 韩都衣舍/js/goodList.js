$(function(){
//开始读取json文件---------------------------------------------------------------------
	$.ajax({
		type:'get',
		url:'../data/goodList/listjson1.json',
		success:function(res){
			goods(res,'e')
		},
		error:function(){
			alert('对不起！获取数据失败！')
		}
	})
	
	function goods(res,type){
//		console.log('ok')
		console.log(res)
		var len=res.length;
		for (var i=0;i<len;i++) {
			var $div=$('<div>').appendTo('.goods');
			
			$('<p>').addClass('picture').html(
				"<a class=big-pic href=goodDetail.html?"+type+ i+"><img src="+res[i].img+"></a><a class=small-pic href=goodDetail.html?"+type+ i+"><img src="+res[i].img+"></a>"
			).appendTo($div);
			$('<p>').addClass('price').html(
				"<span class=newPrice>&#65509;<b>"+res[i].newPrice+"</b></span><del class=oldPrice>&#65509;"+res[i].oldPrice+"</del>"
			).appendTo($div);
			$('<p>').addClass('title').html(
				"<a href=#>"+res[i].title+"</a>"
			).appendTo($div);
			$('<ul>').addClass('title').html(
				"<li><span class=monnum>"+res[i].monNum+"</span><br><span>月销量</span></li><li><span class=connum>"+res[i].conNum+"</span><br><span>累计评价</span></li>"
			).appendTo($div);
		}
		
		$('.goods>div').hover(
	
	function(){
		console.log(1)
		$(this).css({'border':'2px solid #c80a28','padding':'7px 7px 0','margin-bottom':'-19px'});
		$(this).find('.title').css('height',36)
	},
	function(){
		$(this).css({'border':'1px solid #ddd','padding':'8px 8px 0','margin-bottom':0});
		$(this).find('.title').css('height',18)
	}
)
		
	}
	
	
//产品列表div边长跳动事件

	
//点击三角事件
	$('.parent-h3').click(function(){
		console.log(2)
		if($(this).siblings('ul').css('display')=='none'){
			console.log(3)
			$(this).find('span').css({
				'border-bottom': '4px solid transparent',
				'border-left': '4px solid transparent',
				'border-right': '4px solid transparent',
				'border-top': '4px solid black'
			})
			$(this).siblings('ul').css('display','block')
		}else{
			$(this).find('span').css({
				'border-bottom': '4px solid transparent',
				'border-top': '4px solid transparent',
				'border-right': '4px solid transparent',
				'border-left': '4px solid black'
			})
			$(this).siblings('ul').css('display','none')
		}
		
	})
	
	$('.son-h3').click(function(){
		if($(this).siblings('ul').css('display')=='none'){
			$(this).siblings('ul').css('display','block');
			$(this).css('background','url(../img/goodList/minus.png) no-repeat 1px center')
		}else{
			$(this).siblings('ul').css('display','none');
			$(this).css('background','url(../img/goodList/plus.png) no-repeat 1px center')
		}
	})
	
	//goodrank点击滑动事件效果
	$('.good-rank').find('li').hover(
		function(e){
			e.preventDefault()
//			$(this).css({'background':'#fafafa'});
			var posx=parseInt($(this).find('span').css('background-position-x'));
			console.log(posx)
			$(this).find('span').css('background-position-x',posx-8)
			console.log()
		},
		function(e){
			e.preventDefault()
			var posx=parseInt($(this).find('span').css('background-position-x'));
			$(this).find('span').css('background-position-x',posx+8)
		}
	)
	
		$('.good-rank').find('li').click(function(e){
			e.preventDefault()
			$(this).css({'background':'#fafafa'}).siblings().css('background','white');
//			var posx=parseInt($(this).find('span').css('background-position-x'));
			if($(this).index()==1){
				$(this).find('span').css('background-position-x',-17);
				$('.good-rank').find('li').eq(3).find('span').css('background-position-x',-1)
				
				$('.good-rank').find('li').eq(2).find('span').css('background-position-x',-17)
			}else if($(this).index()==2){
				$(this).find('span').css('background-position-x',-33)
				$(this).siblings().find('span').css('background-position-x',-1)
			}else if($(this).index()==3){
				$(this).find('span').css('background-position-x',-17);
				$('.good-rank').find('li').eq(1).find('span').css('background-position-x',-1)
				
				$('.good-rank').find('li').eq(2).find('span').css('background-position-x',-17)
			}
			
		})


//女装----上装子类目链接点击加载事件
$('#clothes-up').find('a').click(
	
	function(){
		console.log('me')

		
		$('.goods').html(' ')
		$.ajax({
		type:'get',
		url:'../data/goodList/clothes-up.json',
		success:function(res){
			goods(res,'de')
		},
		error:function(){
			alert('对不起！获取数据失败！')
		}
	})
		
			return false;
	}
	
)


//女装----下装子类目链接点击加载事件

$('#clothes-down').find('a').click(
	
	function(){
		console.log('me')

		
		$('.goods').html(' ')
		$.ajax({
		type:'get',
		url:'../data/goodList/clothes-down.json',
		success:function(res){
			goods(res,'dde')
		},
		error:function(){
			alert('对不起！获取数据失败！')
		}
	})
		
			return false;
	}
	
)

//女装----每日新品子类目链接点击加载事件
$('#every').find('a').click(
	
	function(){
		console.log('me')

		
		$('.goods').html(' ')
		$.ajax({
		type:'get',
		url:'../data/goodList/listjson1.json',
		success:function(res){
			goods(res)
		},
		error:function(){
			alert('对不起！获取数据失败！')
		}
	})
		
			return false;
	}
	
)

})
