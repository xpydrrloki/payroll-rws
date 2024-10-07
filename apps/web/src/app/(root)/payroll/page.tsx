"use client"
import React from 'react';
import Girik from './components/Girik';
import ReactPDF, { PDFViewer } from '@react-pdf/renderer';

const Payroll = () => {
  return (
    <div>
      <div>
      payroll
      <PDFViewer width="1000" height="650" className="payroll"><Girik/></PDFViewer>
      </div>
    </div>
  );
};

export default Payroll;
