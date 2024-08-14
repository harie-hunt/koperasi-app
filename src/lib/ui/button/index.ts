export { default as Button } from './button.svelte';
import { cva } from 'class-variance-authority';

export const varButton = cva('base display', {
	variants: {
		variant: {
			default: 'default',
			primary: 'primary'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});
