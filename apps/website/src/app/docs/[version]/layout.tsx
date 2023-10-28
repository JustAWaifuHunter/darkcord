import { PropsWithChildren } from 'react';
import { fetchModelJSON } from '~/app/docAPI';
import { SidebarNav } from '~/components/sidebar-nav';
import { SiteFooter } from '~/components/site-footer';
import { SiteHeader } from '~/components/site-header';
import { guideConfig } from '~/config/guide';

export interface VersionRouteParams {
	version: string;
}

export default async function PackageLayout({ children, params }: PropsWithChildren<{ params: VersionRouteParams }>) {
	const modelJSON = await fetchModelJSON(params.version);

	return (
		<div className="flex min-h-screen flex-col space-y-6">
			<SiteHeader navItems={guideConfig.mainNav} sidebarNavItems={guideConfig.sidebarNav} />
			<div className="container flex-1">
				<div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
					<aside className="hidden w-[200px] border-r flex-col md:flex">
						<SidebarNav items={[]} />
					</aside>
					<main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
				</div>
			</div>

			<SiteFooter className="border-t" />
		</div>
	);
}
