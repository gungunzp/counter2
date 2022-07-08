import { useState, useEffect } from 'react';
import isMobileOrTablet from './helpers/mobileAndTabletChecker';
import txt from './helpers/texts';
import './style.scss';

function App() {
	const [counters, setCounters] = useState({
		declined: { id: 'declined', title: txt.declined, value: 0 },
		answered: { id: 'answered', title: txt.answered, value: 0 },
		listened: { id: 'listened', title: txt.listened, value: 0 },
		_total: { id: '_total', title: txt._total, value: 0 },
	});
	const counterKeys = Object.keys(counters);

	const updateAll = callback => {
		const newCounters = {};

		counterKeys.forEach(key => {
			newCounters[key] = { ...counters[key] };
			callback(newCounters, key);
		});

		setCounters(newCounters);
	};

	useEffect(() => {
		updateAll((newCounters, key) => {
			newCounters[key].value = +localStorage.getItem(key) || 0;
		});
	}, []);

	const update = (key, isInc) => {
		let { value } = counters[key];

		isInc ? value++ : value--;

		localStorage.setItem(key, value);
		setCounters(prevState => ({
			...prevState,
			[key]: {
				...prevState[key],
				value,
			},
		}));
	};

	const decrement = key => () => {
		if (counters[key].value > 0) {
			update(key, false);
			update('_total', false);
		}
	};

	const increment = key => () => {
		update(key, true);
		update('_total', true);
	};

	const share = () => {
		const d = new Date();
		// const date = `${d.getHours()}:${d.getMinutes()} ${d.getDate()}.${
		// 	d.getMonth() + 1
		// }.${d.getFullYear()}`;
		const date = d.toLocaleString();

		const result = `${counterKeys
			.map(key => `${counters[key].title} ${counters[key].value}\n`)
			.join('')}\n${date}`;
		// add location

		navigator.clipboard.writeText(result);

		isMobileOrTablet() ? navigator.share({ text: result }) : alert(`${txt.copied}\n\n${result}`);
	};

	const reset = () => {
		if (!!counters._total.value && window.confirm(txt.areYouSure)) {
			updateAll((newCounters, key) => {
				newCounters[key].value = 0;
				// localStorage.setItem(key, 0);
			});
			// if there gonna be change in fields names
			localStorage.clear();
		}
	};

	return (
		<main className="wrapper">
			{counterKeys.map(key => (
				<section className="category" key={key}>
					<h2 className="category__title">{counters[key].title}</h2>
					{key !== '_total' ? (
						<div className="category__actions">
							<button onClick={decrement(key)}>-</button>
							<span className="category__value">{counters[key].value}</span>
							<button onClick={increment(key)}>+</button>
						</div>
					) : (
						<div className="category__actions category__actions--total">
							<button onClick={reset}>
								<i className="fa-solid fa-arrow-rotate-right"></i>
							</button>
							<span className="category__value">{counters[key].value}</span>
							<button onClick={share}>
								<i className="fa-solid fa-arrow-up-right-from-square"></i>
							</button>
						</div>
					)}
				</section>
			))}
		</main>
	);
}

export default App;
