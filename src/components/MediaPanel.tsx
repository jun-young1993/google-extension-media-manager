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

  return (
    <div className="fixed inset-0 z-[99999] flex items-end p-4">
      <div className="w-[600px] max-w-[95vw]">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Media Panel</h2>
            <div className="flex gap-2">
              <button
                onClick={() => toggleSelectAll(selectedIndices.length === 0)}
                className={`px-1 py-1 rounded text-white transition-colors ${
                  selectedIndices.length > 0
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {selectedIndices.length > 0 ? '전체 선택 해제' : '전체 선택'}
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
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
