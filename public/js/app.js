
const input = document.querySelector('.location')
const form = document.querySelector('form')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

msg1.value = ''
msg2.value = ''

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    const location = input.value
    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then(data=>{
        msg1.textContent = data.forecast
        msg2.textContent = data.location
    })

    })

})