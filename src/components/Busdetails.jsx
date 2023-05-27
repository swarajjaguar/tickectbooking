import { useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import Modal from 'react-modal';
import ToasterUi from 'toaster-ui';
import PacmanLoader from "react-spinners/PacmanLoader";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  



const Busdetails = () => {

    let [loading, setLoading] = useState(true);
    const toaster = new ToasterUi();
    let[users,setUsers]=useState({})
    let[bookingdate,setbookingdate]=useState("")
    let[bus , setBus] = useState(null);
    let[seats , setSeats] = useState(1);
    let {busid} = useParams();
    let navigate= useNavigate();
  
    useEffect(()=>{
      setTimeout(()=>{
        fetch("http://localhost:4001/bus/"+busid)
        .then((res)=>{return res.json()})
        .then((bus)=>{
            setBus(bus);
            setLoading(false);

      })
    },3000)

            let data=JSON.parse(localStorage.getItem("users"))
            setUsers(data)

            let date=JSON.parse(localStorage.getItem("bookingdate"))
            setbookingdate(date)
       
    } , [])


    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
     
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    let handleBookticket=()=>{

        let activeticket={
            busname:bus.busname,
            busnumber:bus.busnumber,
            seats:seats,
            from:bus.from,
            to:bus.to,
            start:bus.start,
            end:bus.end,
            journey_time:bus.journey_time,
            price:bus.price  *seats,
            date:bookingdate
        }

        let UpdateActiveticket={
            ...users,active_bookings:[...users.active_bookings,activeticket]

        }

       
        fetch("http://localhost:4003/users/"+users.id,{
            
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body :JSON.stringify(UpdateActiveticket)


        })
        .then(()=>{
            localStorage.setItem("users" , JSON.stringify(UpdateActiveticket))
        })

        let Updatebookedseat={
            ...bus, booked_seats : Number(bus.booked_seats)+ Number(seats)

        }


        fetch("http://localhost:4001/bus/"+busid,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body :JSON.stringify(Updatebookedseat)

        })
        .then(()=>{
            toaster.addToast("ticket confirmed..get ready to explore");
            closeModal();
            navigate("/profile")
        })
    }
  


    return ( 
        <div className="bus-details">
           { loading &&<PacmanLoader color="crimson"/>}
        
            {bus && 
            <div>
                
                <div>
                <h3>Journey from <span>{bus.from}</span> to <span>{bus.to}</span> </h3>
                <h2>{bus.busname}- {bus.type}</h2>
                <p>{bus.busnumber}</p>
                <p>Total capacity : {bus.seats} </p>
                <p>Available Seats: {bus.seats - bus.booked_seats} </p>
                <p>Boarding : <span>{bus.from} - {bus.start}</span></p>
                <p>Destination : <span>{bus.to} - {bus.end}</span></p>
                <p>total hrs journey: <span>{bus.journey_time}hrs</span></p>
                <p className="price">{bus.price} Rupees  / ticket  </p>
                <input type="number" min="1" max={bus.seats - bus.booked_seats}
                value={seats} onChange={(e)=>{setSeats(e.target.value)}}/>
                <h2>Total Price - <span>{seats * bus.price}</span>  </h2>
                <button className="ticket-btn" onClick={openModal}>Book ticket</button>
                </div>
                <div className="bus">
                    
                </div>    
            </div>
            }
            {bus && <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Passenger : {users.name}</h2>
        <p>{users.phone}</p>
        <p>{bus.busname} - {bus.busnumber}</p>
        <p>Date : {bookingdate}</p>
        <p>{bus.from} - {bus.start} to {bus.to} - {bus.end}</p>
        <p>Seats selected : {seats} - Total amount{seats*bus.price} &#8377;</p>
        <input type="number" placeholder="Enter amount" required />
        <button onClick={handleBookticket} >pay</button>
      
      
      </Modal>}
        </div>
    );
}
 
export default Busdetails;