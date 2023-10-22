import { PropsWithChildren, ReactNode } from 'react';
import { DiscordMessageAuthorReply, DiscordMessageAuthorReplyProps } from './discord-message-author-reply';

export function DiscordMessageBaseReply({
	children,
	author,
	authorNode,
}: PropsWithChildren<{
	readonly author?: DiscordMessageAuthorReplyProps | undefined;
	readonly authorNode?: ReactNode | undefined;
}>) {
	return (
		<div className="relative mb-1 flex place-items-center before:absolute before:bottom-0 before:left-[-36px] before:right-full before:top-[50%] before:mr-1 before:block before:border-l-2 before:border-t-2 before:border-[rgb(79_84_92)] before:rounded-tl-1.5 before:content-none">
			<div className="flex place-items-center [&>span]:opacity-60">
				{author ? <DiscordMessageAuthorReply {...author} /> : authorNode}
			</div>
			{children}
		</div>
	);
}
