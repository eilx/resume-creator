export const mouse_pos = {
	x: 0,
	y: 0,
}

document.body.addEventListener('mousemove', event => {
	mouse_pos.x = event.clientX
	mouse_pos.y = event.clientY
})
