import React, { createRef, useState, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Popover } from "antd";
import Selection, { getBoundsForNode, isEvent } from "./Selection";
import * as TimeSlotUtils from "./utils/TimeSlots";
import { isSelected } from "./utils/selection";

import { notify } from "./utils/helpers";
import * as DayEventLayout from "./utils/DayEventLayout";
import TimeSlotGroup from "./TimeSlotGroup";
import TimeGridEvent from "./TimeGridEvent";
import { DayLayoutAlgorithmPropType } from "./utils/propTypes";
import ModalAppointmentShedulerDetail from "src/components/Book/ModalAppointmentShedulerDetail";
import { addDataCopyTicket } from "src/components/Book/book-slice";
import { connect } from "react-redux";

import DayColumnWrapper from "./DayColumnWrapper";
let resourceItem = [];

class DayColumn extends React.Component {
  state = { selecting: false, timeIndicatorPosition: null };
  intervalTriggered = false;

  constructor(...args) {
    super(...args);

    this.slotMetrics = TimeSlotUtils.getSlotMetrics(this.props);
    this.containerRef = createRef();
    this.state = {
      appointmentIdClick: 0,
      isModalAPPTDetail: false,
      idTicketClick: "",
      oldId: "",
      visible: false,
    };
  }

  componentDidMount() {
    this.props.selectable && this._selectable();

    if (this.props.isNow) {
      this.setTimeIndicatorPositionUpdateInterval();
    }
  }

  componentWillUnmount() {
    this._teardownSelectable();
    this.clearTimeIndicatorInterval();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectable && !this.props.selectable) this._selectable();
    if (!nextProps.selectable && this.props.selectable)
      this._teardownSelectable();

