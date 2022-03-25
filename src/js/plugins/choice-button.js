export default class ButtonGroup {
    constructor(name){
        this.name = document.querySelector(`#${name}`);
        if(this.name){
            const btns = this.name.querySelectorAll('.button__round')
            
            Array.from(btns).forEach(button=>{
                button.onclick = (e) => {
                    Array.from(btns).forEach(el=>{el.classList.remove('button__round_active');el.removeAttribute('id')})
                    button.classList.add('button__round_active')
                    button.setAttribute('id', 'requisites-button')
                }
            })
        }  
    }
}