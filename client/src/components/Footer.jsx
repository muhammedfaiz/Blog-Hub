const Footer = () => {
  return (
    <footer className="max-w-4xl mx-auto mt-16 mb-12">
      <div className="border-t border-gray-200 pt-8 text-center">
        <p className="text-gray-600">
          © {new Date().getFullYear()} Blog Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
