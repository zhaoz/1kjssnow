var c = document.getElementById('c'), t = 0, n = 1, f = [],
    vf = [
    ];
c.width = 800;
c.height = 600;
c = c.getContext('2d');

c.strokeStyle = "#CCC";
c.lineWidth = 0.5;

function flake(s, x, y, r) {
    function step() {
        y = 1 + y;
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
    c.clearRect(0, 0, 800, 600);
    ii = n;
    while(ii--){f[ii].d();}
    t++;
}, 100);
