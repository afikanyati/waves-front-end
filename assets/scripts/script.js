$(document).ready(function() {

	// DECLARING VARIABLES

	var navigationHeight = (window.innerHeight - 250);
	var shifterLeft = (window.innerWidth * 0.655 - 27.5);
	var $body = $('body, html');	// USING A CACHED COPY IS MORE EFFICIENT IN PROCESSING AND MEMORY.
	var icons = ["#loc-world-icon", "#loc-us-icon"];
	var viewHeadings = $(".partition-heading");
	$(".navigation > ul").css({"height": navigationHeight});
	$(".partition-shifter").css({"left": shifterLeft});
	$(".comment-block").css({"width": $(".comments-container").width() - 1});
	$(".comment-writing").css({"width": $(".comment").width() - 80});
	$(".disagree").css({"left": $(".comments-container").width() * 0.2 - 10 });
	$(".partition-heading").each(function() {
		$(this).css({"left": ($(this).parent().width() * 0.5) - ($(this).outerWidth() * 0.5)});
	});
	var commentDivWidth, commentWritingWidth, disagreeXShift;

// =========================================================================

	// FUNCTIONSTO DISABLE SCROLLING OF WINDOW

	function disableScrolling(){
	    var x=window.scrollX;
	    var y=window.scrollY;
	    window.onscroll= function() {window.scrollTo(x, y);};
	}

	function enableScrolling(){
	    window.onscroll= function(){};
	}

// =========================================================================

	// ANIMATES HAMBURGER ICON
	$(".c-hamburger").click(function (event) {
		event.preventDefault();
		$(this).hasClass("is-active") ? $(this).removeClass("is-active") : $(this).addClass("is-active");
		$('label[for="nav-trigger"]').trigger('click');
		if ($('input[id="nav-trigger"]').is(":checked")) {
			$("#site-overlay").css({"background": "rgba(0,0,0, 0.8)", "z-index": 6});
			$(".nav-username").addClass("open");
			disableScrolling();
		} else {
			$("#site-overlay").css({"background": "rgba(0,0,0, 0)", "z-index": 3});
			$(".nav-username").removeClass("open");
			enableScrolling();
		}
	});

// =========================================================================

	// ENSURES NAVIGATION BAR IS RESIZED WHEN WINDOW IS RESIZED

	function resize() {
		$(window).resize(function() {
			$(".navigation > ul").css({"height": (window.innerHeight - 250)});
			if($('input[id="shifter"]').is(":checked")) {
				$(".partition-shifter").css({"left": (window.innerWidth * 0.335 - 27.5)});
				commentDivWidth = $("#view").width() * 0.63;
				$(".comment-block").css({"width": commentDivWidth});
				commentWritingWidth = $("#view").width() * 0.504 - 120; // 0.63 * 0.8 = 0.504
				$(".comment-writing").css({"width": commentWritingWidth});
				disagreeXShift = $("#view").width() * 0.126 - 10; // 0.63 * 0.2 = 0.126
				$(".disagree").css({"left": disagreeXShift });
			} else {
				$(".partition-shifter").css({"left": (window.innerWidth * 0.655 - 27.5)});
				commentDivWidth = $("#view").width() * 0.31;
				$(".comment-block").css({"width": commentDivWidth});
				commentWritingWidth = $("#view").width() * 0.248 - 120;	// 0.31 * 0.8 = 0.248
				$(".comment-writing").css({"width": commentWritingWidth});
				disagreeXShift = $("#view").width() * 0.062 - 10; // 0.31 * 0.2 = 0.062
				$(".disagree").css({"left": disagreeXShift });
			}
			$(".partition-heading").each(function() {
				$(this).css({"left": ($(this).parent().width() * 0.5) - ($(this).outerWidth() * 0.5)});
			});
		});
	}

	resize();

// =========================================================================

	// SMOOTH SCROLL
	function clicklogo() {
		$('.scroll-top-block a, #scroll-top-block-footer a').click(function (event) {
				event.preventDefault();	// PREVENTS ANCHOR FROM GOING TO LINK
				var target = this.hash;	// FETCHES ASSOCIATED HASH ID
				var $target = $(target);	// MAKES IT A JQUERY OBJECT

				$body.stop().animate({ scrollTop : $target.offset().top }, 900, 'swing');	// SCROLLS TO POSITION
				return false;
			});
	}

	clicklogo();

// =========================================================================

	// HEADER ON SCROLL CHANGE

	$(window).scroll(function() {
		var distanceY = window.pageYOffset || document.documentElement.scrollTop,
			shrinkOn = 100;

		if (distanceY > shrinkOn) {
			$("#header, #header-writing, #logo, #location-bar, #loc-world-icon, #loc-us-icon, #loc-world-image, #loc-us-image, .location-a, #header-comment, #info-comment").addClass("smaller");
			$("#logo-image").css({"height": "37px", "width": "50px"});
			$("#loc-world-image, #loc-us-image").css({"height": "17.5px", "width": "17.5px", "top": "8.75px"});
		} else {
			$("#header, #header-writing, #logo, #location-bar, #loc-world-icon, #loc-us-icon, #loc-world-image, #loc-us-image, .location-a, #loc-world-image, #loc-us-image, #header-comment, #info-comment").removeClass("smaller");
			$("#logo-image").css({"height": "59px", "width": "80px"});
			$("#loc-world-image, #loc-us-image").css({"height": "30px", "width": "30px", "top": "15px"});
			
		}
	});

// =========================================================================

	// PREVENTS WINDOW FROM SCROLLING ONCE YOU REACH BOTTOM OF A SCROLLABLE ELEMENT

	$('.scrollable').on('DOMMouseScroll mousewheel', function(ev) {
	    var $this = $(this),
	        scrollTop = this.scrollTop,
	        scrollHeight = this.scrollHeight,
	        height = $this.height(),
	        delta = (ev.type == 'DOMMouseScroll' ?
	            ev.originalEvent.detail * -40 :
	            ev.originalEvent.wheelDelta),
	        up = delta > 0;

	    var prevent = function() {
	        ev.stopPropagation();
	        ev.preventDefault();
	        ev.returnValue = false;
	        return false;
	    }

	    if (!up && -delta > scrollHeight - height - scrollTop) {
	        // Scrolling down, but this will take us past the bottom.
	        $this.scrollTop(scrollHeight);

	        return prevent();
	    } else if (up && delta > scrollTop) {
	        // Scrolling up, but this will take us past the top.
	        $this.scrollTop(0);
	        return prevent();
	    }
	});

// =========================================================================

	// HOVER EFFECTS FOR WORLD AND US HEADER ICONS

	$(icons).each(function (index) {
		$(icons[index]).hover(function() {
			$(icons[index] + "-svg").css("fill", "#C5CAE9");
		}, function() {
			$(icons[index] + "-svg").css("fill", "#7A909A");
		});
	});

	$(".dataviz").each(function () {
		$(this).hover(function() {
			$(this).children().eq(1).children().children().filter(".underline").css("width", "60%");

		}, function() {
			$(this).children().eq(1).children().children().filter(".underline").css("width", "20%");
		});
	});

// =========================================================================
	
	// SHIFTS VIEW WHEN BUTTON IS PRESSED

	$('label[for="shifter"]').click(function() {
		if($('input[id="shifter"]').is(":not(:checked)")) {
			$(".partition-shifter").css({"left": (window.innerWidth * 0.335 - 27.5)});
			$(".visualizations").css({"width": "31%"});
			$(".comments-container").css({"width": "63%"});
			$(".comment-form").css({"width": "75%"});
			commentDivWidth = $("#view").width() * 0.63;
			$(".comment-block").css({"width": commentDivWidth});
			commentWritingWidth = $("#view").width() * 0.504 - 120; // 0.63 * 0.8 = 0.504
			$(".comment-writing").css({"width": commentWritingWidth});
			disagreeXShift = $("#view").width() * 0.126 - 10; // 0.63 * 0.2 = 0.126
			$(".disagree").css({"left": disagreeXShift });
		} else {
			$(".partition-shifter").css({"left": (window.innerWidth * 0.655 - 27.5)});
			$(".visualizations").css({"width": "63%"});
			$(".comments-container").css({"width": "31%"});
			$(".comment-form").css({"width": "55%"});
			commentDivWidth = $("#view").width() * 0.31;
			$(".comment-block").css({"width": commentDivWidth});
			commentWritingWidth = $("#view").width() * 0.248 - 120;	// 0.31 * 0.8 = 0.248
			$(".comment-writing").css({"width": commentWritingWidth});
			disagreeXShift = $("#view").width() * 0.062 - 10; // 0.31 * 0.2 = 0.062
			$(".disagree").css({"left": disagreeXShift });

		}
		$(".partition-heading").each(function (index) {
			if (index == 0) {
				$(viewHeadings[index+1]).css({"left": ($(this).parent().width() * 0.5) - ($(this).outerWidth() * 0.5)});
			} else {
				$(viewHeadings[index-1]).css({"left": ($(this).parent().width() * 0.5) - ($(this).outerWidth() * 0.5)});
			}
		});
	});

// =========================================================================

	// SUBMIT FORM WITH ENTER

	$('form').keypress(function (event) {
		if (event.which == 13) {
			event.preventDefault();
			$('form').submit();
		}
	});

// =========================================================================

	// jQuery VALIDATE

   $("form").validate({

	    errorPlacement: function (error, element) {
		   	if (element.attr("name") == "dob-day" )
		        error.appendTo('#register-dob');
		    else if  (element.attr("name") == "dob-year")
		        error.appendTo('#register-dob');
		    else if (element.attr("name") == "gender")
		    	error.appendTo('#li-gender');
		    else
		        error.insertAfter(element);
		}
     });

// =========================================================================
	
	// TYPE OUT A MESSAGE ONTO SCREEN
	var showText = function (target, message, index, interval) {   
		if (index < message.length) {
			$(target).append(message[index++]);
			setTimeout(function () { showText(target, message, index, interval); }, interval);
		}
	}

	function cursorAnimation(element) {
	    $(element).animate({
	        opacity: 0
	    }, 'fast', 'swing').animate({
	        opacity: 1
	    }, 'fast', 'swing');
	}

	function type(element, caption) {
	    element.append(caption.substr(0,1));
	    caption = caption.substr(1, caption.length);
	    if(caption.length > 0) {
	        setTimeout(function () {
	        	type(element, caption);
	        }, 200);
	    } else {
	        return false
	    }
	}

	setTimeout(function() {
		showText("#h1-welcome", "Welcome", 0, 100 );
	}, 500);

	setTimeout(function() {
		showText("#h1-to", "To ", 0, 300 );
	}, 1800);
	
	setInterval(function() {
		cursorAnimation("#cursor");
	}, 1000);

	var captionEl = $('#h1-waves');

	setTimeout(function() {
			type(captionEl, "Waves", 200);
		}, 3000);

// =========================================================================

	// MASONRY
	var $grid = $('.grid').masonry({
		// set itemSelector so .grid-sizer is not used in layout
		itemSelector: '.grid-item',
		// use element for option
	 	columnWidth: '.grid-sizer',
	 	percentPosition: true,
	 	gutter: 10
	});




});