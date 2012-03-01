(function ($) {
    $.fn.tooltip = function(options){
		var defaults = {
			title : '',
			zIndex: '3500',
			offset : {left:0, top:0},
            arrowPosition : 'bottom-left',
			arrowPosLeft: '42px',
            arrowPosRight: '42px',
            arrowPosTop: 0,
            arrowPosBottom: '-48px',
			arrowClass : '.tip-arrow',
            tipClass : '.tooltip',
			trigger: 'hover-click', // hover, hover-click, click, click-hover ,hover-risk
			tipCloseClass: '.tipClose',
			width: 'auto',
			btnClose: false,
			fxCallBack: false,
			onTipShow : false,
			onTipHide : false,
            tipHTML : ''
		};
		var opts = $.extend(defaults, options);
        var tip = $('<div class="tooltip"></div>');
        if ( $('.tooltip').length == 0 ){
            $('body').append(tip);
        }
		return this.each(function() {
            var _this  = $(this);
            var tipPlaceHolder = $(opts.tipClass);
			bindEvents( tipPlaceHolder, _this , opts );
			if( $.isFunction(opts.fxCallBack) ){
				opts.fxCallBack.call( $(this) );
			}
		});
    };
	//tooltip trigger
	var bindEvents = function(tp, tr, opt){
		if(opt.trigger == 'hover-risk-profile'){
           tr.bind({
                'mouseover':function(e) {
                    showTooltip( tp, tr, opt );
					$('div.risk').addClass('active');
                },
				'mouseleave':function(e) {
					tp.hide();
					$('div.risk').removeClass('active');
                }
            });
        }else if(opt.trigger == 'hover'){
           tr.bind({
                'mouseover':function(e) {
                    showTooltip( tp, tr, opt );
                },
				'mouseleave':function(e) {
					tp.hide();
                }
            });
        }else if( opt.trigger == 'hover-click'){
            tr.bind({
                'mouseover':function(e) {
                    showTooltip( tp, tr, opt );
                }
            });
            tp.bind({
                'mouseleave':function(e) {
                    hideAllTooltip();
                }
            });
        }else if( opt.trigger == 'click'){
            return;
        }else if( opt.trigger == 'click-hover'){
            return;
        }
	};
	//show tooltip
	var showTooltip = function(tp, tr, opt){
        hideAllTooltip();
        $(opt.tipHTML).show();
        tp.html( $(opt.tipHTML) );
		if ( $.isFunction(opt.onTipShow) ){
			opt.onTipShow.call(opt, tp);
			arrowPosition(tp, opt);				// Assign Tooltip arrow
			tipPosition( tp, tr, opt );			// Assign Tooltip Position
			tp.stop(true, true).delay(200).fadeIn();
			return tp;
		}else{
			arrowPosition(tp, opt);				// Assign Tooltip arrow
			tipPosition( tp, tr, opt );			// Assign Tooltip Position
			tp.stop(true, true).delay(200).fadeIn();
		}
	};
    //hide tooltip
    var hideAllTooltip = function(){
        $('.tooltip').hide();
    }
	//setting up the css property for positioning the arrow of tooltip
	var arrowPosition = function(tp, opt){
        var arr = tp.find(opt.arrowClass);
        if( opt.arrowPosition == 'bottom-left' ){
            arr.css({'left':opt.arrowPosLeft, 'bottom':opt.arrowPosBottom});
        }
        if( opt.arrowPosition == 'bottom-right' ){
            arr.css({'right':opt.arrowPosRight, 'bottom':opt.arrowPosBottom});
        }
        if( opt.arrowPosition == 'bottom' ){
            arr.css({'left':opt.arrowPosLeft, 'bottom':opt.arrowPosBottom});
        }
        if( opt.arrowPosition == 'top-left' ){
            arr.css({'left':opt.arrowPosLeft, 'top':opt.arrowPosTop});
        }
        if( opt.arrowPosition == 'top-right' ){
            arr.css({'left':opt.arrowPosLeft, 'top':opt.arrowPosTop});
        }
        if( opt.arrowPosition == 'top' ){
            var left = tp.width()/2 - arr.width()/2 + 10;
            arr.css({'left':left, 'top':opt.arrowPosTop});
        }
        
	};
	//tooltip positioning 
	var tipPosition = function(tp, tr, opt){
		var yPos = tr.offset().top;
		var xPos = tr.offset().left;
        
		// apply Position
		yPos = ( opt.arrowPosition=='bottom-right' || opt.arrowPosition=='bottom-left' ) ? yPos -30 : yPos;	
		
		xPos = ( opt.arrowPosition=='bottom-left' ) ? xPos - 28 : xPos;
		xPos = ( opt.arrowPosition=='bottom-left' ) ? xPos + (tr.width()/2) : xPos;
		
		xPos = ( opt.arrowPosition=='bottom-right' ) ? xPos - tp.width() : xPos;
		xPos = ( opt.arrowPosition=='bottom-right' ) ? xPos + (tr.width()/2): xPos;
		
		xPos = ( opt.arrowPosition=='top' ) ? xPos + (tr.width()/2 - tp.width()/2): xPos;
        yPos = ( opt.arrowPosition=='top' ) ? yPos + tr.height() : yPos;
		
		// custom offset
		if( opt.offset!='' ){
			yPos = yPos + opt.offset.top;
			xPos = xPos + opt.offset.left;
		}
		tp.css({top:yPos, left:xPos});
	};	
})(jQuery);