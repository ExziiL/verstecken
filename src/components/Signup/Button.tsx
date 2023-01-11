import { FC } from 'react';

export interface IButton {
	disabled: boolean;
}

const Button: FC<IButton> = ({ disabled }) => {
	return (
		<button
			disabled={disabled}
			type="submit"
			className="bg-blue-500 py-4 px-6 text-white w-full rounded-md"
		>
			Sign Up
		</button>
	);
};

export default Button;
