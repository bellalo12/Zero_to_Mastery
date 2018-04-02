var button = document.getElementById('enter');
var input = document.getElementById('enteritems');
var ul = document.querySelector('ul');

function inputLength(){
  return input.value.length;
}

function createListElement(){
  var item = document.createElement('li');
  var deleteButton = document.createElement('button');
  item.appendChild(document.createTextNode(input.value));
  deleteButton.appendChild(document.createTextNode('Delete'));
  ul.appendChild(item);
  item.appendChild(deleteButton);
  input.value='';
}

button.addEventListener('click', function(){
  if (inputLength() > 0){
  createListElement();
  }
})


input.addEventListener('keypress', function(event){
  if (inputLength() > 0 && event.keyCode === 13){
  createListElement();
  }
})

ul.addEventListener('click', function(event){
  if(event.target.localName === 'li'){
    event.target.classList.toggle('done');
  }else if(event.target.localName === 'button'){
    event.target.parentNode.remove();
  }
})
