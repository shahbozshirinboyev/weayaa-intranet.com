import React from "react";

function Test() {
  toast.promise(
    http.post("users/staff/", formData, {
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "multipart/form-data",
      },
    }),

    {
      loading: "Adding...",

      success: (response) => {
        console.log(response);

        setState({
          firstName: "",
          lastName: "",
          image: "",
          phone: "",
          email: "",
          specialist: "",
          label: "",
          workType: "full_time",
          address: "",
          accountType: "staff",
          userId: "",
          userPassword: "",
        });
        setWorkDays([true, true, true, true, true, false, false]);
        document.getElementById("add_user_modal").close();
        setFormNo(formArray[0]);

        return <b>Add new User!</b>;
      },
      error: (error) => {
        console.log(error.response.data);

        return <b>Something went wrong :(</b>;
      },
    }
  );

  return <div>Test</div>;
}

export default Test;
