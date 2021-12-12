import { useEffect, useState } from "react"
import useSWR from "swr";

const adminAddresses = {
    "0x85eb8914bdb092332bc6c252911ed937af026eaed1013b24a585f7c41b2d5cdb": true
}

export const handler = (web3, provider) => () => {
    const { data, mutate, ...rest } = useSWR(() => web3 ? "web3/accounts" : null,
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
        account: {
            data,
            isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
            mutate,
            ...rest
        }
    }
}