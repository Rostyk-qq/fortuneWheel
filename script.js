let input = document.querySelector('.header__input');

let buttonAdd = document.querySelector('.btn__add');
let buttonResult = document.querySelector('.btn__res');

let wrapperMain = document.querySelector('.wrapper__main');
let wheel = document.querySelector('.wrapper__main .main__wheel');
let resWrite = document.querySelector('.container__result span');

let arrow = document.querySelector('.wrapper__main .chose_arrow');
// get variables css on global level 
let root = document.documentElement;

// button disabled checking
input.addEventListener('input', () => {
    if (input.value.length < 5) {
        buttonAdd.disabled = true;
    } else {
        buttonAdd.disabled = false;
    }
});
// button click add to massive 
let count = 0;
buttonAdd.addEventListener('click', e => {
    let value = input.value
    e.preventDefault();
    if(count === 1){
        arrow.style.display = 'block'
    }
    if (!buttonAdd.disabled) {
        wheel.insertAdjacentHTML('beforeend', `<span style='--i: ${count};' ><a class='value' href="#">${value}</a></span>`);
        count++;
        root.style.setProperty('--count_elements', count);
        input.value = '';
    }
    if(input.value === ''){
        buttonAdd.disabled = true;
    }
})

buttonResult.addEventListener('click', e => {
    e.preventDefault();
    let spin = Math.random() * ((360*7) + (360*15)) - (360*7);
    root.style.setProperty('--rotate', spin + 'deg');
    wheel.classList.add('rotate-animation');
    setTimeout(() => {
        let allAddedValues = document.querySelectorAll('.wrapper__main .main__wheel span a');
        allAddedValues.forEach(element => {
            let borders = arrow.getBoundingClientRect();
            let elementPos = element.getBoundingClientRect();
            if(elementPos.x >= borders.x && elementPos.x <= (borders.x + borders.width) && elementPos.bottom <= borders.height){
                resWrite.innerText = element.textContent;
                console.log(element);
            }
        });
    }, 10000)
    resWrite.innerText = ''
})

