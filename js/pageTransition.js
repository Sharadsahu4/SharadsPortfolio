// console.log('ready transition');

// function PageTransition() {
//     var tl = gsap.timeline({});
//     tl
//         .set('ul.transition', {
//             display: 'block'
//         })
//         .set('ul.transition li', {
//             transformOrigin: 'center bottom',
//         })
//         .to('ul.transition li', 0.6, {
//             scaleY: 1,
//             ease: 'expo.inOut',
//             stagger: 0.2,
//         })
//         .set('ul.transition li', {
//             transformOrigin: 'center top',
//         })
//         .to('ul.transition li', 0.6, {
//             scaleY: 0,
//             ease: 'expo.inOut',
//             stagger: -0.1,
//         })
//         .set('ul.transition', {
//             display: 'none',
//         });
// }

/* Page Transition Starts */
function startTransition() {
    TweenMax.to('body', 0.5, {
        opacity: 0,
    });
}

function endTransition() {
    TweenMax.to('body', 0.5, {
        opacity: 1,
    });
}
$(window).on('load', function() {
    // PageTransition();
    endTransition();
});


// $(document).on('click', '.anim-link', function (e) {
//     e.preventDefault();
//     let href = $(this).attr('href');
//     startTransition();
//     setTimeout(() => {
//         window.location = href;
//     }, 500);

// });
/* Page Transition Ends */