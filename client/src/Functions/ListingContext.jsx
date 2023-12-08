import { createContext, useState } from 'react';


export const ListingContext = createContext();

export const ListingProvider = ({ children }) => {
  const [requestData, setRequestData] = useState({});

  return (
    <ListingContext.Provider value={{ requestData, setRequestData }}>
      {children}
    </ListingContext.Provider>
  );
};
