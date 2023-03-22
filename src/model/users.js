import React, {useEffect, useState} from 'react';

function Users(){

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMobileAppUsers = async () => {
    try {
      const response = await fetch('https://app.xclusiveafrikstyles.com/Auth/get_appUsers');
      const json = await response.json();
      setData(json.app_users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMobileAppUsers();
  }, []);


}

export default Users;