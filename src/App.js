import React, { Component } from 'react';
import './App.css';

import Noise from './Noise';
import noisyLine from './noisyLine';

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

	const length = Math.floor(innerWidth / 2);
	const noise = new Noise(length, [-range, range]);
	
	this.setState({ width: innerWidth, height: innerHeight, noise: noise, length: length }, () => this.nextFrame());
    }
    
    componentWillUnmount() {
	cancelAnimationFrame(this.rAF);
	window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateAnimationState() {
	this.ts = this.getTS();
	this.clearFrame();

	this.drawLine();
		
//	this.nextFrame();
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

	const line = new noisyLine(xOffset, y, xOffset * 3, y, ctx);
	line.draw();
	
	ctx.beginPath();
	ctx.moveTo(0, y);
	ctx.strokeStyle = `#ffffff`;
	ctx.lineTo(xOffset, y);
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(xOffset * 3, y);
	ctx.strokeStyle = `#ffffff`;
	ctx.lineTo(xOffset * 4, y);
	ctx.stroke();
	ctx.closePath();
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
