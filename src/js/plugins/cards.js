export default class Cards {
  constructor(name){
    console.log(name)
    this.name = document.querySelector(`#cards_${name}`);
    if(this.name){
      const groupBtn = []
      const btns = []
        Array.prototype.slice.call(this.name.children).forEach((el,i)=>{
          el.setAttribute('id',`cards_${name}_${i+1}`)
          el.querySelector('.button__group').setAttribute('id',`group_${name}_${i+1}`)
          const groupEl = el.querySelector(`#group_${name}_${i+1}`)
          btns.push(...Array.from(groupEl.children))
          groupBtn.push(el.querySelector(`#group_${name}_${i+1}`))
        })
        
        btns.forEach((el,i)=>{
          
          el.addEventListener(
            'click',
            (e)=>{
              if(el.getAttribute('class').indexOf('button__round_active') == -1){
                Array.from(el.parentNode.children).forEach(item=>{
                  if(item.getAttribute('class').indexOf('button__round_active') !== -1){
                    item.classList.remove('button__round_active')
                    el.classList.add('button__round_active')
                  }
                })
              }
            }
          )
        })
    }
  }
}