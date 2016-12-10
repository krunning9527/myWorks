$(function(){
//动态加载赋值
var str=location.search.replace('?','');

console.log(window.location.search)

var locS=str.indexOf('e')
var sIndex=0

if(locS==0){
	ourl='../data/goodList/listjson1.json';
	sIndex=str.replace('e','');
}else if(locS==1){
	ourl='../data/goodList/clothes-up.json';
	sIndex=str.replace('de','');
}else{
	ourl='../data/goodList/clothes-down.json';
	sIndex=str.replace('dde','');
}

var obj={}

$.ajax({
	
		type:'get',
		url:ourl,
		success:function(res){

				obj=res[sIndex];
				newHtml(res[sIndex]);
		},
		error:function(){
			alert('对不起！获取数据失败！')
		}
	
})

function newHtml(obj){
	$('.big-pic').find('img').attr('src',obj.img);//1
	$('.magic-pic').find('img').attr('src',obj.img);
	$('.small-pic').find('img').attr('src',obj.img);
	$('.body-title h3').eq(0).text(obj.title);//2
	$('.body-title .saying').text(obj.introduce);
	$('.body-title .number').text(obj.number);//3
	$('.body-title .oldPrice').text(obj.oldPrice);//4
	$('.body-title .newPrice').text(obj.newPrice);//5
	$('.body-title .monnum').text(obj.monNum);
	$('.body-title .grade').text(obj.score);
	$('.share-menu .collect').text(obj.collect);

}

//放大镜效果----------------------------
//$('.big-pic').mouseover(function(e){
//	var oLeft=e.offsetX;
//	var oTop=e.offsetY;//距离相对定位的副窗口的坐标
//	console.log(oLeft,oTop)
//	$(document).mousemove(function(e){
//		$('.big-pic span').css({'top':oTop,'left':oLeft});
//		return false;
//	})
//})

$(document).mousemove(function(e){
	var disX=e.pageX;
	var disY=e.pageY;
//	console.log(disY,e.pageY)
	var minX=$('.big-pic').offset().left;
	var maxX=$('.big-pic').offset().left+$('.big-pic').width();
	var minY=$('.big-pic').offset().top;
//	console.log($('.big-pic').offset().top)
	var maxY=$('.big-pic').offset().top+$('.big-pic').height();
	var box=$('.big-pic span')
	
	
//	console.log(e.clientY)
	if(disX>minX&&disX<maxX&&disY<maxY&&disY>minY){
//		console.log('进入')
		box.show();
		
		var oLeft=disX-minX;
		var oTop=disY-minY;
		box.css({'top':disY-minY-box.height()/2,'left':disX-minX-box.width()/2});
		if(oLeft<=50){
			box.css({'left':0});
		}
		if(oLeft>=$('.big-pic').width()-50){
			box.css('left',$('.big-pic').width()-100)
		}
		
		if(oTop<=50){
			box.css({'top':0});
		}
		if(oTop>=$('.big-pic').height()-50){
			box.css('top',$('.big-pic').height()-100)
		}
		$('.magic-pic').show()
		$('.magic-pic img').css({
			'top':-3.8*parseInt(box.css('top')),
			'left':-3.8*parseInt(box.css('left'))
			
		})
		
//		$('.magic-pic div img').parent()
		
	}else{
		box.hide();
		$('.magic-pic').hide()
	}
	
})





//立即购买，直接跳转入购物车


function goCar(){
	var sColor=$('#color b').text();
	var sSize=$('#size b').text();//1、判断尺码以及颜色是否以及选择
	console.log(Boolean(sColor),Boolean(sSize))
	if(Boolean(sColor)&&Boolean(sSize)){//选择通过，此时获取cookie
		var sData=[];
		var sObj={'id':obj.number,'img':obj.img,'title':obj.title,'oldPrice':obj.oldPrice,'newPrice':obj.newPrice,'color':sColor,'size':sSize,'num':parseInt($('#inNum').val()),'intro':obj.introduce,'href':window.location.search}
//	alert(sObj.href)
		var sCookie=$.cookie('detail')
		console.log(sCookie)
			if(sCookie==''||sCookie==undefined){

				sData.push(sObj);
				console.log(sData)
			}else{
				
				var aCookie=JSON.parse(sCookie);
				var arra=aCookie.data;
				var bar=true;
				$.each(arra, function() {
					if(this.id==obj.number&&this.size==sSize&&this.color==sColor){
						bar=false;
						this.num=parseInt(this.num)+parseInt($('#inNum').val());
					}
				});
				
				if(bar==false){
					sData=arra;
				}else{
					arra.push(sObj);
					sData=arra
				}
				
			}
		var newObj={'name':'detail','data':sData}
		
		console.log(newObj)
		
		$.cookie('detail',JSON.stringify(newObj),{expires:70,path:'/'})
		
		console.log($.cookie('detail'))
		
	}else{
		alert('您的商品信息不足！')
	}
	
	
	
}

$('#car').click(function(){
	goCar();
	if(confirm('确定进入购物车，取消继续浏览商品！')){
		window.open('cart.html')
	}
})

//加入购物车，询问客户要不要跳转入购物车
$('#buy').click(function(){
	
	goCar();
	
	alert('已经为您加入购物车，确定后进入购物车！')
	
	window.open('cart.html')
	
})


	
//分享链接、、、、、、、、、、、、、、、、、、、
	$('.share-menu>h3>span').hover(
		function(){
			$(this).siblings('ul').css('display','block');
		},
		function(){
			
			$(this).siblings('ul').css('display','none')
		}
	)
	$('.share-menu>h3>ul').hover(function(){
					$(this).css('display','block')
	},
	function(){
		$(this).css('display','none')
	}
	)


//o点击分享固定窗口出现----------------------
	$('.share-link').hover(
		function(){
			$(this).css('background','url(../img/goodDetail/sc.png) -42px -30px')
		},
		function(){
			$(this).css('background','url(../img/goodDetail/sc.png) 0 -30px')
		}
	)
//fixd的分享窗口时间
var fTop=document.documentElement.clientHeight/2-168;
var fLeft=document.documentElement.clientWidth/2-148

$('.main-body-top-left>ul').css({'top':fTop,'left':fLeft})



//fixed窗口关闭事件close的span
$('.close').click(function(){
	$('.main-body-top-left>ul').hide()
})


//share-link的o图标点击出现fixd的ul分享窗口事件
$('.share-link').click(function(){
	$('.main-body-top-left>ul').show()
	return false;
})
//加入尺码信息 url(../img/goodDetail/size.png) no-repeat
var $sizeLi=$('.body-size .size').find('li')
$sizeLi.click(function(){
//	console.log(12)
	$(this).addClass('selected').siblings().removeClass('selected')
	$(this).css('border','1px solid #c80a28').find('span').css({'background':'url(../img/goodDetail/size.png) no-repeat'});
	$(this).siblings('li').css({'border':'1px solid #ddd'}).find('span').css('background',0);
	$('.body-size p').eq(0).find('span').eq(0).text('您已选择');
	
	$('.body-size p').eq(0).find('span').eq(1).show();
	$('.body-size p').eq(0).find('span').eq(1).find('b').text($(this).text())
})


var $colorLi=$('.body-size .color').find('li')
$colorLi.click(function(){
	$(this).css('border','1px solid #c80a28').find('span').css({'background':'url(../img/goodDetail/size.png) no-repeat'});
	$(this).siblings('li').css({'border':'1px solid #ddd'}).find('span').css('background',0);
	$('.body-size p').eq(0).find('span').eq(0).text('您已选择');
	
	$('.body-size p').eq(0).find('span').eq(2).show();
	$('.body-size p').eq(0).find('span').eq(2).find('b').text($(this).text())
})

//增加产品加购物车数量事件
var $numLi=$('.body-size .num').find('li')

$numLi.eq(0).click(function(){
//	console.log($numLi.get(1))
	var val=parseInt($numLi.eq(1).find('input').get(0).value)
	if(val<=0){
		$numLi.eq(1).find('input').get(0).value=0
	}else{
		$numLi.eq(1).find('input').get(0).value=val-1
	}
	
})

$numLi.eq(2).click(function(){
	var val=parseInt($numLi.eq(1).find('input').get(0).value)
	if(val>=100){
		$numLi.eq(1).find('input').get(0).value=100
	}else{
		$numLi.eq(1).find('input').get(0).value=val+1
	}
})


//微信二维码事件
$('.payway .ewm-2').hover(
	function(){
		$(this).find('img').show()
	},
	function(){
		$(this).find('img').hide()
	}
	)


//描述、评价切换效果

$('.main-bod-btm-nav').find('li').click(function(){
	$(this).addClass('current').siblings().removeClass('current');
	var index=$(this).index();
	$('.main-bod-btm-con > div').eq(index).show().siblings().hide()
	return false;
})





})