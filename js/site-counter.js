function updCount(val){
	let oldCount=0;
	document.querySelectorAll('.count').forEach(function(e){
		let start=oldCount;
		let end=val;
		let duration=3000;
		let startTime=null;
		function animateCounter(currentTime){
			if(!startTime){startTime=currentTime;}
			let progress=currentTime-startTime;
			let currentValue=Math.ceil(start+((end-start)*(progress/duration)));
			e.textContent=currentValue;
			if(progress<duration){requestAnimationFrame(animateCounter);}
			else{e.textContent=val;}
		}requestAnimationFrame(animateCounter);
	});
	oldCount=val;
}

function fetchCount(){
	console.debug('Fetching site view count...');
	fetch('https://cs-sitecounter.marble.zone/countview')
		.then(response=>response.json())
		.then(data=>{updCount(data.count);console.debug('Current count, including you: '+data.count);})
		.catch(error=>console.error('Error fetching view count:',error));
}

document.addEventListener('DOMContentLoaded',function(){
	fetch('https://cs-sitecounter.marble.zone/count')
		.then(response=>response.json())
		.catch(error=>{
			console.error('Error fetching initial view count:',error);
			document.querySelectorAll('.count').forEach(e=>{e.textContent='Unknown';});
		});
	fetchCount();
	setInterval(fetchCount,30000);
});