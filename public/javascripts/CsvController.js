angular
    .module('CsvToXml')
    .controller('CsvController', CsvController);

    CsvController.$inject = ['Papa'];

function CsvController () {

  var self = this;

  this.fakeOutput = '<span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit dolores qui esse placeat illum eveniet laboriosam corrupti commodi possimus deleniti quam voluptas nam voluptatibus molestias odio eos eum, incidunt vero!</span><span>Laborum ut iusto quidem ipsam, ullam adipisci? Natus sint dolorum minus quisquam nemo at modi laudantium voluptatum ipsam amet, excepturi, eum nobis, commodi nam similique. Laborum placeat, odit qui dolorem!</span><span>Corporis libero nam debitis quae! Hic fuga labore amet beatae nulla, placeat velit mollitia. Labore tenetur, voluptatem recusandae, illum quibusdam quam odit totam unde alias at quisquam distinctio necessitatibus voluptatibus.</span>';

  this.input = '';

  this.stringToJSON = function(){
    self.output = Papa.parse(self.input);
  }

  this.output = 'something went wrong';

}
