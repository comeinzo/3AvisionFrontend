// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import store from './app/store';
// import App from './App';
// import { BrowserRouter as Router } from 'react-router-dom';

// ReactDOM.render(
//     <Provider store={store}>
//         <Router>
//             <App />
//         </Router>
//     </Provider>,
//     document.getElementById('root')
// );




import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// Get the root element
const rootElement = document.getElementById('root');

// Create a root and render the app
const root = ReactDOM.createRoot(rootElement);
root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);




