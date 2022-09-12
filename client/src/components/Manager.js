import react ,{useState,UseEffect} from " react ";
import"./Manager.css";

const Manager = ({state})=>{
    const [account,setAccount]=useState("");
    const [cbalance,setCbalance]=useState(0);
    const [lwinner,setLwinner]=useState("No winner yet");

    useEffect(()=>{
        const getAccount = async()=>{
            const{web3}=state;
            const accounts=await web3.eth.getAccounts();
            console.log(accounts);
            setAccounts(accounts[0]);
        }
        state.web3 && getAccount();
    },[state,state.web3]);
    const contractBalance= async()=>{
        const{contract}=state;
        
        
        
        try{
        
        

        const balance = await contract.methods.getBalance().call({from:account});
        console.log(balance);
        setCbalance(balance);
        }catch(e){
            setCbalance("You are not the manager");
        }
    }

    const winner = async ()=>{
        const {contract}=state;
        try{
        await contract.methods.pickWinner().send({from:account});
        const lotteryWinner = await contract.methods.winner().call();
        console.log(lotterywinner);
        setLwinner(lotteryWinner);
        }catch(e){
            if(e.message.includes("You are not manager")){
                setLwinner("You are not the manager");
            }else if(e.message.includes("Players are less than 3")){
                setLwinner("There are less than 3 players");
            }else{
                setLwinner("No winner yet");
            }
        }
    }

    return <>
    connected account:{account}
    <br></br>
    Winner:{lwinner}
    <button onClick={winner}>Click for winner:</button>
    <br></br>
    Contract Blance:{cbalance}
    <button onClick={contractBlance}>Balance</button>
    
    </>;
   
};
export default Manager;
