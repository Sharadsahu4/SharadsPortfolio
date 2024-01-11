let locat = window.location.host;
// console.log(locat);

var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
    return p.toString() === "[object SafariRemoteNotification]";
})(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
// console.log('Safari : ' + isSafari, 100);


// if (locat != "localhost:880") {

// if ($(window).width() > 990) {
//     if (!isSafari) {
//         console.log($('body').hasClass('homePage'));
//         /* If Not Safari */
//         if ($('body').hasClass('homePage')) {
//             $("body").niceScroll({
//                 scrollspeed: 150,
//                 mousescrollstep: 80,
//             });


//             /* ------
//             Stop Animation Starts
//             ----- */
//             var stopSecController = new ScrollMagic.Controller();

//             $('.stopSec').each(function () {
//                 let dataStop = $(this).attr('data-stop');
//                 if (dataStop == undefined) {
//                     dataStop = 0.1;
//                 }
//                 new ScrollMagic.Scene({
//                     triggerElement: this,
//                     triggerHook: dataStop
//                 })
//                     .on("enter", function (e) {
//                         $("body").getNiceScroll().remove();

//                         $("body").niceScroll({
//                             scrollspeed: 150,
//                             mousescrollstep: 80,
//                         });
//                     })
//                     // .addIndicators({
//                     //     'name': 'stop'
//                     // })
//                     .addTo(stopSecController);
//             });
//             /* Stop Animation Ends */

//         } else {
//             $("body").niceScroll({
//                 scrollspeed: 60,
//                 mousescrollstep: 50,
//             });
//         }
//     }
// }

if (window.location.host != "localhost:8080" && window.location.host != "localhost") {
    $(document).bind("contextmenu", function (e) {
        e.preventDefault();
    });
    $(document).keydown(function (e) {
        if (e.which === 123) {
            return false;
        }
    });
}

// $('.beta-pop,.beta-pop-overlay').show();
// $(document).on('click', '.beta-okay', function () {
//     $('.beta-pop,.beta-pop-overlay').hide();
// });

// }


$('.sWeOfferDesignComponent').load('content.html .sWeOfferDesign');
$('.deskFooter').load('content.html .innerFooter', function () {
    if ($(window).width() <= 800) {
        $(document).on('click', 'footer h4', function () {
            $(this).toggleClass('active');
            $(this).next().slideToggle();
        });
    }
});


$('.deskHeader').load('content.html .innerHeader', function () {
    $(document).on('click', '.menu-icon', function () {
        $('.mob-overlay').addClass('in');
        $('.mob-menu').addClass('in');
    });
    $(document).on('click', '.mob-overlay,.mob-menu-close', function () {
        $('.mob-overlay').removeClass('in');
        $('.mob-menu').removeClass('in');
    });
    if ($(window).width() <= 800) {
        $(document).on('click', '.mobMenuTrigger', function () {
            $(this).toggleClass('active');
            $(this).next().slideToggle();
        });
    }
});

/*=================================
Sticky Header Starts
=================================*/
function fixedHeader() {
    var sticky = $('header'),
        scroll = $(window).scrollTop();

    if (scroll >= 10) sticky.addClass('fixHeader');
    else sticky.removeClass('fixHeader');
}

fixedHeader();
$(window).scroll(function (e) {
    fixedHeader();
});
/* Sticky Header Ends */
$('.quote-container').load('content.html .h-quote-box', function () {
    if ($(window).width() <= 800) {
        /* Mob Quotation Button Starts */
        new ScrollMagic.Scene({
            triggerElement: '.mob-quote-btn-trigger',
            triggerHook: 1
        })
            .on('start', function () {
                $('.mob-quote-btn').toggleClass('in');
            })
            // .addIndicators({
            //     'name': 'mob-quote-btn'
            // })
            .addTo(fadeTweenController);
        /* Mob Quotation Button Ends */
    }
});
$('.quotePopComponent').load('content.html .quote-pop-container', function () {
    // $('#quote_form').validate();
    var tlQuotePop = gsap.timeline({
        paused: true
    });
    tlQuotePop
        .to('.quote-pop-container', {
            duration: 1,
            ease: Elastic.easeOut.config(1, 0.8),
            css: {
                'opacity': 1,
                'top': '50%',

                '-webkit-transform': 'translate(-50%, -50%)',
                'transform': 'translate(-50%, -50%)',
            }
        })
        .to('.quote-pop-layer', {
            duration: 1,
            autoAlpha: 0.2
        }, 0.1);



    var countryListMainData;
    $.getJSON("countryList.json", function (data) {
        // console.log(data);
        countryListMainData = data;
        for (let i = 0; i < data.length; i++) {
            $('#countryList').append("<option value='" + data[i].name + "'>");
        }
    }).fail(function () {
        console.log("An error has occurred.");
    });

    $(document).on('change', '#countryData', function (e) {
        let val = $(this).val();
        // console.log(val);
        // console.log(countryListMainData);
        for (let i = 0; i < countryListMainData.length; i++) {
            if (countryListMainData[i].name.toLowerCase() == val.toLowerCase()) {
                let dial_code = countryListMainData[i].dial_code;
                // console.log(dial_code);
                $('.coutryCode').html(dial_code);
                return false;
            }
        }
    });



    var responseLoader = lottie.loadAnimation({
        container: document.getElementById('responseLoader'),
        path: '',
        renderer: 'svg',
        loop: false,
        autoplay: false,
    });
    var responseSuccess = lottie.loadAnimation({
        container: document.getElementById('responseSuccess'),
        path: '/json/responseSuccess.json',
        renderer: 'svg',
        loop: false,
        autoplay: false,
    });
    var responseFail = lottie.loadAnimation({
        container: document.getElementById('responseFail'),
        path: '/json/responseFail.json',
        renderer: 'svg',
        loop: false,
        autoplay: false,
    });


    function resetQuoteForm() {
        $('#responseContainer').html('');
        $('#responseContainer').removeClass('in');

        responseLoader.setDirection(-1);
        responseLoader.setSpeed(10);
        responseLoader.play();

        responseSuccess.setDirection(-1);
        responseSuccess.setSpeed(10);
        responseSuccess.play();

        responseFail.setDirection(-1);
        responseFail.setSpeed(10);
        responseFail.play();

        $('#responseLoader').show();
        $('#responseSuccess').hide();
        $('#responseFail').hide();
        $('#max').hide();
    }

    var quoteCount = 0;
    $(document).on('click', '.quote-open-btn', function () {
        tlQuotePop.play();
        $('.qt-box,.quote-back').hide();
        $('.qt-box-1,.quoteMainHeading,.quote-close').show();
        $('#quote_form').trigger("reset");
        quoteCount = 1;

        resetQuoteForm();
    });
    $(document).on('click', '.quote-close,.qt-final-btn', function () {
        tlQuotePop.reverse();
    });
    var quoteService, quoteWork;
    var quoteService, qouteAmount;
    $(document).on('click', "input[name='quote-service[]']", function () {
        // console.log($(this).val());
        quoteService = [];
        $("input[name='quote-service[]']:checked").each(function () {
            quoteService.push($(this).val());
        });
        // console.log(quoteService.length);
        if (quoteService.length > 0) {
            $('.service_error').addClass('d-none');
        } else {
            $('.service_error').removeClass('d-none');
        }
    });
    $(document).on('click', ".servSelBtn", function () {
        quoteService = [];
        $("input[name='quote-service[]']:checked").each(function () {
            quoteService.push($(this).val());
        });
        // console.log(quoteService.length);
        if (quoteService.length > 0) {
            $('.service_error').addClass('d-none');
            $('.qt-box').slideUp();
            $('.qt-box-2,.quote-back').slideDown();
            quoteCount++;
        } else {
            $('.service_error').removeClass('d-none');
        }
    });
    $(document).on('click', "input[name='quote-work']", function () {
        $('.qt-box').slideUp();
        $('.qt-box-3').slideDown();
        quoteCount++;
        quoteWork = $(this).val();
    });
    $(document).on('click', "input[name='quote-amount']", function () {
        $('.qt-box').slideUp();
        $('.qt-box-4').slideDown();
        quoteCount++;
        qouteAmount = $(this).val();
    });
    $(document).on('click', '.projDescBtn', function () {
        $('.qt-box').slideUp();
        $('.qt-box-5').slideDown();
        quoteCount++;
    });
    $(document).on('click', '.projDescBtnBoxes', function () {
        $('.qt-box').slideUp();
        $('.qt-box-6').slideDown();
        quoteCount++;
    });
    $(document).on('click', '.quote-back', function () {
        let qt = --quoteCount;
        $('.qt-box').slideUp();
        $('.qt-box-' + quoteCount).slideDown();
        if (qt == 1) {
            $('.quote-back').slideUp();
        }

        if (quoteCount == 4) {
            resetQuoteForm();
        }
    });
    var testEmail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    emailValidated = false;
    $(document).on('input', '.email', function () {
        val = $(this).val();
        if (val.length > 0) {
            if (testEmail.test(this.value)) {
                $(this).next().addClass('d-none');
                emailValidated = true;
            } else {
                $(this).next().removeClass('d-none');
                emailValidated = false;
            }
        } else {
            $(this).next().removeClass('d-none');
            emailValidated = false;
        }
    });
    $(document).on('input', '.name', function () {
        val = $(this).val();
        if (val.length > 0) {
            $(this).next().addClass('d-none');
        } else {
            $(this).next().removeClass('d-none');
        }
    });

    $(document).on('click', '.quoteDetailsBtn', function (e) {
        e.preventDefault();
        var projectDescription = $("textarea[name=projectDescription]").val();
        // var projectAmount = $("input[name=quote-amount]").val();
        var projectgoals = $("textarea[name=projectgoals]").val();
        var name = $('#qName').val().trim();
        var email = $('#qEmail').val().trim();
        var mobile = $('#qMobile').val().trim();
        var country = $('#countryData').val().trim();
        var coutryCode = $('.coutryCode').val();

        if (name != '') {
            $('.name_error').addClass('d-none');
        } else {
            $('.name_error').removeClass('d-none');
        }
        if (email != '') {
            $('.email_error').addClass('d-none');
        } else {
            $('.email_error').removeClass('d-none');
        }
        if (name != '' && emailValidated) {
            $('.qt-box,.quoteMainHeading,.quote-back,.quote-close').slideUp();
            $('.qt-box-7').slideDown();
            quoteCount++;

            responseLoader.setDirection(1);
            responseLoader.setSpeed(1);
            responseLoader.play();

            
        

            

            $.ajax({
                url: "https://script.google.com/macros/s/AKfycbzH2G-EHV1X5Uv10d-oMXCDKtkMSdEtR-4D-jDD2mQPPfI1ZciEDSdnsmVw7JH7NNE/exec",
                // headers: { "Access-Control-Allow-Origin": "*" },
                type: "post",
                data: {
                    "name": name,
                    "email": email,
                    "mobileNo": coutryCode + mobile,
                    "country": country,
                    "description": projectDescription ? projectDescription : null,
                    "descriptiongoals": projectgoals ? projectgoals : null,
                    "services": JSON.stringify(quoteService),
                    "workType": quoteWork,
                    "workamount": qouteAmount,
                },
                success: function (response) {
                    console.log("AJAX success function triggered.");
    console.log("Response received:", response);
                    // console.log(response);
                    setTimeout(() => {
                        
                        if (response.success) {
                            $('#responseLoader').show();
                            $('#responseSuccess').show();
                            responseSuccess.setDirection(1);
                            responseSuccess.setSpeed(1);
                            responseSuccess.play();

                            $('.quote-back').slideUp();
                            $('.qt-final-btn').slideDown();
                        } 
                        
                        $('#responseContainer').html(response.message);
                        $('#responseContainer').addClass('in');
                        $('#max').show();
                    }, 1000);
                }

            });



            

        } else {
            return false;
        }
        e.preventDefault();

    });

});



/* ------
Image Animation Starts
----- */
var fadeTweenController = new ScrollMagic.Controller();
var bottomTriggerFadeUp = 0.9;
var fadeInUpTime = 1;

function fadeTween(elem) {
    var fadeTween = TweenMax.fromTo(elem, fadeInUpTime, {
        autoAlpha: 0,
        y: 50
    }, {
        autoAlpha: 1,
        y: 0,
        delay: $(elem).attr('data-delay')
    });

    return fadeTween;
}
$('.fadeInUp').each(function () {

    new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: bottomTriggerFadeUp
    })
        .setTween(fadeTween(this))
        // .reverse(false)
        .addTo(fadeTweenController);
});

