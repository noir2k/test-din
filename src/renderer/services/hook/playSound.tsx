import { useEffect } from 'react';
import { Howl, Howler } from 'howler';

type SoundFileProps = {
  mp3: string;
};

const PlaySound = (props: SoundFileProps) => {
  const { mp3 } = props;

  useEffect(() => {
    const sound = new Howl({
      src: [mp3],
    });
    sound.play();
    return () => {
      sound.stop();
    };
  }, [mp3]);

  return null;
}

export default PlaySound;
