import React, { FC } from "react";
import styled from "styled-components";
import ContentNav from "./ContentNav";

const HeaderWrapper = styled.header`
  padding: 0 0px;
`;

const NavControl: FC<any> = () => <ContentNav />;

export default NavControl;
