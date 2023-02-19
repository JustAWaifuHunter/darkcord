import { isAppleDevice } from "@/utils/isAppleDevice";
import { Button } from "ariakit/button";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { Search } from "react-feather";
import { useKey } from "react-use";

interface CommandMenuTriggerProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  visibleOnMobile: boolean;
}

export function CommandMenuTrigger({
  setOpen,
  visibleOnMobile,
}: CommandMenuTriggerProps) {
  const [isMac, setIsMac] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMac(typeof navigator !== "undefined" && isAppleDevice());
  }, []);

  useKey(
    (event) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        return true;
      }

      return false;
    },
    () => setOpen(true),
    { event: "keydown", options: {} },
    [],
  );

  return visibleOnMobile ? (
    <Button
      as="div"
      className="focus:ring-width-2 focus:ring-blue border-base rounded border px-4 py-2.5 outline-0 focus:ring"
      onClick={() => setOpen(true)}
    >
      <div className="flex flex-row place-items-center gap-4">
        <Search size={18} />
        <span className="opacity-65">Search</span>

        <div className="opacity-65 flex flex-row place-items-center gap-2">
          {isMac !== null && <div>{isMac ? "⌘" : "Ctrl"} + K</div>}
        </div>
      </div>
    </Button>
  ) : (
    <Button
      as="div"
      className="border-base flex rounded border px-4 py-2.5 outline-0"
      onClick={() => setOpen(true)}
    >
      <Search size={18} />
    </Button>
  );
}
