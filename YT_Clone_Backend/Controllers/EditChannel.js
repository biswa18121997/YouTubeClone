import { ChannelModel } from "../SchemaModels/ChannelModel.js";
import { VideoModel } from "../SchemaModels/VideoModel.js";
//controller function to edit channel data video data,upload video and delete channel
export async function EditChannel(req, res) {
    try {
        let newData = req?.body?.sendToServer;
        let existingChannel = await ChannelModel.findOne({ channelId: newData?.channelId });
        if (newData?.meta == 'edit channel') {
            // First, fetch the current channel data
            if (!existingChannel) {
                return res.status(404).json({ message: "Channel not found" });
            }
            else{
                await ChannelModel.findOneAndUpdate(
                    { channelId: newData?.channelId },
                    {
                        $set: {
                            channelTitle: newData?.editName || existingChannel?.channelTitle,
                            tags: newData?.editTags || existingChannel?.tags,
                            channelDescription: newData?.editDescription || existingChannel?.channelDescription,
                            channelBanner: newData?.editBanner || existingChannel?.channelBanner,
                        }
                    },
                    { new: true }
                );
                let updatedChannels = await ChannelModel.find({OwnerID : existingChannel?.OwnerID })
                return res.status(200).json({ message: 'success', updatedChannels });
            }
        }
        else if(newData?.meta == 'publish video'){
            let newVideo = await VideoModel.create({
                                     tags:newData?.uploadVideoTags.split(' '),
                                     videoTitle : newData?.uploadVideoTitle ,
                                     videoDescription : newData?.uploadVideoDescription,
                                     channelId: newData?.channelId                     
                                    });
            await ChannelModel.findOneAndUpdate({channelId: newData?.channelId},{$push :{ videos:newVideo.toObject()}})
            let updatedChannels = await ChannelModel.find({OwnerID : existingChannel?.OwnerID || newData.user.email});
            return res.status(201).json({message : 'sucess',
                                updatedChannels})  
        }
        else if(newData?.meta == 'delete video'){
            await ChannelModel.findOneAndUpdate({OwnerID:newData?.user.email},{ $pull: { videos: { videoId: newData?.videoId } } } );
            let updatedChannels =await ChannelModel.find({OwnerID :  newData?.user?.email})
            return res.status(201).json({message : 'sucess', updatedChannels});
        }
        else if(newData?.meta == 'delete channel'){
            await ChannelModel.findOneAndDelete({channelId : newData?.channelId});
            let updatedChannels = await ChannelModel.find({OwnerID : existingChannel?.OwnerID});
            return res.status(201).json({message : 'sucess', updatedChannels});

        }
       

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

