import styles from "../styles/Home.module.css";
import Link from 'next/link';
import { NextPage } from "next";
import { ClaimEligibility, ConnectWallet,MediaRenderer,Web3Button,useActiveClaimConditionForWallet,useAddress,useClaimIneligibilityReasons,useContract, useContractMetadata, useTotalCirculatingSupply, useTotalCount } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../constants/addresses";
import { ethers } from "ethers";
import { useState } from "react";

const Home: NextPage = () => {
  const address = useAddress();

  const {
    contract
  } = useContract(CONTRACT_ADDRESS)

  const {
    data : contractMetadata,
    isLoading : isContractMetadataLoading
  } = useContractMetadata(contract);

  const {
    data : activeClaimPhase,
    isLoading: isActiveClaimPhaseLoading
  } = useActiveClaimConditionForWallet(contract,address);

  const {
    data : totalSupply,
    isLoading : isTotalSupplyLoading
  } = useTotalCount(contract)

  const {
    data : totalClaimed,
    isLoading : isTotalClaimedLoading
  } = useTotalCirculatingSupply(contract)

  const [claimELigible,setClaimEligible] = useState(1);

  const increment = () =>{
    if(claimELigible < maxClaimable){
      setClaimEligible(claimELigible + 1);
    }
  }
  const decrement = () => {
    if(claimELigible > maxClaimable){
      setClaimEligible(claimELigible -1);
    }
  }

  const {
    data : claimAbility,
    isLoading : isClaimAbilityLoading
  } = useClaimIneligibilityReasons(contract,{
    walletAddress : address || "",
    quantity : claimELigible
  })

  const maxClaimable = parseInt(activeClaimPhase?.maxClaimablePerWallet || "0") 
  return (
    
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <h3>A 100 unique nft's <br/>of different sex positions<br/>
          Free to claim. <br/>A test Nft project</h3>
          <Link href='/claim'>
            <p>How to claim?</p>
          </Link>
        </div>
      <div className={styles.main}>
    
        {!isContractMetadataLoading && (
          <div className={styles.heroSection}>
            <div className={styles.collectionImage}>
               <MediaRenderer
               src={contractMetadata?.image}
               />
            </div>
            <div>
              <h3>{contractMetadata?.name}</h3>
              <p>{contractMetadata?.description}</p>
              {!isActiveClaimPhaseLoading ? (
                <div>
                <p>Claim Phase : {activeClaimPhase?.metadata?.name}</p>
                <p>Price : {ethers.utils.formatUnits(activeClaimPhase?.price!)}</p>
                </div>
              ):(
                <p>Loading.....</p>
              )}
              {!isTotalClaimedLoading && !isTotalSupplyLoading ? (
                <p>Claimed : {totalClaimed?.toNumber()} / {totalSupply?.toNumber()}</p>
              ) : (
                <p>Loading....</p>
              )}
              {address ? (
                !isClaimAbilityLoading ? (
                 claimAbility?.length! > 0? (
                    claimAbility?.map((reason) => (
                      <p>{reason}</p>
                    ))
                 ) :(
                  <div>
                  <p>You are eligible to claim {`Max Claimable ${maxClaimable}`}</p>
                  <div className={styles.claimContainer}>
                   <div className={styles.claimValue}>
                    <button className={styles.claimBtn} onClick={decrement}>-</button>
                    <input type="number" value={claimELigible} className={styles.claimInput}/>
                    <button className={styles.claimBtn} onClick={increment}>+</button>
                   </div>
                   <Web3Button
                contractAddress={CONTRACT_ADDRESS}
                action={(contract) => contract.erc721.claim(claimELigible)}
                >
                  Claim
                </Web3Button>
                  </div>
                
                </div>
                 )
                ) : (
                  <p>Loading....</p>
                )
                
              ):(
                <p>Connect to wallet to claim</p>
              )}
            </div>
          </div>
        )}
        <div className={styles.nft}>
        {address && (
           <Link href={`/profile/${address}`}>
        <button className={styles.nftButton}>My Nfts</button>
        </Link>
        )}
       
      </div>
      </div>
      
      </div>
    
  );
};

export default Home;
