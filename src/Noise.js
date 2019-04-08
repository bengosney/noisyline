import OpenSimplexNoise from 'open-simplex-noise';

class Noise {
    constructor(length, range = [1, 100], radius = 2) {
	this.noise = new OpenSimplexNoise(Date.now());
	this.length = length;
	this.a = 0;
	this.range = range;
	this.r = radius;
    }

    scale( value, r1, r2 ) { 
	return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
    }

    reset() {
	this.a = 0;
    }

    get() {
	const TWO_PI = Math.PI * 2;
	const step = Math.PI / this.length;
	
	const { r, a } = this;
	const x = r * Math.cos(a);
	const y = r * Math.sin(a);

	this.a += step;

	return this.scale(this.noise.noise2D(x, y), [0, 1], this.range);
    }
}


export default Noise;
