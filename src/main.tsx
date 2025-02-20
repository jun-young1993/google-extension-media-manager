import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tailwind.css';
import MediaPanel from './components/MediaPanel';
import { MediaElement } from './interfaces/MediaElementInterface';

// 테스트 데이터 생성
const testMediaElements: MediaElement[] = [
  {
    type: 'image',
    src: 'https://picsum.photos/800/450', // 무작위 테스트 이미지
    alt: '테스트 이미지',
    width: 800,
    height: 450,
  },
  {
    type: 'video',
    src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4', // 샘플 비디오
    width: 1280,
    height: 720,
  },
];

// MediaPanel 렌더링
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MediaPanel
      mediaElements={testMediaElements}
      onClose={() => console.log('패널 닫기')}
    />
  </StrictMode>
);
