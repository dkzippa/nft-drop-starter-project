import React, { useEffect, useState} from "react";
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  // State
  const [walletAddress, setWalletAddress] = useState(null);

  /*
  * Declare your function
  */
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
      

        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
        
          /*
          * The solana object gives us a function that will allow us to connect
          * directly with the user's wallet!
          */
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log('Connected with Public Key:', response.publicKey.toString());
          /*
           * Set the user's publicKey in state to be used later!
           */
          setWalletAddress(response.publicKey.toString());
                    
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
//https://thissneakerdoesnotexist.com/editor/?seed=581&style=2
//https://explorer.solana.com/address/4ApmBuXnLkviy24ASHF7cQmwYU1dUaUD5onq2ftv5mKr?cluster=devnet

  /*
   * Let's define this method so our code doesn't break.
   * We will write the logic for this next!
   */
  const connectWallet = async () => {
          
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  /*
   * We want to render this UI when the user hasn't connected
   * their wallet to our app yet.
   */
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );



  /*
   * When our component first mounts, let's check to see if we have a connected
   * Phantom Wallet
   */
  useEffect(() => {
    const onLoad = async () => {
      
      console.log('start useEffect');

      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
  
  



  return (
    <div className="App">
      <div className="container">
        <div className="header-container">

          <div className="header-cnt">

            <p className="sub-text">TOP SECRET</p>
            <p className="header">UFO PROJECTS</p>
            <p className="sub-text">DECLASSIFIED</p>

            {!walletAddress && renderNotConnectedContainer()}
          </div>

        </div>

        <div className="content-container">
          <div className='mint-container'>

            {walletAddress && <CandyMachine walletAddress={window.solana} />}

          </div>

          <div className='partners-container'>
            <p className="partners-header">PARTNERS</p>
            <img className='partner-thumb' alt='' src='images/partner1.png'/>
            <img className='partner-thumb' alt='' src='images/partner2.png'/>
            <img className='partner-thumb' alt='' src='images/partner3.png'/>
            <img className='partner-thumb' alt='' src='images/partner4.png'/>

          </div>

          <p className="sub-text">Welcome to UFO DECLASSIFIED NFT club!</p>
          <p className="sub-text">The UFO DECLASSIFIED NFT club is a NFT project created to offer continuous value to
            its community.
            Our first collection is a savory 6 secret UFO NFTs on the Solanium blockchain.
            No two evidences are alike, and you'll never know what the aliens will show up!</p>
          <div className="photos-container">
            <img className='nft-thumb' alt='' src='images/nft1.png' onClick={connectWallet}/>
            <img className='nft-thumb' alt='' src='images/nft2.png' onClick={connectWallet}/>
            <img className='nft-thumb' alt='' src='images/nft3.png' onClick={connectWallet}/>
          </div>
          <p className="sub-text">It is only the beginning...
            After this drop, the community will get to vote on what NFT collectible we uncover next.
            Place your orders!</p>
        </div>
        
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >@2021 UFO DECLASSIFIED NFT CLUB {`@${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
