import { useState, useEffect } from 'react';
import isMobileOrTablet from './helpers/mobileAndTabletChecker';
import './style.scss';

// const countersState = [
// 	{ id: 'declined', title: 'Відмовились:', value: 0 },
// 	{ id: 'answered', title: 'Відповіли на питання:', value: 0 },
// 	{ id: 'listened', title: 'Почули Євангеліє:', value: 0 },
// ];

// const totalCounterState = { id: 'total', title: 'Усього:', value: 0 };

const txt = {
	// declined: 'Відмовились:',
	// answered: 'Відповіли на питання:',
	// listened: 'Почули Євангеліє:',
	// total: 'Усього:',
	areYouSure: 'Ви впевнені, що хочете видалити всі дані?',
	copied: 'Ці дані були скопійовані до буфера:',
};

function App() {
	// const [counters, setCounters] = useState(countersState);
	// const [totalCounter, setTotalCounter] = useState(totalCounterState);

	const [counters, setCounters] = useState([
		{ id: 'declined', title: 'Відмовились:', value: 0 },
		{ id: 'answered', title: 'Відповіли на питання:', value: 0 },
		{ id: 'listened', title: 'Почули Євангеліє:', value: 0 },
	]);
	const [totalCounter, setTotalCounter] = useState({ id: 'total', title: 'Усього:', value: 0 });

	useEffect(() => {
		const cntrs = [...counters];

		for (let i = 0; i < cntrs.length; i++) {
			cntrs[i].value = +localStorage.getItem(cntrs[i].id) || 0;
		}

		setCounters(cntrs);
	}, []);

	useEffect(() => {
		const totalCntr = { ...totalCounter };
		totalCntr.value = +localStorage.getItem(totalCntr.id) || 0;

		setTotalCounter(totalCntr);
	}, []);

	const updateCounter = isIncrease => cntrId => {
		const cntrs = [...counters];

		for (let i = 0; i < cntrs.length; i++) {
			if (cntrs[i].id === cntrId) {
				isIncrease ? cntrs[i].value++ : cntrs[i].value--;
				localStorage.setItem(cntrId, cntrs[i].value);
				i = cntrs.length;
			}
		}

		setCounters(cntrs);
	};

	useEffect(() => {
		const totalValue = counters.map(el => el.value).reduce((acc, curr) => acc + curr);
		const totalCntr = { ...totalCounter };
		totalCntr.value = totalValue;

		setTotalCounter(totalCntr);
		localStorage.setItem(totalCntr.id, totalCntr.value);
	}, [counters]);

	const share = () => {
		const d = new Date();
		// const date = `${d.getHours()}:${d.getMinutes()} ${d.getDate()}.${
		// 	d.getMonth() + 1
		// }.${d.getFullYear()}`;
		const date = d.toLocaleString();

		const result = `${counters.map(({ title, value }) => `${title} ${value}\n`).join('')}\n${
			totalCounter.title
		} ${totalCounter.value}\n\n${date}`;
		// add location

		navigator.clipboard.writeText(result);

		isMobileOrTablet() ? navigator.share({ text: result }) : alert(`${txt.copied}\n\n${result}`);
	};

	const reset = () => {
		if (!!totalCounter.value && window.confirm(txt.areYouSure)) {
			const cntrs = [...counters];

			for (let i = 0; i < cntrs.length; i++) {
				cntrs[i].value = 0;
				localStorage.setItem(cntrs[i].id, 0);
			}

			setCounters(cntrs);
		}
	};

	return (
		<main className="wrapper">
			{counters.map(({ id, title, value }) => (
				<section className="category" key={id}>
					<h2 className="category__title">{title}</h2>
					<div id={id} className="category__actions">
						<button onClick={() => value > 0 && updateCounter(false)(id)}>-</button>
						<span className="category__value">{value}</span>
						<button onClick={() => updateCounter(true)(id)}>+</button>
					</div>
				</section>
			))}

			<section className="category">
				<h2 className="category__title">{totalCounter.title}</h2>
				<div id={totalCounter.id} className="category__actions category__actions--total">
					<button id="reset" onClick={reset}>
						<i className="fa-solid fa-arrow-rotate-right"></i>
					</button>
					<span className="category__value">{totalCounter.value}</span>
					<button id="share" onClick={share}>
						<i className="fa-solid fa-arrow-up-right-from-square"></i>
					</button>
				</div>
			</section>
		</main>
	);
}

export default App;
