$(window).on('load', function () {
    var animLion = lottie.loadAnimation({
        container: document.getElementById('lionCanvas'),
        path: '../json/h-lion.json',
        renderer: 'svg',
        loop: false,
        autoplay: true,
    });
    // console.log(animLion);

    var animLionDir = 1;
    setInterval(() => {
        if (animLionDir == 1) {
            animLionDir = -1;
        } else {
            animLionDir = 1;
            // animLionDir.goToAndPlay();
        }
        animLion.setDirection(animLionDir);
        animLion.pause();
        animLion.play();
    }, 7000);
});