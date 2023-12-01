import { relayInit } from 'nostr-tools';
import { convertToHex } from "./nostr-tools"

export const getUser = async (npub) => {
  try {
    const relay = relayInit('wss://relay.primal.net');

    relay.on('connect', () => {
      console.log(`connected to ${relay.url}`);
    });

    relay.on('error', () => {
      console.log(`failed to connect to ${relay.url}`);
    });

    await relay.connect();

    return new Promise((resolve, reject) => {
      let sub = relay.sub([
        {
          kinds: [0],
          authors: [convertToHex(npub)],
        },
      ]);

      sub.on('event', (event) => {
        const kindZero = JSON.parse(event.content);
        sub.unsub(); // Unsubscribe after receiving the first event
        resolve(kindZero);
      });

      // For when there are no more events from subscription
      sub.on('eose', () => {
        console.log('no more events');
        sub.unsub();
        reject(new Error('No events received'));
      });
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