    this.slotMetrics = this.slotMetrics.update(nextProps);
  }

  componentDidUpdate(prevProps, prevState) {
    const { getNow, isNow, localizer, date, min, max } = this.props;
    const getNowChanged = localizer.neq(
      prevProps.getNow(),
      getNow(),
      "minutes"
    );

    if (prevProps.isNow !== isNow || getNowChanged) {
      this.clearTimeIndicatorInterval();

      if (isNow) {
        const tail =
          !getNowChanged &&
          localizer.eq(prevProps.date, date, "minutes") &&
          prevState.timeIndicatorPosition === this.state.timeIndicatorPosition;

        this.setTimeIndicatorPositionUpdateInterval(tail);
      }
    } else if (
      isNow &&
      (localizer.neq(prevProps.min, min, "minutes") ||
        localizer.neq(prevProps.max, max, "minutes"))
    ) {
      this.positionTimeIndicator();
    }
  }

  /**
   * @param tail {Boolean} - whether `positionTimeIndicator` call should be
   *   deferred or called upon setting interval (`true` - if deferred);
   */
  setTimeIndicatorPositionUpdateInterval(tail = false) {
    if (!this.intervalTriggered && !tail) {
      this.positionTimeIndicator();
    }

    this._timeIndicatorTimeout = window.setTimeout(() => {
      this.intervalTriggered = true;
      this.positionTimeIndicator();
      this.setTimeIndicatorPositionUpdateInterval();
    }, 60000);
  }

  clearTimeIndicatorInterval() {
    this.intervalTriggered = false;
    window.clearTimeout(this._timeIndicatorTimeout);
  }

  positionTimeIndicator() {
    const { min, max, getNow } = this.props;
    const current = getNow();

    if (current >= min && current <= max) {
      const top = this.slotMetrics.getCurrentTimePosition(current);
      this.intervalTriggered = true;
      this.setState({ timeIndicatorPosition: top });
    } else {
      this.clearTimeIndicatorInterval();
    }
  }

  render() {
    const {
      date,
      max,
      rtl,
      isNow,
      resource,
      resources,
      index,
      accessors,
      localizer,
      viewCalendar,
      getters: { dayProp, ...getters },
      components: { eventContainerWrapper: EventContainer, ...components },
    } = this.props;
    let { slotMetrics } = this;
    let { selecting, top, height, startDate, endDate } = this.state;

    let selectDates = { start: startDate, end: endDate };

    const { className, style } = dayProp(max);

    const DayColumnWrapperComponent =
      components.dayColumnWrapper || DayColumnWrapper;

    var listShiftModel;
    let typeTech = "";
    let employeeName = "";

    if (resources != null) {
      resources.map(function (value, idx) {
        if (value.resourceId == resource) {
          if (value.listShiftModel != []) {
            listShiftModel = value.listShiftModel;
          }
          if (value.type != "") {
            typeTech = value.type;
          }
          if (value.employeeName != "") {
            employeeName = value.resourceTitle;
          }
        }
      });
    }
    let widthSalon = "140";

    if (typeof window !== "undefined") {
      let elm = document.querySelectorAll(".rbc-salon-appointment")[0];
      if (elm) {
        widthSalon = window.getComputedStyle(elm).minWidth;
      }
    }
    widthSalon = widthSalon.slice(0, widthSalon.length - 2);
    var styled = index * widthSalon + 81;

    return (
      <DayColumnWrapperComponent
        ref={this.containerRef}
        date={date}
        style={typeTech == "Salon" ? parseInt(styled) : style}
        id={index}
        type={typeTech == "Salon" ? 1 : 0}
        className={clsx(
          className,
          typeTech === "Salon" && "rbc-salon-appointment",
          viewCalendar == "week" && "rbc-week-slot",
          "rbc-day-slot",
          "rbc-time-column",
          isNow && "rbc-now",
          isNow && "rbc-today",
          selecting && "rbc-slot-selecting",
          index + "-column-calendar"
        )}
        slotMetrics={slotMetrics}
      >
        {slotMetrics.groups.map((grp, idx) => (
          <TimeSlotGroup
            key={idx}
            group={grp}
            resource={resource}
            getters={getters}
            components={components}
            listShiftModel={listShiftModel}
            typeTech={typeTech}
            employeeName={employeeName}
          />
        ))}
        <EventContainer
          localizer={localizer}
          resource={resource}
          accessors={accessors}
          getters={getters}
          components={components}
          slotMetrics={slotMetrics}
        >
          <div className={clsx("rbc-events-container", rtl && "rtl")}>
            {this.renderEvents({
              events: this.props.backgroundEvents,
              isBackgroundEvent: true,
            })}
            {this.renderEvents({ events: this.props.events })}
          </div>
        </EventContainer>

        {selecting && (
          <div className="rbc-slot-selection" style={{ top, height }}>
            {localizer.format(selectDates, "selectRangeFormat")}
          </div>
        )}
        {isNow && this.intervalTriggered && (
          <div
            id="current-time-indicator"
            className="rbc-current-time-indicator"
            style={{ top: `${this.state.timeIndicatorPosition}%` }}
          />
        )}
      </DayColumnWrapperComponent>
    );
  }

  renderEvents = ({ events, isBackgroundEvent }) => {
    let {
      rtl,
      selected,
      accessors,
      localizer,
      getters,
      components,
      step,
      timeslots,
      dayLayoutAlgorithm,
      resizable,
      handleClickTicketFunc,
    } = this.props;

    const { slotMetrics } = this;
    const { messages } = localizer;

    let styledEvents = DayEventLayout.getStyledEvents({
      events,
      accessors,
      slotMetrics,
      minimumStartDifference: Math.ceil((step * timeslots) / 2),
      dayLayoutAlgorithm,
    });

    const onClickTicket = (appointmentId) => {
      this.setState({ appointmentIdClick: appointmentId });
    };

    this.setState = this.setState.bind(this);

    return styledEvents.map(({ event, style }, idx) => {
      let end = accessors.end(event);
      let start = accessors.start(event);
      let format = "eventTimeRangeFormat";
      let label;

      const startsBeforeDay = slotMetrics.startsBeforeDay(start);
      const startsAfterDay = slotMetrics.startsAfterDay(end);

      if (startsBeforeDay) format = "eventTimeRangeEndFormat";
      else if (startsAfterDay) format = "eventTimeRangeStartFormat";

      if (startsBeforeDay && startsAfterDay) label = messages.allDay;
      else label = localizer.format({ start, end }, format);

      let continuesPrior = startsBeforeDay || slotMetrics.startsBefore(start);
      let continuesAfter = startsAfterDay || slotMetrics.startsAfter(end);

      let statusId = parseInt(event.ticketstatus);
      // let status =
      //   statusId === 7 || statusId === 8 || statusId === 4 || statusId === 9
      //     ? "busyTime"
      //     : "";
      return (
        <Popover
          key={idx}
          overlayClassName="p-0 m-0"
          placement={`${
            this.props.bgColorTicket.screenX > 500
              ? this.props.bgColorTicket.screenY > 600
                ? "left"
                : "leftTop"
              : this.props.bgColorTicket.screenY > 600
              ? "right"
              : "rightTop"
          }`}
          content={
            <ModalAppointmentShedulerDetail
              appointmentId={this.state.appointmentIdClick}
            />
          }
          trigger={
            // status != "busyTime" && this.props.isCopyTicket != true
            //   ?
            "click"
            // : ""
          }
        >
          <TimeGridEvent
            style={style}
            event={event}
            label={label}
            key={"evt_" + idx}
            getters={getters}
            rtl={rtl}
            components={components}
            continuesPrior={continuesPrior}
            continuesAfter={continuesAfter}
            accessors={accessors}
            selected={isSelected(event, selected)}
            onDoubleClick={(e) => this._doubleClick(event, e)}
            isBackgroundEvent={isBackgroundEvent}
            onKeyPress={(e) => this._keyPress(event, e)}
            resizable={resizable}
            stateStore={this.state}
            // className={status == "busyTime" ? "busyTime" : ""}
            onClick={(e) => {
              onClickTicket(event.appointmentId);
              this.props.isCopyTicket != true &&
                this.props.addDataClickTicket(event);
            }}
            onMouseOver={(e) => {
              let eventDoms = document.getElementsByClassName(
                "rbc-events-container"
              );

              if (eventDoms.length > 0) {
                for (let i = 0; i < eventDoms.length; i++) {
                  eventDoms[i].style.position = "absolute";
                }
              }
              return;
            }}
            onMouseOut={(e) => {
              let eventDoms = document.getElementsByClassName(
                "rbc-events-container"
              );

              if (eventDoms.length > 0) {
                for (let i = 0; i < eventDoms.length; i++) {
                  eventDoms[i].style.position = "unset";
                }
              }
              return;
            }}
          />
        </Popover>
      );
    });
  };

  _selectable = () => {
    let node = this.containerRef.current;
    const { longPressThreshold, localizer } = this.props;
    let selector = (this._selector = new Selection(() => node, {
      longPressThreshold: longPressThreshold,
    }));

    let maybeSelect = (box) => {
      let onSelecting = this.props.onSelecting;
      let current = this.state || {};
      let state = selectionState(box);
      let { startDate: start, endDate: end } = state;

      if (onSelecting) {
        if (
          (localizer.eq(current.startDate, start, "minutes") &&
            localizer.eq(current.endDate, end, "minutes")) ||
          onSelecting({ start, end, resourceId: this.props.resource }) === false
        )
          return;
      }

      if (
        this.state.start !== state.start ||
        this.state.end !== state.end ||
        this.state.selecting !== state.selecting
      ) {
        this.setState(state);
      }
    };

    let selectionState = (point) => {
      let currentSlot = this.slotMetrics.closestSlotFromPoint(
        point,
        getBoundsForNode(node)
      );

      if (!this.state.selecting) {
        this._initialSlot = currentSlot;
      }

      let initialSlot = this._initialSlot;
      if (localizer.lte(initialSlot, currentSlot)) {
        currentSlot = this.slotMetrics.nextSlot(currentSlot);
      } else if (localizer.gt(initialSlot, currentSlot)) {
        initialSlot = this.slotMetrics.nextSlot(initialSlot);
      }

      const selectRange = this.slotMetrics.getRange(
        localizer.min(initialSlot, currentSlot),
        localizer.max(initialSlot, currentSlot)
      );

      return {
        ...selectRange,
        selecting: true,

        top: `${selectRange.top}%`,
        height: `${selectRange.height}%`,
      };
    };

    let selectorClicksHandler = (box, actionType) => {
      if (!isEvent(this.containerRef.current, box)) {
        const { startDate, endDate } = selectionState(box);
        this._selectSlot({
          startDate,
          endDate,
          action: actionType,
          box,
        });
      }
      this.setState({ selecting: false });
    };

    selector.on("selecting", maybeSelect);
    selector.on("selectStart", maybeSelect);

    selector.on("beforeSelect", (box) => {
      if (this.props.selectable !== "ignoreEvents") return;

      return !isEvent(this.containerRef.current, box);
    });

    selector.on("click", (box) => selectorClicksHandler(box, "click"));

    selector.on("doubleClick", (box) =>
      selectorClicksHandler(box, "doubleClick")
    );

    selector.on("select", (bounds) => {
      if (this.state.selecting) {
        this._selectSlot({ ...this.state, action: "select", bounds });
        this.setState({ selecting: false });
      }
    });

    selector.on("reset", () => {
      if (this.state.selecting) {
        this.setState({ selecting: false });
      }
    });
  };

  _teardownSelectable = () => {
    if (!this._selector) return;
    this._selector.teardown();
    this._selector = null;
  };

  _selectSlot = ({ startDate, endDate, action, bounds, box }) => {
    let current = startDate,
      slots = [];

    while (this.props.localizer.lte(current, endDate)) {
      slots.push(current);
      current = new Date(+current + this.props.step * 60 * 1000); // using Date ensures not to create an endless loop the day DST begins
    }

    notify(this.props.onSelectSlot, {
      slots,
      start: startDate,
      end: endDate,
      resourceId: this.props.resource,
      action,
      bounds,
      box,
    });
  };

  _select = (...args) => {
    notify(this.props.onSelectEvent, args);
  };

  _doubleClick = (...args) => {
    notify(this.props.onDoubleClickEvent, args);
  };

  _keyPress = (...args) => {
    notify(this.props.onKeyPressEvent, args);
  };
}

