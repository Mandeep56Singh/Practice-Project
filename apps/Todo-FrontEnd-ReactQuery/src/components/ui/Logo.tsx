import { CheckCheck } from 'lucide-react';


const Logo = () => {
  return (
    <h1 className=" text-2xl font-medium flex gap-2 justify-center items-center">
      <div className="flex justify-center items-center p-1  bg-primary rounded-md text-white">
        <CheckCheck />
      </div>
      <span className="text-primary">Quick</span> Task
    </h1>
  );
}

export default Logo