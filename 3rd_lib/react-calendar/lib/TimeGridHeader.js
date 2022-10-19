import PropTypes from "prop-types";
import clsx from "clsx";
import scrollbarSize from "dom-helpers/scrollbarSize";
import React from "react";
import { connect } from "react-redux";

import DateContentRow from "./DateContentRow";
import Header from "./Header";
import ResourceHeader from "./ResourceHeader";
import { notify } from "./utils/helpers";

class TimeGridHeader extends React.Component {
  handleHeaderClick = (date, view, e) => {
    e.preventDefault();
    notify(this.props.onDrillDown, [date, view]);
  };

  renderHeaderCells(range) {
    let {
      localizer,
      getDrilldownView,
      getNow,
      getters: { dayProp },
      components: { header: HeaderComponent = Header },
    } = this.props;

    const today = getNow();

    return range.map((date, i) => {
      let drilldownView = getDrilldownView(date);
      let label = localizer.format(date, "dayFormat");

      const { className, style } = dayProp(date);

      let header = (
        <HeaderComponent date={date} label={label} localizer={localizer} />
      );

      return (
        <div
          key={i}
          style={style}
          className={clsx(
            "rbc-header",
            className,
            localizer.isSameDate(date, today) && "rbc-today"
          )}
        >
          {drilldownView ? (
            <button
              type="button"
              className="rbc-button-link"
              onClick={(e) => this.handleHeaderClick(date, drilldownView, e)}
            >
              {header}
            </button>
          ) : (
            <span>{header}</span>
          )}
        </div>
      );
    });
  }
  renderRow = (resource) => {
    let {
      events,
      rtl,
      selectable,
      getNow,
      range,
      getters,
      localizer,
      accessors,
      components,
      resizable,
    } = this.props;

    const resourceId = accessors.resourceId(resource);
    let eventsToDisplay = resource
      ? events.filter((event) => accessors.resource(event) === resourceId)
      : events;

    return (
      <DateContentRow
        isAllDay
        rtl={rtl}
        getNow={getNow}
        minRows={2}
        range={range}
        events={eventsToDisplay}
        resourceId={resourceId}
        className="rbc-allday-cell"
        selectable={selectable}
        selected={this.props.selected}
        components={components}
        accessors={accessors}
        getters={getters}
        localizer={localizer}
        onSelect={this.props.onSelectEvent}
        onDoubleClick={this.props.onDoubleClickEvent}
        onKeyPress={this.props.onKeyPressEvent}
        onSelectSlot={this.props.onSelectSlot}
        longPressThreshold={this.props.longPressThreshold}
        resizable={resizable}
      />
    );
  };

