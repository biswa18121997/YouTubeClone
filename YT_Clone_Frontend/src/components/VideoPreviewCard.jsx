import {Link } from 'react-router-dom'

function VideoPreviewCard({item}) {


  return (<div className="w-full border bg-gray-800 p-2 rounded-2xl m-2 flex flex-col justify-center h-full ">
    <Link to={`/video/${item.id}`} state={{item}}>
            <img src={item?.snippet?.thumbnails?.medium?.url} alt="" className="w-full rounded-2xl h-2/3"/>
            <h2 className="text-md font-semibold text-white m-1">{item.snippet.description.slice(0,40)}</h2>
            <p className="text-sm font-semibold text-neutral-400 m-1">{item.snippet.channelTitle}</p>
            <p className="w-full text-right text-white text-xs m-2 p-2">{item.snippet.publishedAt}</p>
            <span className="flex gap-[10%] items-center text-neutral-500">
                <div>{item.statistics.likeCount}  <i className="fa-solid fa-thumbs-up"></i>Likes</div>
                <div>{item.statistics.viewCount}  <i className="fa-solid fa-eye"></i>Views</div>
                <div>{item.statistics.commentCount}  <i className="fa-solid fa-comment"></i>Comments</div>
            </span>
    </Link>
      
    </div>)
}

export default VideoPreviewCard
