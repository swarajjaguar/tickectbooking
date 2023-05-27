import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav>
            <div id="logo">
              <Link to="/homepage"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKpuy4yBagYBfZZRxvFjMoDVdzOsRY7Q57Ow&usqp=CAU" alt="" /></Link>
            </div>
            
            <div id="ticket">
           <Link to="/bus">Bus Ticket</Link>
            </div>
            <div id="ticket">
            <Link>Flight Ticket</Link>
            </div>
            <div id="ticket">
            <Link>Train Ticket</Link>
            </div>
            <div id="ticket">
            <Link>Active Tickets</Link>
            </div>
           
            <div id="profile">
            <Link to="/profile">Profile</Link>
            </div>
            <div id="ticket">
            <Link to="/homepage">HOME</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;