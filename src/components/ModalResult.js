import React from 'react'

function ModalResult(props) {
    return (
        <>
            {(props.state || props.modalState) && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                <div className="bg-white rounded-lg p-6 max-w-md flex flex-col items-center transition-all duration-500 ease-in-out w-[40%]">
                    {props.type === "success" && (
                        <span className="material-symbols-rounded text-green-500 text-[5rem] rounded-full">
                            task_alt
                        </span>
                    )}
                    {props.type === "warning" && (
                        <span className="material-symbols-rounded text-red-500 text-[5rem] rounded-full">
                            warning
                        </span>
                    )}
                    {props.type === "confirm" && (
                        <span className="material-symbols-rounded text-yellow-500 text-[5rem] rounded-full">
                            help
                        </span>
                    )}
                    <p className='mt-2'>{props.message}</p>
                    {props.type === "confirm" && (
                        <div className="flex justify-center items-center mt-2">
                            <button className='bg-black text-white px-2 py-1 mx-1 rounded-md'>Add</button>
                            <button className='bg-black text-white px-2 py-1 mx-1 rounded-md'>cancel</button>
                        </div>
                    )}
                </div>
            </div>
            )}
        </>
    )
}

export default ModalResult
