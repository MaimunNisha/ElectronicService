/* Global variables */
"use strict";
var target = 9;
var $document = jQuery(document),
  $window = jQuery(window),
  plugins = {
    mainSlider: jQuery(".nivoSlider"),
    categoryCarousel: jQuery(".category-carousel .container"),
    testimonialsCarousel: jQuery(".testimonials-carousel"),
    brandsCarousel: jQuery(".brands-carousel"),
    textIconCarousel: jQuery(".text-icon-carousel"),
    bulbCarousel: jQuery(".bulb-carousel"),
    gallery: jQuery("#gallery"),
    backToTop: jQuery(".back-to-top"),
    submenu: jQuery("[data-submenu]"),
    isotopeGallery: jQuery(".gallery-isotope"),
    postGallery: jQuery(".blog-isotope"),
    postCarousel: jQuery(".post-carousel"),
    contactForm: jQuery("#contactform"),
    contactFormBox: jQuery("#contactformBox"),
    requestForm: jQuery("#requestform"),
    requestFormPopup: jQuery("#requestformPopup"),
    orderFormPopup: jQuery(".orderForm"),
    googleMapFooter: jQuery("#footer-map"),
    googleMap: jQuery("#map"),
    stickyHeader: jQuery(".page-header.sticky"),
    productImage: jQuery("#mainImage"),
    prdCarousel: jQuery(".prd-carousel"),
    counterBlock: jQuery(".counter-box"),
    counterCarousel: jQuery(".counter-carousel"),
    priceboxCarousel: jQuery(".price-box-carousel"),
    newsCarousel: jQuery(".news-preview-carousel"),
    testimonialsMoreLink: jQuery(".view-more-testimonials"),
    testimonialsLength: jQuery(".testimonials-box"),
    rtltrue: jQuery("body").hasClass("rtl"),
  },
  shiftMenu = jQuery(
    "#slidemenu, #page-content, body, .navbar, .navbar-header"
  ),
  $navbarToggle = jQuery(".navbar-toggle"),
  $dropdown = jQuery(".dropdown-submenu, .dropdown");

