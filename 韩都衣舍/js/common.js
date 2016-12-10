$(function(){
//引入公用的head部分----------------------------------
	$('#wrap-head').load('common/head.html',function(){
		var aCookie=($.cookie('login'));
		if(aCookie==''||aCookie==undefined){
			console.log('友情提示：没有登录！')
		}else{
			console.log(aCookie)
			var nCookie=JSON.parse(aCookie)
			console.log(nCookie)
			if(nCookie.type==true){
				console.log(nCookie.name)
				$('.head .head-right .load a').eq(0).text(nCookie.name);
				$('.load').hover(
					function(){
						$('.load .delete').show();
					},
					function(){
						$('.load .delete').hide();
					}
				)
				
				
				$('.load .delete').click(function(){
					var obj={};
					obj.type=false;
					$.cookie('login',JSON.stringify(obj),{expires:1 , path:"/"});
					if(confirm('恭喜！退出成功，点击确定可以进入登录页面！')){
						window.open('../html/login.html')
					}
					return false;
					
				})
				
//				$('.load .delete').hover(
//					function(){
//						$('.load .delete').show();
//					},
//					function(){
//						$('.load .delete').hide();
//					}
//				)
			}
//收藏网页的效果函数			
		$('.collect-head').click(
			function(){
				alert('您可以尝试通过Ctrl+d收藏网页！')
				return false
			}
			
		)
			
		
		}
//点击购物车链接的时候，判断是否登录，如果没有登录那么，询问客户要不要进入登录页面		
//		$('.head .head-right .car a').click(function(){
//			var aCookie=($.cookie('login'));
//			console.log(aCookie)
//			if(aCookie==''||aCookie==undefined){
////				alert('您还未登录，请登录账号！')
//				if(confirm('没有登录 账号，点击确定，可以跳入登录页面！')){
//					window.open('../html/login.html');
//					
//				}else{
//					return false;
//				}
//			}else {
//				var nCookie=JSON.parse(aCookie)
//				if(nCookie.type==false){
//					if(confirm('没有登录 账号，点击确定，可以跳入登录页面！')){
//					window.open('../html/login.html');
//					
//				}else{
//					return false
//				}
//				}
//			}
////			return false;
//		})
				
		
	});
	
	
	
//引入公用的search部分---------------------------------------
	$('#wrap-search').load('common/search.html',function(e){
		
		$('.gotoList').click(function(e){
			alert('进入衣服列表页啦！')
			window.open('goodList.html')
			return false;
		})
		
		
	})
	
	
	
//引入公用的nav部分-----------------------------------------
	$('#wrap-nav').load('common/nav.html',function(){
		

		
		$('.nav-menu li').hover(
			function(){
				$(this).find('ul').css('display','block')
			},
			
			function(){
				$(this).find('ul').css('display','none')
			}
			
		)
		
		
		$('#menu-toggle>div').hover(
			function(){
					$(this).addClass('nav-index-focus');
					var str='../img/common/tb0'+($(this).index()+1)+'.png';
					$(this).find('img').attr('src',str);
					$(this).find('h4').animate({'padding-left':8},200);
					$('#menu-toggle ul').eq($(this).index()).show()
			},
			function(){
					$(this).removeClass('nav-index-focus');
					var str='../img/common/tb'+($(this).index()+1)+'.png';
					$(this).find('img').attr('src',str);
					$(this).find('h4').animate({'padding-left':0},200);
					$('#menu-toggle ul').eq($(this).index()).hide()
			}
		)
		
		$('#menu-toggle ul').hover(
			function(){
				$(this).show()
			},
			function(){
				$(this).hide()
			}
		)
		
		$('.nav-index').hover(
			function(){
				$('#menu-toggle').css('display','block')
			},
			function(){
				$('#menu-toggle').css('display','none')
			}
			
		)
		
	})


//引入公用的links部分---------------------------------------
	$('#wrap-links').load('common/links.html',function(){
				//产品列表，时尚女装，热销排行榜，滑动效果
					var ranks=$('.pro-top-list .rank')
					$(ranks).mouseenter(
						function(){
							$(this).find('h3').css('display','none');
							$(this).siblings().find('h3').css('display','block');
							$(this).find('ul').css('display','block');
							$(this).siblings().find('ul').css('display','none')
							
						}
					)
				
					$('.product-btm').each(
						function(){
							$(this).height($(this).find('ul').outerHeight())
						}
					)
	
	
	})

//引入公用的footer部分-----------------------------------------
	$('#wrap-footer').load('common/footer.html',function(){
		
					
				//#wrap-footer  最底部链接滚动效果
				var iLeft=0
				$('.footer-2 .links-ul ul li').each(function(){
					
					iLeft+=$(this).outerWidth();
					iLeft+=parseInt($(this).css('margin-right'))
					
				})
				$('.footer-2 .links-ul ul').width(iLeft)
				$('.footer-2 .links-ul ul').get(0).innerHTML+=$('.footer-2 .links-ul ul').get(0).innerHTML;
				$('.footer-2 .links-ul ul').width(iLeft*2)
				
				var indexL=0
				function leftMove(){
					clearInterval(footerTimer);
					indexL--;
					$('.footer-2 .links-ul ul').css('left',indexL);
					
							if(indexL<-iLeft){
										indexL=0
									}
					footerTimer=setInterval(leftMove,100);
				}
				var footerTimer=setInterval(leftMove,100)
				
				
				$('.footer-2 .links-ul ul li').hover(function(){
					nIleft=iLeft;
					clearInterval(footerTimer);
				},
				function(){
					iLeft=nIleft;
					footerTimer=setInterval(leftMove,100)
					}
				)
		
	})
})
