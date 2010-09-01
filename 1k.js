var b = document.body, f=[],h=600,m=Math,p=m.PI,t=0,r=m.random,q=m.round,w=0, c;
b.style.background="black";
b=b.children[0];
b.height = b.width = h;
c = b.getContext('2d');
c.strokeStyle = "#FFF";
c.lineWidth = 0.3;

function k(x, y) {
    var vx = r()/4 * (q(r()) ? -1 : 1),
        vy = r()+0.5, n,
        dc=q(r()*100)+500,
        s = r()*3+2,
        qs = s/6, qs2 = s - 4 * qs, qs3=3*qs;
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
        if (x > h) x=x-h;
        if (x < 0) x=h-x;
        with(m) {
            n = min(5, max(0, q(x/h)*6)) +
                6 * min(5, max(0, q(y/h)*6));
            vy += a[n]/400;
            vx += a[n+36]/80;
            if (abs(vx) > 10) {
                vx = 10 * (vx < 0 ? -1 : 1);
            }
            if (abs(vy) > 10) {
                vy = 10 * (vy < 0 ? -1 : 1);
            }
        }


        n = 9;
        with (c) {
            save();
            translate(x, y);
            // end step

            // random rotation
            rotate(p*r()/4);
            beginPath();
            while (n--) {
                lineTo(0, s);
                moveTo(0, qs2);
                lineTo(qs3, s - qs);
                moveTo(0, qs2);
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
    ii = 73;
    if (w <= 0) {
        if (!q(r()*100)) {
            a= [];
            w = 20;
            while (--ii > 36) {
                a.push(1);
            }
            while (ii--) {
                a.push(4);
            }
        } else if (!w) {
            a= [];
            w = -1;
            while (--ii) {
                a.push(r()*2 - 1);
            }
        }
    } else {
        w--;
    }

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
