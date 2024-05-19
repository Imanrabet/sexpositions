import Link from 'next/link';
import { ConnectWallet } from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';

export const Navbar = () =>{
 return(
    <div className={styles.navbar}>
    <Link href='/'>
    <p>SEX POSITIONS</p>
    </Link>
    
    <ConnectWallet/>
   </div>
 )
}