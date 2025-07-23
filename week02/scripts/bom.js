const input = document.querySelector("#favchap");
const button = document.querySelector('button');
const list = document.querySelector('#list');

const li = document.createElement('li');

const deleteButton = document.createElement('button');

li.textContent = input.value;
deleteButton.textContent = '❌';

li.appendChild(deleteButton);

list.append(li);

button.addEventListener('click', function()  {
    if (input.value.trim() === '') {
        alert('Please enter a valid chapter.');
        return;
    }
  li.textContent = input.value;
  li.appendChild(deleteButton);
  list.append(li);
  input.value = '';
});

deleteButton.addEventListener('click', function() {
    list.removeChild(li);
    input.focus();
});

input.value = '';