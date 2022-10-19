import React, { useEffect, useState } from "react";
import { PieChart } from "3rd_lib/react-d3-chart/src";
import { GetClientInfomationTotal } from "services/Customers/GetClientInfomationTotal";
import {
  ClientTotal,
  DataChart,
  DataInFoChart,
} from "../DataStructures/DataInterfaces";

var sort = null; // d3.ascending, d3.descending, func(a,b) { return a - b; }, etc...
function DonutChart({ customerId }) {
  const dataChart: DataChart[] = [];
  const [infoTotal, setInfoTotal] = useState<ClientTotal[]>([]);
  const [data, setDataInfoChart] = useState<DataInFoChart>();
  const getClientInfomationTotal = new GetClientInfomationTotal();

  useEffect(() => {
    try {
      getClientInfomationTotal
        .getClientInfomationTotal(customerId)
        .then((res) => {
          if (res.status === 200) {
            setInfoTotal(res.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, [customerId]);

  useEffect(() => {
    infoTotal.map((item) => {
      let data = {
        x: `${item.total}`,
        y: item.total,
        percentage: item.percentage,
        color: item.color,
      };
      dataChart.push(data);
    });

    
    setDataInfoChart({ label: "Donat chart", values: dataChart });

  }, [infoTotal]);

  return (
    <div className="flex space-x-5">
   {infoTotal.length > 0 && 
    <div className="space-y-5 mt-5 w-auto">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 h-5 w-5" style={{
              backgroundColor: "#00bed6",
            }}>
         
        </div>
        <div className="flex min-w-0">
          <p className="text-base font-medium text-gray-600 truncate p-0 m-0">
            Appoiment({infoTotal[0].total || 0 } )
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
       
            <div className="flex-shrink-0 h-5 w-5" style={{
              backgroundColor: "#8b85ca",
            }}>
        </div>
        <div className="flex min-w-0">
          <p className="text-base font-medium text-gray-600 truncate p-0 m-0">
            Walkin({infoTotal[1].total})
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
      <div className="flex-shrink-0  h-5 w-5" style={{
              backgroundColor: "#ffcd00",
            }}>
        </div>
       
        <div className="flex min-w-0">
          <p className="text-base font-medium text-gray-600 truncate p-0 m-0">
            Cancel({infoTotal[2].total})
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
      <div className="flex-shrink-0  h-5 w-5" style={{
              backgroundColor: "#d1d1d1",
            }}>
        </div>
       
        
        <div className="flex min-w-0">
          <p className="text-base font-medium text-gray-600 truncate p-0 m-0">
            No Show({infoTotal[3].total})
          </p>
        </div>
      </div>
    </div> }
    <div className=" h-auto w-auto -mt-5">
      {/* <DonutChart customerId={customerId}/> */}
      <PieChart
          data={data}
          width={420}
          height={250}
          margin={{ top: 5, bottom: 10, left: 100, right: 100 }}
          sort={sort}
        />
    </div>

  </div>
    // <>
     
    //     <PieChart
    //       data={data}
    //       width={400}
    //       height={250}
    //       margin={{ top: 5, bottom: 10, left: 100, right: 100 }}
    //       sort={sort}
    //     />
       
    // </>
  );
}
export default DonutChart;
// import React from 'react'

// import PieChart, {
//     Legend,
//     Series,
//     Export,
//     Label,
//     SmallValuesGrouping,
//     Connector,
//   } from 'devextreme-react/pie-chart';

// const internetLanguages =[{
//   id:1,
//     language: 'English',
//     percent: 55.5,
//     color: 'red',
//   }, {
//     id:2,
//     language: 'Chinese',
//     percent: 4.0,
//     color: 'blue',
//   }, {
//     id:3,
//     language: 'Spanish',
//     percent: 4.3,
//     color: 'pink',
//   }, {

//     id:4,
//     language: 'Japanese',
//     percent: 4.9,
//     color: 'black',
//   }];

// function DonutChart() {
//     const customizeLabel =(point) => {
//         return `${point.argumentText}\n ${point.valueText}%`;
//       }
//   return (
//     <PieChart
//     id="pie"
//     type="doughnut"
//     title=""
//     palette="Soft Pastel"
//     dataSource={internetLanguages}
//     style={{width: "360px", height: "260px"}}

//   >
//     <Series   argumentField="language" valueField="percent" >
//       <SmallValuesGrouping mode="topN" topCount={4} />
//       <Label
//         visible={true}
//         format="fixedPoint"
//         customizeText={customizeLabel}
//         backgroundColor="none"
//       >
//         <Connector visible={true} width={1}/>
//       </Label>
//     </Series>
//     {/* <Export enabled={true} /> */}
//     <Legend visible={false}></Legend>
//   </PieChart>
//   )
// }

// export default DonutChart
