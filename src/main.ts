import "./style.css";

const dotSpacing = 20;

const canvas = document.createElement("canvas") satisfies HTMLCanvasElement;
canvas.className = "canvas";

const context = canvas.getContext("2d");

type Points = number[][];

function drawLine(
	context: CanvasRenderingContext2D,
	from: [number, number],
	to: [number, number]
) {
	context.strokeStyle = "rgba(255, 255, 255, 0.1)";
	context.beginPath();
	context.moveTo(from[0], from[1]);
	context.lineTo(to[0], to[1]);
	context.stroke();
}

function calculateIndex(points: Points, i: number, j: number): number {
	if (i === points.length - 1) {
		throw new Error("Not supposed to be here");
	}

	if (j === points[i].length - 1) {
		throw new Error("Not supposed to be here");
	}

	console.log(
		`${points[i][j]} ${points[i + 1][j]}\n${points[i][j + 1]} ${
			points[i + 1][j + 1]
		}`
	);

	const isSet = (value: number) => (value > 0 ? "✅" : "❌");

	console.log(
		`${isSet(points[i][j])}${isSet(points[i + 1][j])}\n${isSet(
			points[i][j + 1]
		)}${isSet(points[i + 1][j + 1])}`
	);

	const tl = (Math.ceil(points[i][j]) | 0) << 3;
	const tr = (Math.ceil(points[i + 1][j]) | 0) << 2;
	const br = (Math.ceil(points[i + 1][j + 1]) | 0) << 1;
	const bl = Math.ceil(points[i][j + 1]) | 0;

	console.log(
		tl.toString(2),
		tr.toString(2),
		br.toString(2),
		bl.toString(2),
		(tl | tr | br | bl).toString(2)
	);

	const value = tl | tr | br | bl;

	console.log(value);

	console.log("------");

	return value;

	// return 7;
}

const directions: ((
	context: CanvasRenderingContext2D,
	i: number,
	j: number
) => void)[] = [
	// 0 Nothing
	() => {},

	// 1 bottom left
	(context: CanvasRenderingContext2D, i: number, j: number) =>
		drawLine(
			context,
			[i * dotSpacing, (j + 1 / 2) * dotSpacing],
			[(i + 1 / 2) * dotSpacing, (j + 1) * dotSpacing]
		),

	// 2 bottom right
	(context: CanvasRenderingContext2D, i: number, j: number) =>
		drawLine(
			context,
			[(i + 1) * dotSpacing, (j + 1 / 2) * dotSpacing],
			[(i + 1 / 2) * dotSpacing, (j + 1) * dotSpacing]
		),

	// 3 horizontal
	(context: CanvasRenderingContext2D, i: number, j: number) =>
		drawLine(
			context,
			[i * dotSpacing, (j + 1 / 2) * dotSpacing],
			[(i + 1) * dotSpacing, (j + 1 / 2) * dotSpacing]
		),

	// 4 top right
	(context: CanvasRenderingContext2D, i: number, j: number) =>
		drawLine(
			context,
			[(i + 1 / 2) * dotSpacing, j * dotSpacing],
			[(i + 1) * dotSpacing, (j + 1 / 2) * dotSpacing]
		),

	// 5 top right bottom left
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

	// 6 vertical
	(context: CanvasRenderingContext2D, i: number, j: number) =>
		drawLine(
			context,
			[(i + 1 / 2) * dotSpacing, j * dotSpacing],
			[(i + 1 / 2) * dotSpacing, (j + 1) * dotSpacing]
		),

	// 7 top left
	(context: CanvasRenderingContext2D, i: number, j: number) => {
		drawLine(
			context,
			[(i + 1 / 2) * dotSpacing, j * dotSpacing],
			[i * dotSpacing, (j + 1 / 2) * dotSpacing]
		);
	},

	// 8 top left
	(context: CanvasRenderingContext2D, i: number, j: number) => {
		drawLine(
			context,
			[(i + 1 / 2) * dotSpacing, j * dotSpacing],
			[i * dotSpacing, (j + 1 / 2) * dotSpacing]
		);
	},

	// 9 vertical
	(context: CanvasRenderingContext2D, i: number, j: number) => {
		drawLine(
			context,
			[(i + 1 / 2) * dotSpacing, j * dotSpacing],
			[(i + 1 / 2) * dotSpacing, (j + 1) * dotSpacing]
		);
	},

	// 10 top right bottom left
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

	// 11 top right
	(context: CanvasRenderingContext2D, i: number, j: number) =>
		drawLine(
			context,
			[(i + 1 / 2) * dotSpacing, j * dotSpacing],
			[(i + 1) * dotSpacing, (j + 1 / 2) * dotSpacing]
		),

	// 12 horizontal
	(context: CanvasRenderingContext2D, i: number, j: number) =>
		drawLine(
			context,
			[i * dotSpacing, (j + 1 / 2) * dotSpacing],
			[(i + 1) * dotSpacing, (j + 1 / 2) * dotSpacing]
		),

	// 13 bottom right
	(context: CanvasRenderingContext2D, i: number, j: number) =>
		drawLine(
			context,
			[(i + 1) * dotSpacing, (j + 1 / 2) * dotSpacing],
			[(i + 1 / 2) * dotSpacing, (j + 1) * dotSpacing]
		),

	// 14 bottom left
	(context: CanvasRenderingContext2D, i: number, j: number) =>
		drawLine(
			context,
			[i * dotSpacing, (j + 1 / 2) * dotSpacing],
			[(i + 1 / 2) * dotSpacing, (j + 1) * dotSpacing]
		),

	// 15
	() => {},
];

function initializePoints(cols: number, rows: number): Points {
	return Array.from({ length: cols }).map((_, i) =>
		Array.from({ length: rows }).map(
			(_, j) =>
				// (Math.sin((j / 6) * Math.PI) * Math.cos((i / 6) * Math.PI)) / 1.0001
				(Math.random() - 0.5) * 2
		)
	);
}

function draw() {
	if (context) {
		const cols = Math.floor(canvas.width / dotSpacing);
		const rows = Math.floor(canvas.height / dotSpacing);

		const points = initializePoints(cols, rows);

		console.log(points);

		context.fillStyle = "grey";
		context.fillRect(0, 0, canvas.width, canvas.height);

		for (let i = 0; i < points.length; i++) {
			for (let j = 0; j < points[i].length; j++) {
				const luma = ((points[i][j] + 1) * 256) / 2;
				context.fillStyle = `rgb(${luma}, ${luma}, ${luma})`;
				context.fillRect(i * dotSpacing, j * dotSpacing, 3, 3);
				context.fill();

				if (i < points.length - 1 && j < points[i].length - 1) {
					const index = calculateIndex(points, i, j);
					console.log(index);
					const fn = directions[index];
					console.log(fn);
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
