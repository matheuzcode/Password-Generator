const CHARACTER_SETS = [
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'abcdefghijklmnopqrstuvwxyz',
  '1234567890',
  '!@#$%^&*()',
]

const length = document.querySelector('#length')
const uppercaseInput = document.querySelector('#uppercase')
const lowercaseInput = document.querySelector('#lowercase')
const numbersInput = document.querySelector('#numbers')
const symbolsInput = document.querySelector('#symbols')
const showPassword = document.querySelector('#password')
const showStrength = document.querySelector('.strength')
const slider = document.querySelector('.slider-green-bar')
const copyIcon = document.querySelector('.copy-icon')
const box = document.querySelectorAll('.box')

const rangeMaxValue = length.max
const rangeMinValue = length.min
var rangeValue = 0

length.addEventListener('input', evt => {
    document.querySelector('.length').textContent = evt.target.value
    rangeValue = evt.target.value;
    console.log(rangeValue)
    Porcentagem = ((rangeValue - rangeMinValue) / (rangeMaxValue - rangeMinValue)) * 100
    slider.style.width = `${Porcentagem}%`

});

const generatePassword = () => {
    var password = '';
    var passwordLength = length.value;
    var selectedSets = [];

    const passwordOptions = [
        uppercaseInput.checked,
        lowercaseInput.checked,
        numbersInput.checked,
        symbolsInput.checked,
    ]

    for(const key in CHARACTER_SETS){
        if(passwordOptions[key]){
            selectedSets.push(CHARACTER_SETS[key])
        }
    }

    selectedSets.forEach((charSet) => {
        const randomChar = charSet[Math.floor(Math.random() * charSet.length)]
        password += randomChar;
    });

    if (!selectedSets.length) {
        alert('Make sure to check at least one password option');
        return; // Saia da função se nenhuma opção de senha estiver selecionada
    }

    while(password.length < passwordLength){
        const randomSet = selectedSets[Math.floor(Math.random() * selectedSets.length)]
        const randomChar = randomSet[Math.floor(Math.random() * randomSet.length)]
        password += randomChar;
    }

    let sortPassword = password.split('').sort(function(){
        return 0.5 - Math.random();
    });

    let passwordResult = sortPassword.join("")

    showPassword.innerHTML = passwordResult;
    
    const level = (boxNumber, color) => {
        let i = 0
        while(i < boxNumber){
            box[i].style.backgroundColor = color
            box[i].style.borderColor = color
            i++
        }
    }

    if(selectedSets.length >= 3 && passwordResult.length > 8){
        showStrength.innerHTML = "High"
        level(4, "#40df50")
    }else if(selectedSets.length >= 2 && passwordResult.length > 6){
        showStrength.innerHTML = "Medium"
        level(3, "#f3a01f")
        box[3].style.backgroundColor = "#18171F"
        box[3].style.borderColor = "#dddada"
    }else{
        showStrength.innerHTML = "Low"
        level(1, "#f3291f")
        let i = 1
        while(i < 4){
            box[i].style.backgroundColor = "#18171F"
            box[i].style.borderColor = "#dddada"
            i++
        }
    }

    copyIcon.style.color = "white"
    showPassword.style.color = "#54535B"
}

const copyPassword = () => {
    navigator.clipboard.writeText(showPassword.textContent);
    copyIcon.style.color = "#A5FFAE"
    showPassword.style.color = "white"
}

