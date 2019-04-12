import Noise from './Noise';

class noisyLine {
    constructor(x1, y1, x2, y2, ctx = null) {
	this.ctx = ctx;

	const a = x1 - x2;
	const b = y1 - y2;

	this.length = Math.abs(Math.sqrt( a*a + b*b ));
	this.angle = this.getAngle(x1, y1, x2, y2);

	this.noise = new Noise(this.length);

	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
    }

    getAngle(x1, y1, x2, y2) {
	const y = y1 - y2;
	const x = x1 - x2;
	const theta = Math.atan2(x, y) * (180 /Math.PI);

	return theta + 90;
    }

    rotate(cx, cy, x, y, angle) {
	const radians = (Math.PI / 180) * angle;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
	
        const ax = (cos * (x - cx)) + (sin * (y - cy)) + cx;
        const ay = (cos * (y - cy)) - (sin * (x - cx)) + cy;
	
	return {ax: ax, ay: ay};
    }
    
    draw() {
	const { ctx, noise } = this;
	const { x1, y1, x2, y2 } = this;
	const y = y1;

	const xOffset = Math.floor((x2 - x1) / 4);

	ctx.beginPath();
	const colour = 255;
	ctx.strokeStyle = `#ffffff`;

	let yOffset = null;
	noise.reset();
	ctx.moveTo(x1, y1);
	
	for (let x = 0 ; x <= this.length; x++) {
	    const n = noise.get();
	    yOffset = yOffset || n;
	    
	    const _x = x + x1;
	    const _y = (y + n) - yOffset;
	    const { ax, ay } = this.rotate(x1, y1, _x, _y, this.angle);
	    ctx.lineTo(ax, ay);
	}

	ctx.stroke();
	ctx.closePath();
    
    }
}

export default noisyLine;
