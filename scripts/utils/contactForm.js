
/* eslint-disable */

function displayModal() {
	const modal = document.getElementById("contact_modal");
	const btn = document.querySelector(".contact_button");
	const close = document.querySelectorAll(".close")[0];
	const firstNameInput = document.getElementById("firstname");
	const lastNameInput = document.getElementById("lastname");
	const emailInput = document.getElementById("email");
	const messageInput = document.getElementById("message");
	const submitButton = document.querySelectorAll(".send_modal");

	btn.onclick = function () {
		modal.style.display = "block";
	};


	close.onclick = function () {
		modal.style.display = "none";
	};


	document.addEventListener('keydown', function(e) {
		let keyCode = e.key;
		if (keyCode === "Escape") {
				modal.style.display = "none";
		}
});

	if (submitButton) {
		submitButton[0].addEventListener("click", function (event) {
			event.preventDefault();
            console.log(
                firstNameInput.value
            );
		console.log(
            lastNameInput.value 
        );
		console.log(emailInput.value);
		console.log(messageInput.value);
		modal.style.display = "none";
		});

	}
}

