interface SectionProps {
  leftHalf: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ leftHalf }) => {
  return (
    <section className="container mx-auto py-24 px-4 md:px-6">
      <div className="flex flex-col items-center gap-8">
        <div className="w-full p-4 justify-center ">{leftHalf}</div>
      </div>
    </section>
  );
};

export default Section;
