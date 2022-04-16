const minNumEntities = 400;
const minRadius = 20;
const maxRadius = 200;
const velFactor = 8;

const entities = [];
let canvas, ctx;

function onLoad() {
	canvas = document.getElementById('canvas');
	canvas.width = innerWidth - 20;
	canvas.height = innerHeight - 20;
	ctx = canvas.getContext('2d');

	addEventListener('resize', () => {
		canvas.width = innerWidth - 20;
		canvas.height = innerHeight - 20;
	});

	setInterval(step, 20);

	draw();
}

function step() {
	while (entities.length < minNumEntities) {
		entities.push({
			loc: {
				x: canvas.width * Math.random(),
				y: canvas.height * Math.random(),
			},
			vel: {
				x: velFactor * (Math.random() - 0.5),
				y: velFactor * (Math.random() - 0.5),
			},
			radius: Math.random() * (maxRadius - minRadius) + minRadius,
			freq: Math.random() * 0.8 + 0.2,
			color: {
				red: Math.random() * 256,
				green: Math.random() * 256,
				blue: Math.random() * 256,
			},
		});
	}

	for (const entity of entities) {
		entity.loc.x += entity.vel.x;
		entity.loc.y += entity.vel.y;
		if (
			entity.loc.x + entity.radius > canvas.width ||
			entity.loc.x - entity.radius < 0
		) {
			entity.vel.x *= -1;
		}
		if (
			entity.loc.y + entity.radius > canvas.height ||
			entity.loc.y - entity.radius < 0
		) {
			entity.vel.y *= -1;
		}
	}
}

function draw() {
	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (const entity of entities) {
		const grd = ctx.createRadialGradient(
			entity.loc.x,
			entity.loc.y,
			0,
			entity.loc.x,
			entity.loc.y,
			entity.radius
		);
		grd.addColorStop(1, 'rgba(255, 255, 255, 0)');
		grd.addColorStop(
			0,
			`rgba(${entity.color.red}, ${entity.color.green}, ${entity.color.blue}, 0.6)`
		);
		ctx.fillStyle = grd;
		// ctx.fillStyle = '#000';
		ctx.beginPath();
		ctx.arc(entity.loc.x, entity.loc.y, entity.radius, 0, 2 * Math.PI);
		ctx.fill();
	}
	requestAnimationFrame(draw);
}
