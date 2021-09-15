import gsap from 'gsap'

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

const btn = document.querySelector('button')
const target = document.querySelector('p')
const cursor = document.querySelector('#cursor')
const cursorShadow = document.querySelector('#cursor__shadow')


let start = 0
const end = 200
const amt = 0.09

const lerp = (x, y, a) => x * (1 - a) + y * a;

const render = () => {
    start = lerp(start, end, amt)
    gsap.set(target, {x: start})
    if (start < end)
        requestAnimationFrame(render)
}

const startAnimation = e => {
    requestAnimationFrame(render)
}

let mouse = {x: 0, y: 0}

const pos = {
    ox: 0,
    oy: 0,
    x: 0,
    y: 0,
}


const renderCursor = () => {
    gsap.set(cursor, {x: mouse.x, y: mouse.y})
}

const renderCursorShadow = id => {
    pos.ox = lerp(pos.x, mouse.x, 0.1)
    pos.oy = lerp(pos.y, mouse.y, 0.1)
    cursorShadow.style.transform = `translate3d(${pos.ox}px, ${pos.oy}px, 0)`
    requestAnimationFrame(renderCursorShadow)

}

const moveCursor = () => {
    requestAnimationFrame(renderCursor)
    requestAnimationFrame(renderCursorShadow)
    //window.removeEventListener('mousemove', moveCursor)
}

const main = () => {
    btn.addEventListener('click', startAnimation)
    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousemove', e => {
        mouse = {x: e.clientX, y: e.clientY}
        pos.x = pos.ox
        pos.y = pos.oy
        document.getElementById('mouse_pos').innerText =JSON.stringify(mouse)
        document.getElementById('cursor_pos').innerText =JSON.stringify({x: pos.x, y: pos.y})
        document.getElementById('shadow_pos').innerText =JSON.stringify(pos)
        cursorShadow.style.transform = `translate3d(${pos.ox}px, ${pos.oy}px, 0)`

    })
}


document.addEventListener('DOMContentLoaded', main)