import { createRoot } from 'react-dom/client';
import MediaPanel from './components/MediaPanel';
import './styles/tailwind.css';

// 미디어 요소 인터페이스
interface MediaElement {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

// 페이지의 모든 미디어 요소 수집
function getMediaElements(): MediaElement[] {
  const mediaElements: MediaElement[] = [];

  // 이미지 수집
  document.querySelectorAll('img').forEach((img) => {
    if (img.src) {
      mediaElements.push({
        type: 'image',
        src: img.src,
        alt: img.alt,
        width: img.width,
        height: img.height,
      });
    }
  });

  // 비디오 수집
  document.querySelectorAll('video').forEach((video) => {
    const src = video.src || video.querySelector('source')?.src;
    if (src) {
      mediaElements.push({
        type: 'video',
        src,
        width: video.width,
        height: video.height,
      });
    }
  });

  return mediaElements;
}

// 메시지 리스너 추가
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'TOGGLE_MEDIA_PANEL') {
    const existingModal = document.getElementById('media-panel-extension');
    if (existingModal) {
      existingModal.remove();
      return;
    }

    const modalContainer = document.createElement('div');
    modalContainer.id = 'media-panel-extension';
    document.body.appendChild(modalContainer);

    const root = createRoot(modalContainer);
    root.render(
      <MediaPanel
        mediaElements={getMediaElements()}
        onClose={() => modalContainer.remove()}
      />
    );
  }
});
