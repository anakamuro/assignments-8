const put = jest.fn(() => {
    const getDownloadURL = function () {};
    const ref = (function () {
      return { getDownloadURL };
    })();
    const snapshot = (function () {
      return { ref };
    })();
    return Promise.resolve(snapshot);
  });
  
  const ref = jest.fn(() => {
    return { put };
  });
  
  const storage = (function () {
    return { ref };
  })();

  const bills = () => ({
    async add(bill) {
        
    } 
  })
  
  export const firestore = (function () {
    return { storage, bills };
  })();