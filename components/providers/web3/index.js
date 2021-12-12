const { createContext, useContext, useEffect, useState, useMemo } = require("react");
import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3';
import { setupHooks } from './hooks/setupHooks';

const Web3Context = createContext(null)

export default function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState({
    provider: null, web3: null, contract: null, isLoading: true
  });
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider);
        setWeb3Api((s) => ({
          ...s,
          web3,
          provider,
          isLoading: false
        }));
      } else {
        setWeb3Api((s) => ({
          ...s,
          isLoading: false
        }))
        console.error("Install metamask...")
      }
    }
    loadProvider();
  }, [])


  const _web3Api = useMemo(() => {
    const { web3, provider } = web3Api;
    return {
      ...web3Api,
      isWeb3Loaded: web3 != null,
      getHooks: () => setupHooks(web3),
      connect: async () => {
        if (!provider) {
          console.error("please install metamask!");
          return;
        }
        try {
          await provider.request({ method: 'eth_requestAccounts' })
          console.log('Connected to web3');
        } catch (error) {
          console.error('Cannot connect to account');
        }
      }
    }
  }, [web3Api])

  return (
    <Web3Context.Provider value={_web3Api}>
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  return useContext(Web3Context)
}


export function useHooks(cb) {
  const { getHooks } = useWeb3()
  return cb(getHooks())
}