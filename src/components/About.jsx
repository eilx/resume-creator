import { useEffect, useState, useRef } from 'react'
import { mouse_pos } from '../utils'


const default_description = `
	Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	Phasellus volutpat sodales nulla ut venenatis. Morbi facilisis diam est,
	sit amet iaculis nisi finibus eu. Fusce fermentum vel lacus non rhoncus.
`

let updater
let placeholder

const About = () => {
	const [ name, setName ] = useState('Name Here')
	const [ title, setTitle ] = useState('Your Title')
	const [ description, setDescription ] = useState(default_description)
	const [ editing, setEditing ] = useState(false)

	const edit = (handler, text) => {
		setEditing(true)
		updater = handler
		placeholder = text
	}

	const submit = event => {
		event.preventDefault()
		setEditing(false)
		if (event.target.data.value)
			updater(event.target.data.value)
	}

	return (
		<div id='About'>
			<h1 onClick={ () => edit(setName, 'Name') }>{ name }</h1>
			<h2 onClick={ () => edit(setTitle, 'Job Title') } >{ title }</h2>

			<div>
				<h3 className='heading'> ABOUT ME </h3>
				<p onClick={ () => edit(setDescription, 'A brief description of yourself') }>{ description }</p>
			</div>

			{ editing &&
				<form className='form' onSubmit={ submit } style={{ position: 'fixed', top: mouse_pos.y, left: mouse_pos.x }}>
					<input name="data" placeholder={ placeholder } />
				</form>
			}
		</div>
	)
}

export default About
