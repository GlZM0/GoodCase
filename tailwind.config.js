/** @type {import('tailwindcss').Config} */
export const darkMode = 'class';
export const content = [
	'./src/**/*.{html,js,svelte,ts}',
	// 2. Append the path for the Skeleton NPM package and files:
	require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
];
export const theme = {
	extend: {}
};
export const plugins = [
	// 3. Append the Skeleton plugin to the end of this list
	...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
];
