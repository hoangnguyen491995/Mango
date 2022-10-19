import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { withTheme } from "styled-components";
import { vissibleModel } from "src/components/Book/book-slice"
import { connect } from "react-redux";
import BackgroundWrapper from "./BackgroundWrapper";

const getDate = (date) => {
  var datet = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  var strTime = month + "/" + datet + "/" + year;
  return strTime;
};

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours < 10 ? "0" + hours : hours;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime =  hours + ":" + minutes + " " + ampm  ;
 
  return strTime;
}

function formatDateTime(date) {
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours < 10 ? "0" + hours : hours;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = month +"/" + day+ "/"+ year +" " + hours + ":" + minutes + " " + ampm  ;
 
  return strTime;
}
 class TimeSlotGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {isModalVisible: false};
  }
  render() {
    const {
      renderSlot,
      resource,
      group,
      getters,
      typeTech,
      listShiftModel,
      employeeName,
      components: { timeSlotWrapper: Wrapper = BackgroundWrapper } = {},
    } = this.props;
    
    // const dispatch = useDispatch();

    let startDate = group[0];
    const groupProps = getters ? getters.slotGroupProp() : {};

    var className = "time-day-off";
    listShiftModel?.map((e) => {
      if (
        new Date(`${getDate(startDate)} ${e.start}`).getTime() <=
          startDate.getTime() &&
        startDate.getTime() <=
          new Date(`${getDate(startDate)} ${e.end}`).getTime()
      ) {
        typeTech === "Salon"
          ? (className = "time-salon-appointment")
          : (className = "");
      }
    });
    let data = {customerId:  resource,dateTime: formatDateTime(startDate), employeeName: employeeName }
  
    return (
      <div className={`rbc-timeslot-group ${className}`} {...groupProps}
      onDoubleClick={() => {
      this.props.handledoubleClick(data)
      }}
      >
        {group.map((value, idx) => {
          const slotProps = getters ? getters.slotProp(value, resource) : {};
          return (
            <Wrapper key={idx} value={value} resource={resource}>
              <div
                {...slotProps}
                className={clsx(
                  "rbc-time-slot",
                  value.getMinutes() == 0 && "rbc-time-slot-begin",
                  slotProps.className
                )}
                onMouseOver={(e) => {
                  if (e.target.offsetParent.id != "timeLeftSection") {
                    e.target.textContent = `${formatDate(startDate)}`;
                  }
                }}
                onMouseOut={(e) => {
                  if (e.target.offsetParent.id != "timeLeftSection")
                    e.target.textContent = ` `;
                }}
              >
                {renderSlot && renderSlot(value, idx)}
              </div>
              
            </Wrapper>
            
          );
        })}
       
      </div>
    );
  }
}

TimeSlotGroup.propTypes = {
  renderSlot: PropTypes.func,
  group: PropTypes.array.isRequired,
  resource: PropTypes.any,
  components: PropTypes.object,
  getters: PropTypes.object,
};

const mapStateToProps = (store) => ({
  count: store.counter.value,
});

const mapDispatchToProps = (dispatch) => ({
  handledoubleClick: (data) => dispatch(vissibleModel(data)),
})

export default  connect(mapStateToProps, mapDispatchToProps )(TimeSlotGroup)
