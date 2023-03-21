import Home from "./Home";

function Feed(props) {
  return (
    <div className="text-white flex-grow border-l border-r border-greyBorder max-w-2xl sm:ml-[73px] xl:ml-[370px]">
      {props.children}
    </div>
  );
}

export default Feed;
