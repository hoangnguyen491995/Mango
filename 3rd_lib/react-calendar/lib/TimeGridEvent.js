import { LockFilled } from "@ant-design/icons";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { useAppSelector } from "src/redux/hook";
import { useDispatch } from "react-redux";
import {
  addColorTicketActive,
  clearColorTicketActive,
  turnOffCopy,
  pasteComplete,
  clearDataCopyTicket,
} from "src/components/Book/book-slice";
import { ConfirmCopy } from "services/Appointments/ConfirmCopy";
import { messageSuccess, messageWarning } from "src/components/MessageAlert";

function stringifyPercent(v) {
  return typeof v === "string" ? v : v + "%";
}

/* eslint-disable react/prop-types */
function TimeGridEvent(props) {
  const {
    style,
    className,
    event,
    accessors,
    rtl,
    selected,
    label,
    continuesPrior,
    continuesAfter,
    getters,
    onClick,
    onDoubleClick,
    isBackgroundEvent,
    onKeyPress,
    onMouseOver,
    onMouseOut,

    components: { event: Event, eventWrapper: EventWrapper },
  } = props;
  // console.log("getters", getters);
  // const [isActive, setIsActive] = useState(false);
  const bgColorTicket = useAppSelector((state) => state.book.bgColorTicket);
  const dataCopyTicket = useAppSelector((state) => state.book.dataCopyTicket);
  const isCopyTicket = useAppSelector((state) => state.book.isCopyTicket);
  const newPosition = useAppSelector((state) => state.book.newPosition);
  const confirmCopy = new ConfirmCopy();
  const dispatch = useDispatch();

  // console.log("props.event", props.event);
  let bgColor = props.event.color;
  let service = props.event.services;
  let appointmentStatusId = props.event.appointmentStatusId;
  let appointmentId = props.event.appointmentId;
  let isConfirmOB = props.event.isConfirmOB;
  let ticketstatus = props.event.ticketstatus;
  let comeUp = props.event.comeUp;
  let note = props.event.noteApt;
  let special = props.event.isSpecial;
  let isStartAllSameTime = props.event.isStartAllSameTime;
  let idParty = props.event.idParty;
  let isRequestTech = props.event.isRequestTech;
  let empID = props.event.resourceId;
  let isBookOnline = props.event.isBookOnline;
  let depositAmount = props.event.depositAmount;
  let id = props.event.id;

  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const ref = useOnclickOutside(
    () => {
      dispatch(clearColorTicketActive());
    },
    { ignoreClass: "ant-popover-inner-content" }
  );

  // console.log("appointmentId", props.event.appointmentStatusId);
  let title = accessors.title(event);
  let tooltip = accessors.tooltip(event);
  let end = accessors.end(event);
  let start = accessors.start(event);

  let userProps = getters.eventProp(event, start, end, selected);

  let { height, top, width, xOffset } = style;
  const handlePasteButton = () => {
    // dispatch(onPaste())
    try {
      confirmCopy.confirmCopy(newPosition).then((res) => {
        if (res.status === 200) {
          if (res.data.error_code > 1) {
            messageSuccess(res.data.error_message);
            dispatch(turnOffCopy());
            dispatch(clearDataCopyTicket());
            dispatch(pasteComplete());
          } else if (res.data.error_code == 0) {
            messageWarning(res.data.error_message);
          }
        } else {
          // setMyEvents(myEvents);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const inner = [
    <div
      key="1"
      className="rbc-event-content relative pr-5"
      style={{ color: `${isOpenPopover ? "#fff" : "#505050"}` }}
    >
      {Event ? <Event event={event} title={title} /> : title}
    </div>,
    <div
      key="2"
      className="rbc-event-service text-xs mt-1 "
      style={{
        backgroundColor: bgColor || "#00AD93",
      }}
    >
      {service}
    </div>,
    <div key="3" className="rbc-event-note mt-2">
      {note != "" && <mark>{note}</mark>}
    </div>,
    <div
      key="4"
      className="rbc-event-label mt-2"
      style={{ color: `${isOpenPopover ? "#fff" : "#505050"}` }}
    >
      {label}
    </div>,

    <div key="5" className="bottom absolute mt-1 pb-1 pr-1 right-0 bottom-0">
      {ticketstatus === 2 && (
        <img
          className="m-auto w-5 mt-1 h-5"
          src=" /assets/imgs/icon-waiting.svg"
          alt="Rounded avatar"
        ></img>
      )}
      {ticketstatus === 3 && (
        <img
          className="m-auto mt-1 w-5 h-5"
          src="/assets/imgs/book/24-pixel-assets_10.svg"
          alt="Rounded avatar"
        ></img>
      )}
      {ticketstatus === 8 && (
        <img
          className="m-auto mt-1 w-5 h-5"
          src="/assets/imgs/book/24-pixel-assets_11.svg"
          alt="Rounded avatar"
        ></img>
      )}
      {ticketstatus === 9 && (
        <img
          className="m-auto mt-1 w-5 h-5"
          src="/assets/imgs/Cancel-Book.svg"
          alt="Rounded avatar"
        ></img>
      )}
      {ticketstatus === 4 && (
        <img
          className="m-auto mt-1 w-5 h-5"
          src="/assets/imgs/book/232323.svg"
          alt="Rounded avatar"
        ></img>
      )}
    </div>,
    <div key="6" className="bottom absolute mt-1 pr-1 right-0 top-0">
      {comeUp == 1 && (
        <img
          className="m-auto mt-1 w-5 h-5"
          src="/assets/imgs/confirm.svg"
          alt="Rounded avatar"
        ></img>
      )}
      {note != "" && (
        <img
          className="m-auto mt-1 w-5 h-5"
          src="/assets/imgs/Ticket-Note.svg"
          alt="Rounded avatar"
        ></img>
      )}
      {idParty > 0 && (
        <img
          className="m-auto mt-1 w-5 h-5"
          src="/assets/imgs/party-icon.svg"
          alt="Rounded avatar"
        ></img>
      )}
      {isRequestTech === 1 && empID > 9999 && (
        <img
          className="m-auto mt-1 w-5 h-5"
          src="/assets/imgs/RQ.svg"
          alt="Rounded avatar"
        ></img>
      )}
      {isBookOnline && (
        <img
          className="m-auto mt-1 w-5 h-5"
          src="/assets/imgs/icon-online-booking-confirm.svg"
          alt="Rounded avatar"
        ></img>
      )}
      {special === 1 && (
        <img
          className="m-auto mt-1 w-5 h-5"
          src="/assets/imgs/Special_service.svg"
          alt="Rounded avatar"
        ></img>
      )}
      {depositAmount > 0 && (
        <img
          className="m-auto mt-1 w-5 h-5"
          src="/assets/imgs/repay.svg"
          alt="Rounded avatar"
        ></img>
      )}
    </div>,
    <div
      key="7"
      className="top absolute mt-1 pr-1 right-0 top-0 copy-ticket-book cursor-pointer"
    >
      {dataCopyTicket.id == id && isCopyTicket && (
        <>
          <div
            className="copy-paste-appointment"
            id="paste-appt"
            onClick={() => {
              // console.log("gagagag");
              handlePasteButton();
            }}
          >
            PASTE
          </div>
        </>
      )}
    </div>,
  ];

  const handleClickTK = (e, colorBorder, appointmentId, id) => {
    // setIsOpenPopover(!isOpenPopover);
    // console.log("eeeeee", e);
    dispatch(
      addColorTicketActive({
        bgColor: colorBorder,
        appointmentId: appointmentId,
        id: appointmentId + "-ticket-" + empID,
        screenX: e.screenX,
        screenY: e.screenY,
      })
    );
  };

  const eventStyle = isBackgroundEvent
    ? {
        ...userProps.style,
        top: stringifyPercent(top),
        height: stringifyPercent(height),
        // Adding 10px to take events container right margin into account
        width: `calc(${width} + 10px)`,
        [rtl ? "right" : "left"]: stringifyPercent(Math.max(0, xOffset)),
      }
    : {
        ...userProps.style,
        top: stringifyPercent(top),
        width: "90%",
        // width: `calc(${stringifyPercent(width)} - 8%)`,
        height: stringifyPercent(height),
        // left: "17%",
        [rtl ? "right" : "left"]: stringifyPercent(xOffset),
      };

  return (
    <EventWrapper type="time" {...props}>
      <div
        ref={ref}
        id={appointmentId + "-ticket-" + empID}
        onClick={(
          e,
          colorBorder = props.event.colorBorder,
          appointmentId = props.event.appointmentId
        ) => {
          //
          onClick();
          isCopyTicket != true &&
            handleClickTK(e, colorBorder, appointmentId, props.event.id);
        }}
        onDoubleClick={onDoubleClick}
        style={{
          zIndex: 1,
          borderLeft: `6px solid ${props.event.colorBorder || "#8B85CA"}`,
          borderRight: `1px solid ${props.event.colorBorder || "#8B85CA"}`,
          borderTop: `1px solid ${props.event.colorBorder || "#8B85CA"}`,
          borderBottom: `1px solid ${props.event.colorBorder || "#8B85CA"}`,

          // background: isOpenPopover ? props.event.colorBorder || "#8B85CA": ticketstatus > 1 ? "#a8a8a8 0% 0% no-repeat padding-box" :"#fff",
          background:
            bgColorTicket.appointmentId == props.event.appointmentId
              ? bgColorTicket.bgColor || "#8B85CA"
              : ticketstatus > 1
              ? "#a8a8a8 0% 0% no-repeat padding-box"
              : "#fff",

          ...eventStyle,
        }}
        onKeyPress={onKeyPress}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        title={
          tooltip
            ? (typeof label === "string" ? label + ": " : "") + tooltip
            : undefined
        }
        className={clsx(
          isBackgroundEvent ? `rbc-background-event` : `rbc-event bg-white  `,
          className,
          userProps.className,
          {
            "rbc-selected": selected,
            "rbc-event-continues-earlier": continuesPrior,
            "rbc-event-continues-later": continuesAfter,
          }
        )}
      >
        {inner}
      </div>
    </EventWrapper>
  );
}

export default TimeGridEvent;
