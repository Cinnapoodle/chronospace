const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
var delspeed = 15;
var typespeed = 80;

function typesim(newsng, songtxt, del){
    // stolen from brew.rocks
    const delay = ms => new Promise(res => setTimeout(res, ms));
    var i = 0;
  
  
  let delet = function () {
      return new Promise(resolve => {
      function typedel() {
        if (songtxt.innerHTML.length > 0) {
          songtxt.innerHTML = songtxt.innerHTML.substring(0,songtxt.innerHTML.length-1);
          setTimeout(typedel, delspeed);
        } else if (songtxt.innerHTML.length == 0) {resolve();}
      }
      typedel();
      });
  };
  
  let typ = function () {
      return new Promise(resolve => {
      function typeWriter() {
        if (i <= songtxt.innerHTML.length) {
          songtxt.innerHTML += newsng.charAt(i);
          i = i + 1;
          setTimeout(typeWriter, typespeed);
        } else {
          i = 0;
          resolve();
        }
      }
      typeWriter();
      });
  };
  
  let run = async function () {
    if (del === true) {
        const waitfordel = await delet();
    }
    await delay(150);
    const waitfortyp = await typ();
  }
  
  run();
  
  }

const introsequence = async () => {
  await sleep(3000)
  $("#cursorflash").hide();
  var c = document.createElement("span");
  c.innerHTML = 'CS-DOS 9.20<br>Copyright (c) 1991, 1999 Chronospace, Inc. All rights reserved.';
  document.querySelector(".console").appendChild(c);
  await sleep(1000)
  var d = document.createElement("span");
  d.id = "consoletext1"
  d.innerHTML = '<br><br>' + 'C:\\>';
  document.querySelector(".console").appendChild(d);
  await sleep(1025);
  typesim("cd WINDOWSILL", document.querySelector("#consoletext1"), false);
  await sleep(1500);
  var e = document.createElement("span");
  e.id = "consoletext2"
  e.innerHTML = '<br>' + 'C:\\WINDOWSILL>';
  document.querySelector(".console").appendChild(e);
  await sleep(800);
  typesim("WINDOWSILL.COM", document.querySelector("#consoletext2"), false);
  await sleep(1500);
  $(".console").hide();
  await sleep(800);
  $(".screen-center").fadeIn(2500);
}

$(document).ready(function() {
    introsequence();
});