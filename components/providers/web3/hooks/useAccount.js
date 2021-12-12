import { useEffect, useState } from "react"

export const handler = (web3, provider) => () => {
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const getAccounts = async () => {
            const accs = await web3.eth.getAccounts();
            setAccount(accs[0]);
        }
        web3 && getAccounts();
    }, [web3]);

    useEffect(() => {
        provider &&
            provider.on("accountsChanged",
                accounts => setAccount(accounts[0] ?? null)
            )
    }, [provider])

    return {
        account
    }
}