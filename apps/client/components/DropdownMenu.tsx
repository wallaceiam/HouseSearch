import React, { useState, useCallback } from "react";

interface DropdownMenuProps {
  readonly className?: string;
  readonly children?: React.ReactNode;
}

const DropdownMenu = ({ className, children }: DropdownMenuProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleMenu = useCallback(() => {
    setOpen(!isOpen);
  }, [setOpen, isOpen]);

  return (
    <div className="relative ml-3 flex-shrink-0">
      <div>
        <button
          type="button"
          onClick={toggleMenu}
          className="flex rounded-full bg-gray-50 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </button>
      </div>

      {/* <!--
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              --> */}
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        >
          {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
          <>
            <a
              href="#"
              className="block py-2 px-4 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="user-menu-item-0"
            >
              Your Profile
            </a>

            <a
              href="#"
              className="block py-2 px-4 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="user-menu-item-1"
            >
              Settings
            </a>

            <a
              href="#"
              className="block py-2 px-4 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="user-menu-item-2"
            >
              Sign out
            </a>
          </>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
