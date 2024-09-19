import AddStaff from "../../../components/AddStaff";
import http from "../../../services/http";

function ControlStaffs() {
  
  const access = localStorage.getItem("access");
  // const array = [true, false, true, false, true, false, true];
  const array = [true];

  const newuser = () => {

    const formData = new FormData();
    formData.append("weayaa_id", "username123");
    formData.append("password", "user");
    formData.append("first_name", "user");
    formData.append("last_name", "user");
    formData.append("label", "");
    formData.append("phone_number", "phone123");
    formData.append("email", "");
    formData.append("speciality[name]", "");
    formData.append("work_type", "full_time");
    formData.append("address", "");
    formData.append("image", "");
    formData.append("work_days", array);
    formData.append("user_type", "staff");

    // telfon raqam takrorlanishi mumkin emas, weayaa id takrorlanishi mumkin emas
    // work days faqat bitta qiymatni qabul qilyabdi true yoki false

    http
      .post("users/staff/", formData, {
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data);
        // aniq xatolikni ko'rish uchun doim shunday qiymaydan foydalanish kerak 
        // serverdan kelayotgan xatolik sizga tezroq muammoni to'g'irlashda yordam beradi
      });
      
  };

  return (
    <>
      <button onClick={newuser} className="btn">
        POST
      </button>
      <br />
      <br />
      <div>
      <AddStaff />
      </div>
    </>
  );
}

export default ControlStaffs;
