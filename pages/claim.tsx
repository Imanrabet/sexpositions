import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Claim(){
    return(
        <div className="container">
         <div className={styles.claim}>
            <h1>How to claim</h1>
            <h3>1. Add testnet on your wallet(Metamask recommended)</h3>
            <p>Here are the instructions in text mode. <br/>The test networks are already there on Metamask,<br/> just that they are hidden by default. You just need to go to Settings ,<br/> Advanced and turn on the “Show test networks” switch. That’s it! switch to sepolia network</p>
            <p>You can also check video <Link href='https://youtu.be/nHIDJIwYMIU'>How to add testnet and claim</Link></p>
            <h3>2. Claim</h3>
            <p>claim your nfts on the sepolia network.Its free but pay gas fees.<br/>
            get testnet tokens at any ethereum sepolia faucet</p>
            <h3>3. Reveal</h3>
            <p>All nft's will be revealed after all is claimed</p>
         </div>
        </div>
    )
}