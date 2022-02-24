import React, { Component } from 'react';
import './App.css';

import Noise from './Noise';
import noisyLine from './noisyLine';

import Context from './Context';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pixelSize: 8,
			height: 500,
			width: 150,
			lenth: 100,
			range: 20,
			yOffset: null
		};

		this.drawing = false;
		this.ctx = null;
		this.line =

			this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.startts = this.getTS();
	}


	componentDidMount() {
		const canvas = this.refs.canvas;
		Context.set(canvas.getContext("2d"));


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

		//this.nextFrame();
	}

	nextFrame() {
		this.rAF = requestAnimationFrame(() => this.updateAnimationState());
	}

	clearFrame() {
		const { width, height } = this.state;
		const ctx = Context.get();

		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, width, height);
	}

	getTS() {
		const date = new Date();

		return date.getTime();
	}

	scale(value, r1, r2) {
		return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
	}

	drawLine() {
		const ctx = Context.get();
		const { width, height, noise } = this.state;
		const y = Math.floor(height / 2);

		const line = new noisyLine(0, y, width, y, 50, 1);
		line.draw();
	}

	render() {
		const { width, height } = this.state;

		return (
			<div>
				<div>
					<canvas ref="canvas" width={width} height={height} />
				</div>
			</div>
		);
	}
}

export default App;