  render() {
    let {
      width,
      rtl,
      resources,
      range,
      events,
      getNow,
      accessors,
      selectable,
      components,
      getters,
      scrollRef,
      localizer,
      isOverflowing,
      view,
      components: {
        timeGutterHeader: TimeGutterHeader,
        resourceHeader: ResourceHeaderComponent = ResourceHeader,
      },
      resizable,
    } = this.props;

    let style = {};
    if (isOverflowing) {
      style[rtl ? "marginLeft" : "marginRight"] = `${scrollbarSize()}px`;
    }
    const groupedEvents = resources.groupEvents(events);
    const checkFailImage = false;
    let minWid = "140";
    if (typeof window !== "undefined") {
      let elm_salon = document.querySelectorAll(".rbc-salon-appointment")[0];

      if (elm_salon) {
        minWid = window.getComputedStyle(elm_salon).minWidth;
      }
    }
    if (minWid != 140) {
      minWid = minWid.slice(0, minWid.length - 2);
    }
    var onChangeHandler = (event) => {
      var x = document.getElementsByClassName(".rbc-header-input");
      x.value = event.target.value;
    };
    var onBlurHandler = (resourceId, input) => {
      var x = document.getElementsByClassName(".rbc-header-input");
      x.value = x.value;
      localStorage.setItem(resourceId, x.value);
    };

    var formatDays = (date) => {
      let datetime = new Date(date);
      var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Frid", "Sat"];
      const getDay = datetime.getDay();
      const getDate = datetime.getDate();
      var strTime = {
        day: days[getDay],
        date: getDate > 9 ? getDate : `0${getDate}`,
      };
      return strTime;
    };

    // ----------------------------------------------------------------
    const handleDoubleHeader = (e, idx) => {
      let elmColmnCalendar = document.getElementsByClassName(idx+"-column-calendar")[0];


      var x = e.target.closest(".rbc-time-header-content");
      let minWidth = window.getComputedStyle(x).minWidth;
      if (minWidth == "360px") {
        x.style.minWidth = this.props._listElm_Title + "px";
        x.style.width = this.props._listElm_Title + "px";
        x.style.maxWidth = this.props._listElm_Title + "px";
        elmColmnCalendar.style.minWidth = this.props._listElm_Title + "px";
        elmColmnCalendar.style.width = this.props._listElm_Title + "px";
        elmColmnCalendar.style.maxWidth = this.props._listElm_Title + "px";
      } else {
        x.style.minWidth = "360px";
        x.style.width = "360px";
        x.style.maxWidth = "360px";
        elmColmnCalendar.style.minWidth = "360px";
        elmColmnCalendar.style.width = "360px";
        elmColmnCalendar.style.maxWidth = "360px";
      }
    };

    return (
      <div
        // style={style}
        ref={scrollRef}
        className={clsx("rbc-time-header", isOverflowing && "rbc-overflowing")}
      >
        <div
          className="rbc-label rbc-time-header-gutter"
          style={{ width, minWidth: width, maxWidth: width }}
        >
          {" "}
          HOUR
          {TimeGutterHeader && <TimeGutterHeader />}
        </div>

        {view === "day" &&
          resources.map(([id, resource], idx) => {
            return (
              <div
                className={`${
                  resource.type == "Salon"
                    ? `rbc-salon-appointment rbc-time-header-content ${idx + "-header-resource"}`
                    : `rbc-time-header-content rbc-header-tech ${idx + "-header-resource"}`
                }`}
                style={{
                  maxWidth: 140,
                  minWidth: 140,
                  width: 140,
                  left: resource.type == "Salon" && `${minWid * idx + 81}px`,
                }}
                id={idx}
                key={idx}
                onDoubleClick={(e) => handleDoubleHeader(e, idx)}
              >
                {resource && (
                  <div
                    className="rbc-row rbc-row-resource header-resource"
                    key={`resource_${idx}`}
                    style={{
                      alignItems: "center",
                      flexDirection: "column",
                      height: 90,
                    }}
                  >
                    <div
                     className="avt-header relative"
                      // style: {
                      //   alignItems: "flex-end",
                      // },
                      key={`resource_${idx}`}
                    >
                      <div
                        className="avt-header"
                        style={{
                          ...(checkFailImage && avatarStyle),
                          border: `3px solid ${resource.backGroundColor}`,
                          color: `${resource.backGroundColor}`,
                          backgroundColor: `${resource.backGroundColor}20`,
                          fontWeight: 600,
                          // padding: "8px",
                          textTransform: "uppercase",
                        }}
                      >
                        <span className={` absolute z-0`}>
                          {accessors.resourceTitle(resource).charAt(0)}
                        </span>
                        <img
                          className="image-avatar z-[1]"
                          src={`https://backend_bd.enrichcous.com:5600/Upload/Employee/${resource.imageFileName}`}
                         
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "";
                            currentTarget.className = "display-none";
                          }}
                        />
                      </div>

                      <div
                        className="timeline-tech-count z-[2]"
                        style={{
                          backgroundColor: "#FFFFFF",
                        }}
                      >
                        <ResourceHeaderComponent
                          index={idx}
                          label={resource.count}
                          resource={resource}
                        />
                      </div>
                    </div>
                    {resource.type == "Salon" ? (
                      <input
                        onChange={onChangeHandler}
                        onBlur={() => onBlurHandler(resource.resourceId)}
                        type="text"
                        placeholder={
                          localStorage.getItem(resource.resourceId) != undefined
                            ? localStorage.getItem(resource.resourceId)
                            : accessors.resourceTitle(resource)
                        }
                        className="rbc-header rbc-header-input"
                        size="2"
                      ></input>
                    ) : (
                      <div className="rbc-header w-auto border-none text-[#505050]">
                        <ResourceHeaderComponent
                          index={idx}
                          label={accessors.resourceTitle(resource)}
                          resource={resource}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        {view === "week" &&
          resources.map(([id, resource], idx) => (
            <div
              className={"rbc-daytime-header-content"}
              style={{
                width: "100%",
                left: resource.type == "Salon" && `${minWid * idx + 81}px`,
              }}
              id={idx}
              key={idx}
            >
              {resource && (
                <div
                  className="rbc-row rbc-row-resource header-resource"
                  key={`resource_${idx}`}
                  style={{
                    alignItems: "center",
                    flexDirection: "column",
                    height: 90,
                  }}
                >
                  <div className="relative" key={`resource_${idx}`}>
                    <div
                      className="days"
                      style={{
                        fontWeight: 500,
                        color:
                          resource.backGroundColor != "" &&
                          resource.backGroundColor,
                      }}
                    >
                      <ResourceHeaderComponent
                        index={idx}
                        label={formatDays(resource.resourceTitle).day}
                        resource={resource}
                      />
                    </div>
                    <div
                      className="dates"
                      style={{
                        fontWeight: 600,
                        backgroundColor: resource.backGroundColor,
                        color: resource.backGroundColor != "" && "#ffff",
                      }}
                    >
                      <ResourceHeaderComponent
                        index={idx}
                        label={formatDays(resource.resourceTitle).date}
                        resource={formatDays(resource.resourceTitle).date}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    );
  }
}

TimeGridHeader.propTypes = {
  range: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  resources: PropTypes.object,
  getNow: PropTypes.func.isRequired,
  isOverflowing: PropTypes.bool,

  rtl: PropTypes.bool,
  resizable: PropTypes.bool,
  width: PropTypes.number,

  localizer: PropTypes.object.isRequired,
  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,

  selected: PropTypes.object,
  selectable: PropTypes.oneOf([true, false, "ignoreEvents"]),
  longPressThreshold: PropTypes.number,

  onSelectSlot: PropTypes.func,
  onSelectEvent: PropTypes.func,
  onDoubleClickEvent: PropTypes.func,
  onKeyPressEvent: PropTypes.func,
  onDrillDown: PropTypes.func,
  getDrilldownView: PropTypes.func.isRequired,
  scrollRef: PropTypes.any,
};

const mapStateToProps = (store) => ({
  _listElm_Title: store.book._listElm_Title,
  viewTypeCalendar: store.book.viewTypeCalendar,
});

export default connect(mapStateToProps)(TimeGridHeader);
