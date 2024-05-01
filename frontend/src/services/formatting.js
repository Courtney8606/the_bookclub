const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      timeZone: 'UTC' 
    };
    return date.toLocaleDateString('en-UK', options);
  };
  

  export {formatDate}