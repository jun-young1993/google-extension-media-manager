import { useState } from 'react';
import { MediaElement } from '../interfaces/MediaElementInterface';
import ItemWrapper from './ItemWrapper';
import CloseIcon from './CloseIcon';

interface Props {
  mediaElements: MediaElement[];
  onClose: () => void;
}

export default function MediaPanel({ mediaElements, onClose }: Props) {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    index: number;
  } | null>(null);

  const toggleSelectAll = (selectAll: boolean) => {
    setSelectedIndices(selectAll ? mediaElements.map((_, index) => index) : []);
  };

  const handleSelectItem = (index: number) => {
    setSelectedIndices((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  const handleContextMenu = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY, index });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const handleDownload = () => {
    if (contextMenu) {
      const item = mediaElements[contextMenu.index];
      const link = document.createElement('a');
      link.href = item.src;
      link.download = item.name || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    closeContextMenu();
  };

  const handleDownloadSelected = async () => {
    for (const index of selectedIndices) {
      const item = mediaElements[index];
      try {
        const response = await fetch(item.src, { mode: 'cors' });
        if (!response.ok) throw new Error('Network response was not ok');
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', item.name || `download-${index}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Download failed:', error);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-end p-4"
      onClick={closeContextMenu}
    >
      <div className="w-[600px] max-w-[95vw]">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Media Panel {selectedIndices.length}
            </h2>
            <a href={mediaElements[0].src} download={mediaElements[0].name}>test</a>
            <div className="flex gap-2">
              <button
                onClick={() => toggleSelectAll(selectedIndices.length === 0)}
                className={`px-3 py-1 rounded text-white transition-colors ${
                  selectedIndices.length > 0
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {selectedIndices.length > 0 ? '전체 선택 해제' : '전체 선택'}
              </button>
              <button
                onClick={handleDownloadSelected}
                className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
                disabled={selectedIndices.length === 0}
              >
                선택된 이미지 다운로드
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {!mediaElements.length && (
              <div className="text-center py-8 text-gray-500">
                No media found
              </div>
            )}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
              {mediaElements.map((item, index) => (
                <ItemWrapper
                  key={`${item.src}-${index}`}
                  item={item}
                  isSelected={selectedIndices.includes(index)}
                  onSelect={() => handleSelectItem(index)}
                  onClick={() => handleSelectItem(index)}
                  onContextMenu={(event) => handleContextMenu(event, index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {contextMenu && (
        <div
          className="absolute bg-white border border-gray-300 shadow-lg rounded"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <ul>
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleDownload}
            >
              다운로드
            </li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Option 2</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
}
