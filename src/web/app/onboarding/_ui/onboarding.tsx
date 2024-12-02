'use client';

import {Step} from '@/app/onboarding/_ui/step';
import {KeyIcon, SettingsIcon, TriangleIcon} from 'lucide-react';
import {Stepper} from '@/app/onboarding/_ui/stepper';
import {useState} from 'react';
import {GarminForm} from '@/app/onboarding/_ui/steps/garmin-form';
import {PasswordForm} from '@/app/onboarding/_ui/steps/password-form';
import {SettingsForm} from '@/app/onboarding/_ui/steps/settings-form';

export function Onboarding({currentStep}: { currentStep: number }) {
	const [step, setStep] = useState(currentStep);
	const nextStep = () => setStep((prev) => prev + 1);

	return <div className={'flex h-full w-full'}>
		<div className={'h-full bg-muted rounded flex flex-col p-4 pr-10 max-w-md gap-8 max-lg:hidden'}>
			<h2 className={'text-xl font-semibold'}>Motion Board</h2>
			<div className={'flex flex-col'}>
				<Step title={'Garmin account'} description={'Provide your Garmin credentials'}
					  currentStep={step} stepIndex={0} icon={TriangleIcon}/>
				<Step title={'Password'} description={'Set a password to protect your board'}
					  currentStep={step} stepIndex={1} icon={KeyIcon}/>
				<Step title={'Settings'} description={'Customize your board to your liking'}
					  currentStep={step} stepIndex={2} last icon={SettingsIcon}/>
			</div>
		</div>
		<div className={'h-full bg-background grow flex items-center justify-center flex-col px-4'}>
			{step === 0 && <GarminForm nextStep={nextStep}/>}
			{step === 1 && <PasswordForm nextStep={nextStep}/>}
			{step === 2 && <SettingsForm/>}
			<Stepper stepCount={3} activeStep={step}/>
		</div>
	</div>;
}