import { useEffect } from 'react';
import { Howl, HowlErrorCallback } from 'howler';

export type PlayProps = {
  mp3: string;
  volume: number;
  onEnd?: () => void | undefined;
};

const PlaySound = (props: PlayProps) => {
  const { mp3, volume, onEnd } = props;
  const vol = volume / 100;
  const option = {
    volume: vol,
    src: [mp3],
    onplay: () => {
      console.log('onplay');
    },
    onloaderror: (id: any, error: any) => {
      console.log('onloaderror', id, error);
    },
    onplayerror: (id: any, error: any) => {
      console.log('onplayerror', id, error);
    },
    onend: () => {
      if (typeof onEnd === 'function') {
        console.log('onEnd');
        // onEnd();
      }
    },
  };

  const howl = new Howl(option);

  useEffect(() => {
    console.log('PLAY_BEFORE');
    howl.play();

    return () => {
      console.log('PLAY_STOP::unmount');
      howl.stop();
    };
  }, [mp3]);

  // useEffect(() => {
  //   return () => {
  //     console.log('PLAY_STOP::unmount');
  //     howl.stop();
  //   };
  // }, []);

  return null;
};

PlaySound.defaultProps = {
  onEnd: () => {},
};

export default PlaySound;
