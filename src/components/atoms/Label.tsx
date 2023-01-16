import React, { FC } from 'react';

export interface ILabel {
	id: string;
	header: string;
	type: string;
	name: string;
	ref: any;
}
// const Label: FC<ILabel> = ({ id, header, type, name, ref }) => {
const Label = React.forwardRef<HTMLInputElement, ILabel>((props, ref) => {
	return (
		<label
			id={props.id}
			className="flex flex-col max-w-sm pb-4"
		>
			{props.header}:
			<input
				className="border h-10 rounded-md"
				type={props.type}
				name={props.name}
				required
				ref={ref}
			></input>
		</label>
	);
});

export default Label;
