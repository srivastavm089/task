import mongoose from "mongoose";

const connectDataBase = () => {

  try {
    mongoose.connect(process.env.URL).then((d) => {
      console.log(`database is connected to ${d.connection.host}`);
    });
  } catch (error) {
    console.log("something went wrong with server");
  }
};
export default connectDataBase;
