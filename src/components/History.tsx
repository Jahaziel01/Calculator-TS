import useCalculator from "../hooks/useCalculator";
import trash from "../assets/trash.svg";

export default function History() {

    const { dataLS, handleClearHistory } = useCalculator();

    return (
        <div>
            <h1 className="text-gray-100 text-2xl mb-2">Historial</h1>
            <div className="h-[280px] overflow-y-auto mb-2">
                {dataLS.length > 0 ?
                    <ul>
                        {dataLS.slice().reverse().map((data: any) => (
                            <li key={data} className="text-gray-100 text-md">{data}</li>
                        ))}
                    </ul>
                    :
                    <p className="text-sm text-gray-200">No hay datos.</p>
                }
            </div>
            <button onClick={handleClearHistory}>
                <img src={trash} alt="icon-trash" width={30} height={30} />
            </button>
        </div>
    )
}
