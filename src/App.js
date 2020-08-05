import './App.css';
import Post from './Post'
import React,{useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button,FormControl, Input, InputLabel, ButtonGroup } from '@material-ui/core';
import './Navbar.css'
import Uploading from './Uploading'
import {auth} from './firebase';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';



const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #a39f9f33',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    list: {
        width: 250,
      },
      fullList: {
        width: 'auto',
      },
  }));

function App() {


    const classes = useStyles();
    const [opensd, setOpen1] = useState(false);
    const [openin, setOpenin] = useState(false);

    const handleOpen1 = () => {
    setOpen1(true);
    };

    const handleClose1 = () => {
    setOpen1(false);
    };

    const handleOpenin = () => {
        setOpenin(true);
    };

    const handleClosein = () => {
        setOpenin(false);
    };


    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
        className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        //   onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        >
            <Uploading username={user.displayName} />
        </div>
    );







    // AUTHETICATION
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [name, setname] = useState('');
    const [user, setuser] = useState(null)
    const [disname ,setdisname] = useState('')

    const [loginemail, setloginemail] = useState('');
    const [loginpassword, setloginpassword] = useState('');
    console.log('this is user man',user)

    useEffect(() => {
        auth.onAuthStateChanged((authuser) => {
            if (authuser){
                // user is logged in ....
                // console.log(authuser)
                setuser(authuser)

                
            }
            else {
                // user is looged out ....
                setuser(null)
            }

        })
    }, [user,name])








    const authenticate =(event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email,password)
        .then((authuser) => {
            authuser.user.updateProfile({
                displayName: name
            })
        })
        .catch((error) => alert(error.message))
        .then(() => auth.signOut())
        handleClose1();
    }
    




    const signin = () => {
        auth.signInWithEmailAndPassword(loginemail, loginpassword)
        .catch((error) => alert(error))
        handleClosein()
    }

    return (
        <div className="App">


        {/* ADDING AUTHETICATION */}

        <div className="Navbar" >
                <div className="Navbar__image" >
                    <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/>
                </div>
                
                {/* SHOWING BUTTONS */}
                <div className="Navbar__signup">
                {user != null ? <Button variant="contained" color="secondary" onClick={() => auth.signOut()}>Log out</Button> :
                    <div >
                    <Button variant="contained" color="secondary" onClick={handleOpen1}  >Sign up</Button>
                    <Button variant="contained" color="primary" onClick={handleOpenin} >Sign in</Button>
                    </div>
                }
                    
                    
                    {/* SIGNUP MODEL */}
                    <Modal
                    aria-labelledby="signup-title"
                    aria-describedby="signup-description"
                    className={classes.modal}
                    open={opensd}
                    onClose={handleClose1}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={opensd}>
                    <div className={classes.paper}>
                        <div className="signup__form">
                            <div className="signup__tag" >
                                <div>
                                     <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/>
                                </div>
                                <div>
                                    SIGNUP
                                </div>
                            </div>
                            <FormControl>
                                <InputLabel>Email address</InputLabel>
                                <Input type="Email" value={email} onChange={val => setemail(val.target.value)} required />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Name</InputLabel>
                                <Input id="my-name" value={name} onChange= {val => setname(val.target.value)} required />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Password</InputLabel>
                                <Input type="password" value={password} onChange={val => setpassword(val.target.value)} required/>
                            </FormControl>
                            <Button  variant="contained" color="secondary" onClick={authenticate} >
                                SIGN UP
                            </Button>
                            
                        </div>
                    </div>
                    </Fade>
                </Modal>

                {/* SIGN MODEL */}
                <Modal
                    aria-labelledby="signin-title"
                    aria-describedby="signin-description"
                    className={classes.modal}
                    open={openin}
                    onClose={handleClosein}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={openin}>
                    <div className={classes.paper}>
                        <div className="signup__form">
                            <div className="signup__tag" >
                                <div>
                                     <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/>
                                </div>
                                <div>
                                    LOGIN
                                </div>
                            </div>
                            <FormControl>
                                <InputLabel>Email address</InputLabel>
                                <Input type="Email" value={loginemail} onChange={val => setloginemail(val.target.value)} />
                            </FormControl>
                            <FormControl>
                                <InputLabel>Password</InputLabel>
                                <Input type="password" value={loginpassword} onChange={val => setloginpassword(val.target.value)} />
                            </FormControl>
                            <Button variant="contained" color="secondary" onClick={signin} >
                                LOG IN
                            </Button>
                        </div>
                    </div>
                    </Fade>
                </Modal>
            </div>

            {/* ADDING IMAGE INTO THE FIREBASE STORAGE */}
            {user?
            <div>
            {['bottom'].map((anchor) => (
                <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer('bottom', true)} variant="contained" color="primary">UPLOAD</Button>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                    {list(anchor)}
                </Drawer>
                </React.Fragment>
            ))}
           </div>:""}
        </div>



 
          
      






      {/* PUTTING POST */}
      <div className="App__Post">
        {user ? <Post username={user.displayName} />: <Post/> }
      </div>
    </div>
  );
}

export default App;
