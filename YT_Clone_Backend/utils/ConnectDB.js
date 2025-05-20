import mongoose from "mongoose";

const Connection = () => mongoose.connect('mongodb+srv://biswajitshrm6:7DL0Lz8dxicjlXQJ@users.mt5yvfh.mongodb.net/YT_Clone')
                    .then(()=>console.log("Database connected succesfully..!"))
                    .catch((e)=>console.log('Problem while connecting to db', e));

export default Connection