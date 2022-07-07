import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

const experience = (date, title, location, reasons) => ({
	date, title, location, reasons, id: nanoid()
})

// const AddExperienceForm = ({ data, dataHandler, setVisible }) => {
const ExperienceSection = () => {
	const [ hovered, setHovered ] = useState(false)
	const [ editing, setEditing ] = useState(false)
	const [ experiences, setExperiences ] = useState([
		experience('X to Y', 'Experience Title', 'Location', ['Reason 1', 'Reason 2']),
		experience('X to Y', 'Experience Title', 'Location', ['Reason 1', 'Reason 2'])
	])

	const addExperience = event => {
		event.preventDefault()
		setEditing(false)

		setExperiences([
			...experiences,
			experience(
				event.target.date.value,
				event.target.title.value,
				event.target.location.value,
				event.target.reasons.value.split('\n'),
			)
		])
	}

	const removeExperience = id =>
		setExperiences(experiences.filter(x => x.id != id))

	return (
		<div className='experience-section' onMouseEnter={ () => setHovered(true) } onMouseLeave={ () => setHovered(false) }>
			{ hovered &&
				<button className='edit' onClick={ () => setEditing(true) }>+</button>
			}

			{ experiences.map(exp =>
				<div key={ exp.key } className='experience' onClick={ () => removeExperience(exp.id) } >
					<p>{ exp.date }</p>
					<div>
						<h4>{ exp.title }</h4>
						<h5>{ exp.location }</h5>
						<ul>
							{ exp.reasons.map(reason =>
								<li>{ reason }</li>
							)}
						</ul>
					</div>
				</div>
			)}

			{ editing &&
				<form className='form' onSubmit={ addExperience }>
					<label>
						Date
						<input type="text" name="date" />
					</label>

					<label>
						Title
						<input type="text" name="title" />
					</label>

					<label>
						Location
						<input type="text" name="location" />
					</label>

					<label>
						Reasons
						<textarea type="text" name="reasons" placeholder='Reasons of value, split by newlines' />
					</label>

					<button type="submit">Add</button>
				</form>
			}
		</div>
	)
}

const Experience = () =>
	<div id='Experience'>
		<h3 className='heading'> WORK EXPERIENCE </h3>
		<ExperienceSection />

		<h3 className='heading'> EDUCATION </h3>
		<ExperienceSection />
	</div>

export default Experience
