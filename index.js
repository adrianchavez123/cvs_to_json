const csv = require('csvtojson');
const path = require('path');
const fs = require('fs');

const defaultCSV = path.join(__dirname,'resources', 'customer-data.csv');

const Convertor =  function Convertor(file=defaultCSV){

  console.log(`Input file: ${file}`);
  const process = function process(jsonFormat = true){

    const results = [];
    csv({ noheader:false })
    .fromFile(file)
    .on('json',(json)=>{
      results.push(json);
    })
    .on('done',()=>{
      console.log( (jsonFormat)? JSON.stringify(results) : results);

    })
    .on( 'error', error => {
      console.error(error.message);
    });
  };

  return {process};
};


const csvFile = process.argv[2];

const c = Convertor(csvFile);
c.process(false);
c.process();
