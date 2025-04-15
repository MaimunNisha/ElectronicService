
(function ($) {
  "use strict";


  var nivoSlider = function ($scope, $) {
    
      var $body = $('body'),
      
      // Template Blocks
      blocks = {
        mainSlider: $('.mainSlider-wrapper .mainSlider')
      };
    
      // main slider
      if (blocks.mainSlider.length) {
        mainSlider();
      };
      function mainSlider() {
        var $el = blocks.mainSlider;
        $el.find('.slide').first().imagesLoaded({
          background: true
        }, function(){
          setTimeout(function () {
            $el.parent().find('.loading-content').addClass('disable');
            $body.addClass('load-mainslider');
          }, 300);
        });
        $el.on('init', function (e, slick) {
          var $firstAnimatingElements = $('div.slide:first-child').find('[data-animation]');
          doAnimations($firstAnimatingElements);
        });
        $el.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
          var $currentSlide = $('div.slide[data-slick-index="' + nextSlide + '"]');
          var $animatingElements = $currentSlide.find('[data-animation]');
          doAnimations($animatingElements);
        });
        $el.not('.slick-initialized').slick({
          arrows: false,
          dots: false,
          autoplay: true,
          autoplaySpeed: 5500,
          fade: true,
          speed: 1000,
          pauseOnHover: false,
          pauseOnDotsHover: true,
          responsive: [{
            breakpoint: 768,
            settings: {
              arrows: false
            }
          },{
            breakpoint: 1025,
            settings: {
              dots: false,
              arrows: false
            }
          }]
        });
      };
      function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function () {
          var $this = $(this);
          var $animationDelay = $this.data('animation-delay');
          var $animationType = 'animated ' + $this.data('animation');
          $this.css({
            'animation-delay': $animationDelay,
            '-webkit-animation-delay': $animationDelay
          });
          $this.addClass($animationType).one(animationEndEvents, function () {
            $this.removeClass($animationType);
          });
          if ($this.hasClass('animate')) {
            $this.removeClass('animation');
          }
        });
      };
    
      // background image inline
      dataBg('[data-bgslide]');
      function dataBg(el) {
        blocks.mainSlider.find(el).each(function(){
          var $this = $(this),
          bg = $this.attr('data-bgslide');
          $this.css({
            'background-image': 'url(' + bg + ')'
          });
        });
      };
    
 

  };

  var bulbSlider = function ($scope, $) {
    if ($(".bulb-carousel").length) {
      var bulb_obj = $(".bulb-carousel").data("slick");
      $(".bulb-carousel").not('.slick-initialized').slick({
        mobileFirst: JSON.parse(bulb_obj.mobile_first),
        slidesToShow: parseInt(bulb_obj.slides_to_show),
        slidesToScroll: parseInt(bulb_obj.slides_to_scroll),
        infinite: JSON.parse(bulb_obj.infinite),
        autoplay: JSON.parse(bulb_obj.autoplay),
        autoplaySpeed: parseInt(bulb_obj.autoplay_speed),
        arrows: JSON.parse(bulb_obj.arrows),
        dots: JSON.parse(bulb_obj.dots),
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    }
  };

  var testimonials_1 = function ($scope, $) {
    if ($(".testimonials-carousel").length) {
      var testi_obj = $(".testimonials-carousel").data("slick");
      $(".testimonials-carousel").not('.slick-initialized').slick({
        mobileFirst: JSON.parse(testi_obj.mobile_first),
        slidesToShow: parseInt(testi_obj.slides_to_show),
        slidesToScroll: parseInt(testi_obj.slides_to_scroll),
        infinite: JSON.parse(testi_obj.infinite),
        autoplay: JSON.parse(testi_obj.autoplay),
        autoplaySpeed: parseInt(testi_obj.autoplay_speed),
        arrows: JSON.parse(testi_obj.arrows),
        dots: JSON.parse(testi_obj.dots),
      });
    }
  };

  var priceboxcarousel = function ($scope, $) {

    if ($(".price-box-carousel").length) {
      var testi_obj = $(".price-box-carousel").data("slick");
      $(".price-box-carousel").not('.slick-initialized').slick({
        mobileFirst: JSON.parse(testi_obj.mobile_first),
        slidesToShow: parseInt(testi_obj.slides_to_show),
        slidesToScroll: parseInt(testi_obj.slides_to_scroll),
        infinite: JSON.parse(testi_obj.infinite),
        autoplay: JSON.parse(testi_obj.autoplay),
        autoplaySpeed: parseInt(testi_obj.autoplay_speed),
        arrows: JSON.parse(testi_obj.arrows),
        dots: JSON.parse(testi_obj.dots),
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    }



  };

  var counterCarousel = function ($scope, $) {
    if ($(".counter-carousel").length) {
      var count_obj = $(".counter-carousel").data("slick");
      $(".counter-carousel").not('.slick-initialized').slick({
        mobileFirst: false,
        slidesToShow: parseInt(count_obj.slides_to_show),
        slidesToScroll: parseInt(count_obj.slides_to_scroll),
        infinite: JSON.parse(count_obj.infinite),
        autoplay: JSON.parse(count_obj.autoplay),
        autoplaySpeed: parseInt(count_obj.autoplay_speed),
        arrows: JSON.parse(count_obj.arrows),
        dots: JSON.parse(count_obj.dots),
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    }
  };

  var counterCarouselcount = function ($scope, $) {
    if ($(".counter-carousel").length) {
      function count(options) {
        var $this = $(this);
        options = $.extend(
          {},
          options || {},
          $this.data("countToOptions") || {}
        );
        $this.countTo(options);
      }
      $(".counter-box").each(function () {
        var $this = $(this);
        $this.waypoint(
          function () {
            $(".counter-box-number > span", $this).each(count);
            $this.addClass("counted");
            this.destroy();
          },
          {
            triggerOnce: true,
            offset: "80%",
          }
        );
      });
    }
  };

  var newspreviewcarousel = function ($scope, $) {
    if ($(".news-preview-carousel").length) {
      var news_obj = $(".news-preview-carousel").data("slick");
      $(".news-preview-carousel").not('.slick-initialized').slick({
        mobileFirst: false,
        slidesToShow: parseInt(news_obj.slides_to_show),
        slidesToScroll: parseInt(news_obj.slides_to_scroll),
        infinite: JSON.parse(news_obj.infinite),
        autoplay: JSON.parse(news_obj.autoplay),
        autoplaySpeed: parseInt(news_obj.autoplay_speed),
        arrows: JSON.parse(news_obj.arrows),
        dots: JSON.parse(news_obj.dots),
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    }
  };

  // brands carousel
  var brands_carousel = function ($scope, $) {
    if ($(".brands-carousel").length) {
      var brands_obj = $(".brands-carousel").data("slick");
      $(".brands-carousel").not('.slick-initialized').slick({
        mobileFirst: false,
        slidesToShow: parseInt(brands_obj.slides_to_show),
        slidesToScroll: parseInt(brands_obj.slides_to_scroll),
        infinite: JSON.parse(brands_obj.infinite),
        autoplay: JSON.parse(brands_obj.autoplay),
        autoplaySpeed: parseInt(brands_obj.autoplay_speed),
        arrows: JSON.parse(brands_obj.arrows),
        dots: JSON.parse(brands_obj.dots),
        variableWidth: true,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 5,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    }
  };


  var testiCarousel_two_js = function ($scope, $) {

    $('#tt-pageContent [data-slick]').not('.slick-initialized').slick({
      lazyLoad: 'progressive',
      dots: true,
      arrows: false,
      infinite: true,
      speed: 300,
      autoplay:true,
      adaptiveHeight: true,
      slidesToScroll: 1,
      pauseOnFocus:false,
      pauseOnHover: false
    });


  };









  var team_carousel = function ($scope, $) {
    if ($(".team_carousel").length) {
      $(".team_carousel").not('.slick-initialized').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              dots: true,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              dots: true,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
            },
          },
        ],
      });
    }
  };

  var category_carouselJs = function () {
    var slideinfo =  $('#tt-pageContent .tt-slideinfo');

    if (!slideinfo.length) return false;
  
    var initSlideInfo = (function(){
      $('#tt-pageContent .tt-slideinfo').on("mouseenter", function(){
        $(this).addClass('wide active').siblings().addClass('short');
      }).on('mouseleave', function() {
        $(this).removeClass('active').siblings().removeClass('short');
      });
    }());
  
    var initOpenInfo = (function(){
      $('body').on('click touchstart', '.tt-slideinfo .tt-item__btn > *', function(e){
        var obj = $(this);
        if($(this).closest('.tt-slideinfo').hasClass('open-info')){
          closeLayout(obj);
        } else {
          openLayout(obj);
        };
        return false;
      });
    }());
    function openLayout(obj){
      obj.html('-');
      obj.closest('.tt-slideinfo').siblings().removeClass('open-info').find('.tt-item__btn  > *').html('+');
      obj.closest('.tt-slideinfo').addClass('open-info');
    };
    function closeLayout(obj){
      obj.html('+');
      obj.closest('.tt-slideinfo').addClass('open-info').find('.tt-item__btn  > *').html('-');  
    };
    function initSliderCarusel(){
      var slickCarusel = $('#tt-pageContent .tt-slideinfo-wrapper'),
        width = window.innerWidth || document.body.clientWidth;
  
      if (!slickCarusel.length) return false;
  
      if (width <= 767){
        slickCarusel.not('.slick-initialized').slick({
          dots: true,
          arrows: false,
          infinite: true,
          speed: 300,
          slidesToShow: 2,
          slidesToScroll: 1,
          adaptiveHeight: true,
          autoplay:true,
          autoplaySpeed:2000,
          responsive: [
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
          ]
        });
      } else {
        slickCarusel.filter('.slick-initialized').slick('unslick');
      }
    };
    initSliderCarusel();
    $(window).resize(debouncer(function(e){
      initSliderCarusel();
    }));
  };


  var electrician_blogJs = function () {
    (function($){
      function initSliderCarusel(){
        var slick04 = $('#tt-pageContent .js-init-carusel-04'),
          width = window.innerWidth || document.body.clientWidth;
    
        if (!slick04.length) return false;
        if (width <= 1024){
          slick04.not('.slick-initialized').slick({
            lazyLoad: 'progressive',
            dots: true,
            arrows: false,
            infinite: true,
            speed: 1300,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            autoplay:true,
            autoplaySpeed:500,
            pauseOnFocus:false,
            pauseOnHover: false
          });
        } else {
          slick04.filter('.slick-initialized').slick('unslick');
        }
      };
      initSliderCarusel();
      $(window).resize(debouncer(function(e){
        initSliderCarusel();
      }));
    })(jQuery);
  };




 

  $(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction("frontend/element_ready/electrician-nivo-slider.default",nivoSlider);
    elementorFrontend.hooks.addAction("frontend/element_ready/electrician-bulb.default",bulbSlider);
    elementorFrontend.hooks.addAction("frontend/element_ready/electrician-testimonials-1.default",testimonials_1);
    elementorFrontend.hooks.addAction("frontend/element_ready/elec_price.default",priceboxcarousel);
    elementorFrontend.hooks.addAction("frontend/element_ready/elec_count.default",counterCarousel);
    elementorFrontend.hooks.addAction("frontend/element_ready/elec_count.default",counterCarouselcount);

    elementorFrontend.hooks.addAction("frontend/element_ready/ele_latest_news.default",newspreviewcarousel);
    elementorFrontend.hooks.addAction("frontend/element_ready/electrician-brands.default",brands_carousel);

   elementorFrontend.hooks.addAction("frontend/element_ready/elec_work_category.default",category_carouselJs);

   elementorFrontend.hooks.addAction("frontend/element_ready/electrician_blog.default",electrician_blogJs);
   elementorFrontend.hooks.addAction("frontend/element_ready/electrician_testimonial_two.default",testiCarousel_two_js);
   elementorFrontend.hooks.addAction("frontend/element_ready/electrician_services_slider.default",testiCarousel_two_js);
   elementorFrontend.hooks.addAction("frontend/element_ready/elec-coupons.default",testiCarousel_two_js);

  });




})(jQuery);
