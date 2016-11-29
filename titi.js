(function ($) {
$(document).ready(function () {
	var httpGetAsync = function (theUrl, callback) {
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function () {
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
					callback(xmlHttp.responseText);
			};
			xmlHttp.open("GET", theUrl, true);
			xmlHttp.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('id_token'));
			xmlHttp.setRequestHeader("acstoken", localStorage.getItem('acstoken')); // true for asynchronous
			xmlHttp.send(null);
		}
	
	var table = document.getElementById("list-tab1e");
	
			var findall = function () {
				httpGetAsync('http://www.balticapp.fi/lukeA/user/get-all',
					function (data) {
						var mData = eval(data);
						var rows = '';
						mData.forEach(function (contact) {
							var $row = document.createElement('tr');
							var did = (contact.id).substr(2, 7);
							$row.dataset.id = contact.id;
							var Status = "Ban";
							$row.innerHTML =
								`<td>
								<a href = "userDetail.html"
							data - action = "user" > $ {
									did
								} </a> </td> 
									<td>
								$ {
									contact.username || 'no username'
								} </td> 
									<td>
								$ {contact.score || 'no score'
								} </td> 
									<td class = "actions" >
								<a href="#"
							data - action = "edit" > Edit </a> | <a href= "#"
							class = "ban-user"
							data - action = "delete" > $ {Status} </a>
								</td>`;
							
							rows += $row;
							table.appendChild($row);
						});
						table.addEventListener('click', function (event) {
							event.preventDefault();
							var $button = event.target;
							var $row = $button.closest('tr');
							var id = $row.dataset.id;
							var action = $button.dataset.action;
							if (action === 'delete') {
								var delete_btn = $(".ban-user", $row);

								if (delete_btn.hasClass("banned")) {
									userRole(id);
									unBanUser(delete_btn, id);
									userRole(id);
								} else {
									userRole(id);
									banUser(delete_btn, id);
									userRole(id);
								}
							}
							if (action === 'user') {
								userProf(id);
							}
							if (action === 'edit') {
								var $cells = $row.querySelectorAll('td');
								var name = $cells[0].textContent.trim();
								var contact = $cells[1].textContent.trim();
								var note = $cells[2].textContent.trim();
								$row.innerHTML = `
      <td>
        <input value="${name}" data-original="${name}">
      </td>
      <td>
        <input value="${contact}" data-original="${contact}">
      </td>
      <td>
        <textarea data-original="${note}">${note}</textarea>
      </td>
      <td class="actions">
        <button data-action="save">save</button>
        <a href="#" data-action="cancel">cancel</a>
      </td>
    `;
							}

							if (action === 'save') {
								var $inputs = $row.querySelectorAll('input, textarea');
								 var name = $inputs[0].value;
								 var contact = $inputs[1].value;
								 var note = $inputs[2].value;

								$row.innerHTML = `
      <td>
        ${name}
      </td>
      <td>
        ${contact}
      </td>
      <td>
        ${note}
      </td>
      <td class="actions">
        <a href="#" data-action="edit">edit</a> |
        <a href="#" data-action="delete">delete</a>
      </td>
    `;

								contacts.forEach(function (contactItem) {
									if (contactItem.id === id) {
										contactItem.name = name;
										contactItem.contact = contact;
										contactItem.note = note;
									}
								});
								var newUsername = function () {
									httpGetAsync('http://www.balticapp.fi/lukeA/user/set-username' + '?username=' + contact,
										function (data) {
											console.log(data);

										});
								};
								newUsername();
							}

							if (action === 'cancel') {
								var $inputs = $row.querySelectorAll('input, textarea');
								var name = $inputs[0].dataset.original;
								var contact = $inputs[1].dataset.original;
								var note = $inputs[2].dataset.original;

								$row.innerHTML = `
      <td>
        ${name}
      </td>
      <td>
        ${contact}
      </td>
      <td>
        ${note}
      </td>
      <td class="actions">
        <a href="#" data-action="edit">edit</a> |
        <a href="#" data-action="delete">Ban</a>
      </td>
    `;
							}
						});
					});
			};
	
	findall();
//ban user
			var banUser = function (delete_btn, id) {
					httpGetAsync('http://www.balticapp.fi/lukeA/user/ban' + '?id=' + id,
						function (data) {
							var data = JSON.parse(data);
							if (data.success === true) {
								console.log(data);
								console.log(data.success);
								delete_btn.addClass("banned");
									//delete_btn.innerHTML = "Unban"
								delete_btn.html("Unban");
							}

						});
				};
				//unban user
			var unBanUser = function (delete_btn, id) {
					httpGetAsync('http://www.balticapp.fi/lukeA/user/unban' + '?id=' + id,
						function (data) {
							var data = JSON.parse(data);
							if (data.success === true) {
								console.log(data);
								console.log(data.success);
								delete_btn.removeClass("banned");
								delete_btn.html("Ban");
							}
						});
				};
				//check user roles
			var userRole = function (id) {
				httpGetAsync('http://www.balticapp.fi/lukeA/user/roles' + '?id=' + id,
					function (data) {
						console.log(data);

					});
			};
			var userProf = function (id) {
				httpGetAsync('http://www.balticapp.fi/lukeA/user' + '?id=' + id,
					function (data) {
						console.log(data);

					});
			};
			var viewSubmission = function () {

			};
		
})
})(jQuery);