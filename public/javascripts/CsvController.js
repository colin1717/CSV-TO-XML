angular
    .module('CsvToXml')
    .controller('CsvController', CsvController);

    CsvController.$inject = ['Papa'];

function CsvController () {

  var self = this;

  this.csvInput = '';

  this.stringToJSON = function(){
    self.jsonOutput = Papa.parse(self.csvInput);
  };

  this.wtf = function(){
    console.log('idontknow man');
  }

  this.jsonToXml = function(){
    self.xmlOutput = '<?xml version="1.0" encoding="utf-8"?>' + self.jsonOutput.data[0];

  }

  this.jsonOutput = 'something went wrong with json conversion';

  this.xmlOutput = 'something went wrong with xml conversion';


}
