import '../../scss/pages/ready-homes/style.scss'
import '../../pages/ready-homes.html'
import ButtonGroup from  '../plugins/choice-button'
new ButtonGroup('ready-homes-btns')
import ScrollPos  from '../plugins/scroll-pos'
new ScrollPos('ready-homes-btns')
class Filter{
    constructor(){
        this.open = false
        this.card = document.querySelector('.card-filter')
        const square = document.querySelector('.square')
        const items = document.querySelectorAll('.card-filter__item')
        square.onclick = ()=>{
            square.classList.add('square_active')
            this.card.classList.add('card-filter_open')
            setTimeout(()=>this.open = true,.2)
            
        }
        document.onclick = (e)=>{
            if(this.open && !e.composedPath().includes(this.card)){
                this.card.classList.remove('card-filter_open');
                square.classList.remove('square_active');
                this.open = false
            }
        }
        Array.from(items).forEach(item=>{
            if(item.classList.contains('card-filter__item_active'))item.classList.remove('card-filter__item_active')
            item.addEventListener('click', ()=>{
                Array.from(items).forEach(item=>{
                    if(item.classList.contains('card-filter__item_active'))item.classList.remove('card-filter__item_active')
                })
                item.classList.add('card-filter__item_active')
            })
        })
    }   

    get isOpen(){
        return this.card.classList.contains('card-filter_open')
    }
    
}
new Filter();