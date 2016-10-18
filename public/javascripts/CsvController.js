angular
    .module('CsvToXml')
    .controller('CsvController', CsvController);

    CsvController.$inject = ['$scope','$filter','Papa'];

function CsvController ($scope, $filter) {

  var self = this;

  this.clientName = '';

  this.csvInput = '';

  this.extractDate = $filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ss.sssZ');

  this.stringToJSON = function(){
    self.jsonOutput = Papa.parse(self.csvInput);
  };

  this.jsonToXml = function(){
    self.xmlOutput = '<?xml version="1.0" encoding="utf-8"?><Feed xmlns="http://www.bazaarvoice.com/xs/PRR/StandardClientFeed/5.6" name="' + self.clientName + '" extractDate="' + self.extractDate + '">';

    for (var i = 1; i < (self.jsonOutput.data.length); i++){
      // self.xmlOutput += '<Product id="' + {self.jsonOutput.data[i][4]} + '">';
      self.xmlOutput += '<Product id="' + self.jsonOutput.data[i][4] +
      '"><ExternalId>'+ self.jsonOutput.data[i][4] +'</ExternalID>' +
      '<Reviews>' +
      '<Review>' +
      '<ModerationStatus>' + self.jsonOutput.data[i][8] + '</ModerationStatus>'
      +'<UserProfileReference id="' + self.jsonOutput.data[i][3] +'">'
      +'<ExternalId>' + self.jsonOutput.data[i][3] + '</ExternalId>'
      +'</UserProfileReference>'
      +'<Title>' + self.jsonOutput.data[i][1] + '</Title>'
      +'<ReviewText>' + self.jsonOutput.data[i][2] + '</ReviewText>'
      +'<Rating>' + self.jsonOutput.data[i][7] + '</Rating>'
      +'<IpAddress>' + self.jsonOutput.data[i][6] + '</IpAddress>'
      +'<ReviewerLocation>' + self.jsonOutput.data[i][5] + '</ReviewerLocation>'
      +'<SubmissionTime>20' + self.jsonOutput.data[i][0].slice(6,8) + '-' + self.jsonOutput.data[i][0].slice(0,2) + '-' + self.jsonOutput.data[i][0].slice(3,5) + 'T' + self.extractDate.slice(-14) + '</SubmissionTime>'

      +'</Review>'
      +'</Reviews>'
      + "</Product>";

      console.log('====year===');
      console.log(self.jsonOutput.data[i][0].slice(6,8));
      console.log('====month===');
      console.log(self.jsonOutput.data[i][0].slice(0,2));
    }

    self.xmlOutput += '</Feed>';

    console.log(self.jsonOutput.data);
  }

  this.parseJson = function(){

  }

  this.jsonOutput = 'something went wrong with json conversion';

  this.xmlOutput = 'something went wrong with xml conversion';


}
