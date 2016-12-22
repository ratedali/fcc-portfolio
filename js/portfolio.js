'use strict';

(function($) {
    // dynamically find when the navbar should increase height 
    $('.navbar').affix({
        offset: {
            top() {
                const headerHeight = Math.ceil($('header').height());
                const navHeight = Math.floor($('.navbar').height());
                const delta = Math.min(100, Math.abs(100 - headerHeight));
                const offset = headerHeight - navHeight - delta;
                return offset;
            }
        }
    });

    // animate section scrolling
    $('.nav-item a').click(function() {
        $('body').stop().animate({scrollTop: ($($(this).attr('href')).offset().top)},
                {duration: 1250, easing: 'swing'});
    });

    // close the navigation menu when an item is selected
    $('.nav-item a').click(function() {
        $('.navbar-toggle:visible').click();
    });

})(jQuery);
