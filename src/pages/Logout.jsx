import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Logout({ setAccess, setRefresh, setUserType }) {

  const navigate = useNavigate();
  const deleteUserInfo = () => {
    toast('Good Bye!', {icon: '👋',});
    setAccess(null);
    setRefresh(null);
    setUserType(null);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('userType');
    navigate('/');
  }

  return (
      <div className="w-full flex justify-center items-center">
        <div className="rounded-[10px] w-[400px] bg-custom-green-5">
          <span className="block text-center">
            <i className="bi bi-box-arrow-right text-custom-green-80 text-[50px]"></i>
          </span>
          <p className="text-center text-[20px] text-custom-green-80 font-semibold">
          Are you sure you want to Logout?
          </p>
          <span className="block text-center py-6">
              <button onClick={deleteUserInfo} className="w-[100px] h-[40px] bg-custom-green-15 rounded-[5px] text-custom-green-dark font-semibold hover:text-white hover:bg-custom-green-dark transition-all duration-150">Yes</button>
          </span>
        </div>
      </div>
  );
}

export default Logout;
