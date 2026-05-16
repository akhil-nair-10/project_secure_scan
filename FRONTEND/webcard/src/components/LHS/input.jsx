import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Input = () => {

    const inputRef = useRef();
    const [fileName, setFileName] = useState("Upload a File");
    const [file, setFile] = useState(null);
    const [scanState, setScanState] = useState(false);
    const [scanTxt, setScanTxt] = useState("SCAN");

    const navigate = useNavigate();

    function fileUpload(){
        inputRef.current.click();
    }
    function fileNameUpdate(e){
        setFileName(e.target.files[0].name)
        setFile(e.target.files[0])
    }

    function scanBtnClick(){
      if(!file){
        alert("Please select a file first");
        return;
      }
      else{
        setScanState(true);
        setScanTxt("SCANNING...");
        console.log("scanning....");
        const safe = Math.random()>0.5;
        setTimeout(() => {
          if(safe){
            console.log("File is Safe");
          }
          else{
            console.log("File is Malicious");
          }
          setScanState(false);
          setScanTxt("SCAN");
          navigate('/result');
        }, 2000);
      }
    }

    function clearBtnClick(){
        inputRef.value = "";
        setFileName("Upload a File");
        setFile(null)
    }

  return (
    <div className='LHS h-full lg:w-1/2 flex flex-col'>
    <div className='texts'>
      <h3 className='txt1 text-2xl text-cyan-400 select-none whitespace-nowrap'>Secure Scan</h3>
      <p className='txt2 font-extralight lg:font-medium text-cyan-400 select-none'>Upload to scan your files</p>
      </div>
      <div className='Input_and_btn_wrapper'>
      <div className='Input_file_name lg:w-2xs w-full flex select-none cursor-pointer' onClick={fileUpload}>
        <input type='file' ref={inputRef} onChange={fileNameUpdate} className='input_field lg:w-2xs w-full'/>{fileName}
      </div>
      <div className='btn_wrapper lg:w-2xs flex'>
        <button className='scan_btn h-full active:scale-97 select-none' onClick={scanBtnClick} >{scanTxt}</button>
        <button className='clear_btn h-full lg:w-1/4 active:scale-97 select-none' onClick={clearBtnClick} >CLEAR</button>
      </div>
      </div>
    </div>
  )
}

export default Input