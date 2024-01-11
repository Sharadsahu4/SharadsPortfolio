$(document).on('ready', function() {

    // document.addEventListener('invalid', (function () {
    //     return function (e) {
    //         e.preventDefault();
    //         document.getElementsById("first").focus();
    //         document.getElementsById("second").focus();
    //         // document.getElementsById("countryData").focus();
    //     };
    // })(), true);

    var name;
    var company;
    var email;
    var contact;
    var testEmail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    emailValidated = false;
    $(document).on('input', '.style4', function() {
        val = $(this).val();
        // console.log(val.length);
        if (val.length > 0) {
            $(this).parent().find('.error').addClass('d-none');
        } else {
            $(this).parent().find('.error').removeClass('d-none');
        }
    });
    $(document).on('input', '.email', function() {
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

    var responseLoader = lottie.loadAnimation({
        container: document.getElementById('contResponseLoader'),
        path: './json/loader.json',
        renderer: 'svg',
        loop: true,
        autoplay: false,
    });
    var responseSuccess = lottie.loadAnimation({
        container: document.getElementById('contResponseSuccess'),
        path: './json/responseSuccess.json',
        renderer: 'svg',
        loop: false,
        autoplay: false,
    });
    var responseFail = lottie.loadAnimation({
        container: document.getElementById('contResponseFail'),
        path: './json/responseFail.json',
        renderer: 'svg',
        loop: false,
        autoplay: false,
    });

    var countryListMainData;
    $.getJSON("countryList.json", function(data) {
        // console.log(data);
        countryListMainData = data;
        for (let i = 0; i < data.length; i++) {
            $('#countryList').append("<option value='" + data[i].name + "'>");
        }
    }).fail(function() {
        // console.log("An error has occurred.");
    });


    $(document).on('change', '#countryData', function(e) {
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

    var req_service = [];
    $(document).on('change', '.ckbox', function(e) {
        // if ($(this).ischecked());
        let req_service_ref = [];
        $.each($("input[name='service']:checked"), function() {
            // console.log($(this).val());
            req_service_ref.push($(this).val());
        });
        req_service = req_service_ref;
        // console.log(req_service.length);
        if (req_service.length > 0) {
            $('.serv_error').addClass('d-none');
        } else {
            $('.serv_error').removeClass('d-none');
        }
    });

    var overError = false;
    $('#submit').click(function(e) {
        overError = false;
        $('.error').addClass('d-none');
        e.preventDefault();

        // $('.progress-button elastic send').addClass('error');   

        if (!emailValidated) {
            $(".email_error").removeClass('d-none');
            overError = true;
        }

        $(".style4").each(function(index) {
            val = $(this).val().trim();
            // console.log(val.length);
            if (val.length > 0) {
                $(this).parent().find('.error').addClass('d-none');
            } else {
                $(this).parent().find('.error').removeClass('d-none');
                overError = true;
            }
        });

        if (req_service.length == 0) {
            $('.serv_error').removeClass('d-none');
            overError = true;
        }

        if (overError) {
            return false;
        }

        $("html, body").animate({
            scrollTop: 0
        }, 1000);
        responseLoader.play();

        // console.log('commentForm');
        // e.preventDefault();
        var name = $('#first').val();
        var email = $('#second').val();
        var countryData = $('#countryData').val();
        var coutryCode = $('.coutryCode').val();
        var contact = $('#thired').val();
        var c_name = $('#fourth').val();
        var comment = $('#fifth').val();
        // var pageURL = window.location.href;

        // alert(req_service);
        $('.information').addClass('sucess');
        $('.success-msg').addClass('show');
        // $('.progress-button').addClass('sucess');
        $('.progress-button').hide();
        $('.back-pg').hide();

        // console.log(name, email, countryData, contact, c_name, JSON.stringify(req_service), comment);
        // return;

        // $.ajax({
        //     type: "POST",
        //     url: "contact.php",
        //     data: {
        //         name: name,
        //         email: email,
        //         countryData: countryData,
        //         contact: coutryCode + contact,
        //         c_name: c_name,
        //         comments: comment,
        //         req_service: JSON.stringify(req_service)
        //     },
        //     success: function (response) {
        //         // console.log(response);
        //         var responseData = JSON.parse(response);

        //         setTimeout(() => {
        //             if (responseData.response == 200) {
        //                 // $('#contResponseLoader').hide();
        //                 // $('#contResponseSuccess').show();
        //                 window.location.replace("thank-you.html");
        //                 // responseSuccess.play();
        //             } else {
        //                 $('#contResponseLoader').hide();
        //                 $('#contResponseFail').show();
        //                 responseFail.play();
        //                 $('#contResponseContainer').html(response.message);
        //                 $('#contResponseContainer').addClass('in');
        //             }
        //             $('#contResponseContainer').html(responseData.message);
        //             $('#contResponseContainer').addClass('in');
        //             $('#contWait').hide();
        //         }, 1000);

        //     }
        // }).done(function () {
        // });


        $.ajax({
            url: "https://leo9studio.us/contact-us",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            type: "post",
            data: {
                "name": name,
                "email": email,
                "country": countryData,
                "mobileNo": coutryCode + contact,
                "companyName": c_name,
                "inqueryFor": JSON.stringify(req_service),
                "comments": comment
            },
            success: function(response) {
                // console.log(response); 
                setTimeout(() => {
                    if (response.success) {
                        // $('#contResponseLoader').hide();
                        // $('#contResponseSuccess').show();
                        window.location.replace("thank-you.html");
                        // responseSuccess.play();
                    } else {
                        $('#contResponseLoader').hide();
                        $('#contResponseFail').show();
                        responseFail.play();
                        $('#contResponseContainer').html(response.message);
                        $('#contResponseContainer').addClass('in');
                    }
                    $('#contWait').hide();
                }, 1000);
            }
        }).done(function() {

        });

    });


    function resetTime() {
        let timelist = document.querySelectorAll('.zone');

        let x = 0;
        timelist.forEach(zone => {
            x++;
            // console.log(x); 
            if (zone.childElementCount <= 0) {
                zone.appendChild(document.querySelector('#zone-template').firstElementChild
                    .cloneNode(true));
                zone.appendChild(document.querySelector('#zone-template').lastElementChild
                    .cloneNode(true));
            }
            // console.log(zone.childElementCount);
            //change template
            //zone.querySelector('.name').innerText = zone.id

            let time_zone = zone.getAttribute('time-zone');
            let localTime = getTimeByZone(time_zone, x);
            //let timeNum = getTimeByZone(time_zone)


            //zone.querySelector('.date').innerText = localTime.date
            zone.querySelector('.time').innerText = localTime.time;

        });
    }

    setInterval(resetTime, 1000);
    //resetTime();
    function getTimeByZone(timeZone, x) {

        let now = new Date(Date.now());
        let month = now.toLocaleDateString('en-US', {
            timeZone,
            month: 'long'
        }).substring(0, 3);
        let localDateString = now.toLocaleDateString('en-US', {
            timeZone
        });


        let date = new Date(localDateString).getDate();
        let year = new Date(localDateString).getFullYear();
        let customTimeString = date + ' ' + month + ',' + year;


        //let time = now.toLocaleTimeString('en-US', { timeZone, hour12: false }).substring(0, 5)
        //let time = now.toLocaleTimeString('en-US', { timeZone}).substring(0, 4)

        let time = now.toLocaleTimeString('en-US', {
            timeZone,
            hour: '2-digit',
            minute: '2-digit'
        });
        let timeInt = now.toLocaleTimeString('en-US', {
            timeZone,
            hour12: false
        }).substring(0, 5);
        let hrs = timeInt.split(' ')[0].split(':')[0];
        //console.log(hrs);

        /* if (x == 1) {
            if (hrs > 4 && hrs < 20) {
                //Day time
                console.log("1 Good Morning");
            } else {
                //Night time
                console.log("1 Good Night");
            }
        } else if (x == 2) {
            if (hrs > 8 && hrs < 20) {
                //Day time
                console.log("2 Good Morning");
            } else {
                //Night time
                console.log("2 Good Night");
            }
        } */

        //return { date: customTimeString, time }
        return {
            time
        };
    }




    $('.form-input').focus(function() {
        $(this).parents('.txField').addClass('focused');
    });


    $('.form-input').blur(function() {
        var inputValue = $(this).val();
        if (inputValue == "") {
            $(this).removeClass('filled');
            $(this).parents('.txField').removeClass('focused');

        } else {
            $(this).addClass('filled');
        }
    });

    $(document).on('click', '.information', function(e) {
        $('.contactUs').addClass('filled');
        e.stopPropagation();
    });

    $(document).on('click', '.back-pg', function(e) {
        $('.contactUs').removeClass('filled');
        emailValidated = false;
        $('#commentForm').trigger("reset");
        $('.information').removeClass('sucess');
        $('.success-msg').removeClass('show');
        $('.progress-button').removeClass('sucess');

        $('#contResponseLoader').show();
        $('#contResponseSuccess').hide();
        // responseSuccess.play();
        responseSuccess.goToAndStop(0);
        responseFail.goToAndStop(0);
        responseLoader.goToAndStop(0);

        e.stopPropagation();
    });

    lottie.loadAnimation({
        container: document.getElementById('hs-contact-canvas'),
        path: './json/contact.json',
        renderer: 'svg',
        loop: true,
        autoplay: true,
    });
});



function resizeInput() {
    $(this).attr('size', $(this).val().length);

}