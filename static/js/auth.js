// Get the modal
var icon = document.querySelector(".site-btn i");
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("j-close")[0];

// When the user clicks on the button, open the modal
function show () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const app = (function(win, doc){
	const modalMsg = doc.querySelector("#modal-msg")
	const modalTitle = doc.querySelector("#modal-title")
	const form = {
		register : {
			fname : doc.querySelector('#inputFirst4'),
			lname : doc.querySelector('#inputLast4'),
			country : doc.querySelector('#formCountry'),
			zip : doc.querySelector('#inputZip4'),
			email : doc.querySelector('#inputEmail4'),
			username : doc.querySelector('#inputUser4'),
			phone : doc.querySelector('#inputPhone4'),
			code : doc.querySelector('#inputCCode'),
			password : doc.querySelector('#inputPassword4'),
			rpassword : doc.querySelector('#inputRPassword4'),
			accept : doc.querySelector('#accept-terms'),
		},
		login : {
			email : doc.querySelector("#email"),
			password : doc.querySelector("#password"),
			rememberMe : doc.querySelector('#rememberMe'),
			token : doc.querySelector('#token'),
			submit : doc.querySelector('#submit')
		}
	}

	const loginform = doc.querySelector('form#login')
	if (loginform !== null){
		loginform.addEventListener('submit', (event) => {
			event.preventDefault();

			win.icon.classList.add('show')

			let lform = {
				email : form.login.email.value,
				password : form.login.password.value
			}

			fetch ("/auth/login", {
				method : "POST",
				body: JSON.stringify(lform),
				headers: {"Content-type": "application/json; charset=UTF-8"}
			})
			.then (response => response.json())
			.then(json => {
				if (json.status === "failed") {
					form.login.token.style.display = "none"
					modalMsg.innerHTML = "Login Failed: "+ json.message
					modalTitle.innerHTML = "Failed"
					win.icon.classList.remove('show')
					win.show()
					return
				}

				const continueBtn = doc.querySelector('#m-continue')
				continueBtn.addEventListener('click', (event) => {
					location.href = "/dash/"
					//
						// fetch("/auth/access-token", {
						// 	method : "POST",
						// 	body: JSON.stringify(rform),
						// 	headers: {"Content-type": "application/json; charset=UTF-8"}
						// })
				})
				
				form.login.token.addEventListener("keyup", (event)=>{
					if (event.keyCode === 13) {
						event.preventDefault();
						continueBtn.click()
					}
				})

				
				modalMsg.innerHTML = "Login Successful"
				modalTitle.innerHTML = "LoginSuccessful"
				win.icon.classList.remove('show')
				win.show()
			}).catch(err => console.log(err));
		})
	}
		
	const registerform=doc.querySelector('form#register')
	if (registerform == null) return
	registerform.addEventListener('submit', (event) => {
		event.preventDefault();

		win.icon.classList.add('show')
		
		let rform = {...form.register}
		
		// Check if terms are agreed upon
		if (!rform.accept.value) {
			rform.accept.classList.add('validation-error')
			return
		}

		if (rform.password.value !== rform.rpassword.value ) {
			rform.password.classList.add('validation-error')
			rform.rpassword.classList.add('validation-error')
			return
		}

		// Delete unnessecary fields
		delete(rform.accept)

		// Extract Values from field
		for (f in rform){
			rform[f] = rform[f].value
		}

		fetch('/auth/register', {
		  method: "POST",
		  body: JSON.stringify(rform),
		  headers: {"Content-type": "application/json; charset=UTF-8"}
		})
		.then(response => response.json()) 
		.then(json => {
			if (json.status === "failed") {
				modalMsg.innerHTML = "Registeration Failed: "+ json.message
				modalTitle.innerHTML = "Failed"
				win.icon.classList.remove('show')
				win.show()
				return
			}
			modalMsg.innerHTML = "Registeration Successful<br>Check Your Email For Further Verification"
			modalTitle.innerHTML = "Successful"
			win.icon.classList.remove('show')
			win.show()
		}).catch(err => console.log(err));
	})
})


app(window, document, jQuery)