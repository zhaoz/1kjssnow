var c=document.getElementById('c'),t=0,n=2,f=[],h=600,m=Math,p=m.PI,tmp;
    vf = [
        [1,1,0,-1,1,-1],
        [1,0,1,0,-.1,-1],
        [1,1,-1,1,-1,-1],
        [1,0,-1,0,0,-1],
        [1,1,1,-1,-1,-1],
        [1,1,0,-1,1,-1]
    ];
c.height = c.width = h;
c = c.getContext('2d');
c.strokeStyle = "#CCC";
c.lineWidth = 0.5;
m.r=m.random;

function dx(x, y) {
    with (m) {
        var v1 = min(5, max(0, round(x/h*6))),
            v2 = min(5, max(0, round(y/h*6)));
    }

    // need to do some interpolation
    return vf[v2][v1]/80;
}

function flake(x, y) {
    var vx = m.r()/4 * (m.round(m.r()) ? -1 : 1),
        vy = m.r()+0.5,
        dc=m.round(m.r()*150)+450,
        s = m.r()*3+2;
    this.d = function (ii,qs,qs2,qs3) {
        if (!dc--) {
            for (tmp in f) {f[tmp]==this;break;}
            f.splice(tmp, 1);
            return
        }
        ii = 9, qs = s/6, qs2 = 4 * qs, qs3=3*qs;
        c.save();

        // step
        y += vy;
        x += vx;
        vx += dx(x, y);
        c.translate(x, y);
        // end step

        // random rotation
        c.rotate(p*m.r()*0.25);
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

di = setInterval(function () {
    if (!m.round(m.r()*5)) {
        new flake(m.r()*h, 0);
    }
    var ii=f.length;
    c.clearRect(0, 0, h, h);
    while (ii--) {
        f[ii].d();
    }
    t++;
},50);