/* Initialize All Scripts */
$document.ready(function ($) {
  var classList = $("body").attr("class").split(/\s+/);
  $.each(classList, function (index, item) {
    if (item.indexOf("customwidget_") === 0) {
      var targetclass = item;
      if ($(".service-btn").hasClass(targetclass)) {
        $(".service-btn").each(function () {
          if (
            $(this).hasClass("empty-menu-widget") &&
            $(this).hasClass(targetclass)
          ) {
          }
          $("." + targetclass).click();
          $("." + targetclass).removeClass("collapsed");
        });
      } else {
        $(".service-list li").each(function () {
          if ($(this).hasClass(targetclass)) {
            $(this).addClass("active");
            $(this).find("a").addClass("active");
            $(this).closest(".ul_wapper").prev("a").click();
            $(this).closest(".ul_wapper").prev("a").removeClass("collapsed");
          }
        });
      }
    }
  });

  var windowWidth = window.innerWidth || $window.width();
  var windowH = $window.height();

  // skew block hover effect
  var $skewblock = $(".skew-wrapper"),
    $skew = $(".skew", $skewblock);

  if ($skewblock.length) {
    $skew
      .on("mouseenter", function () {
        $skew.removeClass("active");
        $skew.removeClass("min");
        $skew.not(this).addClass("min");
        $(this).addClass("active");
      })
      .on("mouseleave", function () {
        $skew.removeClass("active");
        $skew.removeClass("min");
      });
  }

  //view more testimonial jquery
  if (parseInt(plugins.testimonialsLength.length) > 9) {
    jQuery(".view-more-testimonials").show();
  } else {
    jQuery(".view-more-testimonials").hide();
  }

  jQuery(".view-more-testimonials").on("click", function () {
    jQuery(".view-more-testimonials").hide();
    jQuery(".more-loader").addClass("visible");

    setTimeout(function () {
      var i = 0;
      var j = 0;
      jQuery(".testimonials-box").each(function () {
        if (jQuery(this).is(":visible")) {
          j++;
        } else {
          if (i < target) {
            var h = jQuery(".testimonials-box:first-child")
              .find(".text")
              .height();
            jQuery(this).show();
            jQuery(this).find(".text").height(h);
            i++;
          }
        }
      });

      if (plugins.testimonialsLength.length == i + j) {
        jQuery(".more-loader").removeClass("visible");
        jQuery(".view-more-testimonials").hide();
      } else {
        jQuery(".more-loader").removeClass("visible");
        jQuery(".view-more-testimonials").show();
      }
    }, 2000);
  });

  /// for coupon popup
  $(".print-link").on("click", function () {
    var post_id = $(this).attr("data-id");
    var popupLoder = $("#popUpLoader_" + post_id);
    popupLoder.addClass("visible");
    $(this).hide();
    $.ajax({
      type: "POST",
      dataType: "html",
      url: my_ajax_object.ajax_url,
      data: {
        action: "coupon_popup_ajax",
        security: my_ajax_object.ajax_nonce_coupon_popup,
        post_id: post_id,
      },
      success: function (data) {
        $("body").append(data);
        $("#myModal").modal("show");
        popupLoder.removeClass("visible");
        $(".print-link").show();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert(errorThrown);
      },
    });
  });


  $(".print-ele-link").on("click", function () {
    var post_id = $(this).attr("data-id");
    var popupLoder = $("#popUpLoader_" + post_id);
    popupLoder.addClass("visible");
    let htm = $(this).closest('.tt-coupons').clone()
   
    $(this).hide();
    $.ajax({
      type: "POST",
      dataType: "html",
      url: my_ajax_object.ajax_url,
      data: {
        action: "coupon_popup_ajax",
        security: my_ajax_object.ajax_nonce_coupon_popup,
        post_id: post_id,
      },
      success: function (data) {
        $("body").append(data);
        $("#couponForm").modal("show");
        let couponModal = $('#couponForm')
        couponModal.find('.modal-body').html(htm)
        popupLoder.removeClass("visible");
        $(".print-ele-link").show();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert(errorThrown);
      },
    });
  });

  // menu hover effect
  if (jQuery(".electric-btn").length) {
    jQuery(".electric-btn").each(function () {
      var $this = jQuery(this),
        btntext = jQuery(".text", $this).text();
      var mask = '<div class="mask"><span>' + btntext + "</span></div>";
      for (var i = 0; i < 6; i++) {
        $this.append(mask);
      }
    });
  }

  // back to top
  if (plugins.backToTop.length) {
    var $button = plugins.backToTop;
    $(window).on("scroll", function () {
      if ($(this).scrollTop() >= 500) {
        $button.addClass("visible");
      } else {
        $button.removeClass("visible");
      }
    });
    $button.on("click", function (e) {
      e.preventDefault();
      $("body,html").animate(
        {
          scrollTop: 0,
        },
        1000
      );
    });
  }

  // image popup
  if (plugins.gallery.length) {
    plugins.gallery.find("a.hover").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });
  }

  if (plugins.mainSlider.length) {
    if (typeof ajax_nivoslider != "undefined") {
      plugins.mainSlider.nivoSlider({
        manualAdvance: false,
        animSpeed: parseInt(ajax_nivoslider.anim_speed),
        pauseTime: parseInt(ajax_nivoslider.pause_time),
        pauseOnHover: JSON.parse(ajax_nivoslider.pause_on_hover),
        effect: ajax_nivoslider.effect,
        directionNav: JSON.parse(ajax_nivoslider.direction_nav),
        prevText: ajax_nivoslider.prev_text,
        nextText: ajax_nivoslider.next_text,
        autoplay: ajax_nivoslider.autoplay,
        controlNav: JSON.parse(ajax_nivoslider.control_nav),
      });
    }
  }

  // testimonials carousel
  if (plugins.testimonialsCarousel.length) {
    if (typeof ajax_testimonial != "undefined") {
      plugins.testimonialsCarousel.slick({
        mobileFirst: false,
        slidesToShow: parseInt(ajax_testimonial.slides_to_show),
        slidesToScroll: parseInt(ajax_testimonial.slides_to_scroll),
        infinite: JSON.parse(ajax_testimonial.infinite),
        autoplay: JSON.parse(ajax_testimonial.autoplay),
        autoplaySpeed: parseInt(ajax_testimonial.autoplay_speed),
        rtl: plugins.rtltrue,
        arrows: JSON.parse(ajax_testimonial.arrows),
        dots: JSON.parse(ajax_testimonial.dots),
      });
    }
  }
  // products carousel
  if (plugins.prdCarousel.length) {
    plugins.prdCarousel.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      dots: false,
      arrows: true,
      responsive: [
        {
          breakpoint: 1299,
          settings: {
            dots: true,
            arrows: false,
          },
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
            dots: true,
            arrows: false,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            dots: true,
            arrows: false,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            dots: true,
            arrows: false,
          },
        },
      ],
    });
  }
  // post carousel
  if (plugins.postCarousel.length) {
    plugins.postCarousel.slick({
      mobileFirst: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      autoplay: false,
      rtl: plugins.rtltrue,
      autoplaySpeed: 2000,
      arrows: false,
      dots: true,
    });
  }

  // brands carousel
  if (plugins.brandsCarousel.length) {
    if (typeof ajax_brand != "undefined") {
      plugins.brandsCarousel.slick({
        mobileFirst: false,
        slidesToShow: parseInt(ajax_brand.slides_to_show),
        slidesToScroll: parseInt(ajax_brand.slides_to_scroll),
        infinite: JSON.parse(ajax_brand.infinite),
        autoplay: JSON.parse(ajax_brand.autoplay),
        autoplaySpeed: parseInt(ajax_brand.autoplay_speed),
        rtl: plugins.rtltrue,
        arrows: JSON.parse(ajax_brand.arrows),
        dots: JSON.parse(ajax_brand.dots),
        // variableWidth: !plugins.rtltrue,
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
              arrows: false,
            },
          },
        ],
      });
    }
  }
  // counter carousel
  if (plugins.counterCarousel.length) {
    if (typeof ajax_counterbox != "undefined") {
      plugins.counterCarousel.slick({
        mobileFirst: false,
        slidesToShow: parseInt(ajax_counterbox.slides_to_show),
        slidesToScroll: parseInt(ajax_counterbox.slides_to_scroll),
        infinite: JSON.parse(ajax_counterbox.infinite),
        autoplay: JSON.parse(ajax_counterbox.autoplay),
        autoplaySpeed: parseInt(ajax_counterbox.autoplay_speed),
        arrows: JSON.parse(ajax_counterbox.arrows),
        dots: JSON.parse(ajax_counterbox.dots),
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
  }
  // bulb carousel
  if (plugins.bulbCarousel.length) {
    if (typeof ajax_bulb != "undefined") {
      plugins.bulbCarousel.slick({
        mobileFirst: JSON.parse(ajax_bulb.mobile_first),
        slidesToShow: parseInt(ajax_bulb.slides_to_show),
        slidesToScroll: parseInt(ajax_bulb.slides_to_scroll),
        infinite: JSON.parse(ajax_bulb.infinite),
        autoplay: JSON.parse(ajax_bulb.autoplay),
        autoplaySpeed: parseInt(ajax_bulb.autoplay_speed),
        arrows: JSON.parse(ajax_bulb.arrows),
        dots: JSON.parse(ajax_bulb.dots),
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
  }
  // pricebox carousel
  if (plugins.priceboxCarousel.length) {
    var pri_obj = plugins.priceboxCarousel.data("slick");
    if (typeof pri_obj == "undefined") {
      plugins.priceboxCarousel.slick({
        mobileFirst: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: false,
        dots: true,
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
  }

  // news carousel
  if (plugins.newsCarousel.length) {
    if (typeof ajax_latestNews != "undefined") {
      plugins.newsCarousel.slick({
        mobileFirst: false,
        slidesToShow: parseInt(ajax_latestNews.slides_to_show),
        slidesToScroll: parseInt(ajax_latestNews.slides_to_scroll),
        infinite: JSON.parse(ajax_latestNews.infinite),
        autoplay: JSON.parse(ajax_latestNews.autoplay),
        autoplaySpeed: parseInt(ajax_latestNews.autoplay_speed),
        arrows: JSON.parse(ajax_latestNews.arrows),
        dots: JSON.parse(ajax_latestNews.dots),
        rtl: plugins.rtltrue,
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
  }
  // mobile carousel
  function slickMobile(carousel, options) {
    if ($(carousel).hasClass("custom-css-add-container")) {
      $(carousel).closest(".custom-css-add").removeClass("custom-css-add");
      $(carousel).removeClass("custom-css-add-container");
    }
    carousel.slick({
      mobileFirst: JSON.parse(options.mobile_first),
      slidesToShow: parseInt(options.slides_to_show),
      slidesToScroll: parseInt(options.slides_to_scroll),
      infinite: JSON.parse(options.infinite),
      autoplay: JSON.parse(options.autoplay),
      autoplaySpeed: parseInt(options.autoplay_speed),
      rtl: plugins.rtltrue,
      arrows: JSON.parse(options.arrows),
      dots: JSON.parse(options.dots),
     
      responsive: [
        {
          breakpoint: 767,
          settings: "unslick",
        },
      ],
    });
  }

  function startCarousel() {
    if (plugins.categoryCarousel.length) {
      if (typeof ajax_cat_car != "undefined") {
        slickMobile(plugins.categoryCarousel, ajax_cat_car);
      }
    }
    if (plugins.textIconCarousel.length) {
      if (typeof ajax_text_icon != "undefined") {
        slickMobile(plugins.textIconCarousel, ajax_text_icon);
      }
    }
  }
  if (windowWidth < 768) {
    startCarousel();
  }
  // END mobile carousel

  // dropdown form
  function popupForm(link) {
    if ($(link).length) {
      $(link).on("click", function (e) {
        var $popup = $(this).next();
        var diff =
          $(window).width() - $popup.offset().left - $popup.outerWidth();
        var maxH = $(document).height() - $popup.offset().top;
        if (diff < 0) {
          $popup.css({
            "margin-left": -$popup.width() * 0.5 + diff - 30,
          });
        }
        if ($popup.offset().left < 0) {
          $popup.css({
            "margin-left":
              -$popup.outerWidth() * 0.5 - $popup.offset().left + 10,
          });
        }
        $popup.find(".quote-form-inside").css({
          "max-height": maxH,
        });
        $(".form-popup").not($popup).removeClass("opened");
        $(".form-popup").not($popup).css({
          "margin-left": "",
        });
        $popup.toggleClass("opened");
        e.preventDefault();
      });
      $(document).on("click", function (event) {
        if (!$(event.target).closest(".form-popup-wrap").length) {
          if ($(".form-popup").hasClass("opened")) {
            $(".form-popup").removeClass("opened");
            $(".form-popup").css({
              "margin-left": "",
            });
          }
        }
      });
    }
  }
  // dropdown form
  // submenu

  // Isotope
  if (plugins.isotopeGallery.length) {
    var $gallery = plugins.isotopeGallery;
    $gallery.imagesLoaded(function () {
      setGallerySize();
    });
    $gallery.isotope({
      itemSelector: ".gallery__item",
      masonry: {
        columnWidth: ".gallery__item:not(.doubleW)",
      },
    });
    jQuery(".view-more-gallery").on("click", function () {
      var item;
      var target = jQuery(this).attr("data-load");
      jQuery(this).hide();
      $.ajax({
        url: target,
        success: function (data) {
          jQuery("#galleryPreload").append(data);
          jQuery("#galleryPreload > div").each(function () {
            item = $(this);
            $gallery.append(item).isotope("appended", item);
            setGallerySize();
          });
        },
      });
    });
   isotopeFilters($gallery);
  }
  // Isotope Filters (for gallery)

  function isotopeFilters(gallery) {
    var gallery = jQuery(gallery);
    if (gallery.length) {
      var container = gallery;
      var optionSets = jQuery(".filters-by-category .option-set"),
        optionLinks = optionSets.find("a");
      optionLinks.on("click", function (e) {
        var thisLink = jQuery(this);
        if (thisLink.hasClass("selected")) return false;
        var optionSet = thisLink.parents(".option-set");
        optionSet.find(".selected").removeClass("selected");
        thisLink.addClass("selected");
        var options = {},
          key = optionSet.attr("data-option-key"),
          value = thisLink.attr("data-option-value");
        value = value === "false" ? false : value;
        options[key] = value;
        if (key === "layoutMode" && typeof changeLayoutMode === "function")
          changeLayoutMode($this, options);
        else {
          container.isotope(options);
          setGallerySize();
        }
        return false;
      });
    }
  }

  function setGallerySize() {
    var windowW = window.innerWidth || $window.width(),
      itemsInRow = 2;
    if (windowW > 1199) {
      itemsInRow = 4;
    } else if (windowW > 767) {
      itemsInRow = 4;
    } else if (windowW > 480) {
      itemsInRow = 2;
    }
    if( jQuery("#page-content").length){
      var containerW = jQuery("#page-content").width();
    }
    if( jQuery("#tt-pageContent").length){
      var containerW = jQuery("#tt-pageContent").width();
    }
    
    var galleryW = containerW / itemsInRow;
    $gallery.find(".gallery__item").each(function () {
      jQuery(this).css({
        width: galleryW + "px",
      });
    });
    $gallery.isotope("layout");
  }

  // Post Isotope
  if (plugins.postGallery.length) {
    var $postgallery = plugins.postGallery;
    $postgallery.imagesLoaded(function () {
      setPostSize();
    });
    $postgallery.isotope({
      itemSelector: ".blog-post",
      masonry: {
        gutter: 30,
        columnWidth: ".blog-post:not(.doubleW)",
      },
    });
  }
  // Spinner

  $(".widget ul").addClass("category-list");

  $(".cart .input-text.qty.text").spinner({
    spin: function (event, ui) {
      $('.woocommerce-cart-form input[name="update_cart"]').prop(
        "disabled",
        false
      );
    },
  });

  $(".header-cart").on("click", ".prd-sm-delete", function () {
    $(this)
      .closest(".prd-sm-item")
      .append(
        '<div class="loader-cart-delete"><img src="' +
          my_ajax_object.loader_img +
          '"></div>'
      );
    var id = $(this).data("product_id");
    var qty = $(this).data("qty");
    $.ajax({
      type: "POST",
      url: my_ajax_object.ajax_url,
      data: {
        action: "remove_item_from_cart",
        product_id: id,
      },
      success: function (res) {
        if (res.fragments) {
          $(".cart-contents").replaceWith(res.fragments["a.cart-contents"]);
          $(".header-cart-dropdown").replaceWith(
            res.fragments["div.header-cart-dropdown"]
          );
        }
        $(".loader-cart-delete").replaceWith("");
      },
    });
  });

  // Header Cart dropdown menu
  function toggleCart(cart, drop) {
    $(document).on("click", cart, function () {
      $(cart).toggleClass("opened");
    });
    $(document).on("click", drop, function () {
      $(cart).toggleClass("opened");
    });
    $(document).on("click", function (e) {
      if (
        !$(e.target).closest(cart).length &&
        !$(e.target).closest(drop).length
      ) {
        if ($(cart).hasClass("opened")) {
          $(cart).removeClass("opened");
        }
      }
    });
  }

  $(document.body).on("added_to_cart", function (a, b, c, d) {
    $("html, body").animate(
      {
        scrollTop: $(".header-cart").offset().top,
      },
      2000
    );
  });

  jQuery.fn.stickyHeader = function () {
    var $header = this,
      $body = $("body"),
      headerOffset,
      stickyH;

    function setHeigth() {
      jQuery(".stspace").remove();
      $header.removeClass("animated is-sticky fadeIn");
      $body.removeClass("hdr-sticky");
      headerOffset = $("#slidemenu", $header).offset().top;
      stickyH = $header.height() + headerOffset;
    }
    setHeigth();
    var prevWindow = window.innerWidth || $(window).width();
    jQuery(window).on("resize", function () {
      var currentWindow = window.innerWidth || $(window).width();
      if (currentWindow != prevWindow) {
        setHeigth();
        prevWindow = currentWindow;
      }
    });
    jQuery(window).scroll(function () {
      var st = getCurrentScroll();
      if (st > headerOffset) {
        if (!$(".stspace").length) {
          $header.after('<div class="stspace"></div>');
          jQuery(".stspace").css({
            height: $header.height() + "px",
          });
        }
        $header.addClass("is-sticky animated fadeIn");
      } else {
        jQuery(".stspace").remove();
        $header.removeClass("animated is-sticky fadeIn");
      }
    });

    function getCurrentScroll() {
      return window.pageYOffset || document.documentElement.scrollTop;
    }
  };

  if (plugins.stickyHeader.length) {
    jQuery(plugins.stickyHeader).stickyHeader();
  }
  if (windowWidth < 769) {
    startCarousel();
  }
  function toggleNavbarMethod(windowWidth) {
    if (windowWidth > 991) {
      jQuery(".dropdown, .dropdown-submenu")
        .on("mouseenter.toggleNavbarMethod", function () {
          jQuery(this)
            .find(".dropdown-menu")
            .first()
            .stop(true, true)
            .fadeIn("fast");
          jQuery(this).toggleClass("open");
        })
        .on("mouseleave.toggleNavbarMethod", function () {
          jQuery(this)
            .find(".dropdown-menu")
            .first()
            .stop(true, true)
            .fadeOut("fast");
          jQuery(this).toggleClass("open");
        });
      jQuery(".dropdown > a, .dropdown-submenu > a").on(
        "click.toggleNavbarMethod",
        function (e) {
          e.preventDefault();
          e.stopPropagation();
          var url = $(this).attr("href");
          if (url) $(location).attr("href", url);
        }
      );
    } else {
      jQuery(".dropdown > a, .dropdown-submenu > a").unbind(
        ".toggleNavbarMethod"
      );
      jQuery(".dropdown, .dropdown-submenu").unbind(".toggleNavbarMethod");
      jQuery(".dropdown > a > .ecaret, .dropdown-submenu > a > .ecaret").unbind(
        ".toggleNavbarMethod"
      );
      jQuery(".dropdown > a > .ecaret, .dropdown-submenu > a > .ecaret").on(
        "click.toggleNavbarMethod",
        function (e) {
          e.preventDefault();
          var $li = jQuery(this).parent().parent("li");
          if ($li.hasClass("opened")) {
            $li.find(".dropdown-menu").first().stop(true, true).slideUp(0);
            $li.removeClass("opened");
          } else {
            $li.find(".dropdown-menu").first().stop(true, true).slideDown(0);
            $li.addClass("opened");
          }
        }
      );
    }
  }
  toggleNavbarMethod(windowWidth);
  toggleCart(".header-cart", ".header-cart-dropdown");
  popupForm(".form-popup-link");

  // slide menu
  var $slideNav = $("#slide-nav"),
    toggler = ".navbar-toggle",
    $pagewrapper = $("#page-content"),
    $navigationwrapper = $(".navbar-header"),
    $slidemenu = $("#slidemenu"),
    menuwidth = "100%",
    slidewidth = "270px",
    menuneg = "-100%",
    slideneg = "-270px";

  $slideNav.after($('<div id="navbar-height-col"></div>'));
  $slideNav.on("click", toggler, function (e) {
    var $this = $(this);
    var $heightCol = $("#navbar-height-col");
    var selected = $this.hasClass("slide-active");
    $slidemenu.stop().animate({
      left: selected ? menuneg : "0px",
    });
    $heightCol.stop().animate({
      left: selected ? slideneg : "0px",
    });
    $pagewrapper.stop().animate({
      left: selected ? "0px" : slidewidth,
    });
    $navigationwrapper.stop().animate({
      left: selected ? "0px" : slidewidth,
    });
    $(toggler).toggleClass("slide-active");
    $slidemenu.toggleClass("slide-active");
    $pagewrapper.toggleClass("slide-active");
    $navigationwrapper.toggleClass("slide-active");
    $(".navbar, body").toggleClass("slide-active");
  });
  // END slide menu
  // Post More

  jQuery(".view-more-post").on("click", function ($) {
    var item;
    var target = $(this).attr("data-load");
    $(this).hide();
    $.ajax({
      url: target,
      success: function (data) {
        $("#postPreload").append(data);
        if (plugins.postGallery.length) {
          $("#postPreload > div").each(function () {
            item = $(this);
            $postgallery.append(item).isotope("appended", item);
            setPostSize();
          });
        }
      },
    });
  });

  function setPostSize() {
    var windowW = window.innerWidth || $window.width(),
      itemsInRow = 1;
    if (windowW > 1199) {
      itemsInRow = 3;
    } else if (windowW > 767) {
      itemsInRow = 2;
    } else if (windowW > 480) {
      itemsInRow = 1;
    }
    var containerW = $("#pageContent .container").width() - 60,
      galleryW = containerW / itemsInRow;
    $postgallery.find(".blog-post").each(function () {
      if (windowW > 767) {
        $(this).css({
          width: galleryW + "px",
        });
      } else {
        $(this).css({
          width: galleryW + 60 + "px",
        });
      }
    });

    setTimeout(function () {
      $(".slick-initialized").slick("setPosition");
      $postgallery.isotope("layout");
    }, 100);
  }

  // slide mobile info
  function slideMobileInfo(toggle, slide) {
    var $toggle = $(toggle),
      $slide = $(slide);
    $toggle.on("click", function (e) {
      if ($("body").hasClass("slide-active")) return false;
      $(this).parent().toggleClass("open");
      $(this).toggleClass("open");
      $slide.slideToggle(300).toggleClass("open");
    });
  }

  // datepicker
  if ($(".datetimepicker").length) {
    $(".datetimepicker").datetimepicker({
      format: "DD/MM/YYYY",
      icons: {
        time: "icon icon-clock",
        date: "icon icon-calendar",
        up: "icon icon-arrow_up",
        down: "icon icon-arrow_down",
        previous: "icon icon-arrow-left",
        next: "icon icon-arrow-right",
        today: "icon icon-today",
        clear: "icon icon-trash",
        close: "icon icon-cancel-music",
      },
    });
  }
  // number counter

  if (plugins.counterBlock.length) {
    function count(options) {
      var $this = $(this);
      options = $.extend({}, options || {}, $this.data("countToOptions") || {});
      $this.countTo(options);
    }
    plugins.counterBlock.each(function () {
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

  slideMobileInfo(".js-info-toggle", ".header-info-mobile");
  // Resize window events
  $window.resize(function () {
    var windowWidth = window.innerWidth || $window.width();
    if (windowWidth < 768) {
      startCarousel();
    } else {
      $(".category-carousel").addClass("custom-css-add");
      $(".category-carousel .container").addClass("custom-css-add-container");
    }
    if (windowWidth > 767 && $navbarToggle.is(":hidden")) {
      shiftMenu.removeClass("slide-active");
    }
    setTimeout(function () {
      if (plugins.isotopeGallery.length) {
        setGallerySize();
      }
      if (plugins.postGallery.length) {
        setPostSize();
      }
    }, 500);
    setTimeout(function () {
      $dropdown.removeClass("opened");
      toggleNavbarMethod(windowWidth);
    }, 1000);
  });

  if (plugins.googleMapFooter.length) {
    var map_id = "footer-map";
    google.maps.event.addDomListener(window, "load", init(map_id));
  }

  if (plugins.googleMap.length) {
    var map_id = "map";
    google.maps.event.addDomListener(window, "load", init(map_id));
  }
});

jQuery(window).load(function () {
  setTimeout(function () {
    jQuery("#loader-wrapper").fadeOut(500);
  }, 500);
});

jQuery(document).ready(function () {
  if (jQuery("body").hasClass("rtl")) {
    var $targets = document.querySelectorAll(".vc_row[data-vc-full-width]");
    NodeList.prototype.forEach = Array.prototype.forEach;
    $targets.forEach(function ($target) {
      var $config = { attributes: true, childList: true, characterData: true };
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (
            mutation.attributeName == "style" &&
            $target.style.left.indexOf("-") != -1
          ) {
            var $right = $target.style.left;
            $target.style.left = "auto";
            $target.style.right = $right;
          }
        });
      });
      observer.observe($target, $config);
    });
  }
});

function init(map_id) {
  if (typeof electrician_gmap_vars == "undefined") {
    return false;
  }
  var mapOptions = {
    zoom: parseInt(electrician_gmap_vars.GMAP_ZOOM),
    scrollwheel: false,
    center: new google.maps.LatLng(
      electrician_gmap_vars.GMAP_LAT,
      electrician_gmap_vars.GMAP_LNG
    ),
    styles: [
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#e9e9e9",
          },
          {
            lightness: 17,
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
          {
            color: "#f5f5f5",
          },
          {
            lightness: 20,
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#ffffff",
          },
          {
            lightness: 17,
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#ffffff",
          },
          {
            lightness: 29,
          },
          {
            weight: 0.2,
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          {
            color: "#ffffff",
          },
          {
            lightness: 18,
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
          {
            color: "#ffffff",
          },
          {
            lightness: 16,
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#f5f5f5",
          },
          {
            lightness: 21,
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#dedede",
          },
          {
            lightness: 21,
          },
        ],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            visibility: "on",
          },
          {
            color: "#ffffff",
          },
          {
            lightness: 16,
          },
        ],
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            saturation: 36,
          },
          {
            color: "#333333",
          },
          {
            lightness: 40,
          },
        ],
      },
      {
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
          {
            color: "#f2f2f2",
          },
          {
            lightness: 19,
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#fefefe",
          },
          {
            lightness: 20,
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#fefefe",
          },
          {
            lightness: 17,
          },
          {
            weight: 1.2,
          },
        ],
      },
    ],
  };
  var mapElement = document.getElementById(map_id);
  var map = new google.maps.Map(mapElement, mapOptions);
  var image = electrician_gmap_vars.GMAP_THEME_PATH + "/images/map-marker.png";
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(
      electrician_gmap_vars.GMAP_LAT,
      electrician_gmap_vars.GMAP_LNG
    ),
    map: map,
    icon: image,
  });
}
/* Light YouTube Embeds by @labnol */
/* Web: http://labnol.org/?p=27941 */
document.addEventListener("DOMContentLoaded", function () {
  var div,
    n,
    v = document.getElementsByClassName("youtube-player");
  for (n = 0; n < v.length; n++) {
    div = document.createElement("div");
    div.setAttribute("data-id", v[n].dataset.id);
    div.innerHTML = labnolThumb(v[n].dataset.id);
    div.onclick = labnolIframe;
    v[n].appendChild(div);
  }
});

function labnolThumb(id) {
  //data image
  var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
    play = '<div class="play"></div>';
  return thumb.replace("ID", id) + play;
}

function labnolIframe() {
  var iframe = document.createElement("iframe");
  var embed = "https://www.youtube.com/embed/ID?autoplay=1";
  iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allowfullscreen", "1");
  this.parentNode.replaceChild(iframe, this);
}
