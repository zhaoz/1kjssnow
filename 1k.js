c = document.body, f=[],h=600,m=Math,p=m.PI,t=0;
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
c.style.background = "black";
c=c.children[0];
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
        s = m.r()*3+2,
        qs = s/6, qs2 = 4 * qs, qs3=3*qs;
    this.d = function () {
        if (!dc--) {
            for (n in f) {
                if (f[n] == this) break;
            }
            f.splice(n, 1);
            return
        }

        // step
        y += vy + 0.2;
        x += vx;
        with (m) {
            n = min(5, max(0, q(x/h*6))) + 
                6 * min(5, max(0, q(y/h*6)));
        }
        vx += a[n+36]/80;
        vy += a[n]/300;

        n = 9;
        with (c) {
            save();
            translate(x, y);
            // end step

            // random rotation
            rotate(p*m.r()*0.25);
            beginPath();
            while (n--) {
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

setInterval(function () {
    if (!m.q(m.r()*2)) {
        new k(m.r()*h, 0);
    }
    ii=f.length;
    c.clearRect(0, 0, h, h);
    while (ii--) {
        f[ii].d();
    }
    t++;
},50);
