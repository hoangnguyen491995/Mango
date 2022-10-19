import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
// import { checkBlue } from "../../public/assets/imgs/Clients/check-blue.svg";
const GlobalBaseStyle = createGlobalStyle`
  ${normalize};

  body, #__next {
    position: relative;
    min-height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  
  }
  .range-list-batch .ant-picker-large{
    padding: 4px;
  }
  .ant-popover-arrow{
    display: none;
  }
  .draggable {
    -webkit-user-select: none;
    user-select: none;
    -webkit-app-region: drag;
 }
.mango-shadow
{
  box-shadow: 0px 3px 15px #00000040 !important;
}
.mango-shadow-1
{
  box-shadow: 0px 0px 5px #0000001a !important;
}
.mango-shadow-2
{
  box-shadow: 0px 0px 4px #00000029 !important;
}
.container {
  display: flex;
  touch-action: none;
  width: 800px;
  margin: 1rem auto;
}

.dropzone {
  flex: 1;
  height: 400px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
}

.dropzone.left {
  margin-right: 10px;
}

.grid-item {
  padding: 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.grid-item-content {
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  background: #08e;
  display: flex;
  justify-content: center;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  align-items: center;
  border-radius: 50%;
}
.main-col-left:hover{
  background: #f6f6f6;
}
li.btnactive{
  background: #f6f6f6;
}
.activeCate{
  background-color: #b2ebf3;
  color:#1f2937;
}

.busy-tech::before {
            content: "BUSY";
            text-align: center;
            position: absolute;
            opacity: 1;
            
            mix-blend-mode: normal;
            top: calc(100% / -2 + -3px);
            width: 100%;
            height: 100%;
            z-index: 4;
            overflow: hidden;
            border-radius: 100%;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            align-content: center;
            justify-content: flex-end;
            align-items: center;
            padding: 10px;
            font: normal normal 800 12px/15px Montserrat;
            letter-spacing: 0px;
            color: #ffffff;
            text-transform: uppercase;
          }
          .busy-tech::after {
            content: "";
            mix-blend-mode: multiply;
            left: 0px;
            z-index: 3;
            position: absolute;
            background: #505050 0% 0% no-repeat padding-box;
            width: 100%;
            height: 100%;
            border-radius: 4px;
            bottom: 0px;
            opacity: 0.85;
            box-shadow: 0px 0px 30px #00000033;
          }
          .busy-img::after {
            content: "";
            mix-blend-mode: multiply;
            left: 0px;
            z-index: 3;
            position: absolute;
            background: #505050 0% 0% no-repeat padding-box;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            bottom: 0px;
            opacity: 0.6;
            box-shadow: 0px 0px 30px #00000033;
          
          }

.itemTicket-status::after
{

  margin-top: 20px;
            text-align: left;
            position: absolute;
            width: calc(100% + 4px);
            height: calc(100% - 17px);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            padding: var(--px-35);
            z-index: 3;
            font: normal normal 800 var(--s-14);
            bottom: -2px;
            left: -3px;
            border-radius: 6px;
            text-transform: uppercase;
            background: #0000
              linear-gradient(180deg, #ddd3 0%, #969696 69%, #7e7e7ed4 100%) 0%
              0% no-repeat padding-box;
}
.borderRightOpenItem::after{
  position: absolute;
    content: '';
    height: 84%;
    background: #A7A7A7;
    width: 1px;
    top: 8%;
    right: -10px;
}
`;
export default GlobalBaseStyle;
