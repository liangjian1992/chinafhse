+ function($) {
	//导航样式切换
	$('.common-nav ul').on('click', function(e) {

		if(e.target.tagName.toLowerCase() === 'a') {
			$(this).children().each(function(index, item) {
				$(item).removeClass('active');
			});
			$(e.target.parentNode).addClass('active');
		}
	});
	//在线客服功能
	$('.online .enter').on('click', function() {
		$('.online .panel').addClass('fade');
	});
	$('.online .close').on('click', function() {
		$('.online .panel').removeClass('fade');
	})

	
}(jQuery)