import { SidebarSectionItemData } from "@/components/Sidebar";
import { ApiItem } from "@microsoft/api-extractor-model";
import { resolveItemURI } from "./resolveItemURI";

export function serializeIntoSidebarItemData(item: ApiItem): SidebarSectionItemData {
	return {
		kind: item.kind,
		name: item.displayName,
		href: resolveItemURI(item),
		overloadIndex: 'overloadIndex' in item ? (item.overloadIndex as number) : undefined,
	};
}