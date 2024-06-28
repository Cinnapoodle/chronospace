const sleep=(delay) => new Promise((resolve) => setTimeout(resolve, delay));
const terminal=document.getElementById('terminal');
const typespeed=50;
let cutsceneSkipped=false;

function typesim(newsng,target){
	//stolen from brew.rocks
	const delay=ms => new Promise(res => setTimeout(res, ms));
	let i=0;
	let typ=function(){
		return new Promise(resolve => {
			function typeWriter(){
				if(i<=target.innerHTML.length){
					target.innerHTML += newsng.charAt(i);
					i++;
					setTimeout(typeWriter, typespeed);
				}else{
					i=0;
					resolve();
				}
			}typeWriter();
		});
	};
	async function run(){
		await delay(150);
		const waitfortyp=await typ();
	}run();
}

const introSequence=async function(){
	await sleep(1500);
	if(cutsceneSkipped===true){return;}
	document.getElementById('cursorFlash').remove();
	var c=document.createElement('span');
	c.innerHTML='CS-DOS 9.20<br>Copyright (c) 1991, 1999 Chronospace, Inc. All rights reserved.';
	terminal.appendChild(c);
	await sleep(1000);

	var d=document.createElement('span');
	d.id='terminalText1';
	d.innerHTML=`<br><br>C:\&gt;`;
	terminal.appendChild(d);
	await sleep(1025);
	typesim("cd WINDOWSILL", document.querySelector("#terminalText1"));
	await sleep(1500);

	var e=document.createElement("span");
	e.id='terminalText2';
	e.innerHTML=`<br>C:\WINDOWSILL&gt;`;
	terminal.appendChild(e);
	await sleep(800);
	typesim("WINDOWSILL.COM", document.querySelector("#terminalText2"));
	await sleep(1500);

	terminal.remove();
	await sleep(800);
	$(".screen-center").fadeIn(1000);
}

function skipCutscene(){
	cutsceneSkipped=true;
	$(".screen-center").fadeIn(1000);
	terminal.remove();
}
addEventListener('DOMContentLoaded',introSequence);