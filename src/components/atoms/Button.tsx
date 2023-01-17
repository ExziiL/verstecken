import { FC } from 'react';

export interface IButton {
	disabled?: boolean;
	text: string;
	onClick?: () => void;
}

const Button: FC<IButton> = ({ disabled, text, onClick }) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			type="submit"
			className="bg-blue-500 py-4 px-6 text-white w-full rounded-md"
		>
			{text}
		</button>
	);
};

export default Button;
