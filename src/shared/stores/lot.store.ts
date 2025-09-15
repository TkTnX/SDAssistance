import { create } from 'zustand'

type State = {
	step: number
}

type Actions = {
	setStep: (newStep: number) => void
}

export const useLotStore = create<State & Actions>(set => ({
	step: 0,
	setStep: newStep => {
		set({ step: newStep })
	}
}))
