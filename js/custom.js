(function($) {

    "use strict";

    // REMOVE # FROM URL
	$( 'a[href="#"]' ).click( function(e) {
		e.preventDefault();
	});	

	// STICKY NAV
	var stickyHeaderTop = $("#hero").height();
	//var stickyHeaderTop = $(window).height();
    $(window).scroll(function() {
        if ($(window).scrollTop() > stickyHeaderTop) {
            $(".sticky-nav").css({position: "fixed", top: "0px"});
            $(".sticky-nav").css("display", "block");
			$(".sticky-nav").addClass("fixednav");
        } else {
            $(".sticky-nav").css({position: "absolute", top: "0px"});
			$(".sticky-nav").removeClass("fixednav");
        }
	});
	
	// ONE PAGE NAV
	$("#nav").onePageNav({
		currentClass: 'current',
		changeHash: false,
		scrollSpeed: 750,
		scrollThreshold: 0.5,
		filter: '',
		easing: 'swing',
		begin: function() {
			//I get fired when the animation is starting
		},
		end: function() {
			//I get fired when the animation is ending
		},
		scrollChange: function($currentListItem) {
			//I get fired when you enter a section and I pass the list item of the section
		}
	});

	// COUNTER
	function count($this){
		var current = parseInt($this.html(), 10);
		$this.html(++current);
		if(current !== $this.data('count')){
			setTimeout(function(){count($this)}, 50);
		}
	}        
	$(".badges-counter").each(function() {
	  $(this).data('count', parseInt($(this).html(), 10));
	  $(this).html('0');
	  count($(this));
	});

	// Projects FILTERS
	var $grid = $('#projects-grid');
	$grid.shuffle({
		itemSelector: '.project-grid-item', // the selector for the items in the grid
		speed: 500 // Transition/animation speed (milliseconds)
	});
	/* reshuffle when user clicks a filter item */
	$('#projects-filter li a').click(function (e) {
		// set active class
		$('#projects-filter li a').removeClass('active');
		$(this).addClass('active');
		// get group name from clicked item
		var groupName = $(this).attr('data-group');
		// reshuffle grid
		$grid.shuffle('shuffle', groupName );
	});
	
	//MAGNIFIC POPUP
	$('#projects-grid').magnificPopup({
		delegate: 'a.zoom', 
		type: 'image',
		gallery: {
			enabled: true
		}
	});

	//AJAX CONTACT FORM
	$(".contact-form").submit(function() {
		var rd = this;
		var url = "sendemail.php"; // the script where you handle the form input.
		$.ajax({
		type: "POST",
		url: url,
		data: $(".contact-form").serialize(), // serializes the form's elements.
		success: function(data)
		{
		//alert("Mail sent!"); // show response from the php script.
		$(rd).prev().text(data.message).fadeIn().delay(3000).fadeOut();
		}
		});
		return false; // avoid to execute the actual submit of the form.
	}); 

	// GOOGLE MAP
	$(".map").height(400);
	function initialize($) {
		
		var contentString = '<h4>บริษัท มิกซ์ ซิสเต็มส์ จำกัด</h4><p>เลขที่ 1 ซอย อินทามระ 41 ดินแดง กรุงเทพมหานคร 10400</p>';
		var infowindow = new google.maps.InfoWindow({
        content : contentString
    });

		var mapOptions = {	
			zoom: 16,
			center: new google.maps.LatLng(13.7898301, 100.5665461),
			disableDefaultUI: true

		};

		var myLatlng = new google.maps.LatLng(13.789846, 100.566488);
        var map = new google.maps.Map(document.querySelector('.map'), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'บริษัท มิกซ์ ซิสเต็มส์ จำกัด'

});
         	google.maps.event.addListener(marker, 'click', function() {
        		infowindow.open(map, marker);
    		});

	}
	google.maps.event.addDomListener(window, 'load', initialize);
	


})

(window.jQuery);