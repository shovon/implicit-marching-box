import "./style.css";

const dotSpacing = 20;

const canvas = document.createElement("canvas") satisfies HTMLCanvasElement;
canvas.className = "canvas";

const context = canvas.getContext("2d");

type Boxes = number[][];

function drawLine(
	context: CanvasRenderingContext2D,
	from: [number, number],
	to: [number, number]
) {
	context.strokeStyle = "white";
	context.beginPath();
	context.moveTo(from[0], from[1]);
	context.lineTo(to[0], to[1]);
	context.stroke();
}

const directions: ((
	context: CanvasRenderingContext2D,
	i: number,
	j: number
) => void)[] = [
	// Nothing
	() => {},
	// TL
	(context: CanvasRenderingContext2D, i: number, j: number) =>
		drawLine(
			context,
			[(i + 1 / 2) * dotSpacing, j * dotSpacing],
			[i * dotSpacing, (j + 1 / 2) * dotSpacing]
		),
	// bottom left
	(context: CanvasRenderingContext2D, i: number, j: number) =>
		drawLine(
			context,
			[i * dotSpacing, (j + 1 / 2) * dotSpacing],
			[(i + 1 / 2) * dotSpacing, (j + 1) * dotSpacing]
		),

	// bottom right
	(context: CanvasRenderingContext2D, i: number, j: number) =>
		drawLine(
			context,
			[(i + 1) * dotSpacing, (j + 1 / 2) * dotSpacing],
			[(i + 1 / 2) * dotSpacing, (j + 1) * dotSpacing]
		),

	// horizontal
	(context: CanvasRenderingContext2D, i: number, j: number) =>
		drawLine(
			context,
			[i * dotSpacing, (j + 1 / 2) * dotSpacing],
			[(i + 1) * dotSpacing, (j + 1 / 2) * dotSpacing]
		),

	// top right
	(context: CanvasRenderingContext2D, i: number, j: number) =>
		drawLine(
			context,
			[(i + 1 / 2) * dotSpacing, j * dotSpacing],
			[(i + 1) * dotSpacing, (j + 1 / 2) * dotSpacing]
		),

	// top right bottom left
	(context: CanvasRenderingContext2D, i: number, j: number) => {
		drawLine(
			context,
			[(i + 1 / 2) * dotSpacing, j * dotSpacing],
			[i * dotSpacing, (j + 1 / 2) * dotSpacing]
		);
		drawLine(
			context,
			[i * dotSpacing, (j + 1 / 2) * dotSpacing],
			[(i + 1 / 2) * dotSpacing, (j + 1) * dotSpacing]
		);
	},

	// vertical
	(context: CanvasRenderingContext2D, i: number, j: number) => {
		drawLine(
			context,
			[(i + 1 / 2) * dotSpacing, j * dotSpacing],
			[(i + 1 / 2) * dotSpacing, (j + 1) * dotSpacing]
		);
	},

	// top left
	(context: CanvasRenderingContext2D, i: number, j: number) => {
		drawLine(
			context,
			[(i + 1 / 2) * dotSpacing, j * dotSpacing],
			[i * dotSpacing, (j + 1 / 2) * dotSpacing]
		);
	},

	// top left
	(context: CanvasRenderingContext2D, i: number, j: number) => {
		drawLine(
			context,
			[(i + 1 / 2) * dotSpacing, j * dotSpacing],
			[i * dotSpacing, (j + 1 / 2) * dotSpacing]
		);
	},

	// vertical
	(context: CanvasRenderingContext2D, i: number, j: number) => {
		drawLine(
			context,
			[(i + 1 / 2) * dotSpacing, j * dotSpacing],
			[(i + 1 / 2) * dotSpacing, (j + 1) * dotSpacing]
		);
	},

	// top right bottom left
	(context: CanvasRenderingContext2D, i: number, j: number) => {
		drawLine(
			context,
			[(i + 1 / 2) * dotSpacing, j * dotSpacing],
			[(i + 1) * dotSpacing, (j + 1 / 2) * dotSpacing]
		);
		drawLine(
			context,
			[i * dotSpacing, (j + 1 / 2) * dotSpacing],
			[(i + 1 / 2) * dotSpacing, (j + 1) * dotSpacing]
		);
	},

	// top right
	(context: CanvasRenderingContext2D, i: number, j: number) =>
		drawLine(
			context,
			[(i + 1 / 2) * dotSpacing, j * dotSpacing],
			[(i + 1) * dotSpacing, (j + 1 / 2) * dotSpacing]
		),

	// horizontal
	(context: CanvasRenderingContext2D, i: number, j: number) =>
		drawLine(
			context,
			[i * dotSpacing, (j + 1 / 2) * dotSpacing],
			[(i + 1) * dotSpacing, (j + 1 / 2) * dotSpacing]
		),

	// bottom right
	(context: CanvasRenderingContext2D, i: number, j: number) =>
		drawLine(
			context,
			[(i + 1) * dotSpacing, (j + 1 / 2) * dotSpacing],
			[(i + 1 / 2) * dotSpacing, (j + 1) * dotSpacing]
		),

	// bottom left
	(context: CanvasRenderingContext2D, i: number, j: number) =>
		drawLine(
			context,
			[i * dotSpacing, (j + 1 / 2) * dotSpacing],
			[(i + 1 / 2) * dotSpacing, (j + 1) * dotSpacing]
		),

	() => {},
];

function draw() {
	if (context) {
		const cols = Math.floor(canvas.width / dotSpacing);
		const rows = Math.floor(canvas.height / dotSpacing);

		console.log(cols, rows);

		context.fillStyle = "grey";
		context.fillRect(0, 0, canvas.width, canvas.height);

		context.fillStyle = "black";

		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
				context.fillRect(i * dotSpacing, j * dotSpacing, 3, 3);
				context.fill();

				for (const fn of directions) {
					fn(context, i, j);
				}
			}
		}
	}
}

const observer = new ResizeObserver(() => {
	canvas.width = document.body.offsetWidth;
	canvas.height = document.body.offsetHeight;

	draw();
});

draw();

observer.observe(document.body);

document.body.appendChild(canvas);
