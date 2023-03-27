/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement, memo } from "react";
import { Flex } from "../Box";
import isTouchDevice from "../../util/isTouchDevice";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import MenuItem from "../MenuItem/MenuItem";
import { MenuItemsProps } from "./types";
import { DropdownMenuItemType } from "../DropdownMenu/types";
import { DropdownMenuItem } from "../DropdownMenu/styles";

const MenuItems: React.FC<React.PropsWithChildren<MenuItemsProps>> = ({
  items = [],
  activeItem,
  activeSubItem,
  ...props
}) => {
  return (
    <Flex {...props}>
      {items.map(({ label, items: menuItems = [], href, icon, disabled, type }) => {
        const statusColor = menuItems?.find((menuItem) => menuItem.status !== undefined)?.status?.color;
        const isActive = activeItem === href;
        const linkProps = isTouchDevice() && menuItems && menuItems.length > 0 ? {} : { href };
        const Icon = icon;

        console.log(type === DropdownMenuItemType.EXTERNAL_LINK);
        return (
          <DropdownMenu
            key={`${label}#${href}`}
            items={menuItems}
            py={1}
            activeItem={activeSubItem}
            isDisabled={disabled}
          >
            <MenuItem {...linkProps} isActive={isActive} statusColor={statusColor} isDisabled={disabled}>
              {type === DropdownMenuItemType.EXTERNAL_LINK ? (
                <DropdownMenuItem
                  $isActive={isActive}
                  disabled={disabled}
                  as="a"
                  href={href}
                  target="_blank"
                >
                  <Flex alignItems="center" justifyContent="space-between" color="#fff" width="100%">
                    {label}
                    {/* <Icon color={disabled ? "textDisabled" : "textSubtle"} /> */}
                  </Flex>
                </DropdownMenuItem>
              ) : (
                label || (icon && createElement(Icon as any, { color: isActive ? "secondary" : "#fff" }))
              )}
            </MenuItem>
          </DropdownMenu>
        );
      })}
    </Flex>
  );
};

export default memo(MenuItems);
