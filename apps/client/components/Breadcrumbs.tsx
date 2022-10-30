import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { UrlObject } from "url";

export interface Breadcrumb {
  readonly title: string;
  readonly href?: string | UrlObject;
}

interface BreadcrumbProps {
  readonly crumbs: Breadcrumb[];
}

interface BreadcrumbLinkProps extends Breadcrumb {
  readonly className?: string;
}

const BreadcrumbLink = ({ title, href, className }: BreadcrumbLinkProps) =>
  href !== undefined ? (
    <Link href={href} className={className}>
      {title}
    </Link>
  ) : (
    <span className={className}>{title}</span>
  );

const Breadcrumbs = ({ crumbs }: BreadcrumbProps) => (
  <nav className="flex" aria-label="Breadcrumb">
    <ol role="list" className="flex items-center space-x-4">
      {crumbs.map(({ href, title }, i) => (
        <li key={i}>
          <div className="flex items-center">
            {i > 0 && (
              <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400 fill-current" />
            )}
            <BreadcrumbLink
              title={title}
              href={href}
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
            />
          </div>
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
