(function($) {
	'use strict';
	var rtoleft = false;
	if ($('body').hasClass('rtl')) {
		rtoleft = true;
	}

	/**
	 * Modal Popup
	 */
	var UtalModalPopup = function($scope, $) {
		var modalpopupwrapper = $scope.find('.ut-modal-wrapper'),
		modalelement = modalpopupwrapper.find('.modal_popup_element'),
		closeButton = modalelement.find('.ut-close-btn span'),
		modalpopupelement = modalpopupwrapper.find('.ut-modal-button a');
		modalpopupelement.click(function(e) {
			e.preventDefault();
			modalelement.addClass('active');
			$('body').addClass('open-modal');
		});

		closeButton.click(function(e) {
			e.preventDefault();
			modalelement.removeClass('active');
			$('body').removeClass('open-modal');
			var modal_iframe = modalelement.find('iframe'),
			modal_video_tag = modalelement.find('video');
			if (modal_iframe.length) {
				var modal_src = modal_iframe.attr('src').replace('&autoplay=1', '');
				modal_iframe.attr('src', '');
				modal_iframe.attr('src', modal_src);
			}
			if (modal_video_tag.length) {
				modal_video_tag[0].pause();
				modal_video_tag[0].currentTime = 0;
			}
		});

		$(document).mouseup(e => {
			if (modalelement.hasClass('active')) {
				if (!modalelement.is(e.target) && modalelement.has(e.target).length === 0) {
					modalelement.removeClass('active');
					$('body').removeClass('open-modal');
					var modal_iframe = modalelement.find('iframe'),
					modal_video_tag = modalelement.find('video');
					if (modal_iframe.length) {
						var modal_src = modal_iframe.attr('src').replace('&autoplay=1', '');
						modal_iframe.attr('src', '');
						modal_iframe.attr('src', modal_src);
					}
					if (modal_video_tag.length) {
						modal_video_tag[0].pause();
						modal_video_tag[0].currentTime = 0;
					}
				}
			}
		});
	};


	/**
	 * Alert
	 */
	var UtalAlert = function($scope, $) {
		var uaAlertMainWrapper = $scope.find('.ut_alert_main_wrapper');
		uaAlertMainWrapper.on("click", ".ut_alert_close_icon", function(e) {
			e.preventDefault();
			uaAlertMainWrapper.fadeOut(500);
		});
	};


	/**
	 * Text Rotator
	 */
	var UtalCircle = function($scope, $) {
		var circleid = $scope.find('.ut_circle').attr('id');
		const circleType = new
		CircleType(document.getElementById(circleid)).radius(65);
	};


	/**
	 * Scroll To Top  
	 */
	var UtalScrollToTop = function($scope, $) {
		var scrollTop = $(".scrollTop");
		$(window).scroll(function() {
			var topPos = $(this).scrollTop();
			if (topPos > 100) {
				$(scrollTop).css("opacity", "1");
			} else {
				$(scrollTop).css("opacity", "0");
			}
		});

		//Click event to scroll to top
		$(scrollTop).click(function() {
			$('html, body').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	};


	/**
	 * Fun Fact   
	 */
	var UtalFunSlider = function($scope, $) {
		var uaFunCount = $scope.find('.funfact_main_list .number-counter .count');
		uaFunCount.prop('Counter', 0).animate({
			Counter: uaFunCount.text()
		}, {
			duration: 4000,
			easing: 'swing',
			step: function(now) {
				uaFunCount.text(Math.ceil(now));
			}
		});
	};


 /**
 * Post Tab
 */
	var UtalPostTab = function($scope, $) {
		$scope.each(function() {
			var posttab = $(this),
			posttab_main = posttab.find('.ut-post-dropdown'),
			posttab_main_content = posttab.find('.ut-post-tab-contents');

			posttab_main.on('change', function(evt) {
				evt.preventDefault();
				var sel = this.value;
				posttab_main_content.animate({opacity: 0}, 300, function() {
					$(this).removeClass('active').filter('.ut-post-tab-contents-' + sel).addClass('active').animate({opacity: 1}, 300);
				});
			});
		});

		$scope.each(function() {
			var posttab = $(this),
			posttab_main = posttab.find('.ut-post-tabs'),
			posttab_main_content = posttab.find('.ut-post-tab-contents');

			posttab_main.on('click', function(evt) {
				evt.preventDefault();
				posttab_main.removeClass('active');
				$(this).addClass('active');
				var sel = this.getAttribute('data-toggle-target');
				posttab_main_content.animate({opacity: 0}, 300, function() {
					$(this).removeClass('active').filter(sel).addClass('active').animate({opacity: 1}, 300);
				});
			});
		});
	};


 /**
 * Type Out
 */
	var UtalTypeOut = function($scope, $) { 
		$scope.find('.ut_post_out_wrapper span').each(function() {
			var utelement = $(this),
			utelementId = utelement.attr('id'),
			utparent = utelement.parent().parent(),
			uttypedLabel = utparent.data( 'ut_type_out_animated_heading' ),
			uttypeSpeed = utparent.data( 'ut_type_out_speed' ),
			utstartDelay = utparent.data( 'ut_type_out_start_delay' ),
			utdelaySpeed = utparent.data( 'ut_type_out_delay_speed' ),
			utbackDelay = utparent.data( 'ut_type_out_back_delay' ),
			utanimateloop = utparent.data( 'ut_type_out_text_loop' ) ? true : false,
			utshowCursor = utparent.data( 'ut_type_out_text_show_cursor' ) ? true : false,
			utstrings = uttypedLabel.split(',');

			new Typed('#'+utelementId, {
				strings: utstrings,
				typeSpeed: uttypeSpeed,
				backSpeed: utdelaySpeed,
				startDelay : utdelaySpeed,
				backDelay : utbackDelay,
				showCursor : utshowCursor,
				loop: utanimateloop
			});
		});
	};


	/**
	 * Image Comparision
	 */
	var UtalImageComparison = function($scope, $) {
		$scope.find('.ut-image-comparision').each(function() {
			var utBeforeLabel = $(this).attr('data-ut_before_title'),
			utAfterLabel = $(this).attr('data-ut_after_title'),
			utOrientation = $(this).attr('data-ut_orientation'),
			utMoveWithHandleOnly = $(this).attr('data-move_with_handle_only'),
			utClickToMove = $(this).attr('data-click_to_move'),
			utMoveSliderOnHover = $(this).attr('data-move_slider_on_hover'),
			utDefaultOffsetPct = $(this).attr('data-ut_img_comparison_offset'),
			utNoOverlay = $(this).attr('data-no_overlay');
			if ($.isFunction($.fn.twentytwenty)) {
				$(this).twentytwenty({
					default_offset_pct: utDefaultOffsetPct,
					orientation: utOrientation,
					before_label: utBeforeLabel,
					after_label: utAfterLabel,
					no_overlay: utNoOverlay,
					move_slider_on_hover: utMoveSliderOnHover,
					move_with_handle_only: utMoveWithHandleOnly,
					click_to_move: utClickToMove,
				});
			}
		});
	};


	/**
	 * Video Popup
	 */
	var UtalVideo = function($scope, $) {
		var youTubeUrl = $scope.find(".elementor-video"),
		videos = $scope.find(".videos"),
		video_internship = $scope.find(".video_internship"),
		video = $scope.find(".video"),
		utvideo = $scope.find('.open_video');

		utvideo.on("click", function(e) {
			e.preventDefault();
			var youtube = $(this).data('youtube');
			var video_link = $(this).data('video_link');
			videos.addClass('in');
			$('body').addClass('open-video');
			if (youtube) {
				video_internship.html('<iframe class="elementor-video" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="100%" height="600" src="https://www.youtube.com/embed/' + youtube + '?autoplay=1&amp;rel=0"></iframe>');
			} else {
				video_internship.html('<video width="100%" class="video" loop="loop" autoplay="autoplay" controls=""><source src="' + video_link + '" type="video/mp4"><source src="mov_bbb.ogg" type="video/ogg"></video>');
			}
		});

		$scope.find("span.close_video").on("click", function(e) {
			e.preventDefault();
			$('body').removeClass('open-video');
			video_internship.html('');
			videos.removeClass('in');
		});

		var body = $('body');
		$(document).mouseup(e => {
			if (!videos.is(e.target) &&
				videos.has(e.target).length === 0) {
				video_internship.html('');
			videos.removeClass('in');
			body.removeClass('open-video');
		}
	});
	};


	/**
	 * Icon Box Slick Carousel
	 */
	var UtalIconBox = function($scope, $) {
		$('.iconbox_main_wrapper').each(function() {
			var tablet_slider_to_scroll, slidetoscroll, slickdots, slickarrows, pauseonhover, slidertoshow, autoplay_speed, autoplay, tabletslider, mobileslidertoshow, tablet_slider_dots, tablet_slider_arrow, mobile_slider_dots, mobile_slider_arrow, tablet_autoplay, tablet_autoplay_speed, mobile_autoplay, mobile_autoplay_speed;
			tablet_slider_to_scroll = parseInt($(this).attr('data-tablet_slider_to_scroll'));
			slidetoscroll = parseInt($(this).attr('data-slidertoscroll'));
			slickdots = $(this).attr('data-slider_dots');
			slickarrows = $(this).attr('data-slider_arrow');
			pauseonhover = $(this).attr('data-pauseonhover');
			slidertoshow = $(this).attr('data-slidertoshow');
			autoplay_speed = $(this).attr('data-autoplayspeed');
			autoplay = $(this).attr('data-autoplay');
			tabletslider = $(this).attr('data-tablet_slider_to_show');
			tablet_slider_dots = $(this).attr('data-tablet_slider_dots');
			tablet_slider_arrow = $(this).attr('data-tablet_slider_arrow');
			tablet_autoplay = $(this).attr('data-tablet_autoplay');
			tablet_autoplay_speed = $(this).attr('data-tablet_autoplay_speed');
			mobileslidertoshow = $(this).attr('data-mobile_slider_to_show');
			mobile_slider_dots = $(this).attr('data-mobile_slider_dots');
			mobile_slider_arrow = $(this).attr('data-mobile_slider_arrow');
			mobile_autoplay = $(this).attr('data-mobile_autoplay');
			mobile_autoplay_speed = $(this).attr('data-mobile_autoplay_speed');

			if (slickdots == 'yes') {
				slickdots = true;
			} else {
				slickdots = false;
			}
			if (slickarrows == 'yes') {
				slickarrows = true;
			} else {
				slickarrows = false;
			}
			if (pauseonhover == 'yes') {
				pauseonhover = true;
			} else {
				pauseonhover = false;
			}
			if (autoplay == 'yes') {
				autoplay = true;
			} else {
				autoplay = false;
			}
			if (tablet_slider_dots == 'yes') {
				tablet_slider_dots = true;
			} else {
				tablet_slider_dots = false;
			}
			if (tablet_slider_arrow == 'yes') {
				tablet_slider_arrow = true;
			} else {
				tablet_slider_arrow = false;
			}
			if (tablet_autoplay == 'yes') {
				tablet_autoplay = true;
			} else {
				tablet_autoplay = false;
			}
			if (mobile_slider_dots == 'yes') {
				mobile_slider_dots = true;
			} else {
				mobile_slider_dots = false;
			}
			if (mobile_slider_arrow == 'yes') {
				mobile_slider_arrow = true;
			} else {
				mobile_slider_arrow = false;
			}
			if (mobile_autoplay == 'yes') {
				mobile_autoplay = true;
			} else {
				mobile_autoplay = false;
			}

			$(this).not('.slick-initialized').slick({
				autoplay: autoplay,
				autoplaySpeed: autoplay_speed,
				slidesToShow: slidertoshow,
				arrows: slickarrows,
				dots: slickdots,
				slidesToScroll: slidetoscroll,
				pauseOnHover: pauseonhover,
				draggable: true,
				swipeToSlide: true,
				responsive: [{
					breakpoint: 1024,
					settings: {
						slidesToShow: tabletslider,
						slidesToScroll: tablet_slider_to_scroll,
						autoplay: tablet_autoplay,
						autoplaySpeed: tablet_autoplay_speed,
						arrows: tablet_slider_arrow,
						dots: tablet_slider_dots,
						draggable: true,
						swipeToSlide: true,
					},
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: mobileslidertoshow,
						autoplay: mobile_autoplay,
						autoplaySpeed: mobile_autoplay_speed,
						arrows: mobile_slider_arrow,
						dots: mobile_slider_dots,
						draggable: true,
						swipeToSlide: true,
					},
				},
			],
		});
		});
	};


	/**
	 * Blog Grid Carousel
	 */
	var UtalBlogGrid = function($scope, $) {
		if ($('.utal-blog-grid .slick-slider').length > 0) {
			$('.utal-blog-grid .slick-slider').each(function() {
				var slick_pager, slick_nav, slick_slides, slick_slides_tablet, slick_slides_mobile, slick_auto, slick_autospeed, slick_transition, slick_loop, slick_pauseOnHover, slick_swipe;
				slick_nav = $(this).attr('data-arrows');
				slick_pager = $(this).attr('data-dots');
				slick_auto = $(this).attr('data-autoplay');
				slick_autospeed = $(this).attr('data-autoplay_speed');
				slick_slides = parseInt($(this).attr('data-slidesToShow'));
				slick_slides_tablet = parseInt($(this).attr('data-slidesToShow-tablet'));
				slick_slides_mobile = parseInt($(this).attr('data-slidesToShow-mobile'));
				slick_swipe = $(this).attr('data-swipe');
				slick_loop = $(this).attr('data-infinit_loop');
				slick_pauseOnHover = $(this).attr('data-pauseOnHover');
				if (slick_nav == 'yes') {
					slick_nav = true;
				} else {
					slick_nav = false;
				}
				if (slick_pager == 'yes') {
					slick_pager = true;
				} else {
					slick_pager = false;
				}
				if (slick_auto == 'yes') {
					slick_auto = true;
				} else {
					slick_auto = false;
				}
				if (slick_swipe == 'yes') {
					slick_swipe = true;
				} else {
					slick_swipe = false;
				}
				if (slick_loop == 'yes') {
					slick_loop = true;
				} else {
					slick_loop = false;
				}
				if (slick_pauseOnHover == 'yes') {
					slick_pauseOnHover = true;
				} else {
					slick_pauseOnHover = false;
				}
				$(this).not('.slick-initialized').slick({
					infinite: slick_loop,
					slidesToShow: slick_slides,
					autoplay: slick_auto,
					autoplaySpeed: slick_autospeed,
					arrows: slick_nav,
					rtl: rtoleft,
					dots: slick_pager,
					pauseOnHover: slick_pauseOnHover,
					swipe: slick_swipe,
					responsive: [{
						breakpoint: 1024,
						settings: {
							slidesToShow: slick_slides_tablet,
						}
					},
					{
						breakpoint: 500,
						settings: {
							slidesToShow: slick_slides_mobile,
						}
					}
				]
			});
			});
		}
	};


	/**
	 *  Slider
	 */
	var UtalSlider = function ($scope, $) {
    // Only look for sliders **inside this widget instance**
		var $sliders = $scope.find('.slick-slider');

		if ($sliders.length > 0) {
			$sliders.each(function () {
				var $slider = $(this);

            // Prevent double initialization
				if ($slider.hasClass('slick-initialized')) return;

            // Get slider settings from data attributes
				var slick_nav = $slider.attr('data-arrows') === 'yes';
				var slick_pager = $slider.attr('data-dots') === 'yes';
				var slick_auto = $slider.attr('data-autoplay') === 'yes';
				var slick_autospeed = parseInt($slider.attr('data-autoplay_speed')) || 5000;
				var slick_swipe = $slider.attr('data-swipe') === 'yes';
				var slick_loop = $slider.attr('data-infinit_loop') === 'yes';
				var slick_pauseOnHover = $slider.attr('data-pauseOnHover') === 'yes';
				var slick_slides = parseInt($slider.attr('data-slidesToShow')) || 1;
				var slick_slides_tablet = parseInt($slider.attr('data-slidesToShow-tablet')) || 1;
				var slick_slides_mobile = parseInt($slider.attr('data-slidesToShow-mobile')) || 1;

            // Custom arrows inside this widget only
				var arrowPos = $slider.attr('data-arrowsposition');
				var uaPrev = null, uaNext = null;

				if (arrowPos && arrowPos !== 'default') {
					uaPrev = $slider.closest($scope).find('.ut-prev-btn');
					uaNext = $slider.closest($scope).find('.ut-next-btn');

					if (!uaPrev.length) uaPrev = undefined;
					if (!uaNext.length) uaNext = undefined;
				}

            // Initialize Slick
				$slider.slick({
					arrows: slick_nav,
					prevArrow: uaPrev && uaPrev.length ? uaPrev[0] : undefined,
					nextArrow: uaNext && uaNext.length ? uaNext[0] : undefined,
					autoplay: slick_auto,
					autoplaySpeed: slick_autospeed,
					slidesToShow: slick_slides,
					dots: slick_pager,
					pauseOnHover: slick_pauseOnHover,
					swipe: slick_swipe,
					infinite: slick_loop,
					accessibility: false,
					responsive: [
						{
							breakpoint: 1024,
							settings: {
								slidesToShow: slick_slides_tablet,
							}
						},
						{
							breakpoint: 600,
							settings: {
								slidesToShow: slick_slides_mobile,
							}
						}
					]
				});
			});
		}
	};


	/**
	 *  Testimonial Slider
	 */
	var UtalTestimonial = function($scope, $) {
		if ($('.utal-testimonial .slick-slider').length > 0) {
			$('.utal-testimonial .slick-slider').each(function() {
				var slick_pager, slick_pager_tablet, slick_pager_mobile, slick_nav, slick_nav_tablet, slick_nav_mobile, slick_slides, slick_slides_tablet, slick_slides_mobile, slick_auto, slick_autospeed, slick_transition, slick_loop, slick_pauseOnHover, slick_swipe;
				slick_nav = $(this).attr('data-arrows');
				slick_nav_tablet = $(this).attr('data-arrows-tablet');
				slick_nav_mobile = $(this).attr('data-arrows-mobile');
				slick_pager = $(this).attr('data-dots');
				slick_pager_tablet = $(this).attr('data-dots-tablet');
				slick_pager_mobile = $(this).attr('data-dots-mobile');
				slick_auto = $(this).attr('data-autoplay');
				slick_autospeed = $(this).attr('data-autoplay_speed');
				slick_slides = parseInt($(this).attr('data-slidesToShow'));
				slick_slides_tablet = parseInt($(this).attr('data-slidesToShow-tablet'));
				slick_slides_mobile = parseInt($(this).attr('data-slidesToShow-mobile'));
				slick_swipe = $(this).attr('data-swipe');
				slick_loop = $(this).attr('data-infinit_loop');
				slick_pauseOnHover = $(this).attr('data-pauseOnHover');

				if (slick_nav == 'yes') {
					slick_nav = true;
				} else {
					slick_nav = false;
				}
				if (slick_pager == 'yes') {
					slick_pager = true;
				} else {
					slick_pager = false;
				}
				if (slick_pager_tablet == 'yes') {
					slick_pager_tablet = true;
				} else {
					slick_pager_tablet = false;
				}
				if (slick_pager_mobile == 'yes') {
					slick_pager_mobile = true;
				} else {
					slick_pager_mobile = false;
				}
				if (slick_auto == 'yes') {
					slick_auto = true;
				} else {
					slick_auto = false;
				}
				if (slick_swipe == 'yes') {
					slick_swipe = true;
				} else {
					slick_swipe = false;
				}
				if (slick_loop == 'yes') {
					slick_loop = true;
				} else {
					slick_loop = false;
				}
				if (slick_pauseOnHover == 'yes') {
					slick_pauseOnHover = true;
				} else {
					slick_pauseOnHover = false;
				}
				if (slick_nav_tablet == 'yes') {
					slick_nav_tablet = true;
				} else {
					slick_nav_tablet = false;
				}
				if (slick_nav_mobile == 'yes') {
					slick_nav_mobile = true;
				} else {
					slick_nav_mobile = false;
				}

				$(this).not('.slick-initialized').slick({
					infinite: slick_loop,
					slidesToShow: slick_slides,
					autoplay: slick_auto,
					autoplaySpeed: slick_autospeed,
					arrows: slick_nav,
					rtl: rtoleft,
					dots: slick_pager,
					pauseOnHover: slick_pauseOnHover,
					swipe: slick_swipe,
					responsive: [{
						breakpoint: 1024,
						settings: {
							slidesToShow: slick_slides_tablet,
							arrows: slick_nav_tablet,
							dots: slick_pager_tablet,
						}
					},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: slick_slides_mobile,
							arrows: slick_nav_mobile,
							dots: slick_pager_mobile,
						}
					}
				]
			});
			});
		}

		if ($('.utal-testimonial .more').length > 0) {
			var limit, more, less;
			limit = $(this).data("limit");
			more = $(this).data("more");
			less = $(this).data("less");
			var showChar = limit; 
			var ellipsestext = "...";
			var moretext = more;
			var lesstext = less;

			var content = $('.utal-testimonial .more').html();
			$('.utal-content-excerpt .more').each(function() {
				var content_len = $.trim($(this).html()).split(" ");
				var content = $(this).html();

				if (content_len.length > showChar) {
					var c = content_len.slice(0, showChar);
					var c = c.join(' ')
					var h = content_len.slice(showChar, content_len.length);
					var h = h.join(' ');
					var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span> ' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
					$(this).html(html);
				}

			});

			$(".morelink").click(function() {
				if ($(this).hasClass("less")) {
					$(this).removeClass("less");
					$(this).html(moretext);
				} else {
					$(this).addClass("less");
					$(this).html(lesstext);
				}
				$(this).parent('.more').find('.moreellipses').toggle();
				$(this).parent('.more').find('.morecontent span').toggle();
				return false;
			});
		}
	};


	/**
	 *  Ticker Slider
	 */
	var UtalTickerSlider = function($scope, $) {
		var ticker = $scope.find('.utal-ticker-wrapper .ticker-content-container');
		if (ticker.length > 0) {
			ticker.each(function() {
				var slick_pager, slick_direction, slide_animation, slide_animation_speed, slick_nav, slick_nav_tablet, slick_nav_mobile, slick_slides, slick_slides_tablet, slick_slides_mobile, slick_auto, slick_autospeed, slick_transition, slick_loop, slick_pauseOnHover, slick_swipe;
				var slidesToScroll, vertical, variableWidth, initialSlide, fade;
				slick_nav = ticker.attr('data-arrows');
				slick_nav_tablet = ticker.attr('data-arrows-tablet');
				slick_nav_mobile = ticker.attr('data-arrows-mobile');
				slick_direction = ticker.attr('data-direction');
				slick_auto = ticker.attr('data-autoplay');
				slick_autospeed = ticker.attr('data-autoplay_speed');
				slick_slides = parseInt(ticker.attr('data-slidesToShow'));
				slick_slides_tablet = parseInt(ticker.attr('data-slidesToShow-tablet'));
				slick_slides_mobile = parseInt(ticker.attr('data-slidesToShow-mobile'));
				slick_swipe = ticker.attr('data-swipe');
				slick_loop = ticker.attr('data-infinit_loop');
				slick_pauseOnHover = ticker.attr('data-pauseOnHover');
				slide_animation = ticker.attr('data-animation');
				slide_animation_speed = ticker.attr('data-animation-speed');
				if (slick_nav == 'yes') {
					slick_nav = true;
				} else {
					slick_nav = false;
				}
				if (slick_auto == 'yes') {
					slick_auto = true;
				} else {
					slick_auto = false;
				}
				if (slick_swipe == 'yes') {
					slick_swipe = true;
				} else {
					slick_swipe = false;
				}
				if (slick_loop == 'yes') {
					slick_loop = true;
				} else {
					slick_loop = false;
				}
				if (slick_pauseOnHover == 'yes') {
					slick_pauseOnHover = true;
				} else {
					slick_pauseOnHover = false;
				}
				if (slick_nav_tablet == 'yes') {
					slick_nav_tablet = true;
				} else {
					slick_nav_tablet = false;
				}
				if (slick_nav_mobile == 'yes') {
					slick_nav_mobile = true;
				} else {
					slick_nav_mobile = false;
				}
				if (slick_direction == 'ltr') {
					initialSlide = 1;
					rtoleft = true;
				} else {
					rtoleft = false;
				}
				if (slick_direction == 'btt') {
					vertical = true;
					slidesToScroll = 1;
				}
				if (slide_animation == 'default') {
					variableWidth = false;
					slick_slides = slick_slides;
				}
				if (slide_animation == 'marquee') {
					variableWidth = true;
					slick_slides = 1;
					vertical = false;
					initialSlide = 1;
					slick_autospeed = 0;
					slidesToScroll = 1
				} else {
					variableWidth = false;
					slick_slides = slick_slides;
				}
				if (slide_animation == 'fade') {
					fade = true;
					vertical = false;
				} else {
					fade = false;
				}
				ticker.not('.slick-initialized').slick({
					speed: slide_animation_speed,
					slidesToShow: slick_slides,
					infinite: slick_loop,
					autoplay: slick_auto,
					autoplaySpeed: slick_autospeed,
					arrows: slick_nav,
					rtl: rtoleft,
					pauseOnHover: slick_pauseOnHover,
					swipe: slick_swipe,
					slidesToScroll: slidesToScroll,
					vertical: vertical,
					variableWidth: variableWidth,
					initialSlide: initialSlide,
					centerMode: false,
					fade: fade,
					cssEase: 'linear',
					responsive: [{
						breakpoint: 768,
						settings: {
							slidesToShow: slick_slides_tablet,
							arrows: slick_nav_tablet,
						}
					},
					{
						breakpoint: 500,
						settings: {
							slidesToShow: slick_slides_mobile,
							arrows: slick_nav_mobile,
						}
					}
				]
			});
			});
		}
	};


	/**
	 *  Search
	 */
	var UtalSearch = function($scope, $) {
		$(".utal-search-icon svg").on('click keypress', function(event) {
			$(".utal-search-container").addClass("show");
			event.stopPropagation();
		});
		$(document).click(function(event) {
			if (!$(event.target).hasClass('utal-search-container')) {
				$(".utal-search-container").removeClass("show");
			}
		});
		$('.utal-search-container').on('click keypress', function(event) {
			event.stopPropagation();
		});
	};


	/**
	 *  Progress Bar
	 */
	var UtalProgress_Bar = function($scope, $) {
		var $progress_elem = $scope.find('.ut-progress-bar').eq(0),
		$progress_type = $progress_elem.data('type'),
		$progress_id = $progress_elem.data('id');
		jQuery(document).ready(function($) {
			$progress_elem.each(function() {
				$(this).waypoint(function() {
					if ($progress_type == 'line') {
						var $progress_val = $progress_elem.data('value'),
						$progress_height = $progress_elem.data('height'),
						$progress_radius = $progress_elem.data('radius'),
						$progress_amintime = $progress_elem.data('amintime');
						$progress_elem.find('#ut-progressbar-' + $progress_id).LineProgressbar({
							percentage: $progress_val,
							fillBackgroundColor: false,
							backgroundColor: false,
							height: $progress_height + 'px',
							radius: $progress_radius + 'px',
							ShowProgressCount: false,
							duration: $progress_amintime
						});
						this.destroy();
					} else {
						var $bgColor = $progress_elem.data('bg'),
						$color = $progress_elem.data('color'),
						$lHeight = $progress_elem.data('lheight'),
						$cheight = $progress_elem.data('cheight'),
						$animate = $progress_elem.data('amintime'),
						$ctype = $progress_elem.data('ctype'),
						$gcolor1 = $progress_elem.data('gcolor1'),
						$gcolor2 = $progress_elem.data('gcolor2');

						if ($ctype == 'gradient') {
							var $barcolor = function(percent) {
								var ctx = this.renderer.getCtx();
								var canvas = this.renderer.getCanvas();
								var gradient = ctx.createLinearGradient(0, 0, canvas.width, 180);
								gradient.addColorStop(0.3, $gcolor1);
								gradient.addColorStop(0, $gcolor2);
								return gradient;
							}
						} else {
							var $barcolor = $color;
						}
						$progress_elem.find('#ut-progressbar-' + $progress_id).easyPieChart({
							trackColor: $bgColor,
							lineWidth: $lHeight,
							scaleLength: 0,
							size: $cheight,
							lineCap: 'butt',
							animate: ({
								duration: $animate,
								enabled: true
							}),
							barColor: $barcolor,
						});
					}
				}, {
					triggerOnce: true,
					offset: 'bottom-in-view'
				});
			});
		});
	};


	/**
	 *  Nav Menu
	 */
	var UtalNavMenu = function($scope, $) {
		if ($(window).width() >= 1024) {
			$(".ut-custom-menu").addClass("submenus");
			$(".menu.custom-menu.mobile-layout-hamburger").addClass("alignment-dektop");
		}

		function menuAdd(navEle) {
			navEle.siblings('.menu-toggle').addClass('is-triggered');
			navEle.addClass('is-active');
			if (navEle.hasClass('close')) {
				navEle.removeClass('open');
			}
		}

		function menuRemove(navEle) {
			navEle.siblings('.menu-toggle').removeClass('is-triggered');
			navEle.removeClass('is-active');
			if (navEle.hasClass('close')) {
				navEle.removeClass('open');
			}
		}

		function menuRemoveAll() {
			$('.menu-toggle').removeClass('is-triggered');
			$('.custom-menu.mobile-layout-hamburger').removeClass('is-active');
			$('.custom-menu.mobile-layout-hamburger .close').removeClass('open');
		}
		
		if ($(window).width() < 1024) {
			$(".mobile-layout-hamburger").addClass("mobile-bg");

			$('.custom-menu.mobile-layout-hamburger').each(function() {
				if ($(this).find('.close').length < 1) {
					$(this).prepend('<span class="close">&times;</span>');
				}
			});

			$('.custom-menu.mobile-layout-hamburger .close').on('click', function() {
				var navEle = $(this).parents('.mobile-layout-hamburger');
				menuRemove(navEle);
			});

			$('.menu-toggle').on('click', function(e) {
				var navEle = $(this).siblings('.mobile-layout-hamburger');
				e.preventDefault(); 
				e.stopPropagation(); 
				menuAdd(navEle);

			});

			$('.menu-toggle').on('click', function(e) {
				e.stopPropagation(); 
			});
			$('.custom-menu.mobile-layout-hamburger').on('click', function(e) {
				e.stopPropagation(); 
			});

			$('body').on('click', function() {
				menuRemoveAll();
			});

			$(".custom-menu.mobile-layout-hamburger .menu-item-has-children>a").on("click", function(e) {
				$(this).next().addClass("slide");
				e.preventDefault();
				$(this).parents("ul.sub-menu").addClass("sub-menu-open");
				$('.custom-menu').addClass('sub-menu-open');
			});
			
			if ($(".custom-menu.mobile-layout-hamburger .menu-item-has-children .menu-item:not(.menu-item-has-children) > a").length > 0) {
				$(".custom-menu.mobile-layout-hamburger .menu-item-has-children .menu-item:not(.menu-item-has-children) > a").each(function(e) {
					var link = $(this);
					jQuery(this).next().prepend('<li class="new-item menu-item">' + link[0].outerHTML + '</li>');
				});
			}
			if ($(".custom-menu.mobile-layout-hamburger ul.sub-menu").length > 0) {
				$(".custom-menu.mobile-layout-hamburger ul.sub-menu").each(function() {
					if ($(this).find('.prev-menu').length < 1) {
						$(this).prepend(
							'<li class="prev-menu"><i class="fa fa-angle-left"></i> Back</li>'
							);
					}
				});
			}
			$('.custom-menu.mobile-layout-hamburger ul.sub-menu .prev-menu').on('click', function() {
				$(this).parent(".sub-menu").removeClass("sub-menu-open");
				$(this).parent(".sub-menu").removeClass("slide");
				$('.custom-menu.mobile-layout-hamburger').removeClass('sub-menu-open');
			});
		}
	};

	/**
	 *  Mailchimp
	 */
	var UtalMailchimp = function($scope, $) {
		var utMcForm = $scope.find('form.ut_mc_mail'),
		utResponse = $scope.find('.ut_mc_response');
		utMcForm.on('submit', function(event) {
			event.preventDefault();
			var fullName = $('#full-name').val(),
			lastName = $('#last-name').val(),
			phone = $('#phone').val(),
			email = $('#email').val(),
			dce = utMcForm.data('dc'),
			api = utMcForm.data('api'),
			listId = utMcForm.data('list-id'),
			doubleOptIn = utMcForm.data('double-opt-in'),
			doubleOptInMessage = utMcForm.data('double-opt-in-message'),
			tag = utMcForm.data('tag'),
			emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
			nonce = ultraLiteObj.nonce;

			if (!emailRegex.test(email)) {
				$('.ut_mc_response')
				.fadeOut(0)
				.html('<span class="ut_mc_error_msg">Please enter a valid email address</span>')
				.fadeIn(700);
				return;
			}

			$.ajax({
				url: ultraLiteObj.ajaxurl, 
				type: 'POST',
				data: {
					action: 'utal_add_email_to_mailchimp',
					fullName: fullName,
					lastName: lastName,
					phone: phone,
					email: email,
					dce: dce,
					api: api,
					listid: listId,
					doubleOptIn: doubleOptIn,
					tag: tag,
					nonce: nonce,
				},
				success: function(response) {
					utResponse.fadeOut(0);
					if (response.success) {
						if (response.data.title === 'Member Exists') {
							utResponse
							.html('<span class="ut_mc_error_msg">This email address is already a member of the list</span>')
							.fadeIn(700);
						} else if (response.data.title === 'Invalid Resource') {
							utResponse
							.html('<span class="ut_mc_error_msg">' + response.data.detail + '</span>')
							.fadeIn(700);
						} else {
							utMcForm.trigger('reset');
							utResponse
							.html('<span class="ut_mc_success_msg">' + doubleOptInMessage + '</span>')
							.fadeIn(700);
						}
					} else {
						utResponse
						.fadeOut(0)
						.html('<span class="ut_mc_error_msg">' + response.data + '</span>')
						.fadeIn(700);
					}
				},
				error: function(error) {
					utResponse
					.fadeOut(0)
					.html('<span class="ut_mc_error_msg">' + error.responseJSON.message + '</span>')
					.fadeIn(700);
				},
			});
		});
	};

	$(window).on('elementor/frontend/init', function() {
		const addHandler = ($element) => {
			elementorFrontend.elementsHandler.addHandler(WidgetHandlerClass, {
				$element,
			});
		};

		elementorFrontend.hooks.addAction('frontend/element_ready/utal-search.default', UtalSearch);
		elementorFrontend.hooks.addAction('frontend/element_ready/utal-blog-grid.default', UtalBlogGrid);
		elementorFrontend.hooks.addAction('frontend/element_ready/utal-slider.default', UtalSlider);
		elementorFrontend.hooks.addAction('frontend/element_ready/utal-carousel.default', UtalSlider);
		elementorFrontend.hooks.addAction('frontend/element_ready/utal-testimonial.default', UtalTestimonial);
		elementorFrontend.hooks.addAction('frontend/element_ready/utal-content-ticker.default', UtalTickerSlider);
		elementorFrontend.hooks.addAction('frontend/element_ready/utal-progress-bar.default', UtalProgress_Bar);
		elementorFrontend.hooks.addAction('frontend/element_ready/utal-image-com.default', UtalImageComparison);
		elementorFrontend.hooks.addAction('frontend/element_ready/utal-icon-box.default', UtalIconBox);
		elementorFrontend.hooks.addAction('frontend/element_ready/utal-fun-fact.default', UtalFunSlider);
		elementorFrontend.hooks.addAction('frontend/element_ready/ut-nav-menu.default', UtalNavMenu);
		elementorFrontend.hooks.addAction('frontend/element_ready/utal-video.default', UtalVideo);
		elementorFrontend.hooks.addAction('frontend/element_ready/utal-scroll-to-top.default', UtalScrollToTop);
		elementorFrontend.hooks.addAction('frontend/element_ready/utal-circletext.default', UtalCircle);
		elementorFrontend.hooks.addAction('frontend/element_ready/utal-alert.default', UtalAlert);
		elementorFrontend.hooks.addAction('frontend/element_ready/utal-modal-popup.default', UtalModalPopup);
		elementorFrontend.hooks.addAction('frontend/element_ready/utal-typeout.default', UtalTypeOut);
		elementorFrontend.hooks.addAction('frontend/element_ready/utal-posttab.default', UtalPostTab);
		elementorFrontend.hooks.addAction('frontend/element_ready/utal-mailchimp.default', UtalMailchimp);
	});

})(jQuery);