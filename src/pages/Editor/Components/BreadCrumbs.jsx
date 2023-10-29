
export default function BreadCrumbs({path_segments , currentTab}){

    function formatter(paths){
        return paths.filter((path) => path.name === currentTab)
    }



    return (
        <div style={{backgroundColor : "rgba(14, 42, 53)"}}>
            <p className="text-gray-400 pl-5 py-1">{(path_segments.length !== 0)?formatter(path_segments)[0].path.replaceAll("\\" , " > "):null}</p>
        </div>
    )

}