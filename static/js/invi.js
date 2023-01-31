import Cookies from '../modules/js.cookie.esm.min.js';
import PhotoSwipeLightbox from '../modules/photoswipe/photoswipe-lightbox.esm.min.js'; // also imports core
import PhotoSwipe from '../modules/photoswipe/photoswipe.esm.min.js';

//Preloader
$(window).on('load', function () { // makes sure the whole site is loaded 
    $('#status').fadeOut(); // will first fade out the loading animation 
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website. 
    $('body').delay(350).css({ 'overflow': 'visible' });
})

$(document).ready(function () {
    // Handle Website Cookies
    {
        var notification = $('#cookie-notification');
        if (notification.length) {
            var allow_other_cookies = Cookies.get("allow-nonfunctional-website-cookies");
            if (allow_other_cookies !== null && typeof allow_other_cookies !== "undefined") {
                notification.hide();
            }
        }

        if ($('#decline-cookies').length) {
            $('#decline-cookies').on("click", function () {
                handleWebsiteCookies(false);
            });
        }
        if ($('#accept-cookies').length) {
            $('#accept-cookies').on("click", function () {
                handleWebsiteCookies(true);
            });
        }
    }

    // Initialize image gallery
    const lightbox = new PhotoSwipeLightbox({
        gallery: '#invi-gallery',
        children: 'a',
        pswpModule: PhotoSwipe,
    });
    lightbox.init();

    // Handle video embedding
    {
        // Check on page load if user gave consent to youtube cookies.
        // If true, show video immediately.
        // If false, show placeholder image and request for consent or direct link.
        var allow_youtube_cookies = Cookies.get("allow-youtube-cookies");

        var notification = document.getElementsByClassName("video-embed-notification")[0];
        if (notification !== null && typeof notification !== "undefined") {
            if (allow_youtube_cookies === null) {
                notification.style.display = "block";
            } else {
                if (allow_youtube_cookies === "true") {
                    notification.style.display = "none";
                } else {
                    notification.style.display = "block";
                }
            }
        }

        if (allow_youtube_cookies === "true") {
            var embed_video = document.getElementsByClassName("embed-video")[0];
            if (typeof embed_video === "undefined") {
                // was undefined, append video
                var video_id = getVideoID();
                appendVideo(video_id);
            }
        }

        if ($('.show-video').length) {
            $('.show-video').on("click", acceptCookiesAndShowYouTubeVideo);
        }
    }

    // Mobile menu toggle
    if ($('.navbar-burger').length) {
        $('.navbar-burger').on("click", function () {
            var menu_id = $(this).attr('data-target');
            $(this).toggleClass('is-active');
            $("#" + menu_id).toggleClass('is-active');
            $('.navbar.is-light').toggleClass('is-dark-mobile')
        });
    }

    // Animate left hamburger icon and open sidebar
    $('.menu-icon-trigger').on("click", function (e) {
        e.preventDefault();
        $('.menu-icon-wrapper').toggleClass('open');
        $('.sidebar').toggleClass('is-active');
    });

    // Close sidebar
    $('.sidebar-close').on("click", function () {
        $('.sidebar').removeClass('is-active');
        $('.menu-icon-wrapper').removeClass('open');
    })

    // Sidebar menu
    if ($('.sidebar').length) {
        $(".sidebar-menu > li.have-children > a").on("click", function (i) {
            i.preventDefault();
            if (!$(this).parent().hasClass("active")) {
                $(".sidebar-menu li ul").slideUp();
                $(this).next().slideToggle();
                $(".sidebar-menu li").removeClass("active");
                $(this).parent().addClass("active");
            }
            else {
                $(this).next().slideToggle();
                $(".sidebar-menu li").removeClass("active");
            }
        });
    }

    // Navbar Clone
    if ($('#navbar-clone').length) {
        $(window).on("scroll", function () {    // this will work when your window scrolled.
            var height = $(window).scrollTop(); // getting the scrolling height of window
            if (height > 50) {
                $("#navbar-clone").addClass('is-active');
            } else {
                $("#navbar-clone").removeClass('is-active');
            }
        });
    }

    // Reveal elements on scroll so animations trigger the right way
    var $window = $(window),
        win_height_padded = $window.height() * 1.1,
        isTouch = Modernizr.touch;

    $window.on('scroll', revealOnScroll);

    function revealOnScroll() {
        var scrolled = $window.scrollTop();
        $(".revealOnScroll:not(.animated)").each(function () {
            var $this = $(this),
                offsetTop = $this.offset().top;

            if (scrolled + win_height_padded > offsetTop) {
                if ($this.data('timeout')) {
                    window.setTimeout(function () {
                        $this.addClass('animated ' + $this.data('animation'));
                    }, parseInt($this.data('timeout'), 10));
                } else {
                    $this.addClass('animated ' + $this.data('animation'));
                }
            }
        });
    }

    // Back to Top button behaviour
    var pxShow = 600;
    var scrollSpeed = 500;
    $(window).on("scroll", function () {
        if ($(window).scrollTop() >= pxShow) {
            $("#backtotop").addClass('visible');
        } else {
            $("#backtotop").removeClass('visible');
        }
    });
    $('#backtotop a').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, scrollSpeed);
        return false;
    });

    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .on("click", function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 550, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });
})

/**
 * handleWebsiteCookies saves user preferences regarding saving cookies.
 * @return {boolean} whether to accept cookies beyond the necessary functional ones.
 */
function handleWebsiteCookies(accept) {
    Cookies.set("allow-nonfunctional-website-cookies", accept, { expires: 730, sameSite: 'lax' }); // i.e. in 2 years

    var notification = $("#cookie-notification");
    if (notification.length) {
        notification.hide();
    }
}

/**
 * acceptCookiesAndShowYouTubeVideo user clicked on youtube cookie consent button beneath video placeholder.
 */
function acceptCookiesAndShowYouTubeVideo() {
    Cookies.set("allow-youtube-cookies", true, { expires: 730, sameSite: 'lax' }); // i.e. in 2 years

    // hide consent notification
    var notification = document.getElementsByClassName("video-embed-notification")[0];
    if (notification !== null) {
        notification.style.display = "none";
    }

    var video_id = getVideoID();
    appendVideo(video_id);
}

/**
 * getVideoID returns the video id or an empty string.
 * @return {string} The video id to load
 */
function getVideoID() {
    // get video id
    var consent_button = document.getElementsByClassName("show-video")[0];
    if (consent_button === null) {
        return "";
    }
    var video_id = consent_button.getAttribute("data-video-id")
    if (video_id === null) {
        return "";
    }

    return video_id;
}

/**
 * appendVideo inserts iframe requires to display the video.
 * @param {string} video_id The video id to load
 */
function appendVideo(video_id) {
    var wrapper = document.getElementsByClassName("embedded-video-parent")[0];
    wrapper.style.display = "block";
    const span = document.createElement("span");
    span.innerHTML =
        '<iframe class="embed-video" allowfullscreen="" src="https://www.youtube-nocookie.com/embed/' + video_id + '?rel=0&iv_load_policy=3" frameborder="0"></iframe>';
    wrapper.appendChild(span);
}
