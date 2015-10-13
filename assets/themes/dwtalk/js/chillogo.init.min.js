$("#iframe-chil-logo-canvas").click(function() {
    window.location = "/"
});
showChilLogo("#iframe-chil-logo img", "triangle", "iframe-chil-logo-canvas", 55, 40, 1, 0.38, 0.21);

function showChilLogo(h, b, g, e, a, f, d, c) {
    $(h).hide();
    ChilLogo.initialize({
        framerate: 20,
        width: e,
        height: a,
        colorSpeedFactor: 1,
        morphSpeedFactor: 1,
        morphStrengthFactor: 0.8,
        morphBaseSpeedFactor: 0.2,
        introSpeedFactor: 3,
        outroSpeedFactor: 3,
        normalOffsetFactor: 1.5,
        maxShapeRotation: 0.2,
        wordOffsetX: -25,
        wordOffsetY: 0,
        wordScale: 1,
        foregroundScaleX: 0.39,
        foregroundScaleY: 0.23,
        backgroundScaleX: 0.39,
        backgroundScaleY: 0.23,
        shadowAlpha: 0.1,
        shapeQuality: 5,
        containerID: b,
        logoCanvasID: g,
        shadowCanvasID: "null",
        colors: [
            [new ChilLogo.util.Color(22, 206, 249), new ChilLogo.util.Color(97, 204, 229)],
            [new ChilLogo.util.Color(28, 106, 244), new ChilLogo.util.Color(99, 144, 224)],
            [new ChilLogo.util.Color(62, 249, 22), new ChilLogo.util.Color(119, 229, 97)],
            [new ChilLogo.util.Color(155, 244, 28), new ChilLogo.util.Color(173, 226, 97)],
            [new ChilLogo.util.Color(22, 249, 189), new ChilLogo.util.Color(97, 229, 191)],
            [new ChilLogo.util.Color(249, 227, 22), new ChilLogo.util.Color(229, 216, 97)],
            [new ChilLogo.util.Color(252, 158, 0), new ChilLogo.util.Color(249, 207, 0)],
            [new ChilLogo.util.Color(242, 29, 50), new ChilLogo.util.Color(221, 100, 112)],
            [new ChilLogo.util.Color(247, 25, 210), new ChilLogo.util.Color(226, 97, 211)],
        ],
        inputs: [],
        fallbackImages: ["/assets/themes/dwtalk/img/fallback.png"]
    })
};