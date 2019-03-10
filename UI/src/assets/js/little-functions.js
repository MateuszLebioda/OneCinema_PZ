addEventListener("load", function () {
  setTimeout(hideURLbar, 0);
}, false);

function hideURLbar() {
  window.scrollTo(0, 1);
}

$("#slidey").slidey({
  interval: 8000,
  listCount: 5,
  autoplay: false,
  showList: true
});
$(".slidey-list-description").dotdotdot();

$(document).ready(function () {
  $(".dropdown").hover(
    function () {
      $('.dropdown-menu', this).stop(true, true).slideDown("fast");
      $(this).toggleClass('open');
    },
    function () {
      $('.dropdown-menu', this).stop(true, true).slideUp("fast");
      $(this).toggleClass('open');
    }
  );
});

$(document).ready(function () {
  /*
            var defaults = {
            containerID: 'toTop', // fading element id
            containerHoverID: 'toTopHover', // fading element hover id
            scrollSpeed: 1200,
            easingType: 'linear'
            };
        */

  $().UItoTop({
    easingType: 'easeOutQuart'
  });

});

$(document).ready(function () {
  $('.w3_play_icon,.w3_play_icon1,.w3_play_icon2').magnificPopup({
    type: 'inline',
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in'
  });

});

$(window).load(function () {
  $('.flexslider').flexslider({
    animation: "slide",
    start: function (slider) {
      $('body').removeClass('loading');
    }
  });
});

$(document).ready(function () {
  $("#owl-demo").owlCarousel({

    autoPlay: 3000, //Set AutoPlay to 3 seconds

    items: 5,
    itemsDesktop: [640, 4],
    itemsDesktopSmall: [414, 3]

  });

});

jQuery(document).ready(function ($) {
  $(".scroll").click(function (event) {
    event.preventDefault();
    $('html,body').animate({
      scrollTop: $(this.hash).offset().top
    }, 1000);
  });
});

$('.toggle').click(function () {
  // Switches the Icon
  $(this).children('i').toggleClass('fa-pencil');
  // Switches the forms
  $('.form').animate({
    height: "toggle",
    'padding-top': 'toggle',
    'padding-bottom': 'toggle',
    opacity: "toggle"
  }, "slow");
});