DayColumn.propTypes = {
  events: PropTypes.array.isRequired,
  backgroundEvents: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  min: PropTypes.instanceOf(Date).isRequired,
  max: PropTypes.instanceOf(Date).isRequired,
  getNow: PropTypes.func.isRequired,
  isNow: PropTypes.bool,

  rtl: PropTypes.bool,
  resizable: PropTypes.bool,

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,

  showMultiDayTimes: PropTypes.bool,
  culture: PropTypes.string,
  timeslots: PropTypes.number,

  selected: PropTypes.object,
  selectable: PropTypes.oneOf([true, false, "ignoreEvents"]),
  eventOffset: PropTypes.number,
  longPressThreshold: PropTypes.number,

  onSelecting: PropTypes.func,
  onSelectSlot: PropTypes.func.isRequired,
  onSelectEvent: PropTypes.func.isRequired,
  onDoubleClickEvent: PropTypes.func.isRequired,
  onKeyPressEvent: PropTypes.func,

  className: PropTypes.string,
  dragThroughEvents: PropTypes.bool,
  resource: PropTypes.any,

  dayLayoutAlgorithm: DayLayoutAlgorithmPropType,
};

DayColumn.defaultProps = {
  dragThroughEvents: true,
  timeslots: 2,
};

const mapStateToProps = (store) => ({
  count: store.counter.value,
  isCopyTicket: store.book.isCopyTicket,
  bgColorTicket: store.book.bgColorTicket,
});

const mapDispatchToProps = (dispatch) => ({
  addDataClickTicket: (event) => dispatch(addDataCopyTicket(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DayColumn);
