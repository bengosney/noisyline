import React, { Component } from 'react';
import './App.css';
import OpenSimplexNoise from 'open-simplex-noise';

import Noise from './Noise';

class App extends Component {
    constructor(props) {
	super(props);

	this.state = {
	    pixelSize: 8,
	    height: 500,
	    width: 150,
	    lenth: 100,
	    range: 20,
	    noise: new Noise(100),
	    yOffset: null
	};
	
	this.drawing = false;
	this.ctx = null;

	this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	this.startts = this.getTS();
    }

    
    componentDidMount() {
	const canvas = this.refs.canvas;
	this.ctx = canvas.getContext("2d");

	
	this.rAF = requestAnimationFrame(() => this.updateAnimationState());
	this.updateWindowDimensions();
	window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
	const { innerWidth, innerHeight } = window;
	const { range } = this.state;

	const length = Math.floor(innerWidth / 4);
	const noise = new Noise(length, [-range, range]);
	
	this.setState({ width: innerWidth, height: innerHeight, noise: noise, length: length });
    }
    
    componentWillUnmount() {
	cancelAnimationFrame(this.rAF);
	window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateAnimationState() {
	this.ts = this.getTS();
	this.clearFrame();

	this.drawLine();
		
	this.nextFrame();
    }

    nextFrame() {
	this.rAF = requestAnimationFrame(() => this.updateAnimationState());
    }

    clearFrame() {
	const { width, height } = this.state;
	const { ctx } = this;

	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, width, height);
    }

    getTS() {
	const date = new Date();
	
	return date.getTime();
    }

    scale( value, r1, r2 ) { 
	return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
    }
    
    drawLine() {
	const { ctx } = this;
	const { width, height, noise } = this.state;
	const y = Math.floor(height / 2);

	const xOffset = Math.floor(width / 4);
	const step = Math.floor(width / 2);

	ctx.beginPath();
	const colour = 255;
	ctx.strokeStyle = `rgba(${colour}, ${colour}, ${colour}, 1)`;

	let yOffset = null;
	//noise.reset();

	for (let x = 0 ; x < width; x++) {
	    if (x > xOffset && x < (xOffset * 3)) {
		const n = noise.get();
		yOffset = yOffset || n;
		ctx.lineTo(x, (y + n) - yOffset);
	    } else {
		ctx.lineTo(x, y);
	    }
	}

	ctx.stroke();
    }
    
    render() {
	const { width, height } = this.state;

        return (
	    <div>
              <div>
		<canvas ref="canvas" width={ width } height={ height } />
              </div>
            </div>
	);	
    }
}

export default App;
