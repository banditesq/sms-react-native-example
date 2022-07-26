import { useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Subheading, Text } from 'react-native-paper';

import { suspend } from 'suspend-react'



type Props = {
  publicKey: PublicKey;


};
import { useGlobalState } from '../state';

export default function AccountBalance({ publicKey }: Props) {
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);
  const [value, update] = useGlobalState('requestCount');




  var lamports = suspend(async () => {
    let myBalance = await connection.getBalance(publicKey);
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(
      (myBalance || 0) / LAMPORTS_PER_SOL) as any
  }, [value])

  return (
    <View style={styles.container}>
      <Subheading>Balance: </Subheading>
      <Text style={styles.currencySymbol} variant="titleLarge">
        {'\u25ce'}
      </Text>
      <Subheading>{lamports}</Subheading>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  currencySymbol: {
    marginRight: 4,
  },
});