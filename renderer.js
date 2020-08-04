// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// document.getElementById("avg").innerHTML = "-";

// const lineReader = require('line-reader');

document.getElementById("dbg").innerHTML = "1";
// const lineReader = require('lineReader');
const fs = require('fs');

/*
  GLOBAIS
*/


/*
  ERROR CODES: 
  1 - Carregou Ficheiro
  2 - Começou a contar
  3 - A pegar contagem de Sg
  4 - Checkando isFarmStarted
  5 - Pegando Contagem atual de SG
*/ 




isFarmStarted = false
segs_spent = 2
firstSgCount = 0
setTimeout(function () {
    firstSgCount = getSgCount()
}, 1000)


actualSgCounted = getSgCount()

actualFarmedSg = 0
initSgOnFarm = 0
/*
  Funções Globais
*/


const delay = (ms, result) => new Promise(resolve => setTimeout(() => resolve(result), ms));

// Assincrona
async function startCounting() {
  document.getElementById("dbg").innerHTML = "2"
  await delay(1000);
  segs_spent = segs_spent + 1;
  document.getElementById("segs").innerHTML = segs_spent.toString()
}



// Calculo do AVG/MIN: Tempo (60 segs) a dividir pelas Sg's 
// Calculo Sg's por segundo por todo o tempo: Segundos a dividir pelas SG's

function getSgCount() {
  // document.getElementById("dbg").innerHTML = "3"
  var numberPattern = /\d+/g;
  fs.readFile("../live/SavedVariables/DPDP.lua", (error, data) => {
    if(error) {
        document.getElementById("avg").innerHTML = "ERRO!";
        throw error;
    }
    num = data.toString().match( numberPattern );
    console.log("Num: " + num.toString())
    return num
    // console.log(data.toString());
    }); 
   
}

function avgMin() {
  mins_spent = segs_spent/60;
  avg_sgs_min = actualFarmedSg/mins_spent;
  return avg_sgs_min;
}

function avgSeg() {
  avg_sgs_seg = actualFarmedSg/segs_spent;
  return avg_sgs_seg;
}

function updateAvgMinValue( value ) {
  document.getElementById("avgmin").innerHTML = value.toString()
}

function updateAvgSegValue( value ) {
  
  document.getElementById("avgseg").innerHTML = value.toString()
}

setInterval(function () {
    checkFarming()
}, 3500)

function checkFarming() {
    console.log("Verificando Farm")
    document.getElementById("dbg").innerHTML = "4"
    if (firstSgCount < getSgCount()){
    isFarmStarted = true;   
    
        // Verificar se já começou a farmar ; Acrescentar +5 segs de tela de loading

    }
}

if ( isFarmStarted == true) {
  initSgOnFarm = getSgCount()
  startCounting();

  setInterval(function () {
    updateAvgMinValue(avgMin().toString())
    updateAvgSegValue(avgSeg().toString())
    actualFarmedSg = actualSgCounted - initSgOnFarm
  }, 1000)

}





setInterval(function (actualSgCounted, actualFarmedSg) {
  // const fs = require("fs");
  
  // document.getElementById("avg").innerHTML = "B";
  document.getElementById("dbg").innerHTML = "5"
  actualSgCounted = getSgCount()
  console.log("Atl SG: " + actualSgCounted)
  console.log("AtlF SG: " + actualFarmedSg)
  if (isFarmStarted == true) {
    console.log("Farming? True")
  } else {
    console.log("Farming?: False")
  }
  
  
  /*
  "../live/SavedVariables/DPDP.lua"
  "C:\\Users\\dinis\\Documents\\Elder Scrolls Online\\live\\SavedVariables\\DPDP.lua"
  */


  // __dirname means relative to script. Use "./data.txt" if you want it relative to execution path.
  /*
  fs.readFile("../live/SavedVariables/DPDP.lua", (error, data) => {
      if(error) {
          document.getElementById("avg").innerHTML = "ERRO!";
          throw error;
      }
      document.getElementById("avg").innerHTML = data.toString();
      // console.log(data.toString());
  }); 

  */

}, 5000); 

