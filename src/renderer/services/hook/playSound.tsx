import { useEffect } from 'react';
import { Howl } from 'howler';
import { getAssetPath } from '@main/main';

export type PlayProps = {
  mp3: string;
  volume: number;
  delay: number;
  onEnd: () => void;
};

const PlaySound = (props: PlayProps) => {
  const { mp3, volume, delay, onEnd } = props;
  const vol = volume / 100;

  useEffect(() => {
    let howl = new Howl({
      preload: true,
      volume: vol,
      src: [mp3],
      onend: () => {
        onEnd();
      },
    });

    setTimeout(() => {
      howl.play();
    }, (delay * 1000));

    return () => {
      howl.stop();
    };
  }, [mp3]);

  return null;
}

export default PlaySound;
