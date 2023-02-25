import { Method } from "@/components/model/method/Method";
import { resolveMembers } from "@/utils/resolveMembers";
import type {
  ApiItem,
  ApiItemContainerMixin,
  ApiMethod,
  ApiMethodSignature
} from "@microsoft/api-extractor-model";
import { ApiItemKind } from "@microsoft/api-extractor-model";
import { Fragment, useMemo } from "react";
import { DocumentationSection } from "./DocumentationSection";

function isMethodLike(item: ApiItem): item is ApiMethod | ApiMethodSignature {
  return (
    item.kind === ApiItemKind.Method ||
    (item.kind === ApiItemKind.MethodSignature &&
      (item as ApiMethod).overloadIndex <= 1)
  );
}

export function MethodsSection({ item }: { item: ApiItemContainerMixin }) {
  const members = resolveMembers(item, isMethodLike);

  const methodItems = useMemo(
    () =>
      members.map(({ item: method }) => (
        <Fragment
          key={`${method.displayName}${
            method.overloadIndex && method.overloadIndex > 1
              ? `:${(method as ApiMethod).overloadIndex}`
              : ""
          }`}
        >
          <Method method={method} />
        </Fragment>
      )),
    [members],
  );

  return (
    <DocumentationSection padded title="Methods">
      <div className="flex flex-col gap-4">{methodItems}</div>
    </DocumentationSection>
  );
}