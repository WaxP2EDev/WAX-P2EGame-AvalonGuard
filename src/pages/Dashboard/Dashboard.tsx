import {useState} from "react";
import * as waxjs from "@waxio/waxjs/dist";
import { Grid, Box, Button } from '@mui/material';
import "./Dashboard.css";
export const Dashboard = () => {
  const [loginFlag, setLogin] = useState(true);
  const [walletAddress, setWalletAddress] = useState("");
  const endpoint = "https://9ce70.playfabapi.com/Server/ExecuteCloudScript";
  let wallet_userAccount = "";
  let display_nft = false;
  let loggedIn = false;
  const schema = "soldiers";
  const wax = new waxjs.WaxJS({
      rpcEndpoint: endpoint
  });
  const main = async () => {
    
    if (loggedIn) {
       console.log("Successfully login");
    } else
        await autoLogin(); 
  }

  const autoLogin = async() => {
      let isAutoLoginAvailable = await wax.isAutoLoginAvailable();
      if (isAutoLoginAvailable) {
          wallet_userAccount = wax.userAccount;
          loggedIn = true;
          await main();
        }
  }
  const login = async ()  => {
      try {
          if (!loggedIn) {
              wallet_userAccount = await wax.login();
              loggedIn = true;
              setLogin(false);
              setWalletAddress(wallet_userAccount);
              await main();
              
          }
      } catch (e) {
      }
  }
  const logout = async() => {
      loggedIn = false;
      display_nft = false;
      wallet_userAccount = "";
      setWalletAddress("");
  }
  return (
    <div className="container">
      <Box
        sx={{
          width: 384,
          height: 424,
          backgroundColor: 'primary.dark',
          opacity: [0.9, 0.9, 0.9]
        }}
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)', padding: "20px 40px 20px 40px",
          borderRadius: "0.375rem", backgroundColor: "white"
        }}
      >
        <div style={{textAlign:"center"}}>
          <div className = "logoImg" >
            <img style={{margin:"auto"}} src="image/favicon.png"></img>
          </div>
          <div className = "logoText" >
              <h1>Avalon Guard</h1>
          </div>
          <div style={{width: "100%", textAlign:"center", marginTop:"16px"}}>
              <p>{loginFlag? "Wallet Address" : walletAddress}</p>
          </div>
          <input className = "verifyCode" placeholder="AC1A79F4035005E8" disabled></input>
          {loginFlag?<button className = "connect_button" style ={{backgroundColor:"#4b5563"}} onClick={() => login()} >Connect Wax Cloud Wallet</button>
                     :
                     <button className = "connect_button" style ={{backgroundColor:"#2563eb"}} onClick={() => login()} >Verify Wallet</button>
          }
        </div>
      </Box>
    </div>
  );
};
