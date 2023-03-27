import React, { useContext } from "react";
import { MenuContext } from "../../widgets/Menu/context";
import { Flex } from "../Box";
import AnimatedIconComponent from "../Svg/AnimatedIconComponent";
import { StyledBottomNavItem, StyledBottomNavText } from "./styles";
import { BottomNavItemProps } from "./types";

const BottomNavItem: React.FC<React.PropsWithChildren<BottomNavItemProps>> = ({
  label,
  icon,
  fillIcon,
  href,
  showItemsOnMobile = false,
  isActive = false,
  disabled = false,
  type,
  ...props
}) => {
  const { linkComponent } = useContext(MenuContext);

  console.log(type);
  const bottomNavItemContent = (
    <a href={href} target="_blank">
      <Flex flexDirection="column" justifyContent="center" alignItems="center" height="100%">
        {icon && (
          <AnimatedIconComponent
            icon={icon}
            fillIcon={fillIcon}
            height="22px"
            width="21px"
            color={isActive ? "#fed058" : "textSubtle"}
            isActive={isActive}
            activeBackgroundColor="backgroundAlt"
          />
        )}
        <StyledBottomNavText
          color={isActive ? "text" : "textSubtle"}
          fontWeight={isActive ? "600" : "400"}
          fontSize="10px"
        >
          {label}
        </StyledBottomNavText>
      </Flex>
    </a>
  );

  return showItemsOnMobile ? (
    <StyledBottomNavItem style={{ opacity: disabled ? 0.5 : 1 }} type="button" {...props}>
      {bottomNavItemContent}
    </StyledBottomNavItem>
  ) : (
    <StyledBottomNavItem style={{ opacity: disabled ? 0.5 : 1 }} as={linkComponent} href={href} {...props}>
      {bottomNavItemContent}
    </StyledBottomNavItem>
  );
};

export default BottomNavItem;
