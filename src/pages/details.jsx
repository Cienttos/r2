export default function Details(task){
    return(
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-blue-500">Task Details</h1>
            <p className="mt-4 text-lg text-gray-700">{task.description}</p>
        </div>
    )
}