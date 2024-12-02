export function Stepper({stepCount, activeStep}: { stepCount: number; activeStep: number }) {
	return (
		<div className={'absolute bottom-4 flex gap-4'}>
			{Array.from({length: stepCount}, (_, index) => (
				<div
					key={index}
					className={`w-14 h-1.5 rounded-full ${activeStep >= index ? 'bg-primary' : 'bg-neutral-200'}`}
				/>
			))}
		</div>
	);
}