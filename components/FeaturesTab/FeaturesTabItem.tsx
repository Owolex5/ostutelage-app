import Image from "next/image";

const FeaturesTabItem = ({ featureTab, onReadMore }: any) => {
  return (
    <div className="rounded-lg border border-stroke bg-white dark:bg-blacksection shadow p-6 flex flex-col md:flex-row items-center gap-6">
      <div className="w-full md:w-1/3">
        <Image
          src={featureTab.image}
          alt={featureTab.title}
          width={400}
          height={300}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-3">{featureTab.title}</h3>
        <p className="mb-4">{featureTab.description}</p>
        <button
          onClick={onReadMore}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default FeaturesTabItem;
