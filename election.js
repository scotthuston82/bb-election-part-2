document.addEventListener("DOMContentLoaded", function() {
  var list = document.querySelector('#list');

  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    dataType: 'JSON'
  }).done(function(data){
    // debugger
    data.candidates.forEach(function(candidate){
      var li = document.createElement('li');
      var form = document.createElement('form');
      var submit = document.createElement('input');
      var hidden = document.createElement('input')
      hidden.type = 'hidden';
      hidden.name = 'name';
      hidden.value = candidate.name
      submit.type = 'submit';
      submit.setAttribute('value','Vote');
      li.append(candidate.name);
      li.append(" Votes: " + candidate.votes);
      form.method = 'Post';
      form.action = "https://bb-election-api.herokuapp.com/vote"
      form.addEventListener('submit',function(event){
        event.preventDefault();
        $.ajax({
          url: 'https://bb-election-api.herokuapp.com/vote?name=' + candidate.name, body: {},
          method: 'POST'
        })
      });

      form.append(submit)
      li.append(form);
      list.append(li);
    });
  });

});
