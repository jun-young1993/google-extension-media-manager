import { MediaElement } from '../interfaces/MediaElementInterface';

interface ItemWrapperProps {
  item: MediaElement;
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
  onClick: () => void;
}

const ItemWrapper = ({
  item,
  isSelected,
  onSelect,
  onClick,
}: ItemWrapperProps) => {
  return (
    <div
      className={`relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200 transition-transform duration-200 hover:scale-[1.02] hover:shadow-md group ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="absolute top-2 left-2">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(e.target.checked)}
        />
      </div>
      <div className="aspect-[16/9] relative">
        {item.type === 'image' ? (
          <img
            src={item.src}
            alt={item.alt || ''}
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            src={item.src}
            className="w-full h-full object-cover"
            controls
          />
        )}
        <div className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-sm gap-2">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
            {item.type}
          </span>
          {item.width && item.height && (
            <span className="text-white/90">
              {`${item.width} x ${item.height}`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemWrapper;
