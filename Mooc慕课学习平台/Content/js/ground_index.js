//个人主页名片 
    $.fn.card = function(){
	var tthis = $(this);
	var card = $('#card');
	var s = 300;	//显示速度
	var timer = timer1 = '';
	var range = 7;	//偏移距离
	var delay = 300;//延迟时间
	function start(){
		tthis.each(function(){
			var th = $(this);
			th.hover(function(){
				var th_t = th.offset().top;
				var th_l = th.offset().left;
				var th_w = th.outerWidth();
				var th_h = th.outerHeight();
				var card_t = th_t + th_h / 8;
				var card_l = th_l + th_w - 5;
				$(this).addClass('is_hover');
				
 				
				//alert(1)
				clearTimeout(timer);
				timer = setTimeout(function(){
					card.css({'top':card_t,'left':card_l});
					if(card.is(':hidden')){
						card.css({'display':'block'}).fadeTo(0,0);
						card.stop().animate({'left':card_l + range,'opacity':'1'},s);
						setW();
					}else{
						card.css({'left':card_l + range});
					}
				},delay);
			},function(){
				$(this).removeClass('is_hover');
				clearTimeout(timer);
				clearTimeout(timer1);
				timer1 = setTimeout(function(){
					if(!is_w_hover()){
						if (!card.hasClass('is_hover') && card.is(':visible')) {
							card.stop().animate({'left':card.offset().left-range,'opacity':'0'},s).hide(0);
						};
					}
				},delay);
			});
		})
	}
	//设置下拉框宽度
	function setW(){
		$('.card .select_block_eject').each(function(){
		  var th = $(this);
		  var par = th.parent();
		  th.width(par.width()-2);
		})
	}
	//判断选择器是否被划过ction is_w_hover(){
		var is = 0;
		tthis.each(function(){
			if($(this).hasClass('is_hover')){
				is += 1;
			}
		})
		return is>0 ? true : false;
	}
	card.hover(function(){
		$(this).addClass('is_hover');
		//alert(2)
	},function(){
		$(this).removeClass('is_hover');
		clearTimeout(timer1);
		timer1 = setTimeout(function(){
			if(!is_w_hover()){
				card.stop().animate({'left':card.offset().left-range,'opacity':'0'},s).hide(0);
			}
		},delay);
	})
	$(window).resize(function(){
		start();
	}).trigger('resize');
}
