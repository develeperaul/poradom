export default class ScrollPos{
    constructor(name){
        const parent = document.querySelector(`#${name}`)
        const button = document.querySelector(".button__group .button__round_active")
        const buttonF = document.querySelector(".button__group .button__round")
        const first = document.querySelector(`#${name} .button__round`)
        const leftPositionParent = parent.getBoundingClientRect().left
        parent.addEventListener(
            'scroll',
            ()=>{
                if(first.getBoundingClientRect().left != leftPositionParent)parent.classList.add('button__group_active')
                if(first.getBoundingClientRect().left == leftPositionParent && parent.classList.contains('button__group_active'))parent.classList.remove('button__group_active')
            }
        )
        const offsetBtn = button.getBoundingClientRect().left - buttonF.getBoundingClientRect().left
        parent.scrollBy(offsetBtn,0)
    }
}