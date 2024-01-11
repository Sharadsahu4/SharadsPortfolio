// <!-- PAYMENT FORM START JS -->

// Get all input fields
const inputFields = document.querySelectorAll('.input-field-plc');

// Add event listener to each input field
inputFields.forEach(function (inputField) {
    let placeholderText = inputField.getAttribute('placeholder');

    inputField.addEventListener('focus', function () {
        placeholderText = inputField.getAttribute('placeholder');
        inputField.removeAttribute('placeholder');
    });

    inputField.addEventListener('blur', function () {
        inputField.setAttribute('placeholder', placeholderText);
    });
});


const phoneNumberInput = document.getElementById('phone');

phoneNumberInput.addEventListener('input', function (event) {
    const numericInput = event.data || '';
    const numericRegex = /^[0-9]+$/;

    if (!numericRegex.test(numericInput)) {
        event.preventDefault();
        phoneNumberInput.value = phoneNumberInput.value.replace(/\D/g, '');
    }
});




let projectBayBox = document.querySelectorAll(".anim-link");
let formCloseBtn = document.querySelector(".close-payment");
let paymentForm = document.querySelector(".container__main");

projectBayBox.forEach(box => {
    box.addEventListener("click", (event) => {
        paymentForm.classList.add("active");
        let clickedElement = event.target;
        let animLinksElement = findAncestorWithClass(clickedElement, 'anim-link');

        if (animLinksElement) {
            let imageElement = animLinksElement.querySelector('img');
            let videoElement = animLinksElement.querySelector('video');

            if (imageElement) {
                let imageUrl = imageElement.src;
                console.log("User ne is anim-links class ke sath yeh image per click kiya hai:", imageUrl);
            }

            if (videoElement) {
                let videoUrl = videoElement.src;
                console.log("User ne is anim-links class ke sath yeh video per click kiya hai:", videoUrl);
            }
        }
    });
});

function findAncestorWithClass(element, className) {
    let currentElement = element;
    while (currentElement) {
        if (currentElement.classList.contains(className)) {
            return currentElement;
        }
        currentElement = currentElement.parentElement;
    }
    return null;
}




formCloseBtn.addEventListener("click", () => {
    paymentForm.classList.remove("active");
});


// Form submit event pe listener set karein
let form = document.getElementById("contact");

const scriptURL = 'https://script.google.com/macros/s/AKfycbzr4TThw05aV7BuuWsZcnYlL1fHrXV3c9WgSse7mnUz-GjtNiCNYHLZjyENTr9gPiFx/exec'


form.addEventListener("submit", function (event) {
    event.preventDefault();


        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        //   .then(response => alert("Thanks for Contacting us..! We Will Contact You Soon..."))
          .catch(error => console.error('Error!', error.message))
    // Prevent the form from submitting normally

    // Form ke saare fields ko select karein
    let formFields = form.elements;

    // Har ek field ka value ko console par print karein
    for (let i = 0; i < formFields.length; i++) {
        let field = formFields[i];

        // Check karein ki field type "submit" nahi hai
        if (field.type !== "submit") {
            if (field.name && field.value) {
                console.log(`Field Name: ${field.name}, Value: ${field.value}`);
            } else {
                console.log("Field name or value is undefined or empty");
            }
        }
    }
    let phoneNumber = "7898790394"; // Replace with your WhatsApp number
    let message = "Hello, how are you?";

    let whatsappURL = `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");

    // Clear the form input values
    form.reset();
});




// <!-- PAYMENT FORM END JS -->