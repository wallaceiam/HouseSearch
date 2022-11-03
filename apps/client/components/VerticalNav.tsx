import React, { useRef, useEffect, useMemo, useCallback } from "react";

interface VerticalNavProps {
  readonly school: any;
}

const VerticalNav = ({ school }: VerticalNavProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const links = useMemo(() => {
    const l = [
      {
        href: "#overview",
        title: "Overview",
      },
    ];
    if (school.teachers) {
      l.push({
        href: "#teachers",
        title: "Teachers",
      });
      l.push({
        href: "#teachers2",
        title: "Teachers 2",
      });
    }
    return l;
  }, [school]);

  const scrollHandler = useCallback(() => {
    const menu_top = ref.current?.offsetTop ?? 0;
    const y = window.scrollY;

    const selected = links.reduce(
      (prev, { href }, i) => {
        const link = document.querySelector<HTMLAnchorElement>(
          `a[href='${href}']`
        );
        const div = document.querySelector<HTMLDivElement>(href);

        const top = div?.offsetTop ?? 0;
        const height = div?.offsetHeight ?? 0;

        const dist = top + height - (y + menu_top);

        if (dist >= 0 && (dist < prev[0] || prev[0] === -1)) {
          prev[0] = dist;
          prev[1] = i;
        }

        link?.classList.remove("bg-gray-100", 'text-gray-900"');
        link?.classList.add(
          "text-gray-600",
          "hover:bg-gray-50",
          "hover:text-gray-900"
        );

        return prev;
      },
      [-1, 0]
    );

    const link = document.querySelector<HTMLAnchorElement>(
      `a[href='${links[selected[1]].href}']`
    );

    link?.classList.add("bg-gray-100", 'text-gray-900"');
    link?.classList.remove(
      "text-gray-600",
      "hover:bg-gray-50",
      "hover:text-gray-900"
    );
  }, [links, ref]);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, [links, scrollHandler]);

  return (
    <nav ref={ref} className="space-y-1 sticky" aria-label="sidebar">
      {/* <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900" --> */}
      {links.map(({ href, title }, i) => (
        <a
          key={i}
          href={href}
          className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md"
        >
          <span className="truncate">{title}</span>
        </a>
      ))}
      <a
        href="#"
        className="bg-gray-100 text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md"
        aria-current="page"
      >
        <span className="truncate">Dashboard</span>
      </a>

      <a
        href="#"
        className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md"
      >
        <span className="truncate">Team</span>
      </a>

      <a
        href="#"
        className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md"
      >
        <span className="truncate">Projects</span>
      </a>

      <a
        href="#"
        className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md"
      >
        <span className="truncate">Calendar</span>
      </a>

      <a
        href="#"
        className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md"
      >
        <span className="truncate">Documents</span>
      </a>

      <a
        href="#"
        className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md"
      >
        <span className="truncate">Reports</span>
      </a>
    </nav>
  );
};

export default VerticalNav;
