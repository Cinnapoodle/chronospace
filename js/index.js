const sleep=(delay) => new Promise((resolve) => setTimeout(resolve, delay));
const console=document.getElementById('console');
const typespeed=80;

function typesim(newsng, songtxt, del){
	//stolen from brew.rocks
	const delay=ms => new Promise(res => setTimeout(res, ms));
	let i=0;
	let typ=function(){
		return new Promise(resolve => {
			function typeWriter(){
				if (i <= songtxt.innerHTML.length){
					songtxt.innerHTML += newsng.charAt(i);
					i=i + 1;
					setTimeout(typeWriter, typespeed);
				} else {
					i=0;
					resolve();
				}
			}
			typeWriter();
		});
	};
	let run=async function(){
		await delay(150);
		const waitfortyp=await typ();
	}
	run();
}

const introSequence=async function(){
	await sleep(1500);
	document.getElementById('cursorFlash').remove();
	var c=document.createElement('span');
	c.innerHTML='CS-DOS 9.20<br>Copyright (c) 1991, 1999 Chronospace, Inc. All rights reserved.';
	console.appendChild(c);
	await sleep(1000);

	var d=document.createElement('span');
	d.id='consoletext1';
	d.innerHTML='<br><br>' + 'C:\\>';
	console.appendChild(d);
	await sleep(1025);
	typesim("cd WINDOWSILL", document.querySelector("#consoletext1"), false);
	await sleep(1500);

	var e=document.createElement("span");
	e.id='consoletext2';
	e.innerHTML='<br>' + 'C:\\WINDOWSILL>';
	console.appendChild(e);
	await sleep(800);
	typesim("WINDOWSILL.COM", document.querySelector("#consoletext2"), false);
	await sleep(1500);

	console.remove();
	await sleep(800);
	$(".screen-center").fadeIn(1000);
}

function skipCutscene(){
	$(".screen-center").fadeIn(1000);
	console.remove();
}
addEventListener('DOMContentLoaded',introSequence);