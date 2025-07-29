// csvParserWorker.js
importScripts('https://cdn.jsdelivr.net/npm/papaparse@5.3.0/papaparse.min.js');

self.onmessage = (e) => {
  const { file } = e.data;
  Papa.parse(file, {
    header: true,
    worker: true,
    complete: (results) => {
      self.postMessage({ data: results.data, headers: Object.keys(results.data[0] || {}) });
    },
    error: (err) => {
      self.postMessage({ error: err.message });
    }
  });
};