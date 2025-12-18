import React, { useState } from 'react';

const useLoading = () => {
   const [reqLoading, setReqLoading] = useState(false);
   return { reqLoading, setReqLoading };
};

export default useLoading;
