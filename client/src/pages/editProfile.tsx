import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../contexts/AuthContext';
import { Image } from 'react-bootstrap';
import '../index.css'
import Modal from 'react-bootstrap/Modal';


type Props = {}


const EditProfile = (props: Props) => {

  
  const { user  } = useContext(AuthContext);
  console.log('user :>> ', user);
  const [loading, setLoading] = useState(false);
  const[avatarPreview, setAvatarPreview] = useState(user?.avatar) 


  const [formData, setFormData] = useState<SubmitUpdateData>({
    email: "",
    password: "",
    username: "",
    info: "",
    avatar: ""
  });
  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('e.target :>> ', e.target.files);
    if (e.target.files) {
      const arrayURL = URL.createObjectURL(e.target.files[0]);
      setAvatarPreview(arrayURL)
      setFormData({ ...formData, avatar: e.target.files[0] })
    } else {
      setFormData({ ...formData, avatar: "" })
    }
  }
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);   ///// FUTURE SPINNER
    const user_ID = user?._id

    const myHeaders = new Headers();
    const token = localStorage.getItem("token")
    myHeaders.append("Authorization", `Bearer ${token}`);


    const submitData = new FormData();
    submitData.append("email", formData.email);
    submitData.append("username", formData.username);
    submitData.append("password", formData.password);
    submitData.append("info", formData.info);
    submitData.append("avatar", formData.avatar);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: submitData,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/update/${user_ID}`, requestOptions);
      const result = await response.json();
      console.log(result);
      alert("Success!!! User Updated");
      setLoading(false);

      
    } catch (error) {
      console.log(error)
      alert("Something went wrong - Try again...")
      setLoading(false);
    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="updateuser">
        <div className="avatar">

          <Form>

            <Image alt='User Avatar' style={{border: "black 2px solid",padding:"5px" ,borderRadius: "50%", width: "20rem", height: "auto"}} src={avatarPreview ? avatarPreview : user?.avatar} />
            <br />

          {/* eslint-disable-next-line react/jsx-pascal-case */}
          <input style={{padding: "1rem"}} placeholder='UserAvatar' type='file' name='loading...' accept= 'image/jpg, image/jpeg, image/png' onChange={handleFile} />

          </Form>

        </div>

        <div className="dataform">

              <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label >Email address</Form.Label>
                    <Form.Control type='email' name='email' placeholder={user?.email}  onChange={handleChange}/>
                    <Form.Text className="text-muted">
                      <i>Required</i><br /><br />
                    </Form.Text>

                    
                    <Form.Label >User Name:</Form.Label>
                  <Form.Control type="text"  name='username' placeholder={user?.username}  onChange={handleChange}/>
                    <Form.Text className="text-muted">
                      <i>Required</i><br /><br />
                    </Form.Text>
                  
                    <Form.Label >Personal Info:</Form.Label>
                    <Form.Control type="text"name='info' placeholder={user?.info} onChange={handleChange}/>
                    {/* <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text> */}
                  </Form.Group>
  
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <div className="botones">
                  <Button variant="dark" disabled onClick={handleShow}>
                change password
                </Button>
                  <Button variant="success" type="submit" >
                  Save
              </Button>
              
              <Modal
                    style={{height:"30rem"}}
          show={show}
          onHide={handleClose}
          backdrop="static"
                keyboard={false}
                
        >
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
                <Modal.Body>
                  
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="text-muted"><i>Old Password</i></Form.Label>
                    <Form.Control type="password" placeholder="Old Password" /> <br />
                    <Form.Label className="text-muted"><i>New Password</i></Form.Label>
                    <Form.Control type="password" placeholder="New Password" /><br />
                    <Form.Label className="text-muted"><i>Repeat New Password</i></Form.Label>
                    <Form.Control type="password" placeholder="Repeat New Password" />
                  
                  <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="success">Save</Button>
                    </Modal.Footer>
                    </Form.Group>
                  
                  </Modal.Body>
                </Modal>
            </div> 
          
          

          </Form>
        </div>


      </div>
      <div className="background-image">
        

    </div>
      
  </>
  );
}

export default EditProfile