/* Image Animation Ends */

/* ------
Image Animation Starts
----- */
var bottomTriggerFade = 0.8;
var fadeInTime = 1.5;

$(".fadeIn").each(function () {
    function fadeTween(elem) {

        var fadeTween = TweenMax.fromTo(elem, fadeInTime, {
            autoAlpha: 0,
        }, {
            autoAlpha: 1,
            delay: $(elem).attr('data-delay')
        });

        return fadeTween;
    }
    new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: bottomTriggerFade
    })
        .setTween(fadeTween(this))
        // .reverse(false)
        .addTo(fadeTweenController);
});

/* Image Animation Ends */

$(window).on('load', function () {
    /* Dark Mode */
    // var hr = (new Date()).getHours();

    // if (hr > 6 && hr < 20) {
    //     // console.log('day');
    // } else {
    //     // console.log('night');
    //     // console.log($(".homeHdr").length > 0);
    //     if ($(".homeHdr").length > 0) {
    //         setTimeout(() => {
    //             $('.darkModeCheck').trigger('click');
    //         }, 1);
    //     }

    // }
    $(document).on('change', '.darkModeCheck', function () {
        if ($(this).prop("checked") == true) {
            $("html").attr("data-theme", "dark");

            $('.themeImg').each(function () {
                let src = $(this).attr('data-dark');
                $(this).attr('src', src);
            });
        } else {
            $("html").attr("data-theme", "light");

            $('.themeImg').each(function () {
                let src = $(this).attr('data-light');
                $(this).attr('src', src);
            });
        }
    });

    $('.darkModeComponent').load('content.html .dark-mode-container', function () {
        /* Open Dark Mode */
        var tlDarkModePop = gsap.timeline({
            paused: true
        });
        tlDarkModePop
            .to('.switch', {
                duration: 2,
                ease: Elastic.easeOut.config(1, 0.8),
                css: {
                    'opacity': 1,
                    'top': '0',
                }
            })
            .to('.switch h4', {
                duration: 1,
                ease: Elastic.easeOut.config(1, 0.8),
                css: {
                    'opacity': 1,
                    'top': '70px',
                }
            }, '-=1')
            .to('.darkArrow', {
                duration: 1,
                ease: Elastic.easeOut.config(1, 0.8),
                x: -10,
                autoAlpha: 1
            }, '-=0.5')
            .to('.switch', {
                duration: 2,
            })
            .to('.darkArrow', {
                duration: 1,
                ease: Elastic.easeOut.config(1, 0.8),
                x: 0,
                autoAlpha: 0
            })
            .to('.switch h4', {
                duration: 1,
                ease: Elastic.easeOut.config(1, 0.8),
                css: {
                    'opacity': 0,
                    'top': 0,
                }
            }, '-=0.7');

        setTimeout(() => {
            tlDarkModePop.play();
        }, 1000);

        /* Close Dark Mode */
        var tlDarkModePopClose = gsap.timeline({
            paused: true
        });
        tlDarkModePopClose
            // .to('.dmHide', {
            //     duration: 0.5,
            //     autoAlpha: 0
            // })
            .to('.darkModeComponent', {
                duration: 0.5,
                // ease: Elastic.easeOut.config(1, 0.8),
                css: {
                    'width': '60px',
                    'height': '30px',
                    'padding': 0,
                    'background': 'transparent',
                }
            }, 0.1)
            .to('.switch', {
                duration: 0.5,
                // ease: Elastic.easeOut.config(1, 0.8),
                css: {
                    'top': '0',
                    'left': '0',
                    'margin-left': '0',
                }
            }, 0.1)
            // .to('.dmHide', {
            //     duration: 0.1,
            //     css: {
            //         'display': 'none',
            //     }
            // })
            .to('.darkModeComponent', {
                duration: 2,
                ease: Elastic.easeOut.config(1, 0.8),
                css: {
                    '-webkit-transform': 'translate(0,0)',
                    '-moz-transform': 'translate(0,0)',
                    '-o-transform': 'translate(0,0)',
                    '-ms-transform': 'translate(0,0)',
                    'transform': 'translate(0,0)',

                    'top': 'inherit',
                    'left': 'inherit',
                    'opacity': 1,
                    'bottom': '50px',
                    'right': '50px',
                }
            })
            .to('.dark-mode-layer', {
                duration: 1,
                autoAlpha: 0
            }, 0.1);

        $(document).on('click', '.dark-mode-close', function () {
            tlDarkModePopClose.play();
            $('.darkModeComponent').addClass('in');
        });
    });
    /* Dark Mode Ends */

});

// document.addEventListener("DOMContentLoaded", function () {

//     let elements = document.getElementById('lionCanvas');

//     for (var i = 0; i < elements.length; i++) {

//         elements[i].addEventListener('play', (event) => {
//             // console.log(event.target.shadowRoot.querySelector('svg').style.transform);
//             event.target.shadowRoot.querySelector('svg').style.transform = '';
//         });
//         elements[i].play(); // trigger (again)

//     }
// });
