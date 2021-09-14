import gsap from 'gsap'

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

const btn = document.querySelector('button')
const target = document.querySelector('p')

let start = 0
const end = 200
const amt = 0.01

const render = () => {
    start = gsap.utils.interpolate(start, end, amt)
    gsap.set(target, {x: start})
    if (start < end)
        requestAnimationFrame(render)
}

const startAnimation = e => {
    requestAnimationFrame(render)
}



btn.addEventListener('click', startAnimation)