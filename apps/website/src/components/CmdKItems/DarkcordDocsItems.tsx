import { useCmdK } from "@/contexts/cmdK";
import { AlgoliaItemType } from "@/utils/algolia";
import { Button } from "ariakit/button";
import { Command } from "cmdk";
import { PropsWithChildren } from "react";
import { FiBook } from "react-icons/fi";
import { Icon } from "../Icon";

interface DarkcordDocsItemProps {
  item: AlgoliaItemType;
}

export function DarkcordDocsItems({
  item,
}: PropsWithChildren<DarkcordDocsItemProps>) {
  const { setOpen } = useCmdK();

  return (
    <Button as="a" href="/docs">
      <Command.Item
        className="hover:bg-[#f1f3f5] dark:hover:bg-[#202425] place-content-center cursor-pointer min-h-[52px] rounded-3 flex flex-col pl-2 place-items-start pr-3 rounded-md select-none"
        onSelect={() => {
          setOpen(false);
        }}
      >
        <div className="mt-1 inline-flex place-items-center place-content-between gap-3 break-words">
          <div className="shrink-0 place-content-center">
            <Icon as={FiBook} />
          </div>

          <div className="flex flex-col">
            <p className="font-500 text-sm leading-4 tracking-tighter text-dark dark:text-[#ecedee]">
              {item.firstname}
            </p>

            {item.lastname && (
              <p className="font-400 text-xs leading-6 text-dark dark:text-[#787f85]">
                {item.lastname}
              </p>
            )}
          </div>
        </div>
      </Command.Item>
    </Button>
  );
}
