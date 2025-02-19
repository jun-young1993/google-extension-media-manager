interface MediaElement {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface Props {
  mediaElements: MediaElement[];
  onClose: () => void;
}

export default function MediaPanel({ mediaElements }: Props) {
  return (
    <div className="fixed inset-0 z-[99999] flex items-end p-4">
      <div className="w-[600px] max-w-[95vw]">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Media Panel</h2>
            <button className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {!mediaElements.length && (
              <div className="text-center py-8 text-gray-500">No media found</div>
            )}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
              {mediaElements.map((item, index) => (
                <div
                  key={`${item.src}-${index}`}
                  className="relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200 transition-transform duration-200 hover:scale-[1.02] hover:shadow-md group"
                >
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
