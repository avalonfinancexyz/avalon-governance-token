import { ContractReceipt, ContractTransaction } from 'ethers'

export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function waitForTx(tx: ContractTransaction, confirmations = 1): Promise<ContractReceipt | null> {
    console.log('waiting for tx', tx.hash)
    return await tx.wait(confirmations)
}
