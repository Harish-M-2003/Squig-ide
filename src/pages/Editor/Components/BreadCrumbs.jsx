
export default function BreadCrumbs({path_segments , currentTab}){

    function formatter(paths){
        return paths.filter((path) => path.name === currentTab)
    }



    return (
        <div style={{borderColor : "rgba(50,52,63)"}} className="border bg-gray-900 border-t-0 border-l-0 border-r-0">
            <p className="text-gray-400 pl-5 py-1">{(path_segments.length !== 0)?formatter(path_segments)[0].path.replaceAll("\\" , " > "):null}</p>
        </div>
    )

}