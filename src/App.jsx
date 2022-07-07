import About from './components/About'
import Experience from './components/Experience'
import Aside from './components/Aside'
import { mouse_pos } from './utils'

const App = () =>
	<div>
		<main id='Resume'>
			<div id='Primary'>
				<About />
				<Experience />
			</div>
			<Aside />
		</main>
	</div>

export default App
