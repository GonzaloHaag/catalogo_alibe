import { generatePaginationNumbers } from "@/lib/generate-pagination-numbers";

export const Pagination = ({ currentPage, setCurrentPage, totalPages }: { currentPage: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>, totalPages: number }) => {
    const paginationNumbers = generatePaginationNumbers(currentPage, totalPages);

    const handlePageChange = (page: number | string) => {
        if (typeof page === 'number') {
            setCurrentPage(page);
        }
    };
    return (
        <nav aria-label="Navegacion de pagina">
            <ul className="flex items-center justify-center -space-x-px h-8 text-sm">
                <li>
                    <button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
                        <span className="sr-only">Previous</span>
                        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                    </button>
                </li>
                {
                    paginationNumbers.map((page,index) => (
                        <li key={index}>
                            <button onClick={() => handlePageChange(page)} className={`flex items-center justify-center px-3 h-8 leading-tight ${page === currentPage ? 'text-slate-100 bg-red-600 border border-gray-300 hover:bg-red-400 hover:text-slate-100':'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}>
                                {page}
                            </button>
                        </li>
                    ))
                }
                <li>
                    <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage === totalPages} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
                        <span className="sr-only">Next</span>
                        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    )
}
