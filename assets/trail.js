let rgbRand = { r: 255, g: 255, b: 255 }; // first color

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lifetime = 0;
    }
}

startAnimation = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const points = [];
    const addPoint = (x, y) => {
        const point = new Point(x, y);
        points.push(point);
    };

    // get mouse position
    document.addEventListener('mousemove', ({ clientX, clientY }) => {
        addPoint(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);
    }, false);

    const animatePoints = () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const duration = 0.5 * (1 * 1000) / 300; // (fps) Last 80% of a frame per point

        for (let i = 0; i < points.length; ++i) {
            const point = points[i];
            let lastPoint;

            if (points[i - 1] !== undefined) {
                lastPoint = points[i - 1];
            } else lastPoint = point;

            point.lifetime += 0.1; // fade speed

            if (point.lifetime > duration) {
                // If the point dies, remove it.
                points.shift();
            } else {
                // Otherwise animate it:

                // As the lifetime goes on, lifePercent goes from 0 to 1.
                const lifePercent = (point.lifetime / duration);
                const spreadRate = 3 * (1 - lifePercent);

                ctx.lineJoin = 'round';
                ctx.lineWidth = spreadRate;

                // As time increases decrease r and b, increase g to go from purple to green.
                const red = Math.floor(rgbRand.r - (rgbRand.r * lifePercent));
                const green = rgbRand.g;
                const blue = Math.floor(rgbRand.b + (rgbRand.b * lifePercent));
                ctx.strokeStyle = `rgb(${red},${green},${blue}`;

                ctx.beginPath();

                ctx.moveTo(lastPoint.x, lastPoint.y);
                ctx.lineTo(point.x, point.y);

                ctx.stroke();
                ctx.closePath();
            }
        }
        requestAnimationFrame(animatePoints);
    };
    animatePoints();
}


// randomize color
function rand() {
    rgbRand = { r: Math.random() * 255, g: Math.random() * 255, b: Math.random() * 255 };
    setTimeout(() => { rand(); }, 1000)
}


// start
window.onload = function () {
    startAnimation();
    rand();
}
