import { useState, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF, jsPDFOptions } from 'jspdf';
import toast from 'react-hot-toast';

export interface IPdfExportOptions {
    fileName?: string;
    format?: 'a4' | 'a3' | 'letter' | 'legal';
    orientation?: 'portrait' | 'landscape';
    quality?: number;
    scale?: number;
    margin?: number;
    backgroundColor?: string;
    refObject: React.RefObject<HTMLElement | null>;
    multiPage?: boolean;
    fitToPage?: boolean;
    includeDate?: boolean;
    customHeader?: string;
    customFooter?: string;
}

export interface IPdfExportResult {
    success: boolean;
    fileName?: string;
    error?: string;
}

const usePdfExport = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    const generatePdf = useCallback(async (options: IPdfExportOptions): Promise<IPdfExportResult> => {
        if (!options.refObject?.current) {
            const errorMsg = 'No component reference found';
            toast.error(errorMsg);
            setError(errorMsg);
            return { success: false, error: errorMsg };
        }

        const {
            fileName = `document-${new Date().toISOString().split('T')[0]}.pdf`,
            format = 'a4',
            orientation = 'portrait',
            quality = 0.95,
            scale = 4,
            margin = 10,
            backgroundColor = '#ffffff',
            refObject,
            multiPage = true,
            fitToPage = true,
            includeDate = true,
            customHeader,
            customFooter,
        } = options;

        try {
            setIsGenerating(true);
            setError(null);
            setProgress(10);

            // Prepare element for capture
            const element = refObject.current!;
            const originalOverflow = element.style.overflow;
            const originalMaxHeight = element.style.maxHeight;
            
            // Temporarily remove scroll constraints for full capture
            element.style.overflow = 'visible';
            element.style.maxHeight = 'none';

            setProgress(25);

            // Convert component to canvas with better options
            const canvas = await html2canvas(element, {
                scale,
                useCORS: true,
                allowTaint: true,
                backgroundColor,
                logging: false,
                width: element.scrollWidth,
                height: element.scrollHeight,
                scrollX: 0,
                scrollY: 0,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight,
            });

            // Restore original styles
            element.style.overflow = originalOverflow;
            element.style.maxHeight = originalMaxHeight;

            setProgress(50);

            // Create PDF with proper dimensions
            const pdf = new jsPDF({
                orientation,
                unit: 'mm',
                format,
                compress: true,
            } as jsPDFOptions);

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const contentWidth = pageWidth - (margin * 2);
            const contentHeight = pageHeight - (margin * 2) - (includeDate ? 15 : 0) - (customHeader ? 10 : 0) - (customFooter ? 10 : 0);

            // Calculate image dimensions
            const imgData = canvas.toDataURL('image/png', quality);
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            setProgress(70);

            if (multiPage && imgHeight > imgWidth * (contentHeight / contentWidth)) {
                // Multi-page PDF for long content
                const pageCanvas = document.createElement('canvas');
                const pageCtx = pageCanvas.getContext('2d')!;
                
                pageCanvas.width = imgWidth;
                const pageCanvasHeight = Math.floor(imgWidth * (contentHeight / contentWidth));
                pageCanvas.height = pageCanvasHeight;

                const totalPages = Math.ceil(imgHeight / pageCanvasHeight);
                let currentPage = 0;

                for (let i = 0; i < imgHeight; i += pageCanvasHeight) {
                    if (currentPage > 0) {
                        pdf.addPage();
                    }

                    // Clear canvas
                    pageCtx.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
                    
                    // Draw portion of original canvas
                    pageCtx.drawImage(
                        canvas,
                        0, i, imgWidth, Math.min(pageCanvasHeight, imgHeight - i),
                        0, 0, imgWidth, Math.min(pageCanvasHeight, imgHeight - i)
                    );

                    const pageImgData = pageCanvas.toDataURL('image/png', quality);
                    
                    // Add header
                    if (customHeader) {
                        pdf.setFontSize(12);
                        pdf.setTextColor(100);
                        pdf.text(customHeader, margin, margin - 5);
                    }

                    // Add image
                    pdf.addImage(
                        pageImgData,
                        'PNG',
                        margin,
                        margin + (customHeader ? 5 : 0),
                        contentWidth,
                        Math.min(contentHeight, (imgHeight - i) * (contentWidth / imgWidth)),
                        undefined,
                        'FAST'
                    );

                    // Add page number and date
                    if (includeDate || customFooter) {
                        pdf.setFontSize(10);
                        pdf.setTextColor(150);
                        
                        if (includeDate) {
                            const date = new Date().toLocaleDateString();
                            pdf.text(date, margin, pageHeight - 5);
                        }
                        
                        if (customFooter) {
                            pdf.text(customFooter, pageWidth / 2, pageHeight - 5, { align: 'center' });
                        }
                        
                        // Page number
                        pdf.text(
                            `${currentPage + 1} / ${totalPages}`,
                            pageWidth - margin,
                            pageHeight - 5,
                            { align: 'right' }
                        );
                    }

                    currentPage++;
                    setProgress(70 + (currentPage / totalPages) * 20);
                }
            } else {
                // Single page or fit-to-page PDF
                let finalWidth = contentWidth;
                let finalHeight = (imgHeight * contentWidth) / imgWidth;

                if (fitToPage && finalHeight > contentHeight) {
                    finalHeight = contentHeight;
                    finalWidth = (imgWidth * contentHeight) / imgHeight;
                }

                // Add header
                if (customHeader) {
                    pdf.setFontSize(12);
                    pdf.setTextColor(100);
                    pdf.text(customHeader, margin, margin - 5);
                }

                // Add image
                pdf.addImage(
                    imgData,
                    'PNG',
                    margin + (contentWidth - finalWidth) / 2, // Center horizontally
                    margin + (customHeader ? 5 : 0),
                    finalWidth,
                    finalHeight,
                    undefined,
                    'FAST'
                );

                // Add footer
                if (includeDate || customFooter) {
                    pdf.setFontSize(10);
                    pdf.setTextColor(150);
                    
                    if (includeDate) {
                        const date = new Date().toLocaleDateString();
                        pdf.text(date, margin, pageHeight - 5);
                    }
                    
                    if (customFooter) {
                        pdf.text(customFooter, pageWidth / 2, pageHeight - 5, { align: 'center' });
                    }
                }
            }

            setProgress(90);

            // Save the PDF
            pdf.save(fileName);
            
            setProgress(100);
            toast.success('PDF generated successfully!');

            return { success: true, fileName };

        } catch (err: any) {
            const errorMessage = err.message || 'Failed to generate PDF';
            toast.error(errorMessage);
            setError(errorMessage);
            console.error('PDF generation error:', err);
            return { success: false, error: errorMessage };
        } finally {
            setIsGenerating(false);
            setTimeout(() => setProgress(0), 1000); // Reset progress after 1 second
        }
    }, []);

    const generatePdfPreview = useCallback(async (options: IPdfExportOptions): Promise<string | null> => {
        try {
            // Same logic as generatePdf but return blob URL instead of saving
            // This is useful for preview functionality
            const result = await generatePdf({ ...options, fileName: 'preview.pdf' });
            if (result.success) {
                // Return blob URL for preview (implementation depends on your needs)
                return 'blob-url-here';
            }
            return null;
        } catch (err) {
            console.error('PDF preview error:', err);
            return null;
        }
    }, [generatePdf]);

    return {
        generatePdf,
        generatePdfPreview,
        isGenerating,
        progress,
        error,
        resetError: () => setError(null),
    };
};

export default usePdfExport;