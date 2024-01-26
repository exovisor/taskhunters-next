import type {PropsWithChildren} from "react";

type Props = PropsWithChildren<{
	hint?: string;
}>

const Showcase = ({children, hint}: Props) => (
	<div
		className="min-w-48 max-w-xl min-h-12 bg-background border rounded-md p-4 relative flex flex-col gap-2">
		{hint && <span className="absolute bg-background rounded-full text-foreground -top-2 left-2 px-1 text-sm">{hint}</span>}
		{children}
	</div>
);

export {Showcase}
