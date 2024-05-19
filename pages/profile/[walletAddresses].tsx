import { useAddress, useOwnedNFTs,useContract, NFTCollectionInitializer, ThirdwebNftMedia } from "@thirdweb-dev/react"
import styles from "../../styles/Home.module.css"
import { CONTRACT_ADDRESS } from "../../constants/addresses";

export default function Profile(){
    const address = useAddress();
    const truncateAddress = (address : string) =>{
        return `${address.slice(0,6)}...${address.slice(-4)}`
    }

    const {
        contract
    } = useContract(CONTRACT_ADDRESS);

    const {
        data : ownedNfts,
        isLoading : isOwnedNftsLoading
    } = useOwnedNFTs(contract,address);
    return(
        <div className={styles.container}>
         {address ? (
            <div>
                <div>
                <h1>Profile</h1>
                <p>Wallet Address: {truncateAddress(address || "")}</p>
                </div>
                <hr/>
                <h3>My Nfts</h3>
                <div className={styles.grid}>
                    {!isOwnedNftsLoading ? (
                        ownedNfts?.length! > 0 ? (
                            ownedNfts?.map((nft) => (
                              <div key={nft.metadata.id} className={styles.NFTCard}>
                                <ThirdwebNftMedia
                                metadata={nft.metadata}
                                />
                                <h3>{nft.metadata.name}</h3>
                              </div>
                            ))
                        ) : (
                            <p>No Nfts Owned</p>
                        )
                    ):(
                        <p>Loading.....</p>
                    )}
                </div>
            </div>
            

         ):(
            <p>Please Connect your wallet</p>
         )}
        </div>
    )
}