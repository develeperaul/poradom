let form = document.querySelector('#special-offer')

if(form){
    let validateBtn = form.querySelector('#special-offer-btn')
    const fields = form.querySelectorAll('[data-special-offer]');
    let validate = true
    console.log(fields)
    form.addEventListener('submit', function (event) {
      event.preventDefault()
        
        for (var i = 0; i < fields.length; i++) {
            fields[i].classList.remove('text-field__input_invalid')
            fields[i].classList.remove('checkbox_invalid')
            if(fields[i].type == 'checkbox' && !fields[i].checked){
                fields[i].classList.add('checkbox_invalid')
                validate = false
            }
            if (fields[i].type !== 'checkbox' && (!fields[i].value || fields[i].value.length < 17)) {
                
                fields[i].classList.add('text-field__input_invalid')
                validate = false
            }
        }
    })
}