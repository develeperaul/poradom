import "../../index.html"
import "../plugins/swiper";
import '../plugins/animateNumber'
import '../plugins/telmask'
import '../plugins/validateform'
import Dropdown from '../plugins/dropdown';
new Dropdown("1");
new Dropdown("2");
new Dropdown("3");

class Cards {
  constructor(name){
    
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
class Survey {
    constructor(name){
        this.name = document.querySelector(`#${name}`)
        if(this.name){
          const popup = this.name.parentNode.querySelector('.popup')
          
          
          if(this.name.children.length > 0 && this.getActiveClass){
          Array.from(this.name.children).forEach(el=>{
            el.addEventListener(
              'click',
              ()=>{
                if(this.getActiveClass){
                  if(el.getAttribute('class').indexOf('card-survey_active') == -1){
                    el.classList.add('card-survey_active')
                    // this.name.classList.remove('survey__notactive')
                    this.updateWithProgress()
                    console.log(el)
                    popup.classList.add('popup_active')
                    setTimeout(()=>{
                      popup.classList.remove('popup_active')
                    }, 1500)
                  }
                }
                  
              }
            )
          })
          }
        }
    }
    get getActiveClass() {
        let isActive = false
        Array.from(this.name.children).forEach(el=>{
            if(el.getAttribute('class').indexOf('card-survey_active') !== -1){
                isActive = el.getAttribute('class').indexOf('card-survey_active') !== -1
            }
        })
        return !isActive
    }

    updateWithProgress(){
      
      Array.from(this.name.querySelectorAll('.card-survey')).forEach(el=>{
        const w = el.querySelector('.card-survey__progress').getAttribute('data-w')
        el.querySelector('.card-survey__progress').style.width = `${w}%`
      })
    }
  }
new Cards('new')
new Survey('survey')
console.log('sdflkj')
// import '../../index.html'
// new Dropdown("1");
// new Dropdown("2");
// new Dropdown("3");

// new Cards('new')
// new Survey('survey')