$(function (){
	var money=9;
	var isSelect=false;
	var moneyInput=0;
	// 选择打赏金额
	$('.pay_money ul li').each(function (){
		$(this).children('span').off('click').on('click',function (){
			var val=parseFloat($(this).html());
			$('.pay_money ul li').each(function (){
				$(this).removeClass('active');
			});
			$(this).parent('li').addClass('active');
			$('.pay_other_money').removeClass('active');
			payMoney(val);
		});
	});
	// 是否选择支付金榕树自媒体商务服务
	var reg={tel:/^1\d{10}$/,yzm:/^\d{6}$/};
	$('.zmt_money').on('click',function (){
		if(isSelect){
			isSelect=false;
			$('.pay_center ul').hide();
			$(this).removeClass('active');
			money-=628.20;
			$('.pay_btn').html('支付'+money+'元');
		}else{
			isSelect=true;
			$('.pay_center ul').show();
			$(this).addClass('active');
			console.log(money)
			console.log(typeof(money))
			money+=628.20;
			console.log(money)
			$('.pay_btn').html('支付'+money+'元（已优惠69.80元）');
			$('.yzmright').on('click',function (){
				if($(this).hasClass('active'))return;
				var telval=$('.no36_ul li .pay_tel').val();
				if(!reg.tel.test(telval)){
					errorTip('请输入正确的手机号');
					return false;
				}
				var $this=$(this);
				$(this).addClass('active').html('30s后重新获取');
				var n=30;
				clearInterval(countTimer);
				var countTimer=setInterval(function (){
					n--;
					$this.html(n+'s后重新获取');
					$('.no36_ul li .pay_tel').attr('readonly',true);
					if(n==0){
						clearInterval(countTimer);
						$this.html('获取验证码').removeClass('active');
						$('.no36_ul li .pay_tel').attr('readonly',false);
					}
				},1000);
			});
		}
	});
	// 支付按钮
	$('.pay_btn').on('click',function (){
		if(isSelect){
			var userval=$('.pay_people').val();
			var telval=$('.pay_tel').val();
			var yzmval=$('.pay_yzm').val();
			if(userval==''){
				errorTip('请输入真实姓名！');
				return;
			}
			if(!reg.tel.test(telval)){
				errorTip('请输入11位正确的手机号码！');
				return;
			}
			if(!reg.yzm.test(yzmval)){
				errorTip('请输入正确的手机验证码！');
				return;
			}
		//核实验证码是否正确
		}
		alert('支付成功');
		
	});
	// 手动输入打赏金额输入框获得焦点
	$('.pay_moneyInput input').off('focus').on('focus',function (){
		moneyInput=parseFloat($(this).val());
		$('.pay_money ul li').each(function (){
			$(this).removeClass('active');
		});
		$('.pay_other_money').addClass('active');
		if(moneyInput){
			payMoney(moneyInput);
		}
	});
	
	// 手动输入打赏金额输入框输入状态
	$('.pay_moneyInput input').on('input',function (){
		moneyInput=parseFloat($(this).val());
		console.log(moneyInput)
		if(isSelect){
			if(moneyInput){
				money=628.20+moneyInput;
				$('.pay_btn').html('支付'+money+'元（已优惠69.80元）');
			}else{
				errorTip('输入的金额格式不正确');
				$('.pay_moneyInput input').val(' ');
				money-=moneyInput;
			}	
		}else{
			if(moneyInput){
				money=moneyInput;
				$('.pay_btn').html('支付'+money+'元');
			}else{
				errorTip('输入的金额格式不正确');
				$('.pay_moneyInput input').val(' ');
				money=9;
				$('.pay_no9').addClass('active');
			}
			
		}
	});
	// 输入框placeholder效果
	placeholder($('.pay_moneyInput'));
	function placeholder($obj){
		if( $obj.length<1 ) return;
        $obj.each(function (){
            var oInput=$(this).find('input');
            var oSpan=$(this).find('span');

            oInput.off('click').on('click',function(){
                oSpan.hide();
            });
            oSpan.off('click').on('click',function (){
                oSpan.hide();
                oInput.focus();
            });
            oInput.off('blur').on('blur',function (){
                if(!oInput.val()){
                    oSpan.show();
                }
                // 手动输入打赏金额输入框失去焦点
                var val=parseFloat($('.pay_no9 span').html());
				var iptMoney=parseFloat($(this).val());
				if(!iptMoney){
					$('.pay_no9').addClass('active');
					$('.pay_other_money').removeClass('active');
					payMoney(val);
					errorTip('您输入的金额不正确');
				}
            });

            if(oInput.val() != '') { //处理浏览器记录重叠bug
                oSpan.hide();
            }else{
                oSpan.show();
            }

        });
	}
	function payMoney(val){
		if(isSelect){
			money=628.20+val;
			$('.pay_btn').html('支付'+money+'元（已优惠69.80元）');
		}else{
			money=val;
			$('.pay_btn').html('支付'+money+'元');
		}
	}
	function errorTip(html){
		$('.pay_tips').html(html).fadeIn().css({'marginLeft':-$('.pay_tips').innerWidth()/2,'bottom':'55px'});
		clearTimeout(timer);
		var timer=setTimeout(function (){$('.pay_tips').fadeOut();},2000);
	}
})
