$(function(){
	
//点击切换手机与邮箱注册事件
$('.body-register .reg-one input').click(function(){
	$(this).css({'color':'white','background':'url(../img/register/NEWS_login.png) no-repeat 0 -102px'})
	$(this).siblings('input').css({'color':'#565656','background':'url(../img/register/NEWS_login.png) no-repeat 0 -151px'});
	var index=$(this).index()-2
	$(this).siblings('div').find('p').eq(index).css('display','block').siblings().css('display','none')
	$('.reg-two ul').eq(index).css('display','block').siblings('ul').css('display','none')
})


//验证码
$.idcode.setCode();


//先验证注册格式是否正确


	var bPhone=false;
	var bPwd=false;
	var bPwd2=false;
	var bRam=false;
	


					//邮箱格式的判断
$('.regi-email .phone input').change(function(){
		
		sEmail=$('.regi-email .phone input').val();
		var reg =/^\w+@\w+\.com$/;
	//	var reg = /^\w+@\w+(.)\w+/; 
		if(reg.test(sEmail)){
					$('.regi-email .phone b').text('')
		console.log('ok')
		$('<img>').attr('src','../img/register/keyizhuce.gif').css({
			'position':'absolute',
			'top':'6px',
			'left':'-150px'
			}).appendTo($('.regi-email .phone b'));
			bPhone=true;
		}else{
			$('.regi-email .phone b').text('*请使用正确的邮箱格式！');
			 bPhone=false;
	
		}
})
				//密码格式的判断
$('.regi-email .passward input').change(function(){
	sPwd=$('.regi-email .passward input').val();
		var reg =/^.{6,16}$/;
	console.log(sPwd)
		if(reg.test(sPwd)){
//		console.log('ok')
			$('.regi-email .passward b').text('')
		$('<img>').attr('src','../img/register/keyizhuce.gif').css({
			'position':'absolute',
			'top':'6px',
			'left':'-150px'
			}).appendTo($('.regi-email .passward b'));
			bPwd=true;
		}else{
			$('.regi-email .passward b').text('*密码格式错误！');
			 bPwd=false;
	
		}
})

			//验证重复密码是否yizhi
$('.regi-email .pass2 input').change(function(){
//	var sPwd=$('.regi-email .passward input').val();
	sPwd2=$('.regi-email .pass2 input').val();

		if(sPwd2==sPwd){
			$('.regi-email .pass2 b').text('')
			$('<img>').attr('src','../img/register/keyizhuce.gif').css({
			'position':'absolute',
			'top':'6px',
			'left':'-150px'
			}).appendTo($('.regi-email .pass2 b'));
			bPwd2=true
		}else{
			$('.regi-email .pass2 b').text('*前后密码不一致！');
			 bPwd2=false;

		}
})

		//验证码的检验
$('.regi-email .random input').change(function(){

	sRam=$('.regi-email .random input').val();
	var sRandom=''
	sRandom += $('#ehong-code').children().text();
	

		if(sRam==sRandom){
			$('.regi-email .random b').text('')
			$('<img>').attr('src','../img/register/keyizhuce.gif').css({
			'position':'absolute',
			'top':'6px',
			'left':'-150px'
			}).appendTo($('.regi-email .random b'));
			bRam=true
		}else{
			$('.regi-email .random b').text('*验证码错误！');
			bRam=false;
		}
})
var bIdo=false;
$('.regi-email .iDo input').click(function(){
//	console.log(1)
//		console.log($(this).prop('checked'))
		if($(this).prop('checked')){
			bIdo=true;
		}else{
			bIdo=false;
		}
})
//注册账号开始----------------------------------
$('#register').click(function(){
	
	if(bPhone==true&&bPwd==true&&bPwd2==true&&bRam==true&&bIdo==true){
//		console.log('jix')
		var newObj={'name':sEmail,'psd':sPwd};
		var aCookie=[];
		var sCookie=$.cookie('user');
		if(sCookie==''||sCookie==undefined){
			aCookie=[newObj];
			var newCookie=JSON.stringify(aCookie);
						$.cookie('user',newCookie,{expires:70,path:'/'})
						if(confirm('注册成功，点击确定去登录！')){
							window.open('login.html','_self')
						}
		}else{
				aCookie=JSON.parse(sCookie)
				var bar=false//默认可以注册
				console.log(bar,'1')
				$.each(aCookie, function() {
					if(this.name==newObj.name){
						bar=true;
					}
				});
					if(bar==false){
						console.log(bar,'2')
						aCookie.push(newObj);
						var newCookie=JSON.stringify(aCookie);
						$.cookie('user',newCookie,{expires:70,path:'/'})
						if(confirm('注册成功，点击确定去登录！')){
							window.open('login.html','_self')
						}
					}else{
		
						alert('该账号已经被注册，请重新注册！')
					}
			
		}
		
		
	}else{
		alert('sorry,您的账号输入有误，请再来！')
	}
	
})
})