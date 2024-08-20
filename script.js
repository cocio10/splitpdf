document.getElementById('split-btn').addEventListener('click', async function () {
    const input = document.getElementById('pdf-upload');
    if (input.files.length === 0) {
        alert('Please upload a PDF file first.');
        return;
    }

    const file = input.files[0];
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);

    const totalPages = pdfDoc.getPageCount();
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    for (let i = 0; i < totalPages; i++) {
        const newPdf = await PDFLib.PDFDocument.create();
        
        const page = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(page[0]);

        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);

        // Creazione dell'iframe per visualizzare il PDF
        const iframe = document.createElement('iframe');
        iframe.src = blobUrl;
        iframe.width = '40%';
        iframe.height = '500px';
        iframe.style.border = '10px solid black';
        outputDiv.appendChild(iframe);
    }
});
