(function ()
'use strict';

angular
  .module('app')
  .controller('userCtrl', userCtrl);

SubmissionCtrl.$inject = ['authService', 'apiService', '$scope', '$state'];

function userCtrl(authService, apiService, $scope, $state) {
  var vm = this;
  vm.authService = authService;
  findreports()
  findreports = function () {httpGetAsync('http://www.balticapp.fi/lukeA/category',
	 function (data) {
		 console.log(data);
		 var categorys = eval(data);
		 var imgrows = '';
		 categorys.forEach(function(category){
			 var img = document.createElement('li');
			 img.dataset.id = category.id
			 img.innerHTML = `
			 <img src=${category.image_url} />
			 <h3>${category.title}</h3>
			 <p>${category.description}</p>
			 <button id="report" data-action="remove" ">Delete</button>
			 <button  data-action="update" ">update</button>

			 `
			 reportul.append(img)
	 })
	reportul.on('click', function(event){
	event.preventDefault()
	var rButton = event.target
	var deleteI = rButton.closest('li')
	var id = deleteI.dataset.id
	var action = rButton.dataset.action
	if (action === 'remove'  ){
		deleteCatagory(id)
		console.log('delete');
		deleteI.remove()
		}
	if(action === 'update'){
		console.log('update');
	}
	})

	form.on('submit', function (event) {
		event.preventDefault()
		console.log('clicked');
		var image = document.querySelector('#image').value
		var title = document.querySelector('#title').value
		var description = document.querySelector('#description').value
		var positive = document.querySelector('#positive').value
		var row = document.createElement('li')
		//row.dataset.id = id
    row.innerHTML = `
		<img src=${image} />
	  <h3>${title}</h3>
	  <p>${description}</p>
	  <button id="report" data-action="remove" ">Delete</button>
	  <button  data-action="update" ">update</button>
	  `
    reportul.append(row)

		$.ajax({
  type: "POST",
  url: 'http://www.balticapp.fi/lukeA/category/create',
  data: {
      "title": title,
			"description": description,
			"image": image,
			"positive": positive
    },
  success: function(){console.log('sucess');},
  error: function(){console.log(error);},
});

    //form.reset()
 //   contacts.push({
 //     id: id,
 //     name: name
 //   })
	})

	})
	}

}
}());
