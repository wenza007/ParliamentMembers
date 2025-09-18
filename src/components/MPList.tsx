import type { MPFormData } from '../schema/mpschema';

interface MPListProps {
  mps: MPFormData[];
  onEdit: (mp: MPFormData) => void;
  onDelete: (id: number) => void;
  onViewDetails: (mp: MPFormData) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const MPList = ({ mps, onEdit, onDelete, onViewDetails, currentPage, totalPages, onPageChange }: MPListProps) => {
  if (mps.length === 0) {
    return (
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center text-gray-500 font-light">
        ยังไม่มีรายชื่อสมาชิกในระบบ
      </div>
    );
  }

  const getPageNumbers = () => {
    const pagesToShow = 7;
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);
    
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };
  
  const pageNumbers = getPageNumbers();

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        รายชื่อสมาชิกสภาผู้แทนราษฎรทั้งหมด
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mps.map((mp) => (
          <div key={mp.id} className="p-6 border border-gray-200 rounded-xl shadow-sm flex flex-col items-center text-center bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            {mp.photoDisplay && (
              <button onClick={() => onViewDetails(mp)} className="mb-4">
                <img
                  src={mp.photoDisplay}
                  alt={`${mp.firstName} ${mp.lastName}`}
                  className="w-32 h-40 object-cover rounded-xl border-4 border-blue-500 shadow-md transform hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </button>
            )}
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800">
                {mp.prefix} {mp.firstName} {mp.lastName}
              </h3>
              {mp.ministerialPosition && (
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold">ตำแหน่ง:</span> {mp.ministerialPosition} ({mp.ministry})
                </p>
              )}
              {mp.politicalParty && <p className="text-sm text-gray-600 mt-1">สังกัด: <span className="font-semibold">{mp.politicalParty}</span></p>}
            </div>
            
            <div className="flex mt-6 space-x-3">
              <button
                onClick={() => onEdit(mp)}
                className="bg-yellow-500 text-white font-semibold py-2 px-5 rounded-lg text-sm hover:bg-yellow-600 transition duration-300 shadow-md"
              >
                แก้ไข
              </button>
              <button
                onClick={() => onDelete(mp.id!)}
                className="bg-red-500 text-white font-semibold py-2 px-5 rounded-lg text-sm hover:bg-red-600 transition duration-300 shadow-md"
              >
                ลบ
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="flex justify-center mt-8">
          <ul className="flex items-center space-x-2">
            <li>
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-200 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ก่อนหน้า
              </button>
            </li>
            {pageNumbers[0] > 1 && (
              <li>
                <span className="py-2 px-4 text-gray-600">...</span>
              </li>
            )}
            {pageNumbers.map(number => (
              <li key={number}>
                <button
                  onClick={() => onPageChange(number)}
                  className={`py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${
                    currentPage === number
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}
            {pageNumbers[pageNumbers.length - 1] < totalPages && (
              <li>
                <span className="py-2 px-4 text-gray-600">...</span>
              </li>
            )}
            <li>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-gray-200 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ถัดไป
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default MPList;