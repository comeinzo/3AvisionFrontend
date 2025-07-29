import React from 'react';
 
 const ErrorMessage = ({ message }) => {
   return (
     <div className="error-message" style={{ color: "red", marginTop: "10px" }}>
       {message}
     </div>
   );
 };
 
 export default ErrorMessage;