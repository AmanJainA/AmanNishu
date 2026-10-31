import { useEffect, useRef } from 'react';
import { asset, publicUrl } from '../utils/asset';

export default function Video() {
  const ref = useRef(null);
  useEffect(() => { ref.current?.play().catch(() => {}); }, []); // autoplay may be blocked; controls remain
  return (
    <div className="video-page">
      <video ref={ref} loop autoPlay playsInline controls preload="metadata" poster={asset('images/wedding.jpeg')}>
        <source src={publicUrl('video/wedding.mp4')} type="video/mp4" />
      </video>
    </div>
  );
}
