const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", function(){

nav.classList.toggle("open");

});
// Contact
const form = document.getElementById("contact-form");

form.addEventListener("submit", function(e){

e.preventDefault();

const formData = new FormData(form);

fetch("https://script.google.com/macros/s/AKfycbybmsFLyr8fPmpo77iITi5Qgxz_YcIm9vXBpPcK0hwyIvf0xhzPbgQzkYAjVumDRx2PVA/exec",{
method:"POST",
body:formData
})
.then(res => res.text())
.then(data => {
alert("Message Sent");
form.reset();
})
.catch(err => {
alert("Error sending message");
});

});