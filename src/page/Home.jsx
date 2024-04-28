import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from 'react-icons/si';

const Home = () => {
  return (
    <>
      <div className="text-6xl text-green-900 border-4 border-green-900 p-2 flex justify-center w-64 mx-auto">
        <SiMongodb className="mx-1" />
        <SiExpress className="mx-1" />
        <SiReact className="mx-1" />
        <SiNodedotjs className="mx-1" />
      </div>
    </>
  );
};

export default Home;
