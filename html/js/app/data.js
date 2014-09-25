define(['underscore-contrib'], function(_){

  var data = [];

  var tokenize = function(sz){
    return sz.split(' ');
  };

  var addSample = function(sz){
    var s = sz.slice();
    
    data.push({
      'text' : s,
      'tokens': tokenize(s),
      'tags' : []
    });
  };

  var addTag = function(i, start, end, tag){
    data[i].tags.push({
      'start': start, 
      'end': end,
      'tag': tag
    });
  };

  var clearTags = function(i){
    data[i].tags = [];
  };

  var removeTag = function(i, start, end){
    data[i].tags = _.filter(data[i].tags, 
                            function(t){
                              return _.any([t.start != start, t.end != end]);
                            });
  };

  //test
  var sample = ['My name is Davis King and I work for MIT.',
                'I met with John Becker at HBU',
                'I met with Jim at Harvard' ];
  _.each(sample, addSample);
  addTag(0, 3, 5, "person");  
  addTag(1, 3, 5, "person");    

  return {
    addSample : addSample,
    addTag : addTag,
    clearTags : clearTags,
    removeTag : removeTag,
    trainings : data
  }
});
