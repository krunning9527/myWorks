$(function(){
	
	 $.idcode.setCode();
	
	

	$('.P-login button').click(function(){
		var sRandom=''
			sRandom += $('#ehong-code').children().text();
		var sName=$('.user input').val();
		var sPsw=$('.psw input').val();
		var sIcd=$('.icode input').val();
		if(sName!=''&&sPsw!=''){
			if(sIcd==sRandom){

				var sCookie=$.cookie('user');
				if(sCookie==''||sCookie==undefined){
					var obj = {type:false};
					if(confirm('sorry，账号未注册!点击确定,进入注册页！')){
						window.open('register.html','_self')
					}
				}else{
					var aCookie=JSON.parse(sCookie);
					var bar=false;
					$.each(aCookie, function() {
						if(this.name==sName&&this.psd){

							bar=true;
						}
					});
					if(bar){
							var obj = {type:true,name:sName}
							$.cookie('login',JSON.stringify(obj),{expires:1 , path:"/"});
							console.log($.cookie('login'))
									if(confirm('登录成功，点击确定，进入主页！')){
										window.open('index.html','_blank')
									}
								
							
//						alert('恭喜！登录成功，点击确定进入网站主页！')
					}else{
						var obj = {type:false};
						if(confirm('sorry，账号未注册!点击确定,进入注册页！')){
						window.open('register.html','_self')
						}
					}
				}
				$.cookie('login',JSON.stringify(obj),{expires:1 , path:"/"});
						
				console.log( $.cookie('login'));
				
//				var nCookie=JSON.parse($.cookie('login'))
				
				
				
			}else{
				
				alert('验证码有误！')
			}
		}else{

			alert('您的账号或密码有误，请重新输入！')
		}

		return false
	})
	
})