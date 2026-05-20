import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const Result = () => {

    const location = useLocation();
    const analysisId = location.state?.analysisId;
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);


   useEffect(() => {

    async function fetchReport() {
    try {
      const response = await axios.get(
        `http://localhost:3000/result/${analysisId}`
      );
      const data = response.data.data.attributes;
      console.log(data);
      if (data.status !== "completed") {
        setTimeout(fetchReport, 3000); // retry after 3 sec
        return;
      }
      setReportData(data.results);
      setLoading(false);

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  fetchReport();

}, []);

  if(loading){
    return (
      <div className='bg-blue-950 flex justify-center items-center h-screen w-screen text-2xl font-bold'>
        <div className='waiting_frame flex bg-blue-950 h-fit lg:w-95 w-80 justify-center items-center rounded-lg border-2 border-gray-600'>
        Scanning file... please wait ⏳<br/><br/> Over 60+ antivirus engines are analyzing your file for threats
        </div>
      </div>
      );
  }  

  const vendors = reportData ? Object.entries(reportData) : [];

  {/* Count the number of malicious, suspicious, and safe results */}
  const maliciousCount = vendors.filter(
    ([vendor, result]) => result.category === "malicious"
  ).length;
  const suspiciousCount = vendors.filter(
    ([vendor, result]) => result.category === "suspicious"
  ).length;
  const safeCount = vendors.filter(
    ([vendor, result]) => result.category === "undetected"
  ).length;

  const chartData = {
  labels: ['Safe', 'Malicious', 'Suspicious'],
  datasets: [
    {
      data: [safeCount, maliciousCount, suspiciousCount],
      backgroundColor: [
        '#10B981',
        '#EF4444',
        '#F59E0B'
      ],
      borderWidth: 1
    }
  ]
};

  return (
    <div className='lg:h-screen h-full w-screen flex justify-center select-none bg-blue-950'>
      <div className='result-frame w-4/5 flex flex-col bg-blue-950 h-full'>
            <Link to='/' className='back_btn text-center h-8 w-fit flex justify-center text-cyan-500 items-center font-bold active:scale-97'>Back</Link>
            <p className='text-white font-bold text-2xl'>Ai Summary:</p>
            <div className='summary_graph_wrapper h-fit w-full flex flex-col justify-center items-center lg:flex-row gap-4'>
                <div className='ai_summary_area flex justify-start lg:h-65 h-full w-full lg:w-2/3 font-bold text-white'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem modi officia repellendus sapiente maxime repellat quod? Expedita illum enim exercitationem minus, quibusdam voluptate mollitia voluptates eveniet, nesciunt natus maiores placeat cum saepe, quia consequatur. Neque explicabo dolorum quia numquam dolorem delectus error quam, velit harum hic veritatis libero? Nesciunt, explicabo!</div>
                <div className='doughnut_chart_area h-full lg:h-65 lg:w-1/3 w-full flex justify-center items-center'>
                  <div className='h-50 w-50'>
                   <Doughnut data={chartData} />
                  </div>
                </div>
            </div>
            <p className='txt_report_summary text-white font-bold text-2xl'>Security Vendors Analysis:</p>
            <br/>
            
            {/* TABLE START */}
            <div className='mt-4 overflow-x-auto border-3 border-gray-600 p-4 rounded-lg'>

               
                      {vendors.length === 0 && (
                          <p className='text-white'>
                             Analysis pending...
                           </p>
                        )}

                <table className='w-full text-white border-gray-600'>
                    
                    <thead>
                        <tr>
                          <th className='p-2'>Vendors</th>
                          <th className='p-2'>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                     
                        {vendors.map(([vendor, result], index) => (
                            <tr key={index} className='border-b border-gray-700'>

                              <td className='p-2'>
                                {vendor}
                              </td>

                              <td className='p-2'>
                                {result.category === "malicious" && "❌ Malicious" }
                                {result.category === "suspicious" && "⚠️ Suspicious" }
                                {result.category === "undetected" && "✅ Safe" }
                                {!result?.category && "❓ Unknown" }
                              </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            </div> {/* TABLE END */}
      </div>
    </div>
  )
}

export default Result
