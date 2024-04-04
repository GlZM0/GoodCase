import { writable } from 'svelte/store';
import type { ProfileItem, ProfileHistoryItem } from './app';

export const showApiModal = writable(false);
export const showWinnerModal = writable(false);
export const balance = writable(0);

export const items = writable<ProfileItem[]>();
export const historyItems = writable<ProfileHistoryItem[]>();
