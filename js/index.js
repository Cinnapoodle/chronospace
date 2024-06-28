const sleep=(delay) => new Promise((resolve) => setTimeout(resolve, delay));
const terminal=document.getElementById('terminal');
const mainMenu=document.getElementById('mainMenu');
const typespeed=50;
let cutsceneSkipped=false;

function typesim(newsng,target){
	//stolen from brew.rocks
	const delay=ms => new Promise(res => setTimeout(res, ms));
	let i=0;
	function typ(){
		return new Promise(resolve=>{
			function typeWriter(){
				if(i<=target.innerHTML.length){
					target.innerHTML+=newsng.charAt(i);
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
	//Initial init w/ blinking cursor
	if(cutsceneSkipped===true){return;}
	document.querySelector('.loading-text').remove();
	document.querySelector('.skip-text').classList.add('shown');
	const blinkingCursor=document.createElement('span');
	blinkingCursor.classList.add('blinking-cursor');
	blinkingCursor.textContent='_';
	terminal.appendChild(blinkingCursor);
	await sleep(1500);
	//Copyright string
	if(cutsceneSkipped===true){return;}
	document.querySelector('.blinking-cursor').remove();
	const initText=document.createElement('span');
	initText.innerHTML='CS-DOS 9.20<br>Copyright (c) 1991, 1999 Chronospace, Inc. All rights reserved.<br>';
	terminal.appendChild(initText);
	terminal.appendChild(blinkingCursor);
	await sleep(1000);
	//First prompt
	if(cutsceneSkipped===true){return;}
	document.querySelector('.blinking-cursor').remove();
	const firstCmd=document.createElement('span');
	firstCmd.id='firstCmd';
	firstCmd.innerHTML=`<br>C:\&gt;`;
	terminal.appendChild(firstCmd);
	terminal.appendChild(blinkingCursor);
	await sleep(1025);
	typesim('cd WINDOWSILL',document.getElementById('firstCmd'));
	await sleep(1500);
	//Second prompt
	if(cutsceneSkipped===true){return;}
	document.querySelector('.blinking-cursor').remove();
	const secondCmd=document.createElement("span");
	secondCmd.id='secondCmd';
	secondCmd.innerHTML=`<br>C:\WINDOWSILL&gt;`;
	terminal.appendChild(secondCmd);
	terminal.appendChild(blinkingCursor);
	await sleep(800);
	typesim('WINDOWSILL.COM',document.getElementById('secondCmd'));
	await sleep(1500);
	//End scene
	if(cutsceneSkipped===true){return;}
	terminal.remove();
	await sleep(500);
	mainMenu.classList.add('fade-in');
}

function skipCutscene(){
	if(cutsceneSkipped===true){return;}//unnecessary error handling gaming
	cutsceneSkipped=true;
	mainMenu.classList.add('fade-in');
	terminal.remove();
}
addEventListener('DOMContentLoaded',introSequence);