import { useState, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
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
    blob?: Blob;
}

const PAGE_FORMATS = {
    a4: [210, 297],
    a3: [297, 420],
    letter: [216, 279],
    legal: [216, 356],
} as const;

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

        let canvas: HTMLCanvasElement | null = null;
        let pdf: jsPDF | null = null;

        try {
            setIsGenerating(true);
            setError(null);
            setProgress(10);

            // Prepare element for capture
            const element = refObject.current!;
            const originalOverflow = element.style.overflow;
            const originalMaxHeight = element.style.maxHeight;

            // Store original styles
            const originalStyles = {
                overflow: element.style?.overflow,
                maxHeight: element.style?.maxHeight,
                height: element.style?.height,
            };
            
            // Temporarily remove scroll constraints for full capture
            element.style.overflow = 'visible';
            // element.style.maxHeight = 'none';

            setProgress(25);


            // Generate canvas with optimized settings
            canvas = await html2canvas(element, {
                scale: Math.min(scale, 3), // Limit scale to prevent memory issues
                useCORS: true,
                allowTaint: false,
                backgroundColor,
                logging: false,
                width: element.scrollWidth,
                height: element.scrollHeight,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight,
                onclone: (clonedDoc) => {
                    // Ensure all images are loaded in cloned document
                    const images = clonedDoc.querySelectorAll('img');
                    images.forEach(img => {
                        if (img.loading) img.loading = 'eager';
                    });
                }
            });

            // Restore original styles
            Object.assign(element.style, originalStyles);

            setProgress(50);

            // Create PDF
            pdf = new jsPDF({
                orientation,
                unit: 'mm',
                format,
                compress: true,
            });

            const [pageWidthMM, pageHeightMM] = PAGE_FORMATS[format];
            const pageWidth = orientation === 'portrait' ? pageWidthMM : pageHeightMM;
            const pageHeight = orientation === 'portrait' ? pageHeightMM : pageWidthMM;

            const contentWidth = pageWidth - (margin * 2);
            const headerFooterSpace = (includeDate ? 10 : 0) + (customHeader ? 8 : 0) + (customFooter ? 8 : 0);
            const contentHeight = pageHeight - (margin * 2) - headerFooterSpace;

            // Calculate image dimensions
            const imgData = canvas.toDataURL('image/jpeg', quality);
            const imgAspectRatio = canvas.width / canvas.height;
            const pageAspectRatio = contentWidth / contentHeight;

            setProgress(70);

            if (multiPage && imgAspectRatio < pageAspectRatio && canvas.height > canvas.width * (contentHeight / contentWidth)) {
                // Multi-page handling for tall content
                await handleMultiPage(pdf, canvas, imgData, {
                    pageWidth, pageHeight, contentWidth, contentHeight, margin,
                    quality, customHeader, customFooter, includeDate
                });
            } else {
                // Single page handling
                await handleSinglePage(pdf, imgData, canvas, {
                    pageWidth, pageHeight, contentWidth, contentHeight, margin,
                    fitToPage, customHeader, customFooter, includeDate
                });
            }

            setProgress(90);

            // Generate blob for preview or download
            const pdfBlob = pdf.output('blob');

            // Download the PDF
            pdf.save(fileName);

            setProgress(100);
            toast.success('PDF generated successfully! 📄');

            return { success: true, fileName, blob: pdfBlob };

        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to generate PDF';
            toast.error(`PDF generation failed: ${errorMessage}`);
            setError(errorMessage);
            console.error('PDF generation error:', err);
            return { success: false, error: errorMessage };
        } finally {
            // Cleanup
            if (canvas) {
                canvas.remove();
            }
            setIsGenerating(false);
            setTimeout(() => setProgress(0), 1000);
        }
    }, []);

    const generatePdfPreview = useCallback(async (
        options: IPdfExportOptions
    ): Promise<string | null> => {
        try {
            const result = await generatePdf(options);
            if (result.success && result.blob) {
                return URL.createObjectURL(result.blob);
            }
            return null;
        } catch (err) {
            console.error('PDF preview error:', err);
            return null;
        }
    }, [generatePdf]);

    const resetError = useCallback(() => {
        setError(null);
    }, []);

    return {
        generatePdf,
        generatePdfPreview,
        isGenerating,
        progress,
        error,
        resetError,
    };
};

// Helper function for multi-page PDF generation
async function handleMultiPage(pdf: jsPDF, canvas: HTMLCanvasElement, imgData: string, config: any) {
    const { pageWidth, pageHeight, contentWidth, contentHeight, margin, quality, customHeader, customFooter, includeDate } = config;

    const pageCanvasHeight = Math.floor(canvas.width * (contentHeight / contentWidth));
    const totalPages = Math.ceil(canvas.height / pageCanvasHeight);

    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d')!;
    tempCanvas.width = canvas.width;
    tempCanvas.height = pageCanvasHeight;

    for (let i = 0; i < canvas.height; i += pageCanvasHeight) {
        if (i > 0) pdf.addPage();

        const remainingHeight = canvas.height - i;
        const actualPageHeight = Math.min(pageCanvasHeight, remainingHeight);

        // Adjust canvas height for the last page
        if (actualPageHeight < pageCanvasHeight) {
            tempCanvas.height = actualPageHeight;
        }

        // Clear and draw page section  
        ctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        ctx.drawImage(canvas, 0, i, canvas.width, actualPageHeight, 0, 0, canvas.width, actualPageHeight);

        const pageImgData = tempCanvas.toDataURL('image/jpeg', quality);
        const currentPage = Math.floor(i / pageCanvasHeight) + 1;

        // Calculate the proper height for this page's content
        const pageContentHeight = (actualPageHeight * contentWidth) / canvas.width;

        addPageContent(pdf, pageImgData, currentPage, totalPages, {
            pageWidth, pageHeight, contentWidth, contentHeight: pageContentHeight, margin,
            customHeader, customFooter, includeDate
        });
    }

    tempCanvas.remove();
}

// Helper function for single-page PDF generation
async function handleSinglePage(pdf: jsPDF, imgData: string, canvas: HTMLCanvasElement, config: any) {
    const { pageWidth, pageHeight, contentWidth, contentHeight, margin, fitToPage, customHeader, customFooter, includeDate } = config;

    let finalWidth = contentWidth;
    let finalHeight = (canvas.height * contentWidth) / canvas.width;

    if (fitToPage && finalHeight > contentHeight) {
        finalHeight = contentHeight;
        finalWidth = (canvas.width * contentHeight) / canvas.height;
    }

    addPageContent(pdf, imgData, 1, 1, {
        pageWidth, pageHeight, contentWidth: finalWidth, contentHeight: finalHeight, margin,
        customHeader, customFooter, includeDate, centerHorizontally: true
    });
}

// Helper function to add content to PDF page
function addPageContent(pdf: jsPDF, imgData: string, currentPage: number, totalPages: number, config: any) {
    const { pageWidth, pageHeight, contentWidth, contentHeight, margin, customHeader, customFooter, includeDate, centerHorizontally = false } = config;

    let yOffset = margin;

    // Add header
    if (customHeader) {
        pdf.setFontSize(12);
        pdf.setTextColor(60, 60, 60);
        pdf.text(customHeader, margin, yOffset + 5);
        yOffset += 10;
    }

    // Add image
    const xPos = centerHorizontally ? margin + (contentWidth - contentWidth) / 2 : margin;
    pdf.addImage(imgData, 'JPEG', xPos, yOffset, contentWidth, contentHeight, undefined, 'FAST');

    // Add footer
    if (includeDate || customFooter || totalPages > 1) {
        pdf.setFontSize(10);
        pdf.setTextColor(120, 120, 120);

        const footerY = pageHeight - 8;

        if (includeDate) {
            const date = new Date().toLocaleDateString();
            pdf.text(date, margin, footerY);
        }

        if (customFooter) {
            pdf.text(customFooter, pageWidth / 2, footerY, { align: 'center' });
        }

        if (totalPages > 1) {
            pdf.text(`${currentPage} / ${totalPages}`, pageWidth - margin, footerY, { align: 'right' });
        }
    }
}

export default usePdfExport;
