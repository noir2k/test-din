// Create a React component that receives an mp3 file name and plays a sound
import React, { useEffect } from 'react';
import { Howl, Howler } from 'howler';

// export default function PlaySound(props: Props) {
//   const { mp3 } = props;

//   useEffect(() => {
//     const sound = new Howl({
//       src: [mp3],
//     });
//     sound.play();
//     return () => {
//       sound.stop();
//     };
//   }, [mp3]);

//   return null;
// }
