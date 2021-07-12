describe('pc.Curve', function () {
    it('constructor: with args', function () {
        var c = new pc.Curve([0, 0, 1, 1]);
        equal(c.length, 2);
    });

    it('constructor: no args', function () {
        var c = new pc.Curve();
        equal(c.length, 0);
    });

    it('value', function () {
        var c = new pc.Curve([0, 0, 1, 1]);
        c.type = pc.CURVE_LINEAR;
        equal(c.value(0.5), 0.5);
    });

    it('value - same keys', function () {
        var c = new pc.Curve([0, 1, 1, 1]);
        c.type = pc.CURVE_LINEAR;
        equal(c.value(0), 1);
        equal(c.value(0.5), 1);
        equal(c.value(1), 1);
    });

    it('value - one key', function () {
        var c = new pc.Curve([0.5, 1]);
        c.type = pc.CURVE_LINEAR;
        equal(c.value(0), 1);
        equal(c.value(0.5), 1);
        equal(c.value(1), 1);
    });

    it('value - two keys', function () {
        var c = new pc.Curve([0.3, 1, 0.6, -1]);
        c.type = pc.CURVE_LINEAR;
        equal(c.value(0), 1);
        equal(c.value(0.3), 1);
        close(c.value(0.45), 0, 0.001);
        equal(c.value(0.6), -1);
    });

    it('value - smoothstep', function () {
        var c = new pc.Curve([0, 0, 1, 1]);
        equal(c.value(0.3), 0.3 * 0.3 * (3 - 2 * 0.3));
    });

    it('add', function () {
        var c = new pc.Curve();
        c.add(1, 1);

        equal(c.length, 1);
        equal(c.value(0.5), 1);
    });

    it('add - with existing value', function () {
        var c = new pc.Curve([0.5, 1]);
        c.add(0, 2);

        equal(c.length, 2);
        equal(c.value(0.5), 1);
        equal(c.value(0), 2);
    });

    it('get', function () {
        var c = new pc.Curve([0, 1]);

        equal(c.get(0)[0], 0);
        equal(c.get(0)[1], 1);
    });

    it('closest', function () {
        var c = new pc.Curve([0, 1, 0.5, 2, 1, 4]);

        equal(c.closest(0.24)[1], 1);
        equal(c.closest(0.25)[1], 2);
        equal(c.closest(0.74)[1], 2);
        equal(c.closest(0.75)[1], 4);
        equal(c.closest(0)[1], 1);
        equal(c.closest(1)[1], 4);
    });

    it('curve regression', function () {
        var testData = [
            [
                NaN,
                NaN,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                0.866666666666668,
                0.7333333333333347,
                0.6000000000000014,
                0.466666666666668,
                0.3333333333333347,
                0.2000000000000014,
                0.0666666666666681,
                -0.06666666666666532,
                -0.19999999999999862,
                -0.3333333333333319,
                -0.46666666666666523,
                -0.5999999999999985,
                -0.7333333333333318,
                -0.8666666666666654,
                -0.9999999999999984,
                -1.4499999999999953,
                -1.899999999999996,
                -2.349999999999996,
                -2.7999999999999967,
                -3.249999999999997,
                -3.6999999999999975,
                -4.149999999999998,
                -4.599999999999998,
                -5.049999999999999,
                -5.499999999999999,
                -5.949999999999998,
                -6.399999999999999,
                -6.85,
                -7.3,
                -7.75,
                -8.2,
                -8.65,
                -9.100000000000001,
                -9.55,
                -9.999999999999945,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
            ],
            [
                NaN,
                NaN,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                0.974518518518519,
                0.9028148148148157,
                0.7920000000000014,
                0.6491851851851868,
                0.4814814814814833,
                0.29600000000000193,
                0.09985185185185397,
                -0.09985185185184964,
                -0.29599999999999804,
                -0.4814814814814796,
                -0.6491851851851835,
                -0.7919999999999985,
                -0.9028148148148138,
                -0.9745185185185179,
                -0.9999999999999998,
                -1.0652499999999987,
                -1.2519999999999976,
                -1.5467499999999972,
                -1.9359999999999968,
                -2.4062499999999964,
                -2.9439999999999964,
                -3.5357499999999975,
                -4.1679999999999975,
                -4.8272499999999985,
                -5.499999999999998,
                -6.172749999999998,
                -6.831999999999998,
                -7.46425,
                -8.056,
                -8.59375,
                -9.064,
                -9.45325,
                -9.748,
                -9.934750000000001,
                -10,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
            ],
            [
                NaN,
                NaN,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                0.8765185185185197,
                0.7699259259259271,
                0.6760000000000009,
                0.5905185185185194,
                0.50925925925926,
                0.42800000000000094,
                0.3425185185185195,
                0.2485925925925936,
                0.14200000000000135,
                0.018518518518519933,
                -0.12607407407407256,
                -0.29599999999999804,
                -0.49548148148147886,
                -0.7287407407407379,
                -0.999999999999997,
                -1.614666666666657,
                -2.808999999999986,
                -4.483499999999982,
                -6.538666666666646,
                -8.874999999999979,
                -11.392999999999978,
                -13.993166666666644,
                -16.57599999999998,
                -19.041999999999977,
                -21.291666666666647,
                -23.22549999999998,
                -24.74399999999998,
                -25.747666666666646,
                -26.136999999999986,
                -25.812499999999986,
                -24.674666666666653,
                -22.623999999999988,
                -19.560999999999986,
                -15.386166666666647,
                -9.999999999999973,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
            ],
            [
                NaN,
                NaN,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                0.8765185185185197,
                0.7699259259259271,
                0.6760000000000009,
                0.5905185185185194,
                0.50925925925926,
                0.42800000000000094,
                0.3425185185185195,
                0.2485925925925936,
                0.14200000000000135,
                0.018518518518519933,
                -0.12607407407407256,
                -0.29599999999999804,
                -0.49548148148147886,
                -0.7287407407407379,
                -0.999999999999997,
                -1.614666666666657,
                -2.808999999999986,
                -4.483499999999982,
                -6.538666666666646,
                -8.874999999999979,
                -11.392999999999978,
                -13.993166666666644,
                -16.57599999999998,
                -19.041999999999977,
                -21.291666666666647,
                -23.22549999999998,
                -24.74399999999998,
                -25.747666666666646,
                -26.136999999999986,
                -25.812499999999986,
                -24.674666666666653,
                -22.623999999999988,
                -19.560999999999986,
                -15.386166666666647,
                -9.999999999999973,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
            ],
            [
                NaN,
                NaN,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                0.8779259259259271,
                0.7751534391534403,
                0.6868571428571437,
                0.6082116402116411,
                0.5343915343915351,
                0.46057142857142946,
                0.38192592592592683,
                0.2936296296296306,
                0.19085714285714417,
                0.06878306878307017,
                -0.07741798941798783,
                -0.25257142857142645,
                -0.4615026455026427,
                -0.709037037037034,
                -0.9999999999999968,
                -1.35680952380952,
                -1.791142857142853,
                -2.2917142857142814,
                -2.847238095238091,
                -3.446428571428567,
                -4.077999999999996,
                -4.7306666666666635,
                -5.393142857142855,
                -6.054142857142855,
                -6.702380952380951,
                -7.326571428571427,
                -7.915428571428569,
                -8.457666666666665,
                -8.941999999999998,
                -9.357142857142858,
                -9.691809523809523,
                -9.934714285714287,
                -10.074571428571426,
                -10.10009523809524,
                -10,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
                2.5,
            ],
            [
                2.5, 2.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -10, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5,
                2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5,
            ],
        ];

        var types = [
            pc.CURVE_LINEAR,
            pc.CURVE_SMOOTHSTEP,
            pc.CURVE_CATMULL,
            pc.CURVE_CARDINAL,
            pc.CURVE_SPLINE,
            pc.CURVE_STEP,
        ];
        var sampleRange = [-5, 5];
        var sampleStep = 0.1;

        var c = new pc.Curve([-0.5, 1, 1, -1, 3, -10, 3.1, 2.5]);

        for (var i = 0; i < types.length; ++i) {
            c.type = types[i];
            var testSamples = testData[i];
            var testIdx = 0;
            equal(isNaN(testSamples[testIdx++]), isNaN(c.value()));
            equal(isNaN(testSamples[testIdx++]), isNaN(c.value('hello')));
            for (var s = sampleRange[0]; s <= sampleRange[1]; s += sampleStep) {
                close(testSamples[testIdx++], c.value(s), 1e-6);
            }
        }
    });
});
