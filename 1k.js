var c=document.body.children[0],t=0,f=[],h=600,m=Math,p=m.PI;
    a = [
    //y accel
        1,1,1,1,1,1,
        -1,1,1,-1,-1,-1,
        1,0,-1,0,0,1,
        -1,-1,0,0,1,1,
        1,1,-1,0,-1,-1,
        0,0,0,0,0,0,

    // x accel
        1,1,0,-1,1,-1,
        1,0,1,0,-.1,-1,
        1,1,-1,1,-1,-1,
        1,0,-1,0,0,-1,
        1,1,1,-1,-1,-1,
        1,1,0,-1,1,-1
    ];
c.height = c.width = h;
c = c.getContext('2d');
c.strokeStyle = "#DDD";
c.lineWidth = 0.3;
m.r=m.random;
m.q=m.round;

function k(x, y) {
    var vx = m.r()/4 * (m.q(m.r()) ? -1 : 1),
        vy = m.r()+0.5, n,
        dc=m.q(m.r()*150)+450,
        s = m.r()*3+2;
    this.d = function () {
        if (!dc--) {
            for (tmp in f) {
                if (f[tmp] == this) break;
            }
            f.splice(tmp, 1);
            return
        }
        var ii = 9, qs = s/6, qs2 = 4 * qs, qs3=3*qs;

        // step
        y += vy + 0.2;
        x += vx;
        with (m) {
            n = min(5, max(0, q(x/h*6))) + 
                6 * min(5, max(0, q(y/h*6)));
        }
        vx += a[n+36]/80;
        vy += a[n]/300;
        with (c) {
            save();
            translate(x, y);
            // end step

            // random rotation
            rotate(p*m.r()*0.25);
            beginPath();
            while (ii--) {
                lineTo(0, s);
                moveTo(0, s - qs2);
                lineTo(qs3, s - qs);
                moveTo(0, s - qs2);
                lineTo(-qs3, s - qs);
                moveTo(0, 0);
                rotate(p/4);
            }
            stroke();
            closePath();
            restore();
        }
    };
    f.push(this);
}

di = setInterval(function () {
    if (!m.q(m.r()*2)) {
        new k(m.r()*h, 0);
    }
    var ii=f.length;
    c.clearRect(0, 0, h, h);
    while (ii--) {
        f[ii].d();
    }
    t++;
},50);
