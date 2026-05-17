import React from 'react'
import { Link } from 'react-router-dom'

const Result = () => {
  return (
    <div className='lg:h-screen h-full w-screen flex justify-center select-none bg-blue-950'>
      <div className='result-frame w-4/5 flex flex-col bg-blue-950 h-full'>
            <Link to='/' className='back_btn text-center h-8 w-fit flex justify-center text-cyan-500 items-center font-bold active:scale-97'>Back</Link>
            <p className='text-white font-bold text-2xl'>Ai Summary:</p>
            <div className='summary_graph_wrapper h-fit w-full flex flex-col justify-center items-center lg:flex-row gap-4'>
                <div className='ai_summary_area flex justify-start lg:h-65 h-full w-full lg:w-2/3 font-bold text-white'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem modi officia repellendus sapiente maxime repellat quod? Expedita illum enim exercitationem minus, quibusdam voluptate mollitia voluptates eveniet, nesciunt natus maiores placeat cum saepe, quia consequatur. Neque explicabo dolorum quia numquam dolorem delectus error quam, velit harum hic veritatis libero? Nesciunt, explicabo!</div>
                <div className='doughnut_chart_area h-full lg:h-65 lg:w-1/3 w-full flex justify-center items-center'><div className='h-50 w-50 bg-emerald-400'></div></div>
            </div>
            <p className='txt_report_summary text-white font-bold text-2xl'>Report Summary:</p>
            <br/>
            
      </div>
    </div>
  )
}

export default Result
