$(window).ready(function() {
    var h=$(window).height();
    $('#magazine').height(h);
	$('#magazine').turn({
		display: 'single',
		acceleration: true,
		gradients: !$.isTouch,
		elevation:100,
		when: {
			turned: function(e, page) {
				/*console.log('Current view: ', $(this).turn('view'));*/
			}
		}
	});
	$(document.body).on('swipeleft',function (){
		$('#magazine').turn('next');
	});
	$(document.body).on('swiperight',function (){
		$('#magazine').turn('previous');
	});
    $(window).on('click', function(e){
        $('#magazine').turn('next');
    });
});
