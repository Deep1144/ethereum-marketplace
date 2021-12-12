import { useEffect, useState } from "react"
import useSWR from "swr";

export const handler = (web3, provider) => () => {
    const { mutate, ...rest } = useSWR(() => web3 ? "web3/accounts" : null,
        async (arg) => {
            const accs = await web3.eth.getAccounts();
            return (accs[0]);
        });

    useEffect(() => {
        provider &&
            provider.on("accountsChanged",
                accounts => mutate(accounts[0] ?? null)
            )
    }, [provider])

    return {
        account: { ...rest, mutate },
    }
}