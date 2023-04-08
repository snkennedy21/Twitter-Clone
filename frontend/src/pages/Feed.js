import Home from "./home/Home";

function Feed(props) {
  return (
    <div className="text-white flex-grow border-l border-r border-greyBorder max-w-[600px] sm:ml-[73px] xl:ml-[300px]">
      {props.children}
    </div>
  );
}

export default Feed;
