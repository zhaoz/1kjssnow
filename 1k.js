b = document.body, f=[],h=600,m=Math,p=m.PI,t=0,r=m.random,q=m.round;
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
b.style.background = "black";
c=b.children[0];
c.height = c.width = h;
c = c.getContext('2d');
c.strokeStyle = "#FFF";
c.lineWidth = 0.3;

function k(x, y) {
    var vx = r()/4 * (q(r()) ? -1 : 1),
        vy = r()+0.5, n,
        dc=q(r()*150)+450,
        s = r()*3+2,
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
            rotate(p*r()*0.25);
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
    if (!q(r()*2)) {
        new k(r()*h, 0);
    }
    ii=f.length;
    c.clearRect(0, 0, h, h);
    while (ii--) {
        f[ii].d();
    }
    t++;
},50);
