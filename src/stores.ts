import { writable } from 'svelte/store';

export const showApiModal = writable(false);
export const showWinnerModal = writable(false);
export const balance = writable(0);

export const items = writable();
export const historyItems = writable();
