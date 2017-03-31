$(document).on('turbolinks:load', function() {

//This function will get called only on event page
  if (!($(".event-page").length > 0)) {
    return;
  }


	$popUp = $('.popup');
	$memberPop = $('.member--popup');

	$subcategoryColor = $popUp.first().attr("data-color");


	$.notify.addStyle('custom', {
	  html: "<div><span data-notify-text/></div>",
	  classes: {
	    message: {
	      "color": $subcategoryColor,
	    }
	  }
	});

	$($popUp).hover(
	  function() {
	  	var title = $(this).attr( "data-title" );
	    $(this).notify(title, {
	    	className:'message',
  			clickToHide: false,
  			autoHide: false,
	  	  elementPosition: 'top center',
	  	  style: 'custom',
	    })
	  }, function() {
	    $('.notifyjs-wrapper').trigger('notify-hide');
	  }
	);

	$( $memberPop ).hover(function() {

	  	var title = $(this).attr( "data-title" );
	    $(this).notify(title, {
	    	className:'message',
				clickToHide: true,
				autoHide: false,
	  	  elementPosition: 'top right',
	  	  style: 'custom',
    	})
		}, function() {
	    $('.notifyjs-wrapper').trigger('notify-hide');
	  }
	);


	// $($memberPop).click(
	//   function() {
	//   	console.log("clicked");
	//   	var title = $(this).attr( "data-title" );
	//     $(this).notify(title, {
	//     	className:'message',
 //  			clickToHide: true,
 //  			autoHide: false,
	//   	  elementPosition: 'top right',
	//   	  style: 'custom',
	//     })
	//   }, function() {
	//     // $('.notifyjs-wrapper').trigger('notify-hide');
	//   }
	// );

});