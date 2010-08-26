var c=document.getElementById('c'),t=0,n=2,f=[],h=600,p=Math.PI;
    vf = [
        [1,1,0,-1,1,-1],
        [2,1,1,0,-1,-2],
        [1,2,1,2,-2,-1],
        [1,2,1,0,0,-1],
        [1,1,1,-1,-1,-1],
        [1,1,2,-1,1,-3]
    ];
c.height = c.width = h;
c = c.getContext('2d');
c.strokeStyle = "#CCC";
c.lineWidth = 0.5;
Math.r=Math.random;

function dx(x, y) {
    with (Math) {
        var v1 = min(5, max(0, round(x/h*6))),
            v2 = min(5, max(0, round(y/h*6)));
    }

    // need to do some interpolation
    return vf[v2][v1]/10;
}

function flake(x, y, nth, r) {
    var v = 0, dc=rnd(100)+400,s=Math.r()*3+2;
    function step() {
        y = 1 + y;
        x = v + x;
        v += dx(x, y);
        c.translate(x, y);
    }
    this.d = function () {
        if (!dc--){f.splice(nth, 1);}
        var ii = 9, qs = s/6, qs2 = 4 * qs, qs3=3*qs;
        c.save();
        step();
        c.rotate(p*Math.r()*0.25);
        c.beginPath();
        while (ii--) {
            c.lineTo(0, s);
            c.moveTo(0, s - qs2);
            c.lineTo(qs3, s - qs);
            c.moveTo(0, s - qs2);
            c.lineTo(-qs3, s - qs);
            c.moveTo(0, 0);
            c.rotate(p/4);
        }
        c.stroke();
        c.closePath();
        c.restore();
    };
    f.push(this);
}

function rnd(n) {
    return Math.round(Math.r() * n);
}

di = setInterval(function () {
    var ii=f.length;
    if (!rnd(3)){new flake(Math.r()*h,0,ii++);}
    c.clearRect(0, 0, h, h);
    while(ii--){f[ii].d();}
    t++;
},50);
