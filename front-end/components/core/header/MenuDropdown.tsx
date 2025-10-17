import React, { useRef } from "react";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { MenuItemCommandEvent } from "primereact/menuitem";
import { Bars4Icon } from "@heroicons/react/24/solid";

import { useUser } from "@/front-end/features/user";
import { useAuth } from "@/front-end/features/auth/use-cases/useAuth";
import Spinner from "@/front-end/components/shared/spinner/Spinner";

const MenuDropdown = () => {
  const { user } = useUser();
  const { signOut, isLoading } = useAuth();

  const menuRef = useRef<Menu>(null);

  if (!user) return null;

  const items = [
    {
      label: "My Pawsy Times",
      icon: (
        <span
          className="text-primary-900/90 mr-2 dark:text-white/70"
          data-pc-section="icon"
        >
          🐾
        </span>
      ),
      url: "/dashboard/pawsy-times",
    },
    {
      label: "Create AI House",
      icon: (
        <span
          className="text-primary-900/90 mr-2 dark:text-white/70"
          data-pc-section="icon"
        >
          🏠
        </span>
      ),
      url: "/dashboard/create-ai-house",
    },
    {
      template: () => {
        return (
          <a className="text-primary-900 relative flex items-center overflow-hidden p-3 font-[500] no-underline select-none hover:cursor-pointer dark:text-white/80">
            <span
              className="text-primary-900/90 pi pi-sign-out mr-2 dark:text-white/70"
              data-pc-section="icon"
            />
            <span data-pc-section="label">Sign Out</span>
            {isLoading && <Spinner color="primary" className="ml-2" />}
          </a>
        );
      },
      command: (e: MenuItemCommandEvent) => {
        signOut();
        e.originalEvent.preventDefault();
        e.originalEvent.stopPropagation();
      },
    },
  ];

  const initials = `${user.firstName?.[0] ?? ""}${
    user.lastName?.[0] ?? ""
  }`.toUpperCase();

  const onToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (menuRef.current) {
      menuRef.current.toggle(e);
    }
  };
  return (
    <>
      <Menu model={items} popup ref={menuRef} id="popup_menu_left" />
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-1.5 hover:cursor-pointer"
      >
        <Avatar
          label={initials}
          shape="circle"
          aria-controls="popup_menu_left"
          aria-haspopup
          className="flex-1 hover:cursor-pointer"
        />
        <Bars4Icon width={24} className="text-primary-900" />
      </button>
    </>
  );
};

export default MenuDropdown;
