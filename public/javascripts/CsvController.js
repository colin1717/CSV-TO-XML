angular
    .module('CsvToXml')
    .controller('CsvController', CsvController);

    CsvController.$inject = ['$scope','$filter','Papa'];

function CsvController ($scope, $filter) {

  var self = this;

  this.clientName = '';

  this.csvInput = '';

  this.extractDate = $filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ss.sss' + '-05:00');

  this.stringToJSON = function(){
    self.jsonOutput = Papa.parse(self.csvInput);
    self.removeSpacesOnId();
  };

  this.removeSpacesOnId = function(){
    for (var i = 0; i < self.jsonOutput.data.length; i++){
      self.jsonOutput.data[i][3] = self.jsonOutput.data[i][3].replace(/\s/g, '');
    }
  }

  this.jsonToXml = function(){
    self.xmlOutput = '<?xml version="1.0" encoding="utf-8"?><Feed xmlns="http://www.bazaarvoice.com/xs/PRR/StandardClientFeed/5.6" name="' + self.clientName + '" extractDate="' + self.extractDate + '">';

    for (var i = 1; i < (self.jsonOutput.data.length); i++){
      // self.xmlOutput += '<Product id="' + {self.jsonOutput.data[i][4]} + '">';
      self.xmlOutput += '<Product id="' + self.jsonOutput.data[i][4] +
      '"><ExternalId>'+ self.jsonOutput.data[i][4] +'</ExternalId>' +
      '<Reviews>' +
      '<Review id="' + i + '">' +
      '<ModerationStatus>' + self.jsonOutput.data[i][8] + '</ModerationStatus>'
      +'<UserProfileReference id="' + self.jsonOutput.data[i][3] +'">'
      +'<ExternalId>' + self.jsonOutput.data[i][3] + '</ExternalId>'
      +'<DisplayName>' + self.jsonOutput.data[i][3] + '</DisplayName>'
      +'<HyperlinkingEnabled>false</HyperlinkingEnabled>'
      +'<Anonymous>false</Anonymous>'
      +'</UserProfileReference>'
      +'<Title><![CDATA[' + self.jsonOutput.data[i][1] + ']]></Title>'
      +'<ReviewText><![CDATA[ ' + self.jsonOutput.data[i][2] + ']]></ReviewText>'
      +'<Rating>' + self.jsonOutput.data[i][7] + '</Rating>'
      +'<IpAddress>' + self.jsonOutput.data[i][6] + '</IpAddress>'
      +'<ReviewerLocation>' + self.jsonOutput.data[i][5] + '</ReviewerLocation>'
      +'<SubmissionTime>20' + self.jsonOutput.data[i][0].slice(6,8) + '-' + self.jsonOutput.data[i][0].slice(0,2) + '-' + self.jsonOutput.data[i][0].slice(3,5) + 'T' + self.extractDate.slice(-18) + '</SubmissionTime>'

      +'</Review>'
      +'</Reviews>'
      + "</Product>";

    }

    self.xmlOutput += '</Feed>';

    console.log(self.jsonOutput.data);
  }

  this.jsonOutput = 'something went wrong with json conversion';

  this.xmlOutput = 'something went wrong with xml conversion';

  //clipboard callbacks
  // $scope.onSuccess = function(e) {
  //   console.info('Action:', e.action);
  //   console.info('Text:', e.text);
  //   console.info('Trigger:', e.trigger);
  //
  //   e.clearSelection();
  // };

  $scope.onError = function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
  }

  this.createXmlDoc = function(){
    var blob = new Blob([self.xmlOutput], {type: "text/xml"});
    console.log(blob);
    var textToSaveAsURL = window.URL.createObjectURL(blob);

    var downloadLink = document.createElement("a");
    downloadLink.download = (self.clientName + '-content-import.xml');
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    //downloadLink.onclick = document.body.removeChild(event.target);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
  }

  this.sortConfig = {
    //disabled: true
    //handle: '.well',
    'ui-floating': true,
    stop: function(e){
      for (var i = 0; i < self.columns.length; i++){
        self.columns[i].index = i;
        console.log(self.columns[i].name + ' = ' + self.columns[i].index);
      }
      console.log(self.columns);
    }

  }

  this.columns = [
    {
      name: 'SubmissionTime',
      index: 0,
      mode: 'view'
    },
    {
      name: 'Title',
      index: 1,
      mode: 'view'
    },
    {
      name: 'ReviewText',
      index: 2,
      mode: 'view'
    },
    {
      name: 'DisplayName',
      index: 3,
      mode: 'view'
    },
    {
      name: 'ExternalId',
      index: 4,
      mode: 'view'
    },
    {
      name: 'ReviewerLocation',
      index: 5,
      mode: 'view'
    },
    {
      name: 'IpAddress',
      index: 6,
      mode: 'view'
    },
    {
      name: 'Rating',
      index: 7,
      mode: 'view'
    }
  ];

}
