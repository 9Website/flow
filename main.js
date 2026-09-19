if (hasWebGLSupportWithExtensions(['OES_texture_float'])) {
    // The original quality table stops at 2M particles. These larger levels use
    // dimensions that stay within common WebGL texture limits while preserving
    // the requested particle counts.
    QUALITY_LEVELS.push(
        { resolution: [5000, 2000], diameter: 0.008, alpha: 0.18 }, // 10M
        { resolution: [5000, 5000], diameter: 0.007, alpha: 0.16 }, // 25M
        { resolution: [10000, 5000], diameter: 0.006, alpha: 0.14 }, // 50M
        { resolution: [10000, 7500], diameter: 0.005, alpha: 0.12 }, // 75M
        { resolution: [10000, 10000], diameter: 0.004, alpha: 0.10 } // 100M
    );

    // Every configured level is divisible by 64, including the new levels.
    // Using 64 slices also keeps drawArrays counts integral at high counts.
    SLICES = 64;

    var flow = new Flow(document.getElementById('render'));

    flow.setHue(0);
    flow.setTimeScale(INITIAL_SPEED);
    flow.setPersistence(INITIAL_TURBULENCE);

    var speedSlider = new Slider(document.getElementById('speed-slider'), 0.0, MAX_SPEED, INITIAL_SPEED, function (value) {
        flow.setTimeScale(value);
    });

    var turbulenceSlider = new Slider(document.getElementById('turbulence-slider'), 0.0, MAX_TURBULENCE, INITIAL_TURBULENCE, function (value) {
        flow.setPersistence(value);
    });

    var buttons = new Buttons([
        document.getElementById('count-16'),
        document.getElementById('count-17'),
        document.getElementById('count-18'),
        document.getElementById('count-19'),
        document.getElementById('count-20'),
        document.getElementById('count-21'),
        document.getElementById('count-22'),
        document.getElementById('count-23'),
        document.getElementById('count-24'),
        document.getElementById('count-25'),
        document.getElementById('count-26')
    ], function (index) {
        flow.changeQualityLevel(index);
    });

    var picker = new HuePicker(document.getElementById('picker'), function (value) {
        flow.setHue(value);

        var color = hsvToRGB(value, UI_SATURATION, UI_VALUE);
        var rgbString = 'rgb(' + (color[0] * 255).toFixed(0) + ',' + (color[1] * 255).toFixed(0) + ',' + (color[2] * 255).toFixed(0) + ')';

        speedSlider.setColor(rgbString);
        turbulenceSlider.setColor(rgbString);

        buttons.setColor(rgbString);
    });
} else {
    document.getElementById('gui').style.display = 'none';
    document.getElementById('render').style.display = 'none';
    document.getElementById('footer').style.display = 'none';
    document.getElementById('error').style.display = 'block';
}
