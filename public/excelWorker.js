// // // public/xlsxWorker.js

// // self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js');

// // self.onmessage = function (e) {
// //   const data = e.data;
// //   try {
// //     const workbook = XLSX.read(data, { type: 'array' });
// //     self.postMessage({ success: true, sheetNames: workbook.SheetNames });
// //   } catch (err) {
// //     self.postMessage({ success: false, error: err.message });
// //   }
// // };

// // public/xlsxWorker.js
// self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js');

// self.onmessage = function (e) {
//   const data = e.data;
//   try {
//     const workbook = XLSX.read(data, { type: 'array', bookSheets: true, sheetStubs: true });
//     self.postMessage({ success: true, sheetNames: workbook.SheetNames });
//   } catch (err) {
//     self.postMessage({ success: false, error: err.message });
//   }
// };

// xlsxWorker.js
self.onmessage = function (e) {
  const { buffer, sheetName } = e.data;
  try {
    const workbook = XLSX.read(buffer, { type: 'array' });

    if (sheetName) {
      const ws = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(ws, { defval: '' });
      self.postMessage({ success: true, data });
    } else {
      self.postMessage({ success: true, sheetNames: workbook.SheetNames });
    }
  } catch (err) {
    self.postMessage({ success: false, error: err.message });
  }
};
