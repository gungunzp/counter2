import './style.scss';

function App() {
	return (
		<main className="wrapper">
			<section className="category">
				<h2 className="category__title">Відмовились:</h2>
				<div id="declined" className="category__actions">
					<button>-</button>
					<span className="category__value">0</span>
					<button>+</button>
				</div>
			</section>
			<section className="category">
				<h2 className="category__title">Відповіли на питання:</h2>
				<div id="answered" className="category__actions">
					<button>-</button>
					<span className="category__value">0</span>
					<button>+</button>
				</div>
			</section>
			<section className="category">
				<h2 className="category__title">Почули Євангеліє:</h2>
				<div id="listened" className="category__actions">
					<button>-</button>
					<span className="category__value">0</span>
					<button>+</button>
				</div>
			</section>
			<section className="category">
				<h2 className="category__title">Усього:</h2>
				<div id="total" className="category__actions category__actions--total">
					<button id="reset">
						<i className="fa-solid fa-arrow-rotate-right"></i>
					</button>
					<span className="category__value">0</span>
					<button id="share">
						<i className="fa-solid fa-arrow-up-right-from-square"></i>
					</button>
				</div>
			</section>
		</main>
	);
}

export default App;
