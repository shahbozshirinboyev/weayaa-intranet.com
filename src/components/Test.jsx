import React from "react";

function Test() {
  
  toast.promise(
    
    http.post(

      "users/announcements/",
      {
        'title': newDashboardTitle.current.value,
        'description': newDashboardDescription.current.value,
      },
      { headers }
    )
    
    ,
    {
      loading: "Yuklanayabdi...",

      success: (response) => {
        console.log(response);

        newDashboardTitle.current.value = "";
        newDashboardDescription.current.value = "";
        fetchDashboards();

        return <b>Yangi dashboard yuklandi :)</b>;
      },
      error: (error) => {
        console.log(error.response.data);
        return <b>Yangi dashboard yuklanmadi :(</b>;
      },
    }
  );

  return <div>Test</div>;
}

export default Test;
