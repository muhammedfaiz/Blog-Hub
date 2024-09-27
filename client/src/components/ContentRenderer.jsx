// eslint-disable-next-line react/prop-types
const ContentRenderer = ({ content }) => {
  // eslint-disable-next-line react/prop-types
  const lines = content?.split("\r\n");

  return (
    <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
      {lines.map((line, index) => {
         if (line.startsWith("- ")) {
          return <li key={index}>{line.replace("- ", "")}</li>;
        } else if (line.trim()) {
          return <p key={index}>{line}</p>;
        } else {
          return null; 
        }
      })}
    </div>
  );
};

export default ContentRenderer;
