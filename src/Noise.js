import OpenSimplexNoise from 'open-simplex-noise';

class Noise {
    constructor(length, range = [1, 100], radius = 2) {
	this.noise = new OpenSimplexNoise(Date.now());
	this.length = length;
	this.a = 0;
	this.range = range;
	this.r = radius;
	this.start = 0;
	
	this.findStart();
	this.reset();
    }

    scale( value, r1, r2 ) { 
	return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
    }

    reset() {
	this.a = this.start;
    }

    step() {
	return Math.PI / this.length;
    }

    findStart() {
	let prev = this.get();
	let prevDiff = Number.MAX_SAFE_INTEGER;

	while (true) {
	    const cur = this.get();
	    const diff = Math.abs(prev - cur);
	    
	    if (diff > prevDiff) {
		this.start = this.a  - (this.step() * 2);
		break;
	    }

	    prevDiff = diff;
	    prev = cur;
	}
    }

    get() {
	const step = this.step();
	
	const { r, a } = this;
	const x = r * Math.cos(a);
	const y = r * Math.sin(a);

	this.a += step;

	return this.scale(this.noise.noise2D(x, y), [0, 1], this.range);
    }
}


export default Noise;
