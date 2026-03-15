const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", function(){

nav.classList.toggle("open");

});
// Contact
const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

form.addEventListener("submit", function(e){
	e.preventDefault();
	const formData = new FormData(form);
	fetch("https://script.google.com/macros/s/AKfycbybmsFLyr8fPmpo77iITi5Qgxz_YcIm9vXBpPcK0hwyIvf0xhzPbgQzkYAjVumDRx2PVA/exec",{
		method:"POST",
		body:formData
	})
	.then(res => res.text())
	.then(data => {
		formMessage.style.display = "block";
		formMessage.textContent = "Message Sent! We will contact you soon.";
		setTimeout(()=>{
			formMessage.style.display = "none";
			form.reset();
		}, 3500);
	})
	.catch(err => {
		formMessage.style.display = "block";
		formMessage.textContent = "Error sending message. Please try again.";
		setTimeout(()=>{
			formMessage.style.display = "none";
		}, 3500);
	});
});
