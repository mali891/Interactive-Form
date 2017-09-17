//Note: I stopped commenting because in the project requirements there is no mention of comments therefore I believe they are not required.

document.addEventListener('DOMContentLoaded', () => {
    const firstInput          = document.querySelector('input[type="text"]'),
          email               = document.getElementById('mail'),
          jobTitleSelect      = document.querySelector('select#title'),
          otherJobRole        = document.getElementById('other-title'),
          firstFieldset       = document.querySelector('fieldset'),
          activitiesFieldset  = document.querySelector('fieldset.activities'),
          designDropdown      = document.getElementById('design'),
          colorDropdown       = document.getElementById('color'),
          designOptions       = document.getElementById('colors-js-puns'),
          colorOptions        = colorDropdown.children,
          colorOptionsArr     = [],
          firstColorOption    = document.querySelector('option[value="cornflowerblue"]'),
          paymentDropdown     = document.getElementById('payment'),
          paymentParagraphs   = document.getElementsByTagName('p'),
          creditCard          = document.getElementById('cc-num'),
          zip                 = document.getElementById('zip'),
          cvv                 = document.getElementById('cvv'),
          button              = document.querySelector('button'),
          mainConfCheckbox    = document.querySelector('input[name="all"]'),
          textFields          = document.querySelectorAll('input[type="text"]'),
          form                = document.getElementsByTagName('form')[0],
          originalBorderColor = '#c1deeb';

          //Create workshops arrays
          const workshopTimeSlot1 = [
              document.querySelector('input[name="js-frameworks"]'),//tues, 9 - 12
              document.querySelector('input[name="express"]'),//tues, 9 - 12
          ];

          const workshopTimeSlot2 = [
              document.querySelector('input[name="js-libs"]'),//tues, 1 - 4
              document.querySelector('input[name="node"]'),//tues, 1 - 4 
          ];

          const otherTimeSlots = [
            document.querySelector('input[name="build-tools"]'),//weds, 9 - 12
            document.querySelector('input[name="npm"]')//weds, 1 - 4
          ];

        var allWorkshops = workshopTimeSlot1.concat(workshopTimeSlot2);
        allWorkshops = allWorkshops.concat(otherTimeSlots);

        function removeElement(node) {
            if(node) {
                node.remove();
            }
        }



    //On DOM ready, give first element focus
    firstInput.focus();

    //remove 'other' input field until it is needed
    otherJobRole.style.display = 'none';

    //Add event listener to job select option
    jobTitleSelect.addEventListener('change', () => {
        if(jobTitleSelect.value == 'other') {
            otherJobRole.style.display = 'block';
        } else {
            otherJobRole.style.display = 'none';
        }
    });


    function firstColorOptionVal(text, value) {
        firstColorOption.innerHTML = text;
        firstColorOption.value = value;
    }

    firstColorOptionVal('Please select a T shirt design', '');

    for(let i = 0; i < colorOptions.length; i++) {
        colorOptions[i].style.display = 'none';
    }

    //listen for change to design dropdown
    designDropdown.addEventListener('change', () => {

        function displayLoop(init, length, display) {
          for(let i = init; i < length; i++) {
              colorOptionsArr[i].style.display = display;
          }
        }

        for(let i = 0; i < colorOptions.length; i++) {
            colorOptionsArr.push(colorOptions[i]);
        }

        if(designDropdown.value == 'js puns') {
            firstColorOptionVal('Cornflower Blue (JS Puns shirt only)', 'cornflowerblue');
            displayLoop(3, 6, 'none');
            displayLoop(0, 3, 'block');
        } else if(designDropdown.value == 'heart js') {
            firstColorOptionVal('Tomato (I ♥ JS shirt only)', 'tomato');
            displayLoop(3, 6, 'block');
            displayLoop(0, 3, 'none');
        } else {
            for(let i = 0; i < colorOptionsArr.length; i++) {
                firstColorOptionVal('Please select a T shirt design', '');
                displayLoop(0, 6, 'none');
                firstColorOption.style.display = 'block';
            }
        }
    });


    function checkSchedule() {

        function checkTimeSlot(workshop) {
            for(let i = 0; i < workshop.length; i++) {
                if(workshop[i].checked) {
                    for(let j = 0; j < workshop.length; j++) {
                        workshop[j].setAttribute('disabled', '');
                        workshop[i].removeAttribute('disabled', '');
                    }
                    break;
                } else if(!workshop[i].checked) {
                    for(let j = 0; j < workshop.length; j++) {
                        workshop[j].removeAttribute('disabled', '');
                        workshop[i].removeAttribute('disabled', '');
                    }
                }
            }
        }

        checkTimeSlot(workshopTimeSlot1);
        checkTimeSlot(workshopTimeSlot2);


        function calculateCost() {
            let costString = 'Total: $';
            let counter  = 0;

            removeElement(document.getElementById('total-cost'));



            if(mainConfCheckbox.checked) {
                counter += 2;
            } 

            for(let i = 0; i < allWorkshops.length; i++) {
                if(allWorkshops[i].checked) {
                    counter++;
                }
            }
            

            counter *= 100;
            const totalCostNode = document.createElement('span');
            totalCostNode.id = "total-cost";
            totalCostNode.innerHTML = costString + counter;
            activitiesFieldset.appendChild(totalCostNode);
        }

        calculateCost();

    }

    activitiesFieldset.addEventListener('change', () => {
        checkSchedule();
    });

    
    for(let i = 0; i < paymentParagraphs.length; i++) {
        paymentParagraphs[i].style.display = 'none';
    }

    paymentDropdown.addEventListener('change', () => {
        const CCInputs = document.getElementById('credit-card');

        function nonCCPayment(value, index) {
            if(paymentDropdown.value == value) {
                paymentParagraphs[index].style.display = 'none';
            } else {
                paymentParagraphs[index].style.display = 'block';
            }
        }

        function paymentDisplay(CCInputsDisplay, paymentParagraphsDisplay) {
            CCInputs.style.display = CCInputsDisplay;
            for(let i = 0; i < paymentParagraphs.length; i++) {
                paymentParagraphs[i].style.display = paymentParagraphsDisplay;
            }
        }

        if(paymentDropdown.value == 'select_method') {
            paymentDisplay('block', 'block');
        } else if(paymentDropdown.value == 'credit card') {
            paymentDisplay('block', 'none');
        } else {
            paymentDisplay('none', 'block');
            nonCCPayment('paypal', 1);
            nonCCPayment('bitcoin', 0);
        }
    });


    //Real time validation of input fields
    for(let i = 0; i < textFields.length; i++) {
        textFields[i].addEventListener('keyup', () => {
            if(textFields[i].value.length < 1 || textFields[i].value == '') {
                textFields[i].style.borderColor = 'tomato';
                textFields[i].placeholder = 'Please enter a value';
            } else {
                textFields[i].style.borderColor = originalBorderColor;
                textFields[i].placeholder = '';
            }
        });
    }


    //Final checks on submit
    button.addEventListener('click', (e) => {

        //Check name field isn't blank
        if(firstInput.value.length < 1 || firstInput.value == '') {
            e.preventDefault();
            firstInput.value = '';
            firstInput.placeholder = 'Please enter your name';
            firstInput.style.borderColor = 'tomato';
        } else {
            firstInput.placeholder = '';
            firstInput.style.borderColor = originalBorderColor;
        }

        //check valid email address
        function validateEmail() {
            let emailValue = email.value,
                validEmail = false;

            if(emailValue.length > 0) {
                let atpos  = emailValue.indexOf('@');
                let dotpos = emailValue.lastIndexOf('.');
                if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailValue.length) {
                    e.preventDefault();
                    email.value = '';
                    email.style.borderColor = 'tomato';
                    email.placeholder = 'Please enter a valid email address';
                }
            } else if(emailValue.length < 1) {
                e.preventDefault();
                email.value = '';
                email.style.borderColor = 'tomato';
                email.placeholder = 'Please enter an email address';
            } else {
                e.preventDefault();
                email.style.borderColor = originalBorderColor;
                email.placeholder = '';
                validEmail = true;
            }
        }

        validateEmail();


        //Check if at least one checkbox is checked
        function checkCheckboxesSubmit() {
            let checked = false;
            const checkboxes = document.querySelectorAll("input[type=checkbox]");

            for(let i = 0; i < checkboxes.length; i++) {
                if(checkboxes[i].checked) {
                    checked = true;
                }
            }
            return checked;
        }

        let isChecked = checkCheckboxesSubmit();

        if(!isChecked) {
            e.preventDefault();
            removeElement(document.getElementById('checkbox-error'));

            let checkboxError = document.createElement('p');
            checkboxError.id = 'checkbox-error';
            checkboxError.innerHTML = 'Please select at least one activity';
            checkboxError.style.color = 'tomato';
            document.querySelector('.activities').appendChild(checkboxError);
        } else {
            removeElement(document.getElementById('checkbox-error'));
        }


        //Validate credit card info
        if(paymentDropdown.value == 'credit card') {
            function checkCCDetails(el, min, max) {
                if(el.value.length < 1 || el.value == '') {
                    e.preventDefault();
                    el.value = '';
                    el.style.borderColor = 'tomato';
                    el.placeholder = 'Please enter a value';
                } else if(!isNaN(el.value)) {
                    if(el.value.length < min || el.value.length > max) {
                        e.preventDefault();
                        el.value = '';
                        el.style.borderColor = 'tomato';
                        el.placeholder = 'Please enter a number between ' + min + ' and ' + max + ' digits long';
                    }
                } else if(isNaN(el.value)) {
                    e.preventDefault();
                    el.value = '';
                    el.style.borderColor = 'tomato';
                    el.placeholder = 'Please enter a numeric value'
                } else {
                    el.style.borderColor = originalBorderColor;
                    el.placeholder = '';
                }
            }

            checkCCDetails(creditCard, 13, 16);
            checkCCDetails(zip, 5, 5);
            checkCCDetails(cvv, 3, 3);
        }
    });
});
