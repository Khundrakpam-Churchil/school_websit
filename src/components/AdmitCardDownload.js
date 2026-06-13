"use client";
import { useRef, useState } from 'react';
import { Download, Printer, X, CheckCircle, FileText } from 'lucide-react';
import AdmitCard from '@/components/AdmitCard';
import { useAuth } from '@/context/AuthContext';
import { jsPDF } from 'jspdf';

export default function AdmitCardDownload({ exam, isOpen, onClose }) {
  const cardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Demo student data - replace with actual student data from your auth system
  const { user } = useAuth() || {};
  const student = {
    id: user?.id || 1024,
    name: user?.student_name || user?.full_name || 'John Doe',
    class: user?.class_name || 'Grade 10-A',
    rollNo: user?.roll_number || '24',
    regNo: user?.reg_no || 'REG20251024',
  };

  if (!isOpen) return null;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const cardContent = cardRef.current.outerHTML; // use outerHTML to keep the AdmitCard root div styles
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Admit Card - ${exam.subject}</title>
          <style>
            @page { size: A4; margin: 0; }
            body { margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            @media print {
              .no-print { display: none !important; }
            }
          </style>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          ${cardContent}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    
    try {
      const element = cardRef.current;
      
      // Dynamically import html-to-image to avoid SSR issues
      const { toPng } = await import('html-to-image');
      
      // html-to-image struggles with CSS transforms/scaling
      // We temporarily remove the scaling class from the parent wrapper
      const wrapper = element.parentElement;
      const originalClasses = wrapper.className;
      wrapper.className = "bg-white p-4"; // Remove scaling classes
      
      // Small delay to allow browser to un-scale the element before capture
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Capture the element
      const imgData = await toPng(element, {
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      });
      
      // Restore the scaling wrapper classes
      wrapper.className = originalClasses;
      
      // A4 dimensions: 210x297mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      // Calculate height maintaining aspect ratio from pixel dimensions
      // Assuming a standard A4 ratio, but calculate exact from element
      const pdfHeight = (element.offsetHeight * pdfWidth) / element.offsetWidth;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`AdmitCard_${student.regNo}_${exam.subject.replace(/\s+/g, '_')}.pdf`);
      
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF: ' + (error.message || error));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Admit Card Preview</h2>
              <p className="text-xs text-slate-500">{exam.subject} • {exam.date}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-100">
          <div className="flex justify-center">
            <div className="scale-[0.65] origin-top transform-gpu bg-white p-4">
              {/* Attach ref directly to AdmitCard so it captures at full 1x scale without wrapper scaling issues */}
              <AdmitCard ref={cardRef} exam={exam} student={student} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Verified by Examination Office</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium text-sm hover:bg-slate-200 transition-all"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${
                downloadSuccess
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gradient-to-r from-schoolBlue to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:-translate-y-0.5'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Downloaded!
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download Admit Card
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}