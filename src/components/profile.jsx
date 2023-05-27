import {useState,useEffect} from "react"
import {useNavigate} from "react-router-dom"
import Modal from 'react-modal';

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
const Profile = () => {
     //MODAL FOR ACTIVE BOOKING   
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  //MODAL FOR ACTIVE BOOKING  
  
   //MODAL FOR ACTIVE BOOKING   
   let subtitle1;
   const [modalIsOpen1, setIsOpen1] = useState(false);
 
   function openModal1() {
     setIsOpen1(true);
   }
 
   function afterOpenModal1() {
     // references are now sync'd and can be accessed.
     subtitle1.style.color = '#f00';
   }
 
   function closeModal1() {
     setIsOpen1(false);
   }
    let[userdetails,setUserdeatils]=useState(null)
    let navigate = useNavigate();


    useEffect(()=>{
        let userdetails=JSON.parse(localStorage.getItem("users"))
        setUserdeatils(userdetails)
    },[])

    let logout=(()=>{
        localStorage.removeItem("users")
        alert("Logout successfully")
        navigate("/LOG IN")

    })

    let deleteaccount=(()=>{

        let pwd=prompt("are you sure to delete, if yes please provide password")
        if(pwd!=userdetails.password)
        {
            alert("invalid password")
            return;
        }
        
        fetch("http://localhost:4003/users/"+userdetails.id,{
            method:"DELETE"

        })
        .then(()=>{
            localStorage.removeItem("users")
            navigate("/")})
        alert("account is deleted")
        localStorage.removeItem("users")

    })

    return ( 
        <div className="profile">
            
   {userdetails && <div className="user-details">
       <div className="cover-page">
       <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D&w=1000&q=80" alt="" />
            </div>
       <div className="profiledetails">
        <img src="https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=2000" alt="" />
        <h1>{userdetails.name}</h1>
        <button onClick={logout}>Logout</button>
        <button onClick={deleteaccount}>Delete accout</button>

       </div>
       <div>
        <p>{userdetails.phno}</p>
        <p>{userdetails.email}</p>
        <p>Total booking : {userdetails.active_bookings.length + userdetails.previous_bookings.length}</p>
                <p>Active booking : <button onClick={openModal}>View</button> </p>
                <p>Previous booking : <button onClick={openModal1}>View</button> </p>
       
       </div>
       <button>Edit profile</button>
    </div>}
    
       { <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal" >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Active tickets</h2>
            <div className="active-ticket-card">
                {userdetails &&
                    userdetails.active_bookings.map((ticket,i)=>{
                        return(
                            <div className="ticket">
                                <p>{i+1}</p>
                                <p>Bus:{ticket.busname} - </p>
                                <p>{ticket.date}</p>
                                    <p>{ticket.from}:{ticket.start} - {ticket.to}:{ticket.end}</p>
                                    <p>{ticket.seats}</p>
                            </div>
                        )

                    })
                }
            </div>
            <button onClick={closeModal}>close</button>
        
        </Modal>}
        {userdetails && 
        <Modal
        isOpen={modalIsOpen1}
        onAfterOpen={afterOpenModal1}
        onRequestClose={closeModal1}
        style={customStyles}
        contentLabel="Example Modal">
            <h2 ref={(_subtitle) => (subtitle1 = _subtitle)}>Previous tickets</h2>
            <div className="active-ticket-card">
                {userdetails &&
                    userdetails.previous_bookings.map((ticket ,i)=>{
                        return(
                            <div className="ticket">
                                <p>{i+1}</p>
                                <p>Bus : {ticket.busname} - {ticket.busnumber} </p>
                                <p>{ticket.date}</p>
                                <p>{ticket.from}:{ticket.start} - {ticket.to}:{ticket.end}</p>
                                <p>{ticket.seats}</p>
                            </div>
                        )
                    })
                }
            </div>
            <button onClick={closeModal1}>close</button>
        </Modal>}




        </div>
     );
}
 
export default Profile;