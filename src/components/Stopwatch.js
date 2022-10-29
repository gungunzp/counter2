import { useState } from 'react';
import getFormattedDate from '../helpers/getFormattedDate';
import txt from '../helpers/texts';
import './stopwatch.scss';

function Stopwatch(props) {
	const [stopwatch, setStopwatch] = useState(0);
	const [stopwatchId, setStopwatchId] = useState(null);
	const [startButtonTxt, setStartButtonTxt] = useState(txt.start);
	const [stopButtonTxt, setStopButtonTxt] = useState(txt.stop);
	// const [laps, setLaps] = useState([]);

	const oneSecond = 1000;
	const startStopwatch = () => {
		if (!stopwatchId) {
			setStartButtonTxt(txt.lap);

			if (stopButtonTxt === txt.reset) {
				setStopButtonTxt(txt.stop);
			}

			const id = setInterval(
				() => setStopwatch(prevStopwatch => prevStopwatch + oneSecond),
				oneSecond,
			);
			setStopwatchId(id);
		} else {
			// const lapsArray = [...laps];
			// // lapsArray.push(stopwatch - (lapsArray[lapsArray.length - 1] || 0));

			// setLaps(prevLaps => [...prevLaps, stopwatch - (lapsArray[lapsArray.length - 1] || 0)]);
			// console.log(lapsArray);
			console.log(stopwatch);
		}
	};

	const stopStopwatch = () => {
		clearInterval(stopwatchId);
		setStopwatchId(null);

		if (stopButtonTxt === txt.stop && stopwatchId) {
			setStopButtonTxt(txt.reset);
			setStartButtonTxt(txt.continue);
		} else {
			setStopButtonTxt(txt.stop);
			setStartButtonTxt(txt.start);
			setStopwatch(0);
		}
	};

	return (
		<>
			<div className="stopwatch">
				<button onClick={stopStopwatch}>{stopButtonTxt}</button>
				{getFormattedDate(stopwatch)}
				<button onClick={startStopwatch}>{startButtonTxt}</button>
			</div>
			{/* {laps.map(el => (
				<div key={Date.now()}>{el}</div>
			))} */}
		</>
	);
}

export default Stopwatch;
