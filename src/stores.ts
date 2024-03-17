import { writable } from 'svelte/store';

export const showApiModal = writable(false);
export const showWinnerModal = writable(false);
export const newBalanceStore = writable(0);
