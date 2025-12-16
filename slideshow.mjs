
const name = "-AndersJourneyLearningRust"
/**
 * @type {string[]}
 */
let slides = [] 
for (let i = 0; i <= 20; i++) {
	// like 09-AndersJourneyLearningRust.png ...
	//      10-AndersJourneyLearningRust.png ...
	slides.push(
		`slides/${
			(i + 1) < 10 
				? (`0${i + 1}`) 
				: i + 1
		}${name}.png`);
}

let img      = document.querySelector("img");
let count    = 1;
let idx      = 1;
let slidenum = document.getElementById("slide-num");
const app    = document.querySelector("#root");
const timer  = document.querySelector("#timer");

async function slideshowloop () {
	img.src = slides[0];
	slidenum.innerText = "slide: 1";
	for (let i = 1; i < slides.length - 1; i++) {
		await (async () => {
			await new Promise(r => setTimeout(() => {
				slidenum.innerText = "slide: " + ((count++) + 1);
				img.src = slides[i];	
				r(null);
			}, 16000))
		})();
	}
}

// starts at 00:00 seconds
// resets itself at 00:15 seconds
function starttimer() {
	let time = 0;
	timer.innerText = "Timer: " + time
	let interval = setInterval(() => {
		time = Math.floor((performance.now() / 1000)) % 16;
		timer.innerText = "Timer: " + time
	}, 1000);
}


async function manualadvance () {
	document.body.addEventListener("keydown", (e) => {
		console.log(e.key);
		switch(e.key) {
			case "ArrowRight": {
				idx++;
				if (idx > 19) idx = 19;
				slidenum.innerText = "slide: " + (idx + 1)
				img.src = slides[idx];
			} break;
			case "ArrowLeft": {
				idx--;
				if (idx < 0) idx = 0;
				slidenum.innerText = "slide: " + (idx + 1)
				img.src = slides[idx];
			} break;
		}
	});
}

function displayslides() {
	let ix = 1;
	for (const slide of slides) {
		const _img = document.createElement("img");
		const container = document.createElement("div");
		const txt = document.createElement("p");
		txt.innerText = ix + ": " + slide;
		_img.src = slide;
		_img.style.height = "auto";
		_img.style.width = "200px";
		container.append(txt,_img);
		app.appendChild(container);
		ix++;
	}
}

function main () {
	// console.log("slides", slides);
	// manualadvance();
	// displayslides();
	slideshowloop().then(() => {});
	starttimer();
}

main();
