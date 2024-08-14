import React, { useEffect, useState } from 'react';
import "./navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton } from '@mui/material';
import Rightheader from './Rightheader';
import { makeStyles } from '@material-ui/core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';

import Menu from '@mui/material/Menu';
import {NavLink, useNavigate} from 'react-router-dom';
import { LoginContext}  from '../context/ContextProvider';
import { useContext}  from 'react';
import {useSelector} from 'react-redux';


const Navbaar = () => {


    // const send = ()=>{
    //     if(account){
    //         history("/buynow") // ye dusra tarika hai
    //     }
    // }

    const {account,setAccount} = useContext(LoginContext);
    // console.log(account);

    const history = useNavigate();

    const [anchorE1, setAnchorE1] = useState(null);
    const open = Boolean(anchorE1);
    const handleClick = (event) =>{
        setAnchorE1(event.currentTarget);

    };
    const handleClose = () => {
        setAnchorE1(null);
    }

    const [text,setText] = useState("");
    console.log(text);
    const [liopen,setLiopen] = useState(true);
    const { products } = useSelector(state => state.getproductsdata);

    const [dropen,setDropen] = useState(false);

    const getdetailvaliduser = async()=>{
        const res = await fetch("/validuser",{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type": "application/json"
            },
            credentials:"include"
        })

        const data = await res.json();
        // console.log(data);

        if(res.status != 201){
            console.log("error");
        }else{
            console.log("data valid");
            setAccount(data);
            history("/");
        }

    };

    const handelopen = ()=>{
        setDropen(true);
    }

    const handledrclose = ()=>{
        setDropen(false);
    }


    const logoutuser = async()=>{
        const res2 = await fetch("/lougout",{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type": "application/json"
            },
            // credentials:"include"
        })

        const data2 = await res2.json();
        // console.log(data2);

        if(res2.status != 201){
            console.log("error");
        }else{
            console.log("data valid");
            // alert("logout");
            toast.success("User Logout", {
                position: "top-center"
            });
            history("/")
            setAccount(false);
            
        }

    };

    const getText = (items)=>{
        setText(items);
        setLiopen(false);
    }

    useEffect(()=>{
        getdetailvaliduser()
    },[])

    return (
        <>
            <header>
                <nav>
                    <div className='left'>


                    <IconButton className="hamburgur" onClick={handelopen}>
                        <MenuIcon style={{ color: "#fff" }} />
                    </IconButton>
                        {/* here define the right header */}
                    <Drawer open={dropen} onClose={handledrclose} >
                        <Rightheader logoutuser={logoutuser} logclose={handledrclose} />
                    </Drawer>

                        <div className="navlogo" >
                        <NavLink to="/"> <img src="./amazon_PNG25.png" alt="" /></NavLink>
                        </div> 
                        <div className='nav_searchbaar'>
                        <input type='text' name='' 
                        onChange={(e)=>getText(e.target.value)}
                        placeholder='Search your products'
                        id=''/>
                        <div className='search_icon'>
                            <SearchIcon id="search"/>
                        </div>

                        {/* search filter */}

                        {
                            text && 
                            <List className='extrasearch' hidden={liopen}>
                                {
                                    products.filter(product=>product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
                                        <ListItem>
                                        <NavLink to={`/getproductsone/${product.id}`} onClick={()=>setLiopen(true)}>
                                            {product.title.longTitle}
                                        </NavLink>
                                            
                                        </ListItem>
                                    ))
                                }
                            </List>
                        }


                        </div>
                    </div>
                    

                    <div className='right'>
                        <div className='nav_btn'>
                            <NavLink to="/login">signin</NavLink>
                        </div>
                        <div className='cart_btn'>

                        {
                            account ? <NavLink to="/buynow">
                        <Badge badgeContent={account.carts.length} color="primary">
                                <ShoppingCartIcon id="icon"/>
                            </Badge>
                        </NavLink> : <NavLink to="/login">
                        <Badge badgeContent={0} color="primary">
                                <ShoppingCartIcon id="icon"/>
                            </Badge>
                        </NavLink>
                        }
                        
                            <ToastContainer/>
                            
                            <p>Cart</p>
                        </div>
                        {
                            account ? <Avatar className='avtar2'
                                id="basic-button"
                                aria-controls = {open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >{account.fname[0].toUpperCase()}</Avatar> : <Avatar className='avtar'
                                id="basic-button"
                                aria-controls = {open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            ></Avatar> 
                        }

                        
                        <Menu 
                            id="basic-menu"
                            anchorEl={anchorE1}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby' : 'basic-button'
                            }}
                        >
                            
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            {
                                account ? <MenuItem  onClick={logoutuser} ><LogoutIcon style={{fontSize:16,marginRight:3}}/>Logout</MenuItem> : ""
                            }
                            
                        </Menu>

                        
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Navbaar;