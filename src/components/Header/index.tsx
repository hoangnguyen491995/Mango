import React, { FC } from "react";
import styled from "styled-components";
import ModalAppointmentShedulerDetail from "../Book/ModalAppointmentShedulerDetail";
import NavMenu from "./NavMenu";

interface Props {
  menuItems: MenuGlobal.MenuItem[];
}

const HeaderWrapper = styled.header`
  padding: 0 0px;
`;

const Header: FC<Props> = ({ menuItems }) => <NavMenu menuItems={menuItems} />;

export default Header;
