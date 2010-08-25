var c = document.getElementById('c'), t = 0, n = 1, f = [], h = 600;
    vf = [
        [2,3,6,8,2,0],
        [2,3,6,8,2,0],
        [2,3,6,8,2,0],
        [2,3,6,8,2,0],
        [2,3,6,8,2,0],
        [2,3,6,8,2,0]
    ];
c.height = c.width = h;
c = c.getContext('2d');
c.strokeStyle = "#CCC";
c.lineWidth = 0.5;

function dx(x, y) {
    var v1 = x/h*6,
        v2 = y/h*6;

    // need to do some interpolation
    return vf[Math.round(v2)][Math.round(v1)];
}

function flake(s, x, y, r) {
    var v = 0;
    function step() {
        y = 1 + y;
        x = v + x;
        v = dx(x, y);
        c.translate(x, y);
    }
    this.d = function () {
        var ii = 9, qs = s / 7, qs2 = 2 * qs;
        c.save();
        step();
        c.beginPath();
        while (ii--) {
            c.lineTo(0, s);
            c.moveTo(0, s - qs2);
            c.lineTo(qs2, s - qs);
            c.moveTo(0, s - qs2);
            c.lineTo(-qs2, s - qs);
            c.moveTo(0, 0);
            c.rotate(Math.PI * 2 * 45 / 360);
        }
        c.stroke();
        c.closePath();
        c.restore();
    };
}

var ii = n;

while (ii--) {
    f.push(new flake(10, 100, 100));
}

di = setInterval(function () {
    c.clearRect(0, 0, h, h);
    ii = n;
    while(ii--){f[ii].d();}
    t++;
}, 100);
