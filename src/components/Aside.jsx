import { useState } from 'react'
import { nanoid } from 'nanoid'
import default_image from '../assets/profile.svg'
import img_address from '../assets/address.svg'
import img_phone from '../assets/phone.svg'
import img_email from '../assets/email.svg'

const skill = (name, description) => ({ name, description, id: nanoid() })

let multiline = false
let updater
let placeholder

const Aside = () => {
	const [ image, setImage ] = useState(default_image)
	const [ address, setAddress ] = useState([ 'Line 1', 'Line 2', 'Line 3' ])
	const [ phone, setPhone ] = useState('xxx xxxx xxxx')
	const [ email, setEmail ] = useState('enter@email.here')
	const [ skills, setSkills ] = useState([ skill('Skill', 'Skill description') ])
	const [ editing, setEditing ] = useState(false)
	const [ edit_skills, setEditSkills] = useState(false)
	const [ edit_image, setEditImage ] = useState(false)
	const [hovered, setHovered ] = useState(false)

	const edit = (handler, text, multi=false) => {
		setEditing(true)
		multiline = multi
		placeholder = text
		updater = handler
	}

	const submit = event => {
		event.preventDefault()
		const text = event.target.data.value
		updater(multiline ? text.split('\n') : text)
		setEditing(false)
	}

	const addSkill = event => {
		event.preventDefault()
		setEditSkills(false)
		setSkills([
			...skills,
			skill(event.target.name.value, event.target.description.value)
		])
	}

	const removeSkill = id =>
		setSkills(skills.filter(skill => id != skill.id))

	const changeImage = event => {
		event.preventDefault()
		setEditImage(false)
		setImage(event.target.data.value)
	}

	return (
		<div id='Aside'>
			<div className='profile-image' onClick={ () => setEditImage(true) }>
				<img src={ image } />
				{ edit_image &&
					<form className='form' onSubmit={ changeImage }>
						<label>
							Image URL
							<input name='data' type='text' placeholder='https://url.of/image' />
						</label>
					</form>
				}
			</div>

			<h3 className='heading'> CONTACT ME </h3>

			<dl className='aside'>
				<img src={ img_address } />
				<div onClick={ () => edit(setAddress, 'Line1\nLine2', true)}>
					<dt>Address</dt>
					<dd>{ address[0] }</dd>
					<dd>{ address[1] }</dd>
					<dd>{ address[2] }</dd>
				</div>

				<img src={ img_phone } />
				<div onClick={ () => edit(setPhone, 'phone') }>
					<dt>Phone Number</dt>
					<dd>{ phone }</dd>
				</div>

				<img src={ img_email } />
				<div onClick={ () => edit(setEmail, 'email') }>
					<dt>Email</dt>
					<dd>{ email }</dd>
				</div>

				{ editing &&
					<form className='form' onSubmit={ submit }>
						<label>
							New value
							{
								multiline
									? <textarea name="data" placeholder={ placeholder } />
									: <input name="data" type="text" placeholder={ placeholder } />
							}
						</label>
						<button type="submit">Update</button>
					</form>
				}
			</dl>

			<h3 className='heading'> SKILLS </h3>

			<dl id='Skills' onMouseEnter={ () => setHovered(true) } onMouseLeave={ () => setHovered(false) }>
				{ hovered && <button className="edit" onClick={ () => setEditSkills(true) }>+</button> }
				{skills.map(skill =>
					<div className='skill' key={skill.id} onClick={ () => removeSkill(skill.id) }>
						<dt>{ skill.name }</dt>
						<dd>{ skill.description }</dd>
					</div>
				)}

				{ edit_skills &&
					<form className='form' onSubmit={ addSkill }>
						<label>
							Name
							<input name="name" type="text" placeholder="Skill name" />
						</label>
						<label>
							Description
							<input name="description" type="text" placeholder="Skill description" />
						</label>
						<button type="submit">Add skill</button>
					</form>
				}
			</dl>
		</div>
	)
}

export default Aside
