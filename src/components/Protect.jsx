import {Navigate} from "react-router-dom"
const Protect = ({Child}) => {

    let verify=()=>{
        if(localStorage.getItem("users")==null)
        {
            return false;
        }
        else{
            return true;
        }
    }
    return ( <div>

        {
            verify()?<Child/>:<Navigate to="/LOG IN"/>
        }

    </div> );
}
 
export default Protect